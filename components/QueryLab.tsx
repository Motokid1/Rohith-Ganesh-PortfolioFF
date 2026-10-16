'use client';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useClientReady } from './useClientReady';
const products = ['Atlas', 'Beam', 'Core', 'Delta', 'Echo'];
const customers = ['North', 'West', 'East', 'North', 'West'];
const snapshots = {
  september: {
    label: 'September retail / 5 fictional orders',
    date: '2026-09-03',
    values: [900, 600, 450, 300, 150],
  },
  august: {
    label: 'August retail / 5 fictional orders',
    date: '2026-08-15',
    values: [750, 550, 400, 250, 100],
  },
};
const questions = [
  'What are the top five products in this dataset?',
  'Which customers generated the highest revenue?',
  'What is the average order value?',
  'How did quarterly sales change?',
];
export default function QueryLab() {
  const ready = useClientReady();
  const [tab, setTab] = useState('Ask your data');
  const [snapshot, setSnapshot] = useState<keyof typeof snapshots>('september');
  const [question, setQuestion] = useState(questions[0]);
  const [query, setQuery] = useState(0);
  const [error, setError] = useState('');
  const [safety, setSafety] = useState('safe');
  const [evaluation, setEvaluation] = useState('equivalent');
  const [node, setNode] = useState('Guard');
  const data = snapshots[snapshot];
  const total = data.values.reduce((a, b) => a + b, 0);
  const customerTotals = customers.reduce<Record<string, number>>((a, c, i) => {
    a[c] = (a[c] || 0) + data.values[i];
    return a;
  }, {});
  const rows: [string, number][] =
    query === 0
      ? products.map((p, i) => [p, data.values[i]])
      : query === 1
        ? Object.entries(customerTotals).sort((a, b) => b[1] - a[1])
        : query === 2
          ? [['Average order value', total / 5]]
          : [['Q3 2026', total]];
  const sql = [
    'SELECT product, SUM(revenue) AS revenue FROM sales GROUP BY product ORDER BY revenue DESC LIMIT 5;',
    'SELECT customer, SUM(revenue) AS revenue FROM sales GROUP BY customer ORDER BY revenue DESC LIMIT 5;',
    'SELECT AVG(revenue) AS average_order_value FROM sales;',
    'SELECT quarter, SUM(revenue) AS revenue FROM sales GROUP BY quarter ORDER BY quarter;',
  ][query];
  function answer() {
    const q = question.toLowerCase();
    const id = q.includes('product')
      ? 0
      : q.includes('customer')
        ? 1
        : q.includes('average') && q.includes('order')
          ? 2
          : q.includes('quarter')
            ? 3
            : -1;
    if (id < 0 || /delete|drop|password|employee|secret/i.test(q)) {
      setError(
        'This deterministic demo supports the four displayed retail questions only. No SQL is generated or executed for this request.',
      );
      return;
    }
    setError('');
    setQuery(id);
  }
  return (
    <div data-ready={ready} className="explorer query-workspace">
      <div className="workspace-heading">
        <div>
          <span className="eyebrow">QUERYBRIDGE / LOCAL ANALYTICS</span>
          <h4>The query laboratory</h4>
        </div>
        <ShieldCheck size={25} />
      </div>
      <p className="demo-disclosure">
        Two frozen synthetic datasets. Questions map to precomputed, matching
        SQL and results. No LLM or database connection is active.
      </p>
      <div className="tabs" aria-label="Query laboratory">
        {[
          'Ask your data',
          'SQL safety',
          'Results explorer',
          'Evaluation studio',
          'Agent workflow',
        ].map((t) => (
          <button
            key={t}
            disabled={!ready}
            className={tab === t ? 'active' : ''}
            aria-pressed={tab === t}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === 'Ask your data' || tab === 'Results explorer' ? (
        <>
          <label htmlFor="retail-snapshot">Synthetic dataset</label>
          <select
            id="retail-snapshot"
            disabled={!ready}
            value={snapshot}
            onChange={(e) =>
              setSnapshot(e.target.value as keyof typeof snapshots)
            }
          >
            {Object.entries(snapshots).map(([k, d]) => (
              <option key={k} value={k}>
                {d.label}
              </option>
            ))}
          </select>
          {tab === 'Ask your data' && (
            <>
              <label htmlFor="retail-question">
                Ask a question about the displayed data
              </label>
              <div className="query-question">
                <input
                  id="retail-question"
                  value={question}
                  maxLength={300}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <button
                  disabled={!ready}
                  onClick={answer}
                  className="button dark"
                >
                  Run sample <ArrowRight size={17} />
                </button>
              </div>
              <div className="search-examples">
                {questions.map((q, i) => (
                  <button
                    key={q}
                    onClick={() => {
                      setQuestion(q);
                      setQuery(i);
                      setError('');
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
              {error && (
                <p role="status" className="query-error">
                  {error}
                </p>
              )}
              <div className="query-pipeline">
                {[
                  'Question',
                  'Schema',
                  'Ollama concept',
                  'SQL validation',
                  'Read-only result',
                ].map((s) => (
                  <span key={s}>
                    {s}
                    <ArrowRight size={12} />
                  </span>
                ))}
              </div>
            </>
          )}
          <div className="lab-metrics">
            <div>
              <span>DATASET</span>
              <strong>{snapshot}</strong>
            </div>
            <div>
              <span>ORDERS</span>
              <strong>05</strong>
            </div>
            <div>
              <span>ACCESS</span>
              <strong>Read only</strong>
            </div>
          </div>
          <div className="lab-grid">
            <div className="code">
              <span>Precomputed SQL</span>
              <pre>{sql}</pre>
              <p>
                <Check size={15} /> Approved sales columns · bounded sample
              </p>
            </div>
            <div className="chart">
              {rows.map(([label, value]) => (
                <div className="bar-row" key={label}>
                  <span>{label}</span>
                  <div
                    style={{
                      width: `${(value / Math.max(...rows.map((r) => r[1]))) * 100}%`,
                    }}
                  />
                  <strong>${value.toLocaleString()}</strong>
                </div>
              ))}
            </div>
          </div>
          {query === 3 && (
            <p className="demo-note">
              Only Q3 is represented in either snapshot. Quarterly change cannot
              be computed from this sample.
            </p>
          )}
          <details>
            <summary>Inspect source data & result table</summary>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Quarter</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p}>
                    <td>{p}</td>
                    <td>{customers[i]}</td>
                    <td>{data.date}</td>
                    <td>Q3 2026</td>
                    <td>${data.values[i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>Result</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, value]) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td>${value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </>
      ) : tab === 'SQL safety' ? (
        <>
          <div className="artifact-tabs">
            {[
              ['safe', 'Read-only example'],
              ['destructive', 'Destructive example'],
              ['unauthorized', 'Unauthorized table'],
            ].map(([key, label]) => (
              <button
                key={key}
                aria-pressed={safety === key}
                onClick={() => setSafety(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <pre className="code">
            {safety === 'safe'
              ? 'SELECT product, revenue FROM sales LIMIT 5;'
              : safety === 'destructive'
                ? 'DROP TABLE sales;'
                : 'SELECT password_hash FROM private_users;'}
          </pre>
          <h3>
            {safety === 'safe'
              ? 'Permitted by the illustrated policy.'
              : 'Rejected before execution.'}
          </h3>
          <ul>
            <li>Read-only structure</li>
            <li>Approved tables and columns</li>
            <li>Allowed functions and query constraints</li>
            <li>Execution timeouts and row limits</li>
          </ul>
          <p>
            These fixed examples explain the policy. The portfolio does not run
            SQLGlot or execute SQL; the real local application documents AST
            validation, a five-second query timeout and a 200-row bound.
          </p>
        </>
      ) : tab === 'Evaluation studio' ? (
        <>
          <div className="artifact-tabs">
            {[
              ['equivalent', 'Equivalent result'],
              ['wrong', 'Wrong filter'],
              ['error', 'Execution error'],
            ].map(([key, label]) => (
              <button
                key={key}
                aria-pressed={evaluation === key}
                onClick={() => setEvaluation(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="lab-grid">
            <div className="code">
              <span>Generated / synthetic case</span>
              <pre>
                {evaluation === 'equivalent'
                  ? 'SELECT SUM(revenue) FROM sales;'
                  : evaluation === 'wrong'
                    ? "SELECT SUM(revenue) FROM sales WHERE product='Atlas';"
                    : 'SELECT SUM(total_cost) FROM sales;'}
              </pre>
            </div>
            <div className="code">
              <span>Reference / independent query concept</span>
              <pre>SELECT SUM(revenue) AS total FROM sales;</pre>
            </div>
          </div>
          <h3>
            {evaluation === 'equivalent'
              ? `Result match: $${total} = $${total}`
              : evaluation === 'wrong'
                ? `Result mismatch: $${data.values[0]} ≠ $${total}`
                : 'Execution error: total_cost is not an approved column.'}
          </h3>
          <p>
            Precomputed illustrative comparisons on frozen data. They show why
            wrong filters, missing rows, aggregates and execution errors need
            separate evaluation. No benchmark accuracy or held-out outcome is
            claimed.
          </p>
        </>
      ) : (
        <>
          <div className="flow">
            {[
              'Guard',
              'Retrieve schema',
              'Generate SQL',
              'Validate',
              'Execute',
              'Respond',
            ].map((s, i) => (
              <button
                key={s}
                aria-pressed={node === s}
                className={node === s ? 'active' : ''}
                onClick={() => setNode(s)}
              >
                <span>0{i + 1}</span>
                {s}
                <ArrowRight size={14} />
              </button>
            ))}
          </div>
          <div className="flow-detail" aria-live="polite">
            <strong>{node}</strong>
            <p>
              Guard input and scope → retrieve approved schema → local Ollama
              generation → AST validation → restricted execution → response.
              Validation and execution failures can retry generation within
              three total attempts.
            </p>
          </div>
          <p className="demo-note">
            Local single-user application. No persistent agent memory or
            cross-dataset joins claimed.
          </p>
        </>
      )}
    </div>
  );
}
