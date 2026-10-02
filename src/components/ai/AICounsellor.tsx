import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { Bot, ChevronRight, Send, Sparkles, X } from "lucide-react";
import {
  buildKnowledgeReply,
  CounsellorProfile,
  CourseRecommendation,
  detectLanguage,
  detectUserType,
  extractClassNumber,
  getContextLabel,
  getCourseFromPath,
  getLocalizedCopy,
  getRecommendationConfidence,
  isUncertain,
  recommendCourses,
  UserType,
} from "@/data/aiCounsellor";
import { AILeadContact, saveAILead } from "@/lib/aiLeads";

interface ChatMessage {
  id: number;
  role: "assistant" | "user";
  text: string;
  recommendations?: CourseRecommendation[];
}

const emptyProfile = (sourcePage: string): CounsellorProfile => ({
  language: "en",
  userType: "unknown",
  name: "",
  childName: "",
  subjectInterest: "",
  careerInterest: "",
  learningGoal: "",
  currentLevel: "",
  courseInterest: "",
  sourcePage,
  engineeringInterest: "unknown",
});

export function AICounsellor() {
  const location = useLocation();
  const currentCourse = useMemo(() => getCourseFromPath(location.pathname), [location.pathname]);
  const contextLabel = getContextLabel(location.pathname);
  const [open, setOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.sessionStorage.getItem("junior-dream-ai-intro-seen");
  });
  const [hasIntroduced, setHasIntroduced] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [profile, setProfile] = useState(() => emptyProfile(location.pathname));
  const [recommendations, setRecommendations] = useState<CourseRecommendation[]>([]);
  const [input, setInput] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [consent, setConsent] = useState(false);
  const [contact, setContact] = useState<AILeadContact>({ name: "", email: "", mobile: "" });
  const [leadStatus, setLeadStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [leadError, setLeadError] = useState("");
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const messageId = useRef(0);
  const leadId = useRef(
    typeof window === "undefined"
      ? "ai-session"
      : window.sessionStorage.getItem("junior-dream-ai-lead-id") ?? crypto.randomUUID(),
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateViewport = () => {
      const nextHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      setViewportHeight(nextHeight);
      document.documentElement.style.setProperty("--app-vh", `${nextHeight * 0.01}px`);
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);
    window.visualViewport?.addEventListener("resize", updateViewport);
    return () => {
      window.removeEventListener("resize", updateViewport);
      window.visualViewport?.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") window.sessionStorage.setItem("junior-dream-ai-lead-id", leadId.current);
  }, []);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("open-ai-counsellor", openHandler);
    return () => window.removeEventListener("open-ai-counsellor", openHandler);
  }, []);

  useEffect(() => {
    if (!showIntro) return;
    const introTimer = window.setTimeout(() => {
      window.sessionStorage.setItem("junior-dream-ai-intro-seen", "true");
      setShowIntro(false);
    }, 3200);
    return () => window.clearTimeout(introTimer);
  }, [showIntro]);

  useEffect(() => {
    setProfile((previous) => ({ ...previous, sourcePage: location.pathname }));
  }, [location.pathname]);

  useEffect(() => {
    if (open && !hasIntroduced) {
      setMessages([
        {
          id: messageId.current++,
          role: "assistant",
          text: currentCourse
            ? `Hi! I’m Junior Dream AI. I can help you understand this ${currentCourse.variantLabel} or find the best next step for your learner.`
            : "Hi! I’m Junior Dream AI. I can help you explore our courses, batches and admission process. What would you like to know?",
        },
        {
          id: messageId.current++,
          role: "assistant",
          text: `You’re browsing ${contextLabel}. What would you like to explore?`,
        },
      ]);
      setHasIntroduced(true);
    }
  }, [contextLabel, currentCourse, hasIntroduced, open]);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, open, showLeadForm]);

  const addMessage = (role: ChatMessage["role"], text: string, nextRecommendations?: CourseRecommendation[]) => {
    setMessages((previous) => [
      ...previous,
      { id: messageId.current++, role, text, recommendations: nextRecommendations },
    ]);
  };

  const continueConversation = (text: string) => {
    const lower = text.toLowerCase();
    const language = detectLanguage(text, profile.language);
    const copy = getLocalizedCopy(language);
    const detectedType = detectUserType(text);
    const classNumber = extractClassNumber(text);
    const uncertain = isUncertain(text);
    const nextProfile = { ...profile, language };
    if (detectedType !== "unknown") nextProfile.userType = detectedType;
    if (classNumber) nextProfile.classNumber = classNumber;

    const directKnowledge = buildKnowledgeReply(text, nextProfile, currentCourse, location.pathname);
    if (directKnowledge.shouldUse && /fee|fees|price|cost|duration|curriculum|compare|course|program|who are you|what is junior dream|what.*learn|what.*teach|difference|syllabus|how long|class [0-9]|batch/i.test(text)) {
      addMessage("assistant", directKnowledge.answer);
      setProfile(nextProfile);
      return;
    }

    if (profile.userType === "unknown" && detectedType !== "unknown") {
      setProfile(nextProfile);
      addMessage("assistant", detectedType === "parent" ? (language === "en" ? "Thanks. May I know your child’s name?" : `${language === "hi" ? "Bilkul" : "Sure"}. Child ka naam kya hai?`) : language === "en" ? "Great. May I know your name?" : "Great. Aapka naam kya hai?");
      return;
    }

    if (nextProfile.userType === "unknown") {
      addMessage("assistant", copy.identity);
    } else if (nextProfile.userType === "parent" && !nextProfile.childName) {
      nextProfile.childName = text.trim().split(/\s+/).slice(0, 3).join(" ");
      addMessage("assistant", copy.class);
    } else if (nextProfile.userType === "student" && !nextProfile.name) {
      nextProfile.name = text.trim().split(/\s+/).slice(0, 3).join(" ");
      addMessage("assistant", copy.class);
    } else if (!nextProfile.classNumber) {
      addMessage("assistant", copy.class);
    } else if (!nextProfile.subjectInterest || uncertain) {
      if (uncertain) {
        nextProfile.subjectInterest = "unknown";
        nextProfile.careerInterest = "unknown";
        addMessage("assistant", copy.uncertainty);
      } else {
        nextProfile.subjectInterest = text.trim();
        addMessage("assistant", copy.goal);
      }
    } else if (!nextProfile.learningGoal || !nextProfile.careerInterest) {
      if (uncertain) {
        nextProfile.learningGoal = "unknown";
        nextProfile.careerInterest = "unknown";
        addMessage("assistant", copy.uncertainty);
      } else {
        nextProfile.learningGoal = text.trim();
        nextProfile.careerInterest = text.trim();
        nextProfile.engineeringInterest = includesQuestion(lower, ["engineering", "jee", "tech", "coding", "computer"]) ? "yes" : "unknown";
        const confidence = getRecommendationConfidence(nextProfile);
        if (confidence === "insufficient_information") {
          addMessage("assistant", copy.goal);
        } else {
          const nextRecommendations = recommendCourses(nextProfile, currentCourse);
          setRecommendations(nextRecommendations);
          addMessage("assistant", language === "en" ? "Thanks, I have enough context to show relevant options. Here is why each one may fit:" : "Thanks, ab mujhe enough context mil gaya hai. Neeche relevant options aur unka reason diya hai:", nextRecommendations);
        }
      }
    } else {
      const nextRecommendations = recommendCourses(nextProfile, currentCourse);
      setRecommendations(nextRecommendations);
      if (nextRecommendations.length) addMessage("assistant", language === "en" ? "I’ve included that in your profile. You can compare these options, ask about the syllabus, or choose the next step." : "Maine is information ko profile mein include kar liya hai. Aap options compare kar sakte hain, syllabus pooch sakte hain, ya next step choose kar sakte hain.", nextRecommendations);
      else addMessage("assistant", copy.goal);
    }
    setProfile(nextProfile);
  };

  const submitMessage = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    addMessage("user", trimmed);
    setInput("");
    window.setTimeout(() => continueConversation(trimmed), 180);
  };

  const chooseUserType = (type: UserType) => {
    const label = type === "parent" ? "I’m a parent looking for my child" : "I’m a student looking for myself";
    addMessage("user", label);
    const nextProfile = { ...profile, userType: type };
    setProfile(nextProfile);
    addMessage("assistant", type === "parent" ? "Bilkul. Child ka naam kya hai? Uske baad main class aur interest ke basis par options narrow karunga." : "Great. Aapka naam aur current class kya hai? Main aapke goals ke hisaab se options compare karunga.");
  };

  const openLeadForm = () => {
    setShowLeadForm(true);
    if (!contact.name) setContact((previous) => ({ ...previous, name: profile.userType === "parent" ? "" : profile.name }));
    addMessage("assistant", "Main aapke liye counselling/admission follow-up arrange kar sakta hoon. Details save karne se pehle main aapki permission loonga.");
  };

  const submitLead = async (event: FormEvent) => {
    event.preventDefault();
    setLeadStatus("idle");
    setLeadError("");
    if (!consent) {
      setLeadError("Please confirm consent before saving your details.");
      return;
    }
    const normalizedMobile = normalizeIndianMobile(contact.mobile);
    if (!contact.name.trim() || !/^\S+@\S+\.\S+$/.test(contact.email) || !/^\d{10}$/.test(normalizedMobile) || !/^[6-9]\d{9}$/.test(normalizedMobile)) {
      setLeadError("Please enter a valid name, email and 10-digit Indian mobile number.");
      return;
    }
    setLeadStatus("saving");
    try {
      const summary = messages.map((message) => `${message.role}: ${message.text}`).join(" | ").slice(-3000);
      await saveAILead(leadId.current, profile, { ...contact, name: contact.name.trim(), mobile: normalizedMobile }, recommendations, summary, consent);
      setLeadStatus("saved");
      addMessage("assistant", "Thank you. Your details have been saved for Junior Dream counselling follow-up. You can continue exploring the recommended course or start the application when ready.");
    } catch (error) {
      console.error(error);
      setLeadStatus("error");
      setLeadError("I couldn’t save those details right now. Please use the Contact page to reach the team directly.");
    }
  };

  const panelStyle = viewportHeight ? { maxHeight: `${Math.min(viewportHeight - 24, 720)}px`, height: `${Math.min(viewportHeight - 24, 720)}px` } : undefined;

  return (
    <>
      {!open && (
        <div className="fixed bottom-5 right-5 z-50 flex items-end gap-3 sm:bottom-7 sm:right-7">
          {showIntro && (
            <div className="ai-intro-character pointer-events-none absolute bottom-1 right-11 flex items-end gap-2 sm:right-12">
              <div className="rounded-2xl rounded-br-sm border border-black/10 bg-white px-3 py-2 text-xs text-black shadow-lg">Hi! 👋</div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#111111] text-2xl shadow-lg" aria-hidden="true">🧒</div>
            </div>
          )}
          <div className="hidden max-w-[190px] rounded-2xl border border-black/10 bg-white px-4 py-3 text-xs leading-5 text-black/70 shadow-xl sm:block">
            <span className="font-medium text-black">Hi, I’m Junior Dream AI.</span><br />Find the right course with me.
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open Junior Dream AI counsellor"
            className="ai-launcher-character flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-[0_14px_35px_rgba(0,0,0,0.22)] transition-transform hover:scale-105"
          >
            <Sparkles size={22} />
          </button>
        </div>
      )}

      {open && (
        <section className="ai-chat-panel fixed inset-x-3 bottom-3 z-50 flex flex-col overflow-hidden rounded-[26px] border border-black/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.2)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[420px]" style={panelStyle} aria-label="Junior Dream AI counsellor">
          <header className="flex shrink-0 items-center justify-between bg-black px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"><Bot size={20} /></div>
              <div><div className="text-sm font-medium">Junior Dream AI</div><div className="text-[10px] uppercase tracking-[0.16em] text-white/55">Your AI Course Counsellor · Online</div></div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close Junior Dream AI" className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"><X size={18} /></button>
          </header>

          <div ref={scrollRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto overflow-x-hidden bg-[#FCFCFC] p-4">
            {messages.map((message) => (
              <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className={message.role === "user" ? "max-w-[85%] rounded-2xl rounded-br-md bg-black px-4 py-3 text-sm leading-6 text-white" : "max-w-[92%] rounded-2xl rounded-bl-md border border-black/10 bg-white px-4 py-3 text-sm leading-6 text-black/75 shadow-sm"}>
                  <div className="break-words whitespace-pre-wrap">{message.text}</div>
                  {message.recommendations && <div className="mt-4 space-y-3">{message.recommendations.map((recommendation) => <RecommendationCard key={recommendation.course.id} recommendation={recommendation} />)}</div>}
                </div>
              </div>
            ))}
            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-2">
                <QuickAction label="I’m a Parent" onClick={() => chooseUserType("parent")} />
                <QuickAction label="I’m a Student" onClick={() => chooseUserType("student")} />
                <QuickAction label="Explore Courses" onClick={() => continueConversation("I want to explore engineering courses")} />
                <QuickAction label="Ask a question" onClick={() => addMessage("assistant", getLocalizedCopy(profile.language).identity)} />
              </div>
            )}
            {recommendations.length > 0 && !showLeadForm && leadStatus !== "saved" && (
              <button type="button" onClick={openLeadForm} className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-medium text-black transition hover:bg-black hover:text-white">Request counselling follow-up <ChevronRight size={14} /></button>
            )}
            {showLeadForm && leadStatus !== "saved" && (
              <form onSubmit={submitLead} className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
                <div className="mb-3 text-sm font-medium text-black">Save counselling details</div>
                <div className="space-y-2">
                  <input value={contact.name} onChange={(event) => setContact({ ...contact, name: event.target.value })} placeholder="Your name" className="w-full rounded-xl border border-black/10 bg-[#F9F9F9] px-3 py-2 text-sm outline-none focus:border-black" />
                  <input value={contact.mobile} onChange={(event) => setContact({ ...contact, mobile: event.target.value })} placeholder="Mobile number" inputMode="tel" className="w-full rounded-xl border border-black/10 bg-[#F9F9F9] px-3 py-2 text-sm outline-none focus:border-black" />
                  <input value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} placeholder="Email address" type="email" className="w-full rounded-xl border border-black/10 bg-[#F9F9F9] px-3 py-2 text-sm outline-none focus:border-black" />
                  <label className="flex gap-2 pt-1 text-xs leading-5 text-black/60"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 accent-black" /> I agree that Junior Dream may save these details for counselling and admission follow-up.</label>
                  {leadError && <p className="text-xs text-red-600">{leadError}</p>}
                  <button type="submit" disabled={leadStatus === "saving"} className="w-full rounded-full bg-black px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-white disabled:opacity-50">{leadStatus === "saving" ? "Saving..." : "Save with consent"}</button>
                </div>
              </form>
            )}
          </div>

          <form ref={formRef} onSubmit={submitMessage} className="flex shrink-0 gap-2 border-t border-black/10 bg-white p-3">
            <textarea value={input} onChange={(event) => setInput(event.target.value)} rows={1} placeholder="Ask about courses, fees or syllabus..." className="max-h-[120px] min-h-[44px] min-w-0 flex-1 resize-none overflow-y-auto rounded-full bg-[#F5F5F5] px-4 py-3 text-sm outline-none placeholder:text-black/35" aria-label="Message Junior Dream AI" onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                formRef.current?.requestSubmit();
              }
            }} />
            <button type="submit" aria-label="Send message" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white transition hover:bg-black/80"><Send size={16} /></button>
          </form>
        </section>
      )}
    </>
  );
}

