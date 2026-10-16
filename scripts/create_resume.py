from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from pathlib import Path
import pypdfium2 as pdfium
from pypdf import PdfReader
project=Path(__file__).resolve().parents[1]
root=project/'public'
preview=project/'.resume-preview'
preview.mkdir(exist_ok=True)
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='NameR',fontName='Times-Roman',fontSize=30,leading=32,textColor=colors.HexColor('#202421')))
styles.add(ParagraphStyle(name='TitleR',fontName='Helvetica',fontSize=9,leading=13,textColor=colors.HexColor('#A56B4F')))
styles.add(ParagraphStyle(name='BodyR',fontName='Helvetica',fontSize=8.1,leading=11.1,spaceAfter=5,textColor=colors.HexColor('#202421')))
styles.add(ParagraphStyle(name='SectionR',fontName='Helvetica-Bold',fontSize=9,leading=12,spaceBefore=10,spaceAfter=5,textColor=colors.HexColor('#A56B4F')))
styles.add(ParagraphStyle(name='ProjectR',fontName='Helvetica-Bold',fontSize=8.5,leading=12,spaceAfter=3))
summary='AI and software engineer focused on agentic workflows, secure RAG, MCP-connected cloud tools, guarded data analytics and full-stack applications. Combines Python, LangGraph, AWS and React with explicit access boundaries and evidence checks. Portfolio includes documented systems and source-unverified cloud deployment and NLP specifications.'
entries=[["AWS Assistant","AWS-Assistant","MCP-only AWS inspection service: 20 documented tools, authenticated Python bridge, FastMCP Lambda, API Gateway, DynamoDB and event-driven scans.","Historical repository verification, 14 October 2026: 66 regression tests passed. Dashboard, OAuth and cross-account modules are inactive."],["PatientScope","PatientScope","Patient-isolated RAG prototype: FastAPI, LangGraph, Groq and Atlas Vector Search with JWT scope, ownership rechecks and source verification.","Development prototype; no clinical validation. Historical 7 October snapshot: 93 backend passed, one optional live skipped, 10 frontend passed."],["QueryBridge","QueryBridge","Local single-user Text-to-SQL app: Ollama, LangGraph, SQLGlot, read-only policies, bounded retries and reference-query evaluation on frozen data.","No benchmark accuracy or multi-tenant production readiness claimed. Final held-out outcomes are unverified."],["DeployForge AI",None,"Owner-supplied specification for AI-assisted source analysis, Docker/Terraform generation, security scans and AWS deployment validation.","Proposed display name. Full title: AI-Based Automated Cloud Deployment and Infrastructure Generation System. Source and implementation verification pending; portfolio simulation performs no deployment."],["AudienceLens AI",None,"Owner-supplied specification for YouTube comments, multilingual NLP, topic discovery, semantic search and explainable audience analytics.","Proposed display name. YouTube Audience Intelligence & Multilingual Sentiment Analytics Platform. Source, measured evaluation and project score formula unavailable; portfolio uses synthetic data."],["AI Job Search Agent","AI-Job-Search-Agent","FastAPI, LangChain LCEL, Groq, Tavily and React/Vite for resume-related job discovery and selected-job deep matching.","Tracking, resume rewriting and auto-application are future enhancements. No autonomous application feature or current uptime claimed."],["WayFinderAI","WayFinderAI","LangGraph travel planning with city-guide RAG, Groq, weather/news, OpenStreetMap places and estimated budgets.","Live hotel/transport booking prices are not supplied. Accounts, trip history, exports and multi-agent upgrades are future work."],["FastAPI RBAC","FastAPI---RBAC","FastAPI/MySQL backend with JWT/bcrypt identity, one role per user, administrator CRUD/delegation and protected endpoints.","Backend foundation. Refresh tokens, audit logging, migrations, pytest and deployment are future improvements; no independent security certification claimed."]]

