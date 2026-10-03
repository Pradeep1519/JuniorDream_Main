import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Layout } from "@/components/layout/Layout";
import { Splash } from "@/components/layout/Splash";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SiteTransitionProvider } from "@/components/layout/SiteTransitionProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ProfessionalLayout } from "@/components/layout/ProfessionalLayout";
import { PROFESSIONAL_FORGOT_PASSWORD_ROUTE, PROFESSIONAL_LOGIN_ROUTE, PROFESSIONAL_SIGNUP_ROUTE } from "@/lib/professionalRoutes";

function VercelObservability() {
  const { pathname } = useLocation();

  return (
    <>
      <Analytics route={pathname} path={pathname} />
      <SpeedInsights route={pathname} />
    </>
  );
}

const Home = lazy(() => import("@/app/routes/Home").then((module) => ({ default: module.Home })));
const About = lazy(() => import("@/app/routes/About").then((module) => ({ default: module.About })));
const Career = lazy(() => import("@/app/routes/Career").then((module) => ({ default: module.Career })));
const Programs = lazy(() => import("@/app/routes/Programs").then((module) => ({ default: module.Programs })));
const EngineeringProgram = lazy(() => import("@/app/routes/EngineeringProgram").then((module) => ({ default: module.EngineeringProgram })));
const ClassDetail = lazy(() => import("@/app/routes/ClassDetail").then((module) => ({ default: module.ClassDetail })));
const ComingSoon = lazy(() => import("@/app/routes/ComingSoon").then((module) => ({ default: module.ComingSoon })));
const Mentorship = lazy(() => import("@/app/routes/Mentorship").then((module) => ({ default: module.Mentorship })));
const StudentStories = lazy(() => import("@/app/routes/StudentStories").then((module) => ({ default: module.StudentStories })));
const FAQ = lazy(() => import("@/app/routes/FAQ").then((module) => ({ default: module.FAQ })));
const Contact = lazy(() => import("@/app/routes/Contact").then((module) => ({ default: module.Contact })));
const Apply = lazy(() => import("@/app/routes/Apply").then((module) => ({ default: module.Apply })));
const Privacy = lazy(() => import("@/app/routes/Privacy").then((module) => ({ default: module.Privacy })));
const Terms = lazy(() => import("@/app/routes/Terms").then((module) => ({ default: module.Terms })));
const Accessibility = lazy(() => import("@/app/routes/Accessibility").then((module) => ({ default: module.Accessibility })));
const Login = lazy(() => import("@/app/routes/Login").then((module) => ({ default: module.Login })));
const ApplicationSuccess = lazy(() => import("@/app/routes/ApplicationSuccess").then((module) => ({ default: module.ApplicationSuccess })));
const Dashboard = lazy(() => import("@/app/routes/Dashboard").then((module) => ({ default: module.Dashboard })));
const StudentPortal = lazy(() => import("@/app/routes/StudentPortal").then((module) => ({ default: module.StudentPortal })));
const ProfessionalHome = lazy(() => import("@/app/routes/professional/ProfessionalHome").then((module) => ({ default: module.ProfessionalHome })));
const ProfessionalPrograms = lazy(() => import("@/app/routes/professional/ProfessionalPrograms").then((module) => ({ default: module.ProfessionalPrograms })));
const ProfessionalCourseDetail = lazy(() => import("@/app/routes/professional/ProfessionalCourseDetail").then((module) => ({ default: module.ProfessionalCourseDetail })));
const ProfessionalApplicationSuccess = lazy(() => import("@/app/routes/professional/ProfessionalApplicationSuccess").then((module) => ({ default: module.ProfessionalApplicationSuccess })));
const ProfessionalAbout = lazy(() => import("@/app/routes/professional/ProfessionalAbout").then((module) => ({ default: module.ProfessionalAbout })));
const ProfessionalMentors = lazy(() => import("@/app/routes/professional/ProfessionalMentors").then((module) => ({ default: module.ProfessionalMentors })));
const ProfessionalCareer = lazy(() => import("@/app/routes/professional/ProfessionalCareer").then((module) => ({ default: module.ProfessionalCareer })));
const ProfessionalFAQ = lazy(() => import("@/app/routes/professional/ProfessionalFAQ").then((module) => ({ default: module.ProfessionalFAQ })));
const ProfessionalContact = lazy(() => import("@/app/routes/professional/ProfessionalContact").then((module) => ({ default: module.ProfessionalContact })));
const ProfessionalLogin = lazy(() => import("@/app/routes/professional/ProfessionalLogin").then((module) => ({ default: module.ProfessionalLogin })));
const ProfessionalSignup = lazy(() => import("@/app/routes/professional/ProfessionalSignup").then((module) => ({ default: module.ProfessionalSignup })));
const ProfessionalApply = lazy(() => import("@/app/routes/professional/ProfessionalApply").then((module) => ({ default: module.ProfessionalApply })));
const ProfessionalDashboard = lazy(() => import("@/app/routes/professional/ProfessionalDashboard").then((module) => ({ default: module.ProfessionalDashboard })));

function App() {
  return (
    <BrowserRouter>
      <VercelObservability />
      <AuthProvider>
        <ScrollToTop />
        <Splash />
        <SiteTransitionProvider>
          <Suspense fallback={<div role="status" aria-label="Loading page" className="min-h-screen bg-[#F6F6F3]" />}>
            <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="career" element={<Career />} />
              <Route path="programs" element={<Programs />} />
              <Route path="programs/engineering" element={<EngineeringProgram />} />
              <Route path="programs/engineering/:classSlug/:batchSlug" element={<ClassDetail />} />
              <Route path="programs/engineering/:batchId" element={<ClassDetail />} />
              <Route path="programs/:streamId" element={<ComingSoon />} />
              <Route path="mentorship" element={<Mentorship />} />
              <Route path="stories" element={<StudentStories />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="contact" element={<Contact />} />
              <Route path="apply" element={<Apply />} />
              <Route path="application-success" element={<ApplicationSuccess />} />
              <Route path="login" element={<Login />} />
              <Route path="forgot-password" element={<Login />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="student-portal" element={<StudentPortal />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="accessibility" element={<Accessibility />} />
            </Route>

            <Route path="/professional" element={<ProfessionalLayout />}>
              <Route index element={<ProfessionalHome />} />
              <Route path="programs" element={<ProfessionalPrograms />} />
              <Route path="programs/:courseSlug" element={<ProfessionalCourseDetail />} />
              <Route path="about" element={<ProfessionalAbout />} />
              <Route path="career" element={<ProfessionalCareer />} />
              <Route path="mentors" element={<ProfessionalMentors />} />
              <Route path="faq" element={<ProfessionalFAQ />} />
              <Route path="contact" element={<ProfessionalContact />} />
              <Route path={PROFESSIONAL_LOGIN_ROUTE.slice("/professional/".length)} element={<ProfessionalLogin />} />
              <Route path={PROFESSIONAL_SIGNUP_ROUTE.slice("/professional/".length)} element={<ProfessionalSignup />} />
              <Route path={PROFESSIONAL_FORGOT_PASSWORD_ROUTE.slice("/professional/".length)} element={<ProfessionalLogin />} />
              <Route path="apply" element={<ProfessionalApply />} />
              <Route path="apply/success" element={<ProfessionalApplicationSuccess />} />
              <Route path="dashboard" element={<ProfessionalDashboard />} />
            </Route>
            </Routes>
          </Suspense>
        </SiteTransitionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
