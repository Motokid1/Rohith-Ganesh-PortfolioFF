'use client';
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Menu,
  Plus,
  ShieldCheck,
  X,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Inquiry from '../components/Inquiry';
import SkillConnections from '../components/SkillConnections';
import WorkSection from '../components/WorkSection';
import {
  certifications,
  contact,
  projects,
  skillGroups,
} from '../data/content';
const Reactor = dynamic(() => import('../components/Reactor'), {
  ssr: false,
  loading: () => (
    <div className="reactor-fallback">
      ◈<p>Assembling the identity reactor…</p>
    </div>
  ),
});
export default function Page() {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<number | null>(
    null,
  );
  const [skill, setSkill] = useState('MCP');
  const [group, setGroup] = useState(0);
  const skillEvidence: Record<string, string[]> = {
    RAG: ['patient', 'travel'],
    'Agentic AI': ['patient', 'query', 'travel'],
    'LLM Integration': ['patient', 'query', 'jobs', 'travel', 'deploy'],
    'AI Guardrails': ['patient', 'query'],
    'Tool Calling': ['aws'],
    'AI Evaluation': ['query'],
    'Vector Search': ['patient', 'travel'],
  };
  const related = projects.filter(
    (p) => p.tech.includes(skill) || skillEvidence[skill]?.includes(p.id),
  );
  function selectDiscipline(n: number) {
    setSelectedDiscipline(n);
    setFilter('');
    document.getElementById('work')?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  }
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <a href="#" className="brand">
          <span className="brand-symbol">◈</span>
          <span>
            THE BUILDER’S DNA<small>ROHITH GANESH / ENGINEERING PRACTICE</small>
          </span>
        </a>
        <button
          className="mobile-menu"
          aria-label="Toggle navigation"
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
        <nav className={menu ? 'open' : ''} aria-label="Main navigation">
          {[
            ['Work', 'work'],
            ['Capabilities', 'skills'],
            ['Studio', 'studio'],
            ['About', 'about'],
          ].map(([t, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {t}
            </a>
          ))}
          <a className="nav-cta" href="#contact">
            Let’s talk <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="tiny-line" /> AI ENGINEER / INDEPENDENT DEVELOPER
            </div>
            <h1>
              Rohith
              <br />
              <em>Ganesh.</em>
            </h1>
            <p className="hero-position">I engineer what comes next.</p>
            <p className="v4-position">
              AI & agentic systems · MCP · Cloud & DevOps
              <br />
              Full-stack development · Data intelligence
            </p>
            <p className="hero-intro">
              From autonomous AI workflows and secure knowledge systems to cloud
              deployment automation and complete full-stack applications, I
              transform complex requirements into software that works.
            </p>
            <p className="hero-sub">
              The engineering behind every intelligent idea.
            </p>
            <div className="hero-actions">
              <a className="button dark" href="#work">
                Explore my projects <ArrowUpRight size={18} />
              </a>
              <a className="text-link" href="#contact">
                Hire me <ArrowRight size={17} />
              </a>
            </div>
            <div className="availability">
              <span className={contact.available ? 'dot open' : 'dot'} />
              {contact.available
                ? 'Open to project inquiries'
                : 'Let’s discuss your project'}
              <span className="micro">Availability by inquiry</span>
            </div>
          </div>
          <div className="reactor-wrap">
            <Reactor
              select={selectDiscipline}
              onChoose={(n) => {
                setSelectedDiscipline(n);
                setFilter('');
              }}
            />
          </div>
          <div className="hero-bottom">
            <span>ENGINEERING INTELLIGENCE INTO REALITY.</span>
            <a href="/Rohith-Ganesh-Resume.pdf" download>
              <Download size={14} /> Download resume
            </a>
            <a href="#skills">Explore my engineering DNA ↓</a>
          </div>
        </section>
        <WorkSection
          filter={filter}
          setFilter={(v) => {
            setFilter(v);
            setSelectedDiscipline(null);
          }}
          selectedDiscipline={selectedDiscipline}
          onClear={() => {
            setSelectedDiscipline(null);
            setFilter('');
          }}
        />
        <div className="editorial-interlude">
          <p>
            Intelligence is the starting point.
            <br />
            <em>Useful software is the outcome.</em>
          </p>
          <span>FROM A QUESTION TO A WORKING SYSTEM.</span>
        </div>
        <section id="skills" className="section skills">
          <div className="section-top">
            <span className="eyebrow">Capabilities</span>
            <span className="micro">CONNECTIONS, NOT PERCENTAGES.</span>
          </div>
          <div className="section-heading">
            <h2>
              Tools become
              <br />
              <em>systems.</em>
            </h2>
            <p>
              Select a technology to find the projects
              <br />
              where it has a documented role.
            </p>
          </div>
          <div className="skill-layout">
            <div className="skill-categories">
              {skillGroups.map(([name], i) => (
                <button
                  key={name}
                  aria-pressed={group === i}
                  onClick={() => setGroup(i)}
                >
                  <span>0{i + 1}</span>
                  {name}
                  <ArrowUpRight size={15} />
                </button>
              ))}
            </div>
            <div>
              <div className="skill-cloud">
                {skillGroups[group][1].map((s) => (
                  <button
                    key={s}
                    className={skill === s ? 'selected' : ''}
                    aria-pressed={skill === s}
                    onClick={() => setSkill(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <SkillConnections skill={skill} related={related} />
            </div>
          </div>
        </section>
        <section id="studio" className="section home-studio">
          <span className="eyebrow">Solution studio</span>
          <h2>
            Your problem.
            <br />
            <em>My engineering solution.</em>
          </h2>
          <p>
            AI agents, secure knowledge systems, cloud deployment automation,
            audience analytics and complete digital products.
          </p>
          <a className="button dark" href="/studio/">
            Explore services & project planning <ArrowUpRight size={18} />
          </a>
        </section>
        <section id="about" className="section about">
          <div className="section-top">
            <span className="eyebrow">About Rohith</span>
          </div>
          <div className="about-grid">
            <h2>
              Curiosity,
              <br />
              <em>with structure.</em>
            </h2>
            <div>
              <p className="about-intro">
                I don’t just write code.
                <br />I engineer intelligent solutions.
              </p>
              <div className="timeline">
                <div>
                  <span>Current position</span>
                  <h3>Systems Engineer</h3>
                  <p>Tata Consultancy Services</p>
                  <small>
                    AI applications, backend development and software
                    engineering.
                  </small>
                </div>
                <div>
                  <span>January–July 2025</span>
                  <h3>Java Intern</h3>
                  <p>Cognizant</p>
                </div>
                <div>
                  <span>2021–2025</span>
                  <h3>B.Tech, Computer Science & Engineering</h3>
                  <p>KL University</p>
                </div>
              </div>
            </div>
          </div>
          <details className="credentials-disclosure">
            <summary>
              Explore credentials <Plus size={16} />
            </summary>
            <div className="credentials">
              <span className="eyebrow">Credentials / supplied by owner</span>
              {certifications.map((c, i) => (
                <div key={c}>
                  <span>0{i + 1}</span>
                  <h4>{c}</h4>
                  <ShieldCheck size={19} />
                </div>
              ))}
              <p className="micro">
                Credential verification links were not supplied.
              </p>
            </div>
          </details>
        </section>
        <section id="contact" className="section contact">
          <div className="section-top">
            <span className="eyebrow">Start a conversation</span>
            <span className="micro">COMPLEX PROBLEMS WELCOME.</span>
          </div>
          <div className="contact-grid">
            <div>
              <h2>
                You bring
                <br />
                the vision.
                <br />
                <em>
                  I build
                  <br />
                  the intelligence.
                </em>
              </h2>
              <p>
                Whether you’re launching an AI product, automating deployment,
                extracting intelligence from data, or building a secure cloud
                application, I can help transform your requirements into an
                engineering solution.
              </p>
              <a className="email-link" href={`mailto:${contact.email}`}>
                {contact.email}
                <ArrowUpRight size={18} />
              </a>
              <div className="contact-social">
                <a href={contact.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
                <a href={contact.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
                <a href="/Rohith-Ganesh-Resume.pdf" download>
                  Resume ↓
                </a>
                {contact.booking && (
                  <a href={contact.booking}>Book a conversation ↗</a>
                )}
              </div>
            </div>
            <Inquiry />
          </div>
        </section>
      </main>
      <footer>
        <a className="brand" href="#">
          <span className="brand-symbol">◈</span>THE BUILDER’S DNA
        </a>
        <span>© 2026 ROHITH GANESH</span>
        <span>THOUGHTFULLY ENGINEERED.</span>
      </footer>
    </>
  );
}
