'use client';
import { useReducedMotion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Cloud,
  Code2,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { artifacts, scenarios, stageNotes, stages } from '../data/deployment';
import { useClientReady } from './useClientReady';
const resources = [
  'VPC',
  'Subnet',
  'Internet gateway',
  'Route table',
  'Security group',
  'EC2 host',
];
export default function DeployDemo() {
  const ready = useClientReady();
  const [resource, setResource] = useState(0);
  const [tab, setTab] = useState('Source scanner');
  const [analyzed, setAnalyzed] = useState(false);
  const [artifact, setArtifact] = useState('Dockerfile');
  const [scenario, setScenario] = useState('success');
  const [stage, setStage] = useState(0);
  const [running, setRunning] = useState(false);
  const [failed, setFailed] = useState(false);
  const [recovered, setRecovered] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [hours, setHours] = useState(120);
  const [instances, setInstances] = useState(1);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!running) return;
    const timeout = setTimeout(
      () => {
        const s = scenarios[scenario];
        if (s.at === stage && !recovered) {
          setFailed(true);
          setRunning(false);
          setLogs((l) => [...l, 'SIMULATED ERROR: ' + s.error]);
          return;
        }
        setLogs((l) => [
          ...l,
          `SIMULATED ${stages[stage]}: ${stageNotes[stage]}`,
        ]);
        if (stage === 7) {
          setRunning(false);
          return;
        }
        setStage(stage + 1);
      },
      reduced ? 250 : 650,
    );
    return () => clearTimeout(timeout);
  }, [running, stage, scenario, recovered, reduced]);
  function start() {
    setStage(0);
    setLogs([]);
    setFailed(false);
    setRecovered(false);
    setRunning(true);
  }
  return (
    <div data-ready={ready} className="v4-demo deploy-demo">
      <div className="v4-demo-heading">
        <div>
          <span>CODE TO CLOUD</span>
          <h2>Deployment, made inspectable.</h2>
        </div>
        <Cloud size={35} />
      </div>
      <p className="demo-disclosure">
        Synthetic simulation based on the supplied specification. No repository
        is scanned, no cloud resource is created, and no credentials are
        accepted.
      </p>
      <div className="tabs" aria-label="Deployment experience">
        {[
          'Source scanner',
          'Artifact generator',
          'Infrastructure',
          'Security',
          'Lifecycle',
          'Cost estimate',
        ].map((t) => (
          <button
            key={t}
            disabled={!ready}
            aria-pressed={tab === t}
            className={tab === t ? 'active' : ''}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === 'Source scanner' ? (
        <div className="deploy-source">
          <div className="source-browser">
            <h3>
              <Code2 size={22} /> demo-inventory / fictional repository
            </h3>
            <pre>
              api/app.py
              <br />
              api/requirements.txt
              <br />
              web/package.json
              <br />
              web/src/App.tsx
              <br />
              .env.example
            </pre>
            <button
              className="button dark"
              disabled={!ready}
              onClick={() => setAnalyzed(true)}
            >
              {analyzed ? 'Review sample analysis' : 'Analyze fictional source'}
              <ArrowRight size={18} />
            </button>
          </div>
          <div className="source-report" aria-live="polite">
            {analyzed ? (
              <>
                <h3>Sample analysis complete.</h3>
                <dl>
                  {Object.entries({
                    Language: 'Python 3.11 / TypeScript',
                    Framework: 'FastAPI / React + Vite',
                    Dependencies: 'Uvicorn, Pydantic, PostgreSQL client',
                    Entry: 'api/app.py → app',
                    Ports: '8000 API / 5173 development UI',
                    Environment: 'DATABASE_URL and database secret required',
                    Database: 'PostgreSQL service',
                  }).map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <p>
                  Fixed precomputed analysis. The portfolio has not inspected
                  arbitrary code.
                </p>
              </>
            ) : (
              <>
                <h3>A source boundary comes first.</h3>
                <p>
                  Select the example to reveal its languages, framework, ports
                  and service requirements.
                </p>
              </>
            )}
          </div>
        </div>
      ) : tab === 'Artifact generator' ? (
        <>
          <div className="artifact-tabs">
            {Object.keys(artifacts).map((a) => (
              <button
                key={a}
                aria-pressed={a === artifact}
                onClick={() => setArtifact(a)}
              >
                {a}
              </button>
            ))}
          </div>
          <pre className="artifact-code">{artifacts[artifact]}</pre>
          <p className="demo-note">
            Illustrative excerpts only. Secrets are configuration references,
            not real credentials. Review and complete infrastructure policies
            before any real deployment.
          </p>
        </>
      ) : tab === 'Infrastructure' ? (
        <>
          <div className="deployment-path">
            {[
              'Source',
              'AI analysis',
              'Docker build',
              'Terraform plan',
              'AWS EC2',
              'Application',
              'Health check',
            ].map((x, i) => (
              <div key={x}>
                <span>{i + 1}</span>
                <strong>{x}</strong>
                {i < 6 && <ArrowRight size={15} />}
              </div>
            ))}
          </div>
          <div className="resource-grid">
            {resources.map((r, i) => (
              <button
                key={r}
                aria-pressed={resource === i}
                onClick={() => setResource(i)}
                aria-label={`Inspect ${r}`}
              >
                <Cloud size={20} />
                {r}
                <small>
                  {
                    [
                      'Network boundary',
                      'Application network',
                      'Internet route attachment',
                      'Approved network paths',
                      'Restricted ingress policy',
                      'Container application host',
                    ][i]
                  }
                </small>
              </button>
            ))}
          </div>
          <div className="resource-inspector" aria-live="polite">
            <h3>{resources[resource]}</h3>
            <p>
              {
                [
                  'An explicit network boundary with approved addressing.',
                  'An application network segment inside the VPC.',
                  'An internet route attachment; connectivity still depends on route and ingress policy.',
                  'Routes describe where subnet traffic can travel.',
                  'Inbound and outbound rules must match the approved application access policy.',
                  'A host for the containerized application, requiring an approved image and role.',
                ][resource]
              }
            </p>
          </div>
          <p className="demo-note">
            Networking and access policies must be explicit. The actual
            implementation and provisioning coverage remain source-unverified.
          </p>
        </>
      ) : tab === 'Security' ? (
        <>
          <div className="security-findings">
            <div>
              <ShieldCheck size={25} />
              <h3>Trivy / container checks</h3>
              <p>
                Illustrative finding DEMO-CONTAINER-01: outdated base-image
                packages.
              </p>
              <span>Review package versions and rebuild the image.</span>
            </div>
            <div>
              <ShieldCheck size={25} />
              <h3>Checkov / IaC checks</h3>
              <p>Illustrative finding DEMO-IAC-01: overly broad SSH ingress.</p>
              <span>Restrict source CIDRs or use an approved access path.</span>
            </div>
          </div>
          <p className="demo-note">
            These are hand-authored sample findings, not executed scans or real
            CVE results. Findings inform review; they do not establish that a
            deployment is secure.
          </p>
        </>
      ) : tab === 'Lifecycle' ? (
        <>
          <div className="lifecycle-controls">
            <label htmlFor="scenario">Simulation scenario</label>
            <select
              id="scenario"
              value={scenario}
              disabled={!ready || running}
              onChange={(e) => {
                setScenario(e.target.value);
                setStage(0);
                setFailed(false);
                setLogs([]);
              }}
            >
              {Object.entries(scenarios).map(([k, s]) => (
                <option key={k} value={k}>
                  {s.label}
                </option>
              ))}
            </select>
            <button className="button dark" disabled={running} onClick={start}>
              {running ? 'Simulating…' : 'Run simulation'}
              <ArrowRight size={17} />
            </button>
          </div>
          <div className="lifecycle-stages">
            {stages.map((s, i) => (
              <div
                key={s}
                className={i === stage ? 'current' : i < stage ? 'done' : ''}
              >
                <span>{i < stage ? <Check size={14} /> : i + 1}</span>
                {s}
              </div>
            ))}
          </div>
          {stage > 4 && (
            <div className="provisioned-resources">
              {resources.map((r) => (
                <span key={r}>
                  <Check size={12} />
                  {r} · simulated
                </span>
              ))}
            </div>
          )}
          <div className="lifecycle-output" aria-live="polite">
            <h3>
              {failed
                ? 'Simulation paused'
                : stage === 7 && !running
                  ? 'Walkthrough complete'
                  : stages[stage]}
            </h3>
            {failed ? (
              <>
                <p>
                  <AlertTriangle size={18} /> {scenarios[scenario].error}
                </p>
                <p>{scenarios[scenario].fix}</p>
                <button
                  onClick={() => {
                    setRecovered(true);
                    setFailed(false);
                    setRunning(true);
                    setLogs((l) => [
                      ...l,
                      'SIMULATED RETRY: example corrective action acknowledged.',
                    ]);
                  }}
                  className="retry-button"
                >
                  <RotateCcw size={17} /> Apply simulated fix & retry
                </button>
              </>
            ) : (
              <p>{stageNotes[stage]}</p>
            )}
          </div>
          <pre
            className="simulation-log"
            aria-label="Simulated deployment logs"
          >
            {logs.length
              ? logs.join('\n')
              : 'SIMULATED LOGS · Run an example to follow the lifecycle.'}
          </pre>
          <p className="demo-note">
            A retry demonstrates a possible recovery path. It is not a guarantee
            of real-world deployment success.
          </p>
        </>
      ) : (
        <div className="cost-demo">
          <div>
            <label htmlFor="hours">Example running hours: {hours}</label>
            <input
              id="hours"
              type="range"
              min="24"
              max="720"
              step="24"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
            />
            <label htmlFor="instances">Example instances</label>
            <select
              id="instances"
              value={instances}
              onChange={(e) => setInstances(Number(e.target.value))}
            >
              {[1, 2, 3].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <span>ILLUSTRATIVE ESTIMATE</span>
            <strong>
              ${(instances * hours * 0.02 + instances * 2.5).toFixed(2)}
            </strong>
            <p>
              Demo formula: instances × hours × $0.02 + instances × $2.50
              assumed storage.
            </p>
          </div>
          <p className="demo-note">
            Invented teaching assumptions, not AWS prices, quotes or actual
            billing. Data transfer, tax, service costs and region-specific rates
            are excluded.
          </p>
        </div>
      )}
    </div>
  );
}
