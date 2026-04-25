export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "Can I vote if I am a student living in a dorm?",
    answer: "Yes! You can register using your dorm address. You'll just need to provide the specific building and room number."
  },
  {
    question: "Can I be registered in two places?",
    answer: "No. You must choose one: either your hometown or your school address. It is illegal to be registered in two places at once."
  },
  {
    question: "What if my student ID doesn't have an expiration date?",
    answer: "Many states require an expiration date for an ID to be valid for voting. If yours doesn't have one, you might need to use a passport or other state ID."
  },
  {
    question: "Do I need to re-register every year?",
    answer: "Only if you move! If you move to a new dorm or apartment, you need to update your registration with your new address."
  },
  {
    question: "How do I get a mail-in ballot if I'm at school?",
    answer: "If you're registered at home, you must 'Request an Absentee Ballot' from your home county's election website. They will mail it to your school address."
  }
];
