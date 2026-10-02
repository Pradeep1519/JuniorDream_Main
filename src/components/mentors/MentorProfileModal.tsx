import { X } from "lucide-react";
import { MentorProfile } from "@/data/mentors";

interface MentorProfileModalProps {
  mentor: MentorProfile | null;
  onClose: () => void;
}

export function MentorProfileModal({ mentor, onClose }: MentorProfileModalProps) {
  if (!mentor) return null;

  const roleBadges = [
    mentor.company,
    mentor.experience,
    mentor.location,
  ].filter((tag): tag is string => Boolean(tag));

  return (
    <div className="popup-backdrop-enter fixed inset-0 z-[70] flex items-end justify-center bg-black/45 p-3 sm:items-center" role="presentation" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mentor-profile-title"
        className="popup-panel-enter max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[30px] bg-white p-5 shadow-[0_30px_90px_rgba(0,0,0,0.12)] sm:p-8"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Mentor profile</div>
            <h2 id="mentor-profile-title" className="mt-2 text-3xl font-light text-black">{mentor.name}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close mentor profile" className="rounded-full p-2 text-black/50 transition hover:bg-black/5 hover:text-black">
            <X size={20} />
          </button>
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-[200px_1fr]">
          <img src={mentor.image} alt={`${mentor.name} mentor profile`} className="aspect-[4/5] w-full rounded-[24px] object-cover shadow-[0_20px_40px_rgba(0,0,0,0.08)]" />
          <div>
            {mentor.courseFocus && <div className="inline-flex rounded-full border border-black/10 bg-[#F4F3EE] px-3 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-black/60">{mentor.courseFocus}</div>}
            <div className="mt-4 text-xl font-medium text-black">{mentor.currentRole}</div>
            {(mentor.designation || mentor.company) && <div className="mt-2 text-base text-black/65">{[mentor.designation, mentor.company].filter(Boolean).join(" • ")}</div>}
            {roleBadges.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{roleBadges.map((tag) => <span key={tag} className="rounded-full border border-black/10 bg-[#F8F8F8] px-3 py-1.5 text-xs text-black/60">{tag}</span>)}</div>}
            <div className="mt-4 flex flex-wrap gap-2">
              {mentor.specialization.map((item) => <span key={item} className="rounded-full border border-black/10 bg-[#F8F8F8] px-3 py-1.5 text-xs text-black/60">{item}</span>)}
            </div>
            <p className="mt-5 text-sm leading-7 text-black/65">{mentor.bio}</p>
          </div>
        </div>

        <div className="mt-7 grid gap-4 border-t border-black/10 pt-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-[#F8F8F8] p-4">
            <div className="text-[0.62rem] uppercase tracking-[0.16em] text-black/40">Mentoring focus</div>
            <p className="mt-2 text-sm leading-6 text-black/65">{mentor.mentoringFocus}</p>
          </div>
          <div className="rounded-2xl bg-[#F8F8F8] p-4">
            <div className="text-[0.62rem] uppercase tracking-[0.16em] text-black/40">Profile status</div>
            <p className="mt-2 text-sm leading-6 text-black/65">
              {mentor.verified ? "Verified industry profile" : "Profile details will be published after verification."}
            </p>
            {mentor.location && <div className="mt-3 text-xs uppercase tracking-[0.12em] text-black/45">{mentor.location}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
