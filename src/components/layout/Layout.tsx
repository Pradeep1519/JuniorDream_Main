import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isApplyPage = location.pathname === "/apply";
  const hideFooter = isApplyPage; // Footer hidden on apply page

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${isHome ? "" : "pt-[76px] md:pt-[76px] pt-[60px]"}`}>
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default Layout;