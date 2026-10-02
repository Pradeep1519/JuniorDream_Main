import { Link, useParams } from "react-router";
import { ArrowRight } from "lucide-react";
import { getProfessionalCourseBySlug } from "@/data/professionalCourses";
import { Container } from "@/components/common/Container";
import { DataAnalystCourse } from "@/app/routes/professional/DataAnalystCourse";

export function ProfessionalCourseDetail() {
  const { courseSlug } = useParams();
  const course = getProfessionalCourseBySlug(courseSlug ?? "");

  if (!course) {
    return (
      <Container className="py-20">
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Professional program</p>
        <h1 className="mt-3 text-4xl font-light text-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Course not found</h1>
        <Link to="/professional/programs" className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-black underline underline-offset-4">Back to programs <ArrowRight size={14} aria-hidden="true" /></Link>
      </Container>
    );
  }

  return <DataAnalystCourse courseSlug={course.slug} />;
}

export default ProfessionalCourseDetail;
