'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { phases, projects, services } from '../../data/content';
import { casePath } from '../../data/routes';
import { serviceRisks } from '../../data/scoping';
export default function Studio() {
  const reduceMotion = useReducedMotion();
  const [service, setService] = useState(0);
  const [phase, setPhase] = useState(0);
  const [idea, setIdea] = useState(
    'I need a chatbot that searches company documents.',
  );
  const [plan, setPlan] = useState<number | null>(null);
  return (
    <>
      <header>
        <Link className="brand" href="/">
          ◈ THE BUILDER’S DNA
        </Link>
        <Link href="/#contact" className="nav-cta">
          Discuss your project ↗
        </Link>
      </header>
      <main>
        <section id="studio" className="section studio">
          <div className="section-top">
            <span className="eyebrow">03 / SOLUTION STUDIO</span>
            <span className="micro">BUILT AROUND YOUR BUSINESS.</span>
          </div>
          <h2>
            Your problem.
            <br />
            <em>My engineering solution.</em>
          </h2>
          <div className="studio-layout">
            <div className="service-list">
              {services.map((s, i) => (
                <button
                  key={s.name}
                  aria-pressed={service === i}
                  className={service === i ? 'active' : ''}
                  onClick={() => setService(i)}
                >
                  <span>0{i + 1}</span>
                  {s.name}
                  {service === i ? <Minus size={16} /> : <Plus size={16} />}
                </button>
              ))}
            </div>
            <motion.div
              className="service-detail"
              key={service}
              initial={false}
              animate={{ opacity: [0.65, 1], y: reduceMotion ? 0 : [8, 0] }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
            >
              <span className="eyebrow">The opportunity</span>
              <h3>{services[service].problem}</h3>
              <p>{services[service].direction}</p>
              <dl>
                <dt>Possible architecture</dt>
                <dd>{services[service].architecture}</dd>
                <dt>Technologies</dt>
                <dd>{services[service].technologies.join(', ')}</dd>
                <dt>Scoping questions</dt>
                <dd>{services[service].questions}</dd>
                <dt>Possible deliverables</dt>
                <dd>{services[service].deliverables}</dd>
                <dt>Relevant project evidence</dt>
                <dd>
                  {services[service].proof.map((id) => (
                    <a key={id} href={casePath(id)}>
                      {projects.find((p) => p.id === id)?.title} ↗
                    </a>
                  ))}
                </dd>
                <dt>Implementation process</dt>
                <dd>
                  Scope → architecture → prototype → implementation → validation
                  → handover.
                </dd>
              </dl>
              <a href="/#contact" className="button dark">
                Discuss this service <ArrowUpRight size={17} />
              </a>
              <p className="micro">
                Proposed services. DeployForge AI and AudienceLens AI evidence
                is limited to owner-supplied specifications. No paid client
                engagements or guaranteed outcomes are implied.
              </p>
            </motion.div>
          </div>
        </section>
        <section className="section consultation">
          <div>
            <span className="eyebrow">04 / IDEA TO ARCHITECTURE</span>
            <h2>
              Describe your idea.
              <br />
              <em>Discover what it takes.</em>
            </h2>
            <p>A starting blueprint for your next conversation.</p>
          </div>
          <div className="consult-box">
            <label htmlFor="idea">Describe your idea</label>
            <textarea
              id="idea"
              value={idea}
              maxLength={2000}
              onChange={(e) => setIdea(e.target.value)}
              rows={3}
            />
            <button
              className="button dark"
              disabled={idea.trim().length < 10}
              onClick={() =>
                setPlan(
                  /deploy|terraform|docker|devops/i.test(idea)
                    ? 3
                    : /youtube|comment|sentiment|audience|nlp/i.test(idea)
                      ? 4
                      : /aws|cloud|mcp/i.test(idea)
                        ? 2
                        : /sql|database|analytics|data/i.test(idea)
                          ? 5
                          : /document|chatbot|knowledge|rag|pdf/i.test(idea)
                            ? 1
                            : /jwt|rbac|permission|auth/i.test(idea)
                              ? 7
                              : /agent|workflow/i.test(idea)
                                ? 0
                                : 6,
                )
              }
            >
              Sketch a direction <ArrowRight size={17} />
            </button>
            <span className="micro">
              Labeled deterministic matcher · no AI API · text stays in your
              browser
            </span>
            {plan !== null && (
              <div className="plan" aria-live="polite">
                <h3>{services[plan].name}</h3>
                <p>{services[plan].direction}</p>
                <dl>
                  <dt>Suggested architecture</dt>
                  <dd>{services[plan].architecture}</dd>
                  <dt>Suitable technologies</dt>
                  <dd>{services[plan].technologies.join(', ')}</dd>
                  <dt>Phases</dt>
                  <dd>
                    Scope and data audit → prototype → secure implementation →
                    evaluation → deployment.
                  </dd>
                  <dt>Risks & security</dt>
                  <dd>{serviceRisks[plan]}</dd>
                  <dt>Questions for scoping</dt>
                  <dd>{services[plan].questions}</dd>
                  <dt>Relevant evidence</dt>
                  <dd>
                    {services[plan].proof.map((id) => (
                      <a key={id} href={casePath(id)}>
                        {projects.find((p) => p.id === id)?.title} ↗
                      </a>
                    ))}
                  </dd>
                </dl>
              </div>
            )}
          </div>
        </section>
        <section className="section process">
          <div className="section-top">
            <span className="eyebrow">06 / METHOD</span>
          </div>
          <h2>
            How an idea becomes
            <br />
            <em>a working product.</em>
          </h2>
          <div className="phase-track">
            {phases.map((p, i) => (
              <button
                key={p[0]}
                aria-pressed={phase === i}
                className={phase === i ? 'active' : ''}
                onClick={() => setPhase(i)}
              >
                <span>0{i + 1}</span>
                {p[0]}
              </button>
            ))}
          </div>
          <div className="phase-detail">
            <span>0{phase + 1}</span>
            <div>
              <h3>{phases[phase][0]}</h3>
              <p>{phases[phase][1]}</p>
              <small>Decision point: {phases[phase][2]}</small>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