function QuickAction({ label, onClick }: { label: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-full border border-black/10 bg-white px-3 py-2 text-xs text-black/70 shadow-sm transition hover:border-black hover:text-black">{label}</button>;
}

function RecommendationCard({ recommendation }: { recommendation: CourseRecommendation }) {
  const { course } = recommendation;
  return (
    <article className="overflow-hidden rounded-2xl border border-black/10 bg-white text-black shadow-sm">
      <img src={course.image} alt={course.batchLevel} className="h-24 w-full object-cover" />
      <div className="p-3">
        <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-black/45">Class {course.classNumber} · {course.batchLevel}</div>
        <h3 className="mt-1 text-sm font-medium">{course.variantLabel}</h3>
        <p className="mt-2 text-xs leading-5 text-black/60">{recommendation.reason}</p>
        <div className="mt-2 text-xs text-black/55">{course.duration} · {course.fee}</div>
        <div className="mt-3 flex gap-2">
          <Link to={`/programs/engineering/class-${course.classNumber}/${course.id}`} className="inline-flex flex-1 items-center justify-center rounded-full border border-black/15 px-2 py-2 text-[10px] font-medium uppercase tracking-[0.08em] no-underline">View details</Link>
          <Link to={`/apply?stream=engineering&batch=${encodeURIComponent(course.batchLevel)}&class=${course.classNumber}&tier=${encodeURIComponent(course.variantName)}`} className="inline-flex flex-1 items-center justify-center rounded-full bg-black px-2 py-2 text-[10px] font-medium uppercase tracking-[0.08em] text-white no-underline">Apply now</Link>
        </div>
      </div>
    </article>
  );
}

function normalizeIndianMobile(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.startsWith("91") && digits.length === 12 ? digits.slice(2) : digits;
}

function includesQuestion(value: string, words: string[]) {
  return words.some((word) => value.includes(word));
}

export default AICounsellor;
