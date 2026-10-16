export const services = [
  {
    name: 'AI & agentic AI development',
    problem: 'Business decisions and tools need a coherent workflow.',
    direction: 'Bounded agents with explicit tools, identity and evaluation.',
    deliverables:
      'Agent workflow, tool contracts, evaluation cases, operations guide',
    proof: ['patient', 'query', 'aws'],
    architecture:
      'User interface → agent graph → scoped tools → verified response',
    technologies: ['Python', 'LangGraph', 'FastAPI', 'LLMs'],
    questions:
      'What actions should the agent take? Which require human approval?',
  },
  {
    name: 'RAG & document intelligence',
    problem: 'Answers are buried in documents and access policies.',
    direction:
      'Scoped ingestion, semantic retrieval and source-grounded answers.',
    deliverables:
      'Ingestion pipeline, retrieval API, access policy, citation interface',
    proof: ['patient'],
    architecture:
      'Authentication → documents → vector retrieval → evidence checks → answer',
    technologies: ['FastAPI', 'LangGraph', 'MongoDB Atlas', 'Embeddings'],
    questions:
      'Who owns the documents? What must remain private? What evidence is sufficient?',
  },
  {
    name: 'AWS cloud & MCP engineering',
    problem: 'AI clients need inspectable cloud tools and operational signals.',
    direction:
      'Authenticated MCP interfaces, serverless tools and scheduled inspections.',
    deliverables: 'MCP server, tool schemas, infrastructure templates, runbook',
    proof: ['aws'],
    architecture:
      'MCP client → authenticated bridge → Lambda tools → cloud APIs',
    technologies: ['Python', 'FastMCP', 'AWS Lambda', 'API Gateway'],
    questions:
      'Which accounts and regions are in scope? What permissions are approved?',
  },
  {
    name: 'Cloud deployment & DevOps automation',
    problem: 'Container and infrastructure setup slows application delivery.',
    direction:
      'Source review, generated artifacts, security scanning and validated deployment workflows.',
    deliverables:
      'Docker configuration, Terraform plan, validation checks, deployment documentation',
    proof: ['deploy'],
    architecture:
      'Source → analysis → Docker/Terraform → security review → approved deployment',
    technologies: ['Docker', 'Terraform', 'AWS', 'Trivy', 'Checkov'],
    questions:
      'Which frameworks are supported? Who approves provisioning? What region, budget and IAM limits apply?',
  },
  {
    name: 'NLP & social media analytics',
    problem: 'Feedback volumes obscure audience sentiment and themes.',
    direction:
      'Authorized collection, multilingual NLP, topic analysis and transparent dashboards.',
    deliverables:
      'Comment ingestion, analysis pipeline, dashboard, evaluation plan',
    proof: ['audience'],
    architecture:
      'Authorized comments → preprocessing → NLP/embeddings → analytics dashboard',
    technologies: [
      'YouTube Data API',
      'XLM-RoBERTa',
      'BERTopic',
      'FAISS',
      'Streamlit',
    ],
    questions:
      'Which data is authorized? Which languages matter? How will labels and score formulas be validated?',
  },
  {
    name: 'AI-powered data analytics',
    problem: 'Teams need structured-data answers without writing SQL.',
    direction:
      'Approved schemas, guarded local generation and reference-query evaluation.',
    deliverables:
      'Dataset policy, query API, analytics interface, evaluation harness',
    proof: ['query'],
    architecture:
      'Question → approved schema → SQL generation → AST validation → read-only results',
    technologies: ['Ollama', 'LangGraph', 'SQLGlot', 'SQLite'],
    questions:
      'Which tables are approved? Which queries define acceptance? Must inference remain local?',
  },
  {
    name: 'Full-stack web development',
    problem: 'A product idea needs an integrated, usable first release.',
    direction:
      'React interfaces, backend services and clear API/data boundaries.',
    deliverables:
      'Frontend, backend, API integrations, deployment and handover',
    proof: ['jobs', 'travel', 'query', 'patient'],
    architecture: 'React interface → API service → database/integrations',
    technologies: ['React', 'Next.js', 'FastAPI', 'REST APIs'],
    questions:
      'Who are the users? What is the smallest valuable release? Which integrations are required?',
  },
  {
    name: 'Secure backend & API development',
    problem: 'Sensitive actions need reliable identity and access controls.',
    direction:
      'Authentication, role policies, protected APIs and meaningful failure handling.',
    deliverables:
      'JWT identity, RBAC policies, database integration, API documentation',
    proof: ['rbac', 'patient'],
    architecture:
      'Validated identity → role/ownership policy → protected endpoint',
    technologies: ['FastAPI', 'JWT', 'RBAC', 'Pydantic'],
    questions:
      'Which roles exist? Who owns each record? What audit and lifecycle requirements apply?',
  },
];

export const phases = [
  [
    'Requirement Discovery',
    'A scoped brief, user journeys and acceptance criteria.',
    'Which problem matters most?',
  ],
  [
    'Architecture & Planning',
    'System diagram, data boundaries and technical choices.',
    'What should the first release include?',
  ],
  [
    'Prototype Development',
    'A working proof of the riskiest interaction.',
    'Does the proposed approach work?',
  ],
  [
    'Feature Implementation',
    'Integrated features and reviewable increments.',
    'Do workflows meet the agreed requirements?',
  ],
  [
    'Security & Quality',
    'Access checks, meaningful tests and failure handling.',
    'Where can the system fail safely?',
  ],
  [
    'Deployment & Validation',
    'Environment configuration and deployment checks.',
    'Is the release ready for its intended setting?',
  ],
  [
    'Documentation & Handover',
    'Runbooks, source documentation and ownership transfer.',
    'Can your team operate and extend it?',
  ],
];
