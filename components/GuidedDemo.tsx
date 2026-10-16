'use client';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  FileText,
  Network,
  ShieldCheck,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
const journeys: Record<
  string,
  {
    title: string;
    decision: string;
    visual: string;
    detail: string;
    proof: string;
  }[]
> = {
  aws: [
    {
      title: 'Give the AI a clear tool boundary.',
      decision:
        'Use structured MCP tools instead of unrestricted cloud commands.',
      visual: 'MCP client → authenticated bridge → tool server',
      detail:
        'A local Python stdio bridge forwards requests to API Gateway with bearer authentication. FastMCP Lambda dispatches the documented tool.',
      proof:
        'Active deployment is MCP-only; dashboard and OAuth modules are inactive.',
    },
    {
      title: 'Inspect the services that answer the question.',
      decision: 'Keep cost, security and operations capabilities explicit.',
      visual: 'Cost visibility · IAM hygiene · resources · CloudWatch',
      detail:
        'Twenty documented tools expose structured inspections. Responses may include partial coverage and service errors.',
      proof:
        'Permissions, region and billing data constrain what can be inspected.',
    },
    {
      title: 'Move long scans out of the request path.',
      decision: 'Use an asynchronous scanner for account-wide inspection.',
      visual: 'EventBridge → scanner Lambda → DynamoDB → SNS',
      detail:
        'Scheduled scans store reports in DynamoDB and publish summaries through SNS. SQS captures failed events; CloudWatch supports diagnostics.',
      proof:
        'A synchronous full report may time out. This demonstration does not connect to AWS.',
    },
  ],
  patient: [
    {
      title: 'Start with the authenticated patient.',
      decision: 'Derive access scope from validated identity.',
      visual: 'Patient A identity → Patient A document scope',
      detail:
        'JWT identity is validated server-side. Metadata filtering scopes retrieval, and post-retrieval ownership checks verify each document.',
      proof: 'This public demonstration uses fictional patients and records.',
    },
    {
      title: 'Retrieve evidence before generating an answer.',
      decision: 'Ask the model to work from supporting passages.',
      visual: 'LAB-001 / Glucose: 92 mg/dL',
      detail:
        'A synthetic lab record supports the recorded value. LangGraph assesses relevance before answer generation.',
      proof:
        'Document masking is a preprocessing measure; it does not guarantee complete de-identification.',
    },
    {
      title: 'Verify the answer or decline to infer.',
      decision: 'Validate citations and factual support.',
      visual: 'Supported: 92 mg/dL [LAB-001] / Unsupported: diagnosis',
      detail:
        'The supplied record supports a glucose value, but not a diagnosis. Insufficient evidence produces a controlled fallback.',
      proof:
        'Development prototype; no clinical validation or production privacy/security assessment claimed.',
    },
  ],
  query: [
    {
      title: 'Give the model an approved schema.',
      decision: 'Constrain generation to permitted tables and columns.',
      visual: 'Question → sales(product, customer, revenue, date, quarter)',
      detail:
        'The local app retrieves a registered dataset schema and policy before Ollama generates SQL.',
      proof:
        'The public sample is a frozen synthetic dataset. No visitor database is connected.',
    },
    {
      title: 'Validate before executing.',
      decision: 'Check SQL structure and keep execution read-only.',
      visual: 'SELECT SUM(revenue) FROM sales; ✓ / DROP TABLE sales; ✕',
      detail:
        'SQLGlot AST validation checks read-only structure, approved schema and constraints. Restricted execution applies timeouts and row limits.',
      proof:
        'Failures trigger bounded corrections with three total attempts, rather than unchecked execution.',
    },
    {
      title: 'Compare results, not just SQL strings.',
      decision: 'Use independently executed reference queries.',
      visual: 'Generated result: $2,400 = Reference result: $2,400',
      detail:
        'Five synthetic orders total $2,400. Equivalent SQL can have different text, so result-set comparison is the meaningful check.',
      proof:
        'Illustrative comparison, not benchmark accuracy. QueryBridge is a local single-user application.',
    },
  ],
};
export default function GuidedDemo({ id }: { id: string }) {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState(false);
  const [complete, setComplete] = useState(false);
  const reduce = useReducedMotion();
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (complete) heading.current?.focus({ preventScroll: true });
  }, [complete]);
  const journey = journeys[id];
  if (!journey) return null;
  const item = journey[step];
  const Icon = id === 'aws' ? Network : id === 'patient' ? FileText : Code2;
  function change(n: number) {
    setStep(n);
    setAnswer(false);
    setComplete(false);
  }
  return (
    <div className={`guided-demo guided-${id}`}>
      <div className="guided-progress" aria-label="Demonstration steps">
        {journey.map((s, i) => (
          <button
            key={s.title}
            aria-label={`Step ${i + 1}: ${s.title}`}
            aria-pressed={!complete && step === i}
            className={complete || i < step ? 'step-finished' : ''}
            onClick={() => change(i)}
          >
            <span>{complete || i < step ? <Check size={14} /> : i + 1}</span>
            <i />
          </button>
        ))}
      </div>
      {complete ? (
        <motion.div
          className="guided-completion"
          initial={false}
          animate={{ opacity: [0.5, 1] }}
          transition={{ duration: reduce ? 0 : 0.25 }}
        >
          <span className="completion-mark">
            <Check size={24} />
          </span>
          <h3 tabIndex={-1} ref={heading}>
            Three decisions. One clearer system.
          </h3>
          <p>
            You’ve completed this synthetic walkthrough. Here are the
            engineering choices you explored:
          </p>
          <ul>
            {journey.map((s) => (
              <li key={s.decision}>
                <Check size={17} />
                {s.decision}
              </li>
            ))}
          </ul>
          <div className="completion-actions">
            <a href={`#workspace-${id}`}>
              Explore the full workspace <ArrowRight size={17} />
            </a>
            <button onClick={() => change(0)}>Restart walkthrough</button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="guided-stage"
          key={step}
          initial={false}
          animate={{ opacity: [0.7, 1], x: reduce ? 0 : [8, 0] }}
          transition={{ duration: reduce ? 0 : 0.25 }}
        >
          <span className="guide-kicker">
            Decision {step + 1} of {journey.length}
          </span>
          <h3>{item.title}</h3>
          <div className="guided-visual">
            <Icon size={42} />
            <strong>{item.visual}</strong>
            {id === 'patient' && step === 2 && (
              <button aria-pressed={answer} onClick={() => setAnswer(!answer)}>
                {answer ? 'Show supported answer' : 'Ask for a diagnosis'}
              </button>
            )}
            {id === 'patient' && step === 2 && answer && (
              <p role="status">
                Insufficient evidence. The record does not support a diagnosis.
              </p>
            )}
          </div>
          <h4>{item.decision}</h4>
          <p>{item.detail}</p>
          <div className="guided-boundary">
            <ShieldCheck size={17} />
            <p>{item.proof}</p>
          </div>
        </motion.div>
      )}
      {!complete && (
        <div className="guided-buttons">
          <button disabled={step === 0} onClick={() => change(step - 1)}>
            <ArrowLeft size={16} /> Previous
          </button>
          <span aria-live="polite">
            {step + 1} / {journey.length}
          </span>
          <button
            onClick={() =>
              step === journey.length - 1 ? setComplete(true) : change(step + 1)
            }
          >
            {step === journey.length - 1
              ? 'Finish walkthrough'
              : 'Next decision'}{' '}
            <ArrowRight size={16} />
          </button>
        </div>
      )}
      <p className="micro">
        Guided synthetic demonstration.{' '}
        {!complete && (
          <a href={`#workspace-${id}`}>
            Explore the full interactive workspace ↓
          </a>
        )}
      </p>
    </div>
  );
}
