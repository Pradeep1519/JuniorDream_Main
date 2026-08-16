import { useState } from "react";
import { Button } from "@/components/common/Button";

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block" style={{ fontFamily: "'Inter', Helvetica, Arial, sans-serif" }}>
          Your Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-black/20 bg-input-background"
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block" style={{ fontFamily: "'Inter', Helvetica, Arial, sans-serif" }}>
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-black/20 bg-input-background"
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block" style={{ fontFamily: "'Inter', Helvetica, Arial, sans-serif" }}>
          Message
        </label>
        <textarea
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-black/20 bg-input-background resize-none"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
}