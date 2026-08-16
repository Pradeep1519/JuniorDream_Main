import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqData } from "@/data/faq";

export function FAQSection() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqData.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-left font-medium hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-foreground/70 leading-relaxed">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}