import { Outlet, useLocation } from "react-router";
import { AICounsellor } from "@/components/ai/AICounsellor";
import { Header } from "./Header";
import { ProfessionalFooter } from "./ProfessionalFooter";
import { PROFESSIONAL_FORGOT_PASSWORD_ROUTE, PROFESSIONAL_LOGIN_ROUTE } from "@/lib/professionalRoutes";

export function ProfessionalLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === PROFESSIONAL_LOGIN_ROUTE || location.pathname === PROFESSIONAL_FORGOT_PASSWORD_ROUTE;
  const isProfessionalHome = location.pathname === "/professional";

  if (isAuthPage) {
    return <main className="min-h-screen"><Outlet /></main>;
  }

  return (
    <div className="min-h-screen bg-[#F6F6F3] text-black">
      <Header />
      <main className={`flex-1 ${isProfessionalHome ? "" : "pt-[60px] md:pt-[76px]"}`}>
        <Outlet />
      </main>
      <ProfessionalFooter />
      <AICounsellor />
    </div>
  );
}
