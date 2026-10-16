'use client';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { projects, tools } from '../data/content';
import Blueprint from './Blueprint';
import QueryLab from './QueryLab';

const detail: Record<string, string> = {
  'MCP Client':
    'A compatible AI client calls documented MCP tools. This is a demonstration, not a connection to a live account.',
  'Python Bridge': 'A local stdio bridge forwards authenticated requests.',
  'API Gateway': 'HTTPS entry point with bearer authentication.',
  'FastMCP Lambda': 'Python tool dispatch runs in a serverless Lambda.',
  'AWS APIs':
    'Read-oriented cloud inspections; coverage depends on service permissions and regional availability.',
  'DynamoDB Reports': 'Stores asynchronous scan reports.',
  'JWT Identity':
    'The server validates JWT identity. Client-provided patient IDs are not trusted.',
  'Atlas Retrieval': 'Vector search applies patient metadata filters.',
  'Ownership Check':
    'Every retrieved document is checked again against the authenticated owner.',
  LangGraph:
    'Relevance checks and bounded rewrites guide generation. Summary retrieval has a separate path.',
  Groq: 'Generates an answer from retrieved evidence.',
  'Verify & Cite':
    'Citations, numerical claims and factual support are checked. Insufficient evidence produces a controlled fallback.',
  'SQLGlot Validate':
    'SQL AST checks enforce read-only structure and approved schema policies.',
  'Read-only Execute': 'Restricted execution applies timeouts and row limits.',
  Guard: 'Validates input and dataset access before generation.',
  'Ollama Generate':
    'Local Qwen2.5-Coder generates SQL from an approved schema.',
};
export function Flow({ items }: { items: string[] }) {
  const [chosen, setChosen] = useState(items[0]);
  return (
    <>
      <div className="flow">
        {items.map((s, i) => (
          <button
            key={s}
            aria-pressed={chosen === s}
            className={chosen === s ? 'active' : ''}
            onClick={() => setChosen(s)}
          >
            <span>{String(i + 1).padStart(2, '0')}</span>
            {s}
            <ArrowRight size={14} />
          </button>
        ))}
      </div>
      <p className="flow-detail" key={chosen} aria-live="polite">
        <strong>{chosen}</strong> —{' '}
        {detail[chosen] ||
          `This stage transforms the previous output into ${chosen.toLowerCase()}. Select another stage to follow the documented workflow.`}
      </p>
    </>
  );
}
export function Aws() {
  const [tab, setTab] = useState('Architecture');
  const [tool, setTool] = useState('get_cost_breakdown');
  return (
    <div className="explorer aws-workspace">
      <WorkspaceHeading kind="aws" />
      <div className="tabs" aria-label="AWS explorer">
        {['Architecture', 'MCP tools', 'Business value'].map((t) => (
          <button
            aria-pressed={tab === t}
            className={tab === t ? 'active' : ''}
            key={t}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === 'Architecture' ? (
        <Blueprint />
      ) : tab === 'MCP tools' ? (
        <>
          <div className="tool-grid">
            {Object.entries(tools).map(([cat, list]) => (
              <div key={cat}>
                <h4>{cat}</h4>
                {list.map((t) => (
                  <button
                    key={t}
                    aria-pressed={tool === t}
                    onClick={() => setTool(t)}
                    className={tool === t ? 'selected' : ''}
                  >
                    {t}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="code">
            <strong>{tool}</strong>
            <p>
              {tool.startsWith('find_')
                ? 'Inspects cloud resources for the named condition.'
                : tool.startsWith('get_')
                  ? 'Retrieves the named cloud information within permitted account coverage.'
                  : tool === 'echo'
                    ? 'Tests MCP request and response connectivity.'
                    : tool === 'explain_aws_service'
                      ? 'Uses Bedrock to explain an AWS service.'
                      : 'Runs the named structured inspection or report operation.'}
            </p>
            <pre>
              {JSON.stringify(
                {
                  demo: true,
                  tool,
                  status: 'illustrative',
                  message: 'Sanitized response shape; not a live tool result',
                },
                null,
                2,
              )}
            </pre>
          </div>
        </>
      ) : (
        <div className="editorial-copy">
          <h3>Turn scattered signals into an inspectable system.</h3>
          <p>
            Cost visibility, security hygiene checks and resource diagnostics
            provide a foundation for cloud inspection and infrastructure
            auditing. Outcomes depend on account permissions, coverage and
            review.
          </p>
        </div>
      )}
    </div>
  );
}
export function Patient() {
  const [tab, setTab] = useState('Evidence');
  const [who, setWho] = useState('A');
  const [q, setQ] = useState(0);
  const questions = [
    'What was the recorded glucose?',
    'What diagnosis does this prove?',
  ];
  return (
    <div className="explorer patient-workspace">
      <WorkspaceHeading kind="patient" />
      <div className="tabs">
        {['Evidence', 'Patient isolation', 'Workflow'].map((t) => (
          <button
            aria-pressed={tab === t}
            className={tab === t ? 'active' : ''}
            key={t}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === 'Evidence' ? (
        <>
          <p className="micro">
            Synthetic record · educational portfolio simulation · no diagnosis
          </p>
          <div className="question-options">
            {questions.map((s, i) => (
              <button
                key={s}
                aria-pressed={q === i}
                className={q === i ? 'active' : ''}
                onClick={() => setQ(i)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="evidence-grid" key={q}>
            <div className="evidence-bridge" aria-hidden="true">
              SOURCE → RELEVANCE → VERIFY → ANSWER
            </div>
            <div>
              <span className="record-label">
                DOCUMENT 01 / LABORATORY RECORD
              </span>
              <span className="eyebrow">Retrieved passage / LAB-001</span>
              <blockquote>
                “Fictional Patient A. Laboratory record, 3 September 2026.
                Glucose: 92 mg/dL.”
              </blockquote>
              <p>
                Relevance:{' '}
                {q === 0
                  ? 'supports the requested numeric value'
                  : 'does not establish a diagnosis'}
                .
              </p>
            </div>
            <div>
              <span className="eyebrow">Verified response</span>
              <h3>
                {q === 0 ? '92 mg/dL [LAB-001]' : 'Insufficient evidence.'}
              </h3>
              <p>
                {q === 0
                  ? 'The value and unit match the supporting passage. Citation refers to the synthetic record.'
                  : 'The supplied record does not support a diagnosis. No conclusion is generated.'}
              </p>
              <span className="status">
                <ShieldCheck size={15} />{' '}
                {q === 0
                  ? 'Numeric and citation checks passed in this demo'
                  : 'Controlled fallback'}
              </span>
            </div>
          </div>
        </>
      ) : tab === 'Patient isolation' ? (
        <>
          <div className="tabs">
            {['A', 'B'].map((p) => (
              <button
                key={p}
                onClick={() => setWho(p)}
                aria-pressed={who === p}
              >
                Authenticate as fictional Patient {p}
              </button>
            ))}
          </div>
          <div className="isolation">
            <div className={who === 'A' ? 'permitted' : 'blocked'}>
              <h3>Patient A</h3>
              <p>LAB-001 · glucose 92 mg/dL</p>
              <strong>{who === 'A' ? 'Retrievable' : 'Access denied'}</strong>
            </div>
            <div className={who === 'B' ? 'permitted' : 'blocked'}>
              <h3>Patient B</h3>
              <p>NOTE-002 · fictional consultation</p>
              <strong>{who === 'B' ? 'Retrievable' : 'Access denied'}</strong>
            </div>
          </div>
          <p>
            Validated JWT → metadata filter for Patient {who} → post-retrieval
            ownership verification. This visual demonstrates the boundary; it
            performs no real authentication.
          </p>
        </>
      ) : (
        <>
          <Flow items={projects[1].flow} />
          <p className="micro">
            At most two query rewrites and one additional generation attempt by
            default. Dedicated summary retrieval follows its own bounded path.
          </p>
        </>
      )}
    </div>
  );
}
export function Query() {
  return <QueryLab />;
}
function WorkspaceHeading({ kind }: { kind: 'aws' | 'patient' | 'query' }) {
  const names = {
    aws: ['CLOUD SYSTEMS / MCP', 'Infrastructure atlas', '01'],
    patient: ['EVIDENCE SYSTEMS / RAG', 'The evidence workspace', '02'],
    query: ['DATA SYSTEMS / SQL', 'The query laboratory', '03'],
  };
  return (
    <div className="workspace-heading">
      <div>
        <span className="eyebrow">{names[kind][0]}</span>
        <h4>{names[kind][1]}</h4>
      </div>
      <span className="workspace-edition">EXPLORER / {names[kind][2]}</span>
    </div>
  );
}
