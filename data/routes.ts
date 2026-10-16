export const slugs: Record<string, string> = {
  aws: 'aws-assistant',
  deploy: 'deployforge-ai',
  audience: 'audiencelens-ai',
  patient: 'patientscope',
  query: 'querybridge',
  jobs: 'ai-job-search-agent',
  travel: 'wayfinderai',
  rbac: 'fastapi-rbac',
};
export const casePath = (id: string) => `/work/${slugs[id]}/`;
