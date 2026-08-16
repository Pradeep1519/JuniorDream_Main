import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "@/components/layout/Layout";
import { Splash } from "@/components/layout/Splash";
import { Home } from "@/app/routes/Home";
import { About } from "@/app/routes/About";
import { Programs } from "@/app/routes/Programs";
import { EngineeringProgram } from "@/app/routes/EngineeringProgram";
import { ClassDetail } from "@/app/routes/ClassDetail";
import { ComingSoon } from "@/app/routes/ComingSoon";
import { Mentorship } from "@/app/routes/Mentorship";
import { StudentStories } from "@/app/routes/StudentStories";
import { FAQ } from "@/app/routes/FAQ";
import { Contact } from "@/app/routes/Contact";
import { Apply } from "@/app/routes/Apply";
import { Privacy } from "@/app/routes/Privacy";
import { Terms } from "@/app/routes/Terms";
import { Accessibility } from "@/app/routes/Accessibility";

function App() {
  return (
    <BrowserRouter>
      <Splash />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="programs" element={<Programs />} />
          <Route path="programs/engineering" element={<EngineeringProgram />} />
          <Route path="programs/engineering/:classNumber" element={<ClassDetail />} />
          <Route path="programs/:streamId" element={<ComingSoon />} />
          <Route path="mentorship" element={<Mentorship />} />
          <Route path="stories" element={<StudentStories />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="apply" element={<Apply />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="accessibility" element={<Accessibility />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
