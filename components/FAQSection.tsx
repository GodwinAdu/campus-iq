import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FAQSection = () => {
  const faqs = [
    {
      question: "What are the key features of the school management app?",
      answer:
        "Our app offers comprehensive features including student information management, attendance tracking, grade management, communication tools for parents and teachers, timetable management, and financial tracking.",
    },
    {
      question: "How do I install the app on my device?",
      answer:
        "After downloading, run the installer on desktop or open the app store on mobile. Follow the on-screen instructions to complete the installation. For detailed instructions, please refer to our installation guide.",
    },
    {
      question: "Is there a difference between the desktop and mobile versions?",
      answer:
        "While core functionalities are available on both platforms, the desktop version offers more advanced features for administrative tasks, while the mobile version focuses on quick access to essential information and communication features.",
    },
    {
      question: "How often is the app updated?",
      answer:
        "We release updates monthly for bug fixes and performance improvements. Major feature updates are typically released quarterly. All updates are free for current users.",
    },
    {
      question: "Is my data secure and backed up?",
      answer:
        "Yes, we use industry-standard encryption for all data transmissions and storage. Data is automatically backed up daily to secure cloud servers. You can also manually backup your data at any time from within the app.",
    },
    {
      question: "Can I use the app offline?",
      answer:
        "Yes, most features of the app work offline. Any changes made while offline will sync automatically when you're back online.",
    },
  ]

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default FAQSection

