'use client';
import { ArrowRight, Check, Lock, MapPin, Search } from 'lucide-react';
import { useState } from 'react';
import { useClientReady } from './useClientReady';
const roles = [
  {
    title: 'AI backend engineer',
    skills: ['Python', 'FastAPI', 'LangChain', 'Docker'],
  },
  {
    title: 'Cloud automation engineer',
    skills: ['AWS', 'Terraform', 'Docker', 'Python'],
  },
  {
    title: 'Frontend product engineer',
    skills: ['React', 'TypeScript', 'Testing', 'Accessibility'],
  },
];
const profile = ['Python', 'FastAPI', 'LangChain', 'AWS'];
export default function SupportingDemo({ id }: { id: string }) {
  const ready = useClientReady();
  const [selected, setSelected] = useState(0);
  const [days, setDays] = useState(3);
  const [theme, setTheme] = useState('Culture');
  const [authenticated, setAuthenticated] = useState(true);
  const [role, setRole] = useState('viewer');
  const [action, setAction] = useState('profile');
  if (id === 'jobs') {
    const job = roles[selected];
    return (
      <div data-ready={ready} className="supporting-demo">
        <span className="demo-disclosure">
          Synthetic job-discovery example. No real listings, resume parsing or
          application submission.
        </span>
        <h2>Discovery first. Match with context.</h2>
        <div className="support-pipeline">
          {[
            'Resume signals',
            'Broad search',
            'Selected job crawl',
            'Deep matching',
          ].map((x) => (
            <span key={x}>
              {x}
              <ArrowRight size={14} />
            </span>
          ))}
        </div>
        <p>Fictional resume signals: {profile.join(', ')}.</p>
        <div className="fictional-jobs">
          {roles.map((r, i) => (
            <button
              key={r.title}
              disabled={!ready}
              aria-pressed={i === selected}
              onClick={() => setSelected(i)}
            >
              <Search size={20} />
              <strong>{r.title}</strong>
              <span>Fictional role {i + 1}</span>
            </button>
          ))}
        </div>
        <div className="job-match" aria-live="polite">
          <h3>{job.title}</h3>
          <p>
            {job.skills.filter((s) => profile.includes(s)).length} of{' '}
            {job.skills.length} exact sample keywords overlap. This is not an
            LLM matching score.
          </p>
          {job.skills.map((s) => (
            <span key={s}>
              {profile.includes(s) ? <Check size={15} /> : <Search size={15} />}{' '}
              {s} · {profile.includes(s) ? 'present' : 'gap'}
            </span>
          ))}
        </div>
        <p className="demo-note">
          The repository documents broad discovery with two queries and at most
          six jobs, followed by a crawl of the selected job. Job tracking,
          resume rewriting and auto-application remain future enhancements.
        </p>
      </div>
    );
  }
  if (id === 'travel')
    return (
      <div data-ready={ready} className="supporting-demo travel-demo">
        <span className="demo-disclosure">
          Fictional destination and prewritten itinerary. No travel API, live
          weather or booking connection.
        </span>
        <h2>Preferences become a journey.</h2>
        <div className="travel-controls">
          <label htmlFor="travel-days">Trip length</label>
          <select
            id="travel-days"
            disabled={!ready}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          >
            {[2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} days
              </option>
            ))}
          </select>
          <label htmlFor="travel-theme">Preference</label>
          <select
            id="travel-theme"
            disabled={!ready}
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option>Culture</option>
            <option>Nature</option>
          </select>
        </div>
        <div className="itinerary-days">
          {Array.from({ length: days }, (_, i) => (
            <div key={i}>
              <MapPin size={22} />
              <span>Day {i + 1} / Fictional Garden City</span>
              <h3>
                {theme === 'Culture'
                  ? [
                      'Neighborhood galleries',
                      'Architecture walk',
                      'Local-history museum',
                      'Creative district',
                    ][i]
                  : [
                      'Riverside trail',
                      'Botanical garden',
                      'Hilltop park',
                      'Wetland boardwalk',
                    ][i]}
              </h3>
              <p>Morning exploration → afternoon break → evening reflection.</p>
            </div>
          ))}
        </div>
        <div className="itinerary-budget">
          <strong>Illustrative budget: €{days * 82}</strong>
          <p>
            {days} × (€60 accommodation + €12 local travel + €10 activities).
            Invented demo assumptions, not real prices or a booking quote.
          </p>
        </div>
        <p className="demo-note">
          The documented app combines a controlled LangGraph workflow,
          city-guide RAG, weather/news and OpenStreetMap places. External
          coverage can be incomplete; hotel and transport costs are estimates.
        </p>
      </div>
    );
  const allowed = authenticated && (action === 'profile' || role === 'admin');
  return (
    <div data-ready={ready} className="supporting-demo">
      <span className="demo-disclosure">
        Synthetic authorization policy. No login token or API request is
        created.
      </span>
      <h2>Identity is only the first boundary.</h2>
      <div className="security-controls">
        <label>
          <input
            type="checkbox"
            checked={authenticated}
            onChange={(e) => setAuthenticated(e.target.checked)}
          />{' '}
          Authenticated sample identity
        </label>
        <label htmlFor="rbac-role">Role</label>
        <select
          id="rbac-role"
          disabled={!ready}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>viewer</option>
          <option>admin</option>
        </select>
        <label htmlFor="rbac-action">Action</label>
        <select
          id="rbac-action"
          disabled={!ready}
          value={action}
          onChange={(e) => setAction(e.target.value)}
        >
          <option value="profile">Read own profile</option>
          <option value="admin">Administrator CRUD</option>
        </select>
      </div>
      <div
        className={`authorization-result ${allowed ? 'allowed' : 'denied'}`}
        aria-live="polite"
      >
        <Lock size={30} />
        <h3>
          {!authenticated
            ? '401 · identity required'
            : allowed
              ? '200 · permitted by this demo policy'
              : '403 · role does not permit this action'}
        </h3>
        <p>
          Validate JWT identity → check the required role → enter the protected
          endpoint.
        </p>
      </div>
      <p className="demo-note">
        The repository documents a single role per user and administrator
        CRUD/delegation. Refresh tokens, permission-level policies, audit logs
        and pytest tests are future improvements, not implemented guarantees.
      </p>
    </div>
  );
}
