export type Comment = {
  id: string;
  text: string;
  translation?: string;
  language: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  emotion: string;
  topic: string;
  week: number;
  likes: number;
  constructive: boolean;
  question: boolean;
  tags: string[];
};
export const datasets: Record<
  string,
  { title: string; channel: string; comments: Comment[] }
> = {
  tutorial: {
    title: 'Building an AI assistant — fictional tutorial',
    channel: 'Engineering Notebook · fictional channel',
    comments: [
      {
        id: 'T01',
        text: 'The architecture explanation is clear and useful.',
        language: 'English',
        sentiment: 'positive',
        emotion: 'appreciation',
        topic: 'Architecture',
        week: 1,
        likes: 12,
        constructive: true,
        question: false,
        tags: ['architecture', 'clear', 'helpful', 'diagram'],
      },
      {
        id: 'T02',
        text: 'Muy útil, ¿puedes explicar la autenticación?',
        translation: 'Very useful, can you explain authentication?',
        language: 'Spanish',
        sentiment: 'positive',
        emotion: 'curiosity',
        topic: 'Security',
        week: 1,
        likes: 7,
        constructive: true,
        question: true,
        tags: ['authentication', 'security', 'login', 'useful'],
      },
      {
        id: 'T03',
        text: 'The demo is slow on my laptop.',
        language: 'English',
        sentiment: 'negative',
        emotion: 'frustration',
        topic: 'Performance',
        week: 2,
        likes: 5,
        constructive: true,
        question: false,
        tags: ['slow', 'performance', 'latency', 'laptop'],
      },
      {
        id: 'T04',
        text: 'Can this run with a local model?',
        language: 'English',
        sentiment: 'neutral',
        emotion: 'curiosity',
        topic: 'Local models',
        week: 2,
        likes: 4,
        constructive: true,
        question: true,
        tags: ['local', 'ollama', 'model', 'offline'],
      },
      {
        id: 'T05',
        text: 'Très clair, merci pour les exemples.',
        translation: 'Very clear, thank you for the examples.',
        language: 'French',
        sentiment: 'positive',
        emotion: 'appreciation',
        topic: 'Architecture',
        week: 2,
        likes: 8,
        constructive: false,
        question: false,
        tags: ['clear', 'examples', 'helpful', 'architecture'],
      },
      {
        id: 'T06',
        text: 'The access boundary example helped me understand retrieval.',
        language: 'English',
        sentiment: 'positive',
        emotion: 'confidence',
        topic: 'Security',
        week: 3,
        likes: 10,
        constructive: true,
        question: false,
        tags: ['access', 'security', 'retrieval', 'understand'],
      },
      {
        id: 'T07',
        text: 'Please add a diagram for the deployment step.',
        language: 'English',
        sentiment: 'neutral',
        emotion: 'curiosity',
        topic: 'Deployment',
        week: 3,
        likes: 3,
        constructive: true,
        question: true,
        tags: ['deployment', 'cloud', 'diagram'],
      },
      {
        id: 'T08',
        text: 'Great explanation of how the pieces connect.',
        language: 'English',
        sentiment: 'positive',
        emotion: 'appreciation',
        topic: 'Architecture',
        week: 3,
        likes: 9,
        constructive: false,
        question: false,
        tags: ['architecture', 'connect', 'great', 'explanation'],
      },
    ],
  },
  release: {
    title: 'Cloud release diary — fictional update',
    channel: 'Engineering Notebook · fictional channel',
    comments: [
      {
        id: 'R01',
        text: 'The deployment checklist is useful.',
        language: 'English',
        sentiment: 'positive',
        emotion: 'appreciation',
        topic: 'Deployment',
        week: 1,
        likes: 8,
        constructive: true,
        question: false,
        tags: ['deployment', 'checklist', 'useful'],
      },
      {
        id: 'R02',
        text: 'The build timed out twice.',
        language: 'English',
        sentiment: 'negative',
        emotion: 'frustration',
        topic: 'Performance',
        week: 1,
        likes: 6,
        constructive: true,
        question: false,
        tags: ['build', 'timeout', 'slow', 'performance'],
      },
      {
        id: 'R03',
        text: '¿Qué permisos de IAM necesito?',
        translation: 'What IAM permissions do I need?',
        language: 'Spanish',
        sentiment: 'neutral',
        emotion: 'curiosity',
        topic: 'Security',
        week: 2,
        likes: 5,
        constructive: true,
        question: true,
        tags: ['iam', 'permissions', 'security'],
      },
      {
        id: 'R04',
        text: 'The Terraform example made the network easier to understand.',
        language: 'English',
        sentiment: 'positive',
        emotion: 'confidence',
        topic: 'Architecture',
        week: 2,
        likes: 9,
        constructive: true,
        question: false,
        tags: ['terraform', 'network', 'architecture'],
      },
      {
        id: 'R05',
        text: 'I could not reach the health endpoint.',
        language: 'English',
        sentiment: 'negative',
        emotion: 'frustration',
        topic: 'Deployment',
        week: 2,
        likes: 4,
        constructive: true,
        question: false,
        tags: ['health', 'endpoint', 'connectivity', 'deployment'],
      },
      {
        id: 'R06',
        text: 'Merci, la démonstration est utile.',
        translation: 'Thank you, the demonstration is useful.',
        language: 'French',
        sentiment: 'positive',
        emotion: 'appreciation',
        topic: 'Deployment',
        week: 3,
        likes: 7,
        constructive: false,
        question: false,
        tags: ['useful', 'demo', 'deployment'],
      },
      {
        id: 'R07',
        text: 'What happens if the region reaches its VPC limit?',
        language: 'English',
        sentiment: 'neutral',
        emotion: 'curiosity',
        topic: 'Architecture',
        week: 3,
        likes: 5,
        constructive: true,
        question: true,
        tags: ['vpc', 'limit', 'region', 'architecture'],
      },
      {
        id: 'R08',
        text: 'The retry explanation needs more detail.',
        language: 'English',
        sentiment: 'negative',
        emotion: 'frustration',
        topic: 'Performance',
        week: 3,
        likes: 3,
        constructive: true,
        question: false,
        tags: ['retry', 'detail', 'performance'],
      },
    ],
  },
};
export function score(comments: Comment[]) {
  const n = comments.length;
  const sentiment =
    (comments.reduce(
      (a, c) =>
        a +
        (c.sentiment === 'positive' ? 1 : c.sentiment === 'neutral' ? 0.5 : 0),
      0,
    ) /
      n) *
    100;
  const constructive =
    (comments.filter((c) => c.constructive).length / n) * 100;
  const nonQuestion = (comments.filter((c) => !c.question).length / n) * 100;
  return {
    sentiment,
    constructive,
    nonQuestion,
    total: sentiment * 0.5 + constructive * 0.3 + nonQuestion * 0.2,
  };
}