def p(text,style='BodyR'): return Paragraph(text,styles[style])
def header():return [p('ROHITH GANESH','NameR'),p('AI Engineer | Agentic AI &amp; MCP Developer | Cloud Automation Engineer | Full-Stack Developer','TitleR'),Spacer(1,8),p('<link href="mailto:rohithganesh.adigopula@gmail.com">rohithganesh.adigopula@gmail.com</link> | <link href="https://github.com/Motokid1">GitHub: Motokid1</link> | <link href="https://www.linkedin.com/in/rohith-4716a2210/">LinkedIn</link>'),p('PROFESSIONAL SUMMARY','SectionR'),p(summary)]
def skills():return [p('FREELANCE SPECIALIZATIONS','SectionR'),p('AI agents, RAG, MCP, AWS serverless, deployment tooling, NLP/audience analytics, Text-to-SQL, APIs, full-stack applications and workflow automation.'),p('TECHNICAL SKILLS','SectionR'),p('<b>AI:</b> Python, LangGraph, LangChain, RAG, MCP, LLM tool calling, Groq, Ollama, Hugging Face, embeddings, vector search, guardrails, evaluation; NLP specifications: XLM-RoBERTa, BERTopic, FAISS, SHAP.'),p('<b>Backend / frontend:</b> FastAPI, Java, Spring Boot, REST APIs, JWT, RBAC, React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Three.js.'),p('<b>Cloud / data:</b> AWS Lambda, API Gateway, S3, DynamoDB, IAM, CloudWatch, Bedrock, EventBridge, SNS, SQS, AWS SAM, CloudFormation, Terraform, Docker, Docker Compose, AWS CLI, Trivy, Checkov; MongoDB Atlas, MySQL, PostgreSQL, SQLite, ChromaDB, SQLGlot.'),p('<b>Engineering:</b> System design, algorithms, data structures, testing, debugging, code review, refactoring, Git and GitHub. Additional knowledge: Rust and basic C++.')]
def experience():return [p('EXPERIENCE &amp; EDUCATION','SectionR'),p('<b>Systems Engineer - Tata Consultancy Services</b> | Current<br/>Focus: AI applications, backend development and software engineering.'),p('<b>Java Intern - Cognizant</b> | January-July 2025'),p('<b>B.Tech, Computer Science and Engineering - KL University</b> | 2021-2025')]
def credentials():return [p('CREDENTIALS','SectionR'),p('AWS Certified Cloud Practitioner; AWS Certified AI Practitioner; AWS Certified Solutions Architect - Associate; Databricks Certified Generative AI Developer; Claude Certified Architect - Foundations.'),p('Credentials supplied by owner; verification links were not supplied.')]
def footer(canvas,doc):canvas.setStrokeColor(colors.HexColor('#A56B4F'));canvas.line(38,32,557,32);canvas.setFont('Helvetica',7);canvas.setFillColor(colors.HexColor('#697169'));canvas.drawString(38,21,'ROHITH GANESH / THE BUILDER\'S DNA');canvas.drawRightString(557,21,str(doc.page))
for expanded,name in [(False,'Rohith-Ganesh-Resume.pdf'),(True,'Rohith-Ganesh-Resume-Expanded.pdf')]:
 styles['BodyR'].fontSize=9 if expanded else 8.1
 styles['BodyR'].leading=12.7 if expanded else 11.1
 styles['ProjectR'].fontSize=9.2 if expanded else 8.5
 story=header()+skills()
 if expanded:story+=[p('ADDITIONAL PROJECTS','SectionR'),p('<link href="https://github.com/Motokid1/AI-Job-Search-Agent">AI Job Search Agent</link> - job discovery and matching; <link href="https://github.com/Motokid1/WayFinderAI">WayFinderAI</link> - AI-assisted travel planning; <link href="https://github.com/Motokid1/FastAPI---RBAC">FastAPI RBAC</link> - protected APIs.')]+experience()+credentials()+[PageBreak(),p('SELECTED ENGINEERING PROJECTS','NameR'),p('Documented repositories and owner-supplied specifications.','TitleR'),Spacer(1,15)]
 else:story+=[p('SELECTED PROJECTS','SectionR')]
 for i,(title,repo,desc,proof) in enumerate(entries):
  text=desc if expanded or i<3 else desc.split('.')[0]+'.'
  if not expanded and i>=5:continue
  if not expanded and i==3:text='Owner specification: AI-assisted Docker/Terraform generation and AWS deployment validation. Source verification pending.'
  if not expanded and i==4:text='Owner specification: YouTube sentiment, topic, semantic-search and audience analytics. Source verification pending.'
  block=[p(f'<link href="https://github.com/Motokid1/{repo}">{title}</link>' if repo else title,'ProjectR'),p(text)]
  if expanded:block+=[p(proof)]
  story += [KeepTogether(block)]
 if not expanded:story+=experience()+credentials()
 SimpleDocTemplate(str(root/name),pagesize=(595.28,841.89),rightMargin=38,leftMargin=38,topMargin=32,bottomMargin=42,title='Rohith Ganesh - Engineering Resume',author='Rohith Ganesh').build(story,onFirstPage=footer,onLaterPages=footer)
 doc=pdfium.PdfDocument(str(root/name))
 reader=PdfReader(root/name)
 print(name,'pages',len(doc),'text_chars',sum(len(x.extract_text()) for x in reader.pages))
 for i,page in enumerate(doc):page.render(scale=1.3).to_pil().save(str(preview/f'{name}-{i+1}.png'))

