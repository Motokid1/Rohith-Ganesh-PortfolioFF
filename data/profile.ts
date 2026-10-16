export const contact = {
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'rohithganesh.adigopula@gmail.com',
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ||
    'https://www.linkedin.com/in/rohith-4716a2210/',
  github: 'https://github.com/Motokid1',
  booking: process.env.NEXT_PUBLIC_BOOKING_URL,
  endpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT,
  available: process.env.NEXT_PUBLIC_AVAILABILITY === 'open',
};

export const certifications = [
  'AWS Certified Cloud Practitioner',
  'AWS Certified AI Practitioner',
  'AWS Certified Solutions Architect – Associate',
  'Databricks Certified Generative AI Developer',
  'Claude Certified Architect — Foundations',
];
