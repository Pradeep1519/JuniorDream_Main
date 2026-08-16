import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { ContactForm } from "@/components/forms/ContactForm";

export function Contact() {
  return (
    <Container className="py-20">
      <SectionTitle
        label="Contact Us"
        title="Get in <em>Touch</em>"
        description="Have questions? We'd love to hear from you. Reach out to us anytime."
      />

      <div className="grid md:grid-cols-2 gap-12 mt-12">
        <ContactForm />
        <div>
          <h3 className="text-lg font-semibold mb-4">Visit Us</h3>
          <p className="text-foreground/70">123 Education Hub,<br />New Delhi, India</p>
          
          <h3 className="text-lg font-semibold mt-6 mb-4">Contact Info</h3>
          <p className="text-foreground/70">Email: info@junior-dream.com</p>
          <p className="text-foreground/70">Phone: +91 12345 67890</p>
          
          <h3 className="text-lg font-semibold mt-6 mb-4">Working Hours</h3>
          <p className="text-foreground/70">Mon-Fri: 9:00 AM - 6:00 PM</p>
          <p className="text-foreground/70">Sat-Sun: Closed</p>
        </div>
      </div>
    </Container>
  );
}