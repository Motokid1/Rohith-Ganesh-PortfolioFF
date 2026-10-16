export type Project = {
  id: string;
  title: string;
  fullTitle?: string;
  subtitle: string;
  category: string;
  repo?: string;
  live?: string;
  color: string;
  status: string;
  problem: string;
  solution: string;
  tech: string[];
  flow: string[];
  features: string[];
  limits: string;
  proof: string;
};

export const projects: Project[] = [
  {
    id: 'aws',
    title: 'AWS Assistant',
    subtitle: 'Cloud intelligence, through MCP.',
    category: 'Cloud / MCP / Serverless',
    repo: 'AWS-Assistant',
    color: '#A56B4F',
    status: 'MCP-only serverless deployment',
    problem:
      'Cloud visibility is scattered across services, security settings and operational metrics.',
    solution:
      'A structured MCP interface lets compatible AI clients inspect cloud costs, security hygiene and operational conditions.',
    tech: [
      'Python',
      'AWS Lambda',
      'MCP',
      'FastMCP',
      'API Gateway',
      'DynamoDB',
      'Bedrock',
      'EventBridge',
      'SNS',
      'SQS',
      'CloudWatch',
      'IAM',
      'Secrets Manager',
      'CloudFormation',
      'AWS SAM',
    ],
    flow: [
      'MCP Client',
      'Python Bridge',
      'API Gateway',
      'FastMCP Lambda',
      'AWS APIs',
      'DynamoDB Reports',
    ],
    features: [
      '20 documented MCP tools',
      'Cost forecasts and anomaly inspection',
      'IAM, public S3 and security group checks',
      'Asynchronous multi-region account scans',
      'Bedrock explanations and SNS notifications',
    ],
    limits:
      'Active deployment uses bearer authentication and MCP. Dashboard, OAuth and cross-account modules are inactive references. Tool responses may have partial coverage; synchronous reports can time out.',
    proof:
      'Repository-reported verification: 66 passing regression tests, 14 October 2026.',
  },
  {
    id: 'patient',
    title: 'PatientScope',
    subtitle: 'Every answer needs evidence.',
    category: 'Healthcare AI / RAG / Privacy',
    repo: 'PatientScope',
    color: '#92A596',
    status: 'Development and research prototype',
    problem:
      'Medical information is spread across reports, prescriptions and consultation records.',
    solution:
      'Authenticated patients can ask questions about their own uploaded records and receive document-grounded answers with source references.',
    tech: [
      'Python',
      'FastAPI',
      'React',
      'Vite',
      'LangGraph',
      'Groq',
      'MongoDB Atlas',
      'MongoDB Vector Search',
      'Hugging Face',
      'Embeddings',
      'JWT',
      'Argon2',
      'Presidio',
      'spaCy',
    ],
    flow: [
      'JWT Identity',
      'Document Upload',
      'Extract & Mask',
      'Chunk & Embed',
      'Atlas Retrieval',
      'Ownership Check',
      'LangGraph',
      'Groq',
      'Verify & Cite',
    ],
    features: [
      'Patient-scoped retrieval and ownership rechecks',
      'PDF, DOCX and TXT ingestion',
      'Citation, numeric and factual-support validation',
      'Bounded query rewriting and insufficient-evidence fallback',
      'Source-aware summaries and stage timings',
    ],
    limits:
      'Not clinically validated. Production privacy and security assessment remains incomplete. Masking does not guarantee full de-identification. No OCR or persistent chat history.',
    proof:
      'Historical snapshot, 7 October 2026: 93 backend tests passed; one optional live test skipped; 10 frontend tests passed. Development browser and synthetic classification checks.',
  },
  {
    id: 'query',
    title: 'QueryBridge',
    subtitle: 'Plain English. Validated SQL.',
    category: 'Agentic Analytics / Local LLMs',
    repo: 'QueryBridge',
    color: '#8CA9B2',
    status: 'Local single-user application',
    problem:
      'Business users need answers from data without writing SQL, while unconstrained generation can produce unsafe or incorrect queries.',
    solution:
      'Natural language becomes schema-aware, validated read-only SQL, with results, explanations and chart-ready output.',
    tech: [
      'Python',
      'FastAPI',
      'React',
      'Vite',
      'LangGraph',
      'Ollama',
      'Qwen2.5-Coder 3B',
      'nomic-embed-text',
      'SQLGlot',
      'MySQL',
      'SQLite',
      'CSV',
      'Text-to-SQL',
    ],
    flow: [
      'Guard',
      'Retrieve Schema',
      'Ollama Generate',
      'SQLGlot Validate',
      'Read-only Execute',
      'Respond',
    ],
    features: [
      'Registered datasets and approved table/column policies',
      'SQL AST validation, row limits and execution timeouts',
      'Bounded retries, query history and feedback',
      'Frozen snapshots and reference SQL evaluation',
      'Local model-profile experimentation',
    ],
    limits:
      'Local single-user app, not an internet-hosted multi-tenant SaaS. Three total attempts; no cross-dataset joins or persistent agent memory. Held-out accuracy is unverified.',
    proof:
      'Implemented evaluation harness compares generated results with independently executed reference SQL. No benchmark accuracy claimed.',
  },
  {
    id: 'deploy',
    title: 'DeployForge AI',
    fullTitle:
      'AI-Based Automated Cloud Deployment and Infrastructure Generation System',
    subtitle: 'From application source to a cloud blueprint.',
    category: 'Cloud / DevOps / Generative AI',
    repo: undefined,
    live: undefined,
    color: '#A56B4F',
    status: 'Owner-supplied specification · synthetic demo',
    problem:
      'Preparing containers, infrastructure, permissions and health checks can make application deployment difficult for teams without dedicated DevOps expertise.',
    solution:
      'The supplied project specification describes AI-assisted source analysis, generated Docker and Terraform artifacts, security checks, AWS provisioning and deployment verification.',
    tech: [
      'Python',
      'FastAPI',
      'React',
      'Vite',
      'LLM APIs',
      'Docker',
      'Docker Compose',
      'Terraform',
      'EC2',
      'AWS VPC',
      'IAM',
      'Security Groups',
      'AWS CLI',
      'Trivy',
      'Checkov',
    ],
    flow: [
      'Source Input',
      'Code Analysis',
      'Generate Artifacts',
      'Validate',
      'Security Scan',
      'Terraform Plan',
      'AWS EC2',
      'Deploy',
      'Health Verification',
      'Estimated Cost',
    ],
    features: [
      'Specified repository, ZIP and local-folder inputs',
      'Specified Dockerfile, Compose and Terraform generation',
      'Specified Trivy container scanning and Checkov IaC checks',
      'Specified AWS VPC, subnet, internet gateway, security group and EC2 provisioning',
      'Specified deployment health checks, estimated costs and summary reports',
    ],
    limits:
      'Source repository and implementation evidence have not been supplied. The public simulator uses a fixed fictional repository, performs no source analysis or cloud deployment, and accepts no AWS credentials. Arbitrary-repository reliability, deployment success and scan coverage are unverified.',
    proof:
      'Owner-supplied V4 project specification. DeployForge AI is a proposed presentation name. No measured deployment results, tests, cost savings or paid client outcomes claimed.',
  },
  {
    id: 'audience',
    title: 'AudienceLens AI',
    fullTitle:
      'YouTube Audience Intelligence & Multilingual Sentiment Analytics Platform',
    subtitle: 'Find the meaning behind audience feedback.',
    category: 'Data Intelligence / NLP / Audience Analytics',
    repo: undefined,
    live: undefined,
    color: '#92A596',
    status: 'Owner-supplied specification · synthetic demo',
    problem:
      'Large volumes of multilingual comments make it difficult to understand audience sentiment, recurring topics and the reasons behind feedback.',
    solution:
      'The supplied specification describes YouTube comment collection, multilingual sentiment and emotion analysis, semantic search, topic modeling, explainability and an analytics dashboard.',
    tech: [
      'Python',
      'YouTube Data API',
      'XLM-RoBERTa',
      'SentenceTransformers',
      'FAISS',
      'BERTopic',
      'SHAP',
      'Integrated Gradients',
      'Streamlit',
      'Plotly',
      'Pandas',
      'NLP',
    ],
    flow: [
      'YouTube Data API',
      'Paginated Comments',
      'Preprocess',
      'Sentiment & Emotions',
      'Sentence Embeddings',
      'FAISS Search',
      'BERTopic',
      'Explainability',
      'Streamlit Dashboard',
    ],
    features: [
      'Specified metadata/comment collection with quota and pagination handling',
      'Specified multilingual XLM-RoBERTa sentiment analysis',
      'Specified sentence embeddings, FAISS similarity search and BERTopic themes',
      'Specified SHAP and Integrated Gradients explanations',
      'Specified audience score, Streamlit/Plotly dashboard, evaluation and ablation studies',
    ],
    limits:
      'Source repository, model outputs, evaluation data and the project score formula have not been supplied. The public studio uses manually labeled fictional comments and a separately identified demo score. It does not connect to YouTube, run NLP models, provide causal explanations or claim measured accuracy.',
    proof:
      'Owner-supplied V4 project specification. AudienceLens AI is a proposed presentation name. Public charts and token weights are illustrative; no live statistics, benchmark performance or business outcomes claimed.',
  },
  {
    id: 'jobs',
    title: 'AI Job Search Agent',
    subtitle: 'A clearer path to the next role.',
    category: 'Full-stack AI / Employment',
    repo: 'AI-Job-Search-Agent',
    live: 'https://ai-job-search-agent-ui.onrender.com',
    color: '#A56B4F',
    status: 'Repository-documented application / prototype',
    problem:
      'Job discovery, resume analysis and application tracking are fragmented.',
    solution:
      'An AI-assisted employment platform combines job discovery, resume analysis and selected-job matching. Tracking and auto-application are documented future enhancements.',
    tech: [
      'React',
      'Vite',
      'Python',
      'FastAPI',
      'LangChain',
      'Groq',
      'Tavily',
      'Hugging Face',
      'Embeddings',
      'REST APIs',
    ],
    flow: [
      'Resume',
      'Two Search Queries',
      'Up to Six Jobs',
      'Selected Job Crawl',
      'Deep Matching',
      'Recommendations',
    ],
    features: [
      'Resume-related workflows',
      'Tavily job discovery with two search queries and at most six jobs',
      'Deep crawling and matching for a selected job',
      'LangChain LCEL orchestration and Groq inference',
    ],
    limits:
      'Auto Apply Assistant, Job Tracker Dashboard and resume rewriting are future enhancements. Chroma writes are disabled by default. Autonomous Playwright applications are not supported; current deployed-app uptime was not verified.',
    proof:
      'Repository README inspected during V4 preparation. No tests were executed, no outcome metrics claimed, and current live-app uptime remains unverified.',
  },
  {
    id: 'travel',
    title: 'WayFinderAI',
    subtitle: 'Preferences become possibilities.',
    category: 'AI Travel / Product Engineering',
    repo: 'WayFinderAI',
    live: 'https://wayfinderai-ui.onrender.com',
    color: '#92A596',
    status: 'Repository-documented application / prototype',
    problem: 'Turning travel preferences into a coherent itinerary takes time.',
    solution:
      'An intelligent planning experience turns natural-language requirements into structured, personalized itineraries.',
    tech: [
      'Python',
      'FastAPI',
      'React',
      'LangGraph',
      'Groq',
      'Hugging Face',
      'ChromaDB',
      'MongoDB',
      'LangSmith',
      'OpenStreetMap',
      'Full-Stack Development',
      'REST APIs',
    ],
    flow: [
      'Preferences',
      'LangGraph',
      'City-guide RAG',
      'Weather & Places',
      'Budget Estimates',
      'Structured Itinerary',
    ],
    features: [
      'Controlled LangGraph planning and city-guide retrieval',
      'Weather, news and OpenStreetMap Overpass places',
      'Deterministic budget estimates',
      'Groq inference, MongoDB operational data and LangSmith tracing',
    ],
    limits:
      'Hotel and transport prices are estimates, not live booking prices. Google Places, user accounts, trip history, exports and specialized multi-agent upgrades are future work. External data and city-guide coverage may be incomplete.',
    proof:
      'Repository README inspected during V4 preparation. No repository tests were executed; live deployment health was not verified.',
  },
  {
    id: 'rbac',
    title: 'FastAPI RBAC',
    subtitle: 'Access is an architectural decision.',
    category: 'Backend / API Security',
    repo: 'FastAPI---RBAC',
    color: '#8CA9B2',
    status: 'Repository-documented application / prototype',
    problem:
      'Authenticated users should only access the actions and data their role permits.',
    solution:
      'A FastAPI backend demonstrates JWT authentication, role-based authorization and protected REST endpoints.',
    tech: [
      'Python',
      'FastAPI',
      'MySQL',
      'SQLAlchemy',
      'Pydantic',
      'JWT',
      'bcrypt',
      'RBAC',
      'REST APIs',
      'Authentication',
      'Authorization',
    ],
    flow: ['Sign In', 'JWT Identity', 'Role Policy', 'Protected Endpoint'],
    features: [
      'JWT authentication with bcrypt password handling',
      'Single role per user, administrator CRUD and delegation',
      'Authenticated profile and protected endpoints',
      '401 for invalid identity and 403 for insufficient privileges',
    ],
    limits:
      'Backend foundation, not an enterprise security certification. Permission-level policies, refresh tokens, audit logs, migrations, Docker, pytest unit tests and deployment are documented future improvements.',
    proof:
      'Repository README inspected during V4 preparation. No repository tests were executed; live deployment health was not verified.',
  },
];
