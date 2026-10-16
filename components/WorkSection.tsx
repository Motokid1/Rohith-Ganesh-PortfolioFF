'use client';
import {
  ArrowUpRight,
  Cloud,
  Database,
  Network,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { projects } from '../data/content';
import { disciplineNames, disciplineProjects } from '../data/disciplines';
import { casePath } from '../data/routes';
function matches(id: string, filter: string) {
  if (!filter) return true;
  if (filter === 'MCP') return id === 'aws';
  if (filter === 'Cloud') return ['aws', 'deploy'].includes(id);
  if (filter === 'Analytics') return ['query', 'audience'].includes(id);
  if (filter === 'Backend') return ['rbac', 'patient', 'aws'].includes(id);
  if (filter === 'Full-stack')
    return ['patient', 'query', 'jobs', 'travel'].includes(id);
  return ['patient', 'query', 'jobs', 'travel', 'deploy', 'audience'].includes(
    id,
  );
}
export default function WorkSection({
  filter,
  setFilter,
  selectedDiscipline,
  onClear,
}: {
  filter: string;
  setFilter: (v: string) => void;
  selectedDiscipline: number | null;
  onClear: () => void;
}) {
  const visible = projects.filter((p) => matches(p.id, filter));
  const connected =
    selectedDiscipline === null ? [] : disciplineProjects[selectedDiscipline];
  return (
    <section id="work" className="section home-work">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Selected work</span>
          <h2>
            Engineering,
            <br />
            <em>made tangible.</em>
          </h2>
        </div>
        <p>
          Explore a project.
          <br />
          Follow the engineering decisions.
        </p>
      </div>
      <div className="work-connection" aria-live="polite">
        {selectedDiscipline !== null && (
          <>
            <span>
              <i /> Connected to {disciplineNames[selectedDiscipline]}
            </span>
            <button onClick={onClear}>Show all work</button>
          </>
        )}
      </div>
      <div className="home-project-filter">
        <label htmlFor="home-filter">Explore by discipline</label>
        <select
          id="home-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All projects</option>
          {[
            ['Cloud', 'Cloud & Infrastructure'],
            ['AI', 'AI & Agentic Systems'],
            ['Analytics', 'Data Intelligence'],
            ['Backend', 'Backend & Security'],
            ['MCP', 'MCP'],
            ['Full-stack', 'Full-Stack Products'],
          ].map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div
        className={`featured-projects ${visible.some((p) => p.id === 'aws') ? 'has-lead' : 'no-lead'} ${visible.filter((p) => ['aws', 'patient', 'query'].includes(p.id)).length === 1 ? 'single-featured' : ''}`}
      >
        {visible
          .filter((p) => ['aws', 'patient', 'query'].includes(p.id))
          .map((p) => (
            <Link
              href={casePath(p.id)}
              id={`project-${p.id}`}
              className={`project-teaser teaser-${p.id} ${connected.includes(p.id) ? 'is-connected' : selectedDiscipline !== null ? 'is-muted' : ''}`}
              key={p.id}
            >
              <ProjectVisual id={p.id} />
              <div className="teaser-copy">
                {connected.includes(p.id) && (
                  <span className="connected-tag">Connected project</span>
                )}
                <h3>
                  {p.title}
                  <ArrowUpRight size={24} />
                </h3>
                <p>{p.subtitle}</p>
                <span>Explore the case study →</span>
              </div>
            </Link>
          ))}
      </div>
      <div className="v4-discovery">
        {visible
          .filter((p) => ['deploy', 'audience'].includes(p.id))
          .map((p) => (
            <Link
              key={p.id}
              href={casePath(p.id)}
              className={`new-project new-${p.id} ${connected.includes(p.id) ? 'is-connected' : ''}`}
            >
              <span className="eyebrow">
                {p.id === 'deploy' ? 'CODE TO CLOUD' : 'AUDIENCE INTELLIGENCE'}
              </span>
              <div className="new-project-visual">
                {p.id === 'deploy' ? (
                  <>
                    <span>Source</span>
                    <i />
                    <span>Docker</span>
                    <i />
                    <span>Terraform</span>
                    <i />
                    <span>AWS</span>
                  </>
                ) : (
                  <>
                    <div className="mini-sentiment">
                      <span>+</span>
                      <span>•</span>
                      <span>−</span>
                    </div>
                    <div className="mini-topics">
                      <span>Topics</span>
                      <span>Emotion</span>
                      <span>Meaning</span>
                    </div>
                  </>
                )}
              </div>
              <h3>
                {p.title}
                <ArrowUpRight size={23} />
              </h3>
              <p>{p.subtitle}</p>
              <small>Owner specification · interactive synthetic demo</small>
            </Link>
          ))}
      </div>
      <div className="more-work">
        {visible
          .filter((p) => ['jobs', 'travel', 'rbac'].includes(p.id))
          .map((p) => (
            <Link
              href={casePath(p.id)}
              id={`project-${p.id}`}
              className={
                connected.includes(p.id)
                  ? 'is-connected'
                  : selectedDiscipline !== null
                    ? 'is-muted'
                    : ''
              }
              key={p.id}
            >
              <div>
                <h3>{p.title}</h3>
                <p>{p.category}</p>
              </div>
              <ArrowUpRight size={22} />
            </Link>
          ))}
      </div>
    </section>
  );
}
function ProjectVisual({ id }: { id: string }) {
  return (
    <div className={`project-visual visual-${id}`} aria-hidden="true">
      {id === 'aws' ? (
        <>
          <span>Cloud intelligence</span>
          <div className="preview-cloud">
            <div>
              <Network size={34} />
              <strong>MCP</strong>
            </div>
            <i />
            <div className="cloud-main">
              <Cloud size={52} />
              <strong>AWS</strong>
            </div>
            <i />
            <div>
              <Database size={34} />
              <strong>Reports</strong>
            </div>
          </div>
          <div className="preview-footer">
            <span>Inspect</span>
            <span>Understand</span>
            <span>Act</span>
          </div>
        </>
      ) : id === 'patient' ? (
        <>
          <span>Evidence-grounded answers</span>
          <div className="preview-document">
            <span>LAB-001 · Synthetic record</span>
            <i />
            <i />
            <strong>
              92 <small>mg/dL</small>
            </strong>
            <p>Source-linked. Patient-scoped.</p>
            <ShieldCheck size={23} />
          </div>
        </>
      ) : (
        <>
          <span>From question to insight</span>
          <div className="preview-sql">
            SELECT product, SUM(revenue)
            <br />
            FROM sales GROUP BY product;
          </div>
          <div className="preview-bars">
            {[90, 60, 45, 30, 15].map((x, i) => (
              <div key={x}>
                <span>{['Atlas', 'Beam', 'Core', 'Delta', 'Echo'][i]}</span>
                <i style={{ width: `${x}%` }} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
