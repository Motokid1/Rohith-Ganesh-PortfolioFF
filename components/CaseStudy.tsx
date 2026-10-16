'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';
import { projects } from '../data/content';
import { casePath } from '../data/routes';
import Blueprint from './Blueprint';
import { Aws, Flow, Patient, Query } from './Explorers';
import GuidedDemo from './GuidedDemo';
import SupportingDemo from './SupportingDemo';
const DeployDemo = dynamic(() => import('./DeployDemo'), {
  loading: () => <p>Loading the deployment simulator…</p>,
});
const AudienceDemo = dynamic(() => import('./AudienceDemo'), {
  loading: () => <p>Loading the audience studio…</p>,
});

const takeaways: Record<string, string> = {
  deploy: 'Inspect the source. Review the plan. Verify the deployment.',
  audience:
    'Make data, labels and explanations inspectable before drawing conclusions.',
  aws: 'One tool interface. Clear cloud visibility. Explicit operational boundaries.',
  patient:
    'An answer is only useful when its evidence and access boundaries hold.',
  query: 'Validate the query. Restrict execution. Compare the result.',
  jobs: 'Connect discovery and selected-job matching; keep planned automation distinct.',
  travel: 'Turn open-ended preferences into a structured product experience.',
  rbac: 'Authentication establishes identity. Authorization decides what happens next.',
};

export default function CaseStudy({ projectId }: { projectId: string }) {
  const [mode, setMode] = useState('Visual');
  const reduced = useReducedMotion();
  const visible = projects.filter((p) => p.id === projectId);
  return (
    <section id="work" className="section work case-study-page">
      <Link href="/#work" className="case-back">
        ← Back to selected work
      </Link>
      <div className="case-perspectives">
        <div className="tabs" aria-label="Case study perspective">
          {['Visual', 'Architecture', 'Engineering', 'Business'].map((t) => (
            <button
              key={t}
              aria-pressed={mode === t}
              className={mode === t ? 'active' : ''}
              onClick={() => setMode(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      {visible.map((p) => {
        const i = projects.indexOf(p);
        return (
          <article
            id={`project-${p.id}`}
            key={p.id}
            className={`project project-${p.id} ${['aws', 'patient', 'query', 'deploy', 'audience'].includes(p.id) ? 'flagship' : 'compact'}`}
            style={{ '--project-color': p.color } as React.CSSProperties}
          >
            <div className="project-heading">
              <span className="project-index">0{i + 1}</span>
              <div>
                <span className="eyebrow">{p.category}</span>
                <h1>{p.title}</h1>
                <p>{p.subtitle}</p>
                {p.fullTitle && (
                  <p className="full-project-title">{p.fullTitle}</p>
                )}
              </div>
              <span className="project-status">{p.status}</span>
            </div>
            {!p.repo && (
              <div className="spec-notice">
                Specification-based case study · source verification pending.
                The proposed display name and public demonstration do not
                establish implemented functionality.
              </div>
            )}
            <div className="project-body">
              <div className="project-intro">
                <span className="eyebrow">The problem</span>
                <p className="problem-statement">{p.problem}</p>
                <div className="project-links">
                  {p.repo && (
                    <a
                      href={`https://github.com/Motokid1/${p.repo}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View repository <ArrowUpRight size={15} />
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer">
                      Open application <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
                <div className="case-margin-note">
                  <span>ENGINEERING TAKEAWAY</span>
                  <p>{takeaways[p.id]}</p>
                </div>
              </div>
              <div className="project-display">
                {mode === 'Visual' &&
                  ['aws', 'patient', 'query'].includes(p.id) && (
                    <GuidedDemo id={p.id} />
                  )}
                <motion.div
                  id={`workspace-${p.id}`}
                  className="perspective-panel"
                  key={mode}
                  initial={false}
                  animate={{ opacity: [0.7, 1], y: reduced ? 0 : [7, 0] }}
                  transition={{ duration: reduced ? 0 : 0.24 }}
                >
                  {mode === 'Engineering' ? (
                    <div className="engineering">
                      <span className="eyebrow">
                        Design decisions / {p.title}
                      </span>
                      <h4>
                        {p.repo
                          ? 'Built with deliberate boundaries.'
                          : 'Specified with deliberate boundaries.'}
                      </h4>
                      <ul>
                        {p.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <p>{p.solution}</p>
                    </div>
                  ) : mode === 'Business' ? (
                    <div className="business">
                      <span className="eyebrow">A practical direction</span>
                      <h4>{p.subtitle}</h4>
                      <p>{p.solution}</p>
                      <a href="/studio/" className="text-link">
                        Explore related services <ArrowRight size={16} />
                      </a>
                    </div>
                  ) : mode === 'Architecture' ? (
                    p.id === 'aws' ? (
                      <div className="explorer aws-workspace">
                        <Blueprint />
                      </div>
                    ) : (
                      <div
                        className={`explorer ${p.id === 'patient' ? 'patient-workspace' : p.id === 'query' ? 'query-workspace' : ''}`}
                      >
                        <span className="eyebrow">
                          System anatomy / {p.title}
                        </span>
                        <Flow items={p.flow} />
                      </div>
                    )
                  ) : p.id === 'deploy' ? (
                    <DeployDemo />
                  ) : p.id === 'audience' ? (
                    <AudienceDemo />
                  ) : p.id === 'aws' ? (
                    <Aws />
                  ) : p.id === 'patient' ? (
                    <Patient />
                  ) : p.id === 'query' ? (
                    <Query />
                  ) : (
                    <SupportingDemo id={p.id} />
                  )}
                </motion.div>
                <div className="project-expanders">
                  <details>
                    <summary>
                      {p.repo
                        ? 'Technology & implementation'
                        : 'Technology & specification'}{' '}
                      <Plus size={15} />
                    </summary>
                    <p>{p.solution}</p>
                    <div className="tech-list">
                      {p.tech.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <ul>
                      {p.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </details>
                  <details>
                    <summary>
                      Evidence & limitations <Plus size={15} />
                    </summary>
                    <p>{p.limits}</p>
                    <p className="micro">{p.proof}</p>
                  </details>
                </div>
              </div>
            </div>
            <div className="next-case">
              <span>Continue exploring</span>
              {projects
                .filter((other) => other.id !== p.id)
                .map((other) => (
                  <Link key={other.id} href={casePath(other.id)}>
                    {other.title} ↗
                  </Link>
                ))}
            </div>
          </article>
        );
      })}
    </section>
  );
}
