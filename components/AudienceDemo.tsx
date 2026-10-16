'use client';
import { Info, MessageSquare, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { datasets, score, type Comment } from '../data/audience';
import { useClientReady } from './useClientReady';
function count(
  list: Comment[],
  key: 'sentiment' | 'emotion' | 'topic' | 'week',
) {
  return list.reduce<Record<string, number>>((a, c) => {
    const k = String(c[key]);
    a[k] = (a[k] || 0) + 1;
    return a;
  }, {});
}
const palette: Record<string, string> = {
  positive: '#78957e',
  neutral: '#8ca9b2',
  negative: '#a56b4f',
};
function Comments({ list }: { list: Comment[] }) {
  return (
    <div className="audience-comments">
      {list.length ? (
        list.map((c) => (
          <article key={c.id}>
            <div>
              <span>
                {c.id} · {c.language}
              </span>
              <span className={`sentiment-label sentiment-${c.sentiment}`}>
                {c.sentiment}
              </span>
            </div>
            <blockquote>{c.text}</blockquote>
            {c.translation && <p>Translation: {c.translation}</p>}
            <small>
              {c.topic} · {c.emotion} · {c.likes} fictional likes
            </small>
          </article>
        ))
      ) : (
        <p>
          No comments match this sample query. Try “security”, “slow”, or
          “deployment”.
        </p>
      )}
    </div>
  );
}
function Bars({
  values,
  total,
}: {
  values: Record<string, number>;
  total: number;
}) {
  return (
    <div className="audience-bars">
      {Object.entries(values).map(([k, n]) => (
        <div key={k}>
          <span>{k}</span>
          <i
            style={{
              width: `${(n / total) * 100}%`,
              background: palette[k] || '#8ca9b2',
            }}
          />
          <strong>
            {n} ({((n / total) * 100).toFixed(1)}%)
          </strong>
        </div>
      ))}
    </div>
  );
}
export default function AudienceDemo() {
  const ready = useClientReady();
  const [dataset, setDataset] = useState('tutorial');
  const [tab, setTab] = useState('Overview');
  const [sentiment, setSentiment] = useState('all');
  const [topic, setTopic] = useState('All');
  const [query, setQuery] = useState('security');
  const [explain, setExplain] = useState('T01');
  const [method, setMethod] = useState('SHAP');
  const data = datasets[dataset];
  const comments = data.comments;
  const sentiments = count(comments, 'sentiment');
  const topics = count(comments, 'topic');
  const s = score(comments);
  const selected = comments.find((c) => c.id === explain) || comments[0];
  const matches = useMemo(() => {
    const terms = query
      .toLowerCase()
      .split(/\W+/)
      .filter(
        (t) =>
          t.length > 2 &&
          !['the', 'about', 'comments', 'with', 'how', 'can', 'are'].includes(
            t,
          ),
      )
      .map((t) => (t.endsWith('s') ? t.slice(0, -1) : t));
    return comments
      .map((c) => ({
        comment: c,
        hits: terms.filter((t) =>
          (
            c.tags.join(' ') +
            ' ' +
            c.text.toLowerCase() +
            ' ' +
            (c.translation || '').toLowerCase()
          ).includes(t),
        ).length,
      }))
      .filter((x) => x.hits > 0)
      .sort((a, b) => b.hits - a.hits);
  }, [comments, query]);
  const positive = ((sentiments.positive || 0) / comments.length) * 100;
  const neutral = ((sentiments.neutral || 0) / comments.length) * 100;
  const visible = comments.filter((c) =>
    tab === 'Sentiment'
      ? sentiment === 'all' || c.sentiment === sentiment
      : topic === 'All' || c.topic === topic,
  );
  return (
    <div data-ready={ready} className="v4-demo audience-demo">
      <div className="v4-demo-heading">
        <div>
          <span>AUDIENCE INTELLIGENCE STUDIO</span>
          <h2>Feedback becomes a conversation.</h2>
        </div>
        <MessageSquare size={35} />
      </div>
      <p className="demo-disclosure">
        Fictional videos and manually labeled synthetic comments. YouTube API
        and NLP models are not connected. Charts are computed from the displayed
        examples.
      </p>
      <div className="audience-dataset">
        <label htmlFor="audience-dataset">Demonstration video</label>
        <select
          id="audience-dataset"
          disabled={!ready}
          value={dataset}
          onChange={(e) => {
            setDataset(e.target.value);
            setSentiment('all');
            setTopic('All');
            setExplain('');
          }}
        >
          {Object.entries(datasets).map(([key, d]) => (
            <option key={key} value={key}>
              {d.title}
            </option>
          ))}
        </select>
      </div>
      <div className="tabs" aria-label="Audience experience">
        {[
          'Overview',
          'Sentiment',
          'Emotions',
          'Topics',
          'Semantic search',
          'Explainability',
          'Audience score',
          'Evaluation',
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
      {tab === 'Overview' ? (
        <>
          <div className="audience-metrics">
            <div>
              <span>COMMENT SAMPLE</span>
              <strong>{comments.length}</strong>
            </div>
            <div>
              <span>FICTIONAL COMMENT LIKES</span>
              <strong>{comments.reduce((a, c) => a + c.likes, 0)}</strong>
            </div>
            <div>
              <span>LANGUAGES</span>
              <strong>{new Set(comments.map((c) => c.language)).size}</strong>
            </div>
            <div>
              <span>DEMO SCORE</span>
              <strong>
                {s.total.toFixed(1)}
                <small>/100</small>
              </strong>
            </div>
          </div>
          <div className="audience-overview">
            <div>
              <h3>Sentiment, with context.</h3>
              <div
                className="sentiment-donut"
                role="img"
                aria-label={`Positive ${positive.toFixed(0)}%, neutral ${neutral.toFixed(0)}%, negative ${(100 - positive - neutral).toFixed(0)}%`}
                style={{
                  background: `conic-gradient(#78957e 0 ${positive}%,#8ca9b2 ${positive}% ${positive + neutral}%,#a56b4f ${positive + neutral}% 100%)`,
                }}
              >
                <span>
                  {comments.length}
                  <small>comments</small>
                </span>
              </div>
              <Bars values={sentiments} total={comments.length} />
            </div>
            <div>
              <h3>A small, inspectable dataset.</h3>
              <p>{data.channel}</p>
              <Bars
                values={Object.fromEntries(
                  Object.entries(count(comments, 'week')).map(([week, n]) => [
                    'Week ' + week,
                    n,
                  ]),
                )}
                total={comments.length}
              />
              <p className="demo-note">
                Volume bars show Week 1, 2 and 3 of the fictional dataset.
                Public engagement, video views and live channel metrics are not
                inferred.
              </p>
              <button
                className="button dark"
                onClick={() => setTab('Sentiment')}
              >
                Inspect the comments <Search size={17} />
              </button>
            </div>
          </div>
        </>
      ) : tab === 'Sentiment' ? (
        <>
          <div className="audience-filter">
            {['all', 'positive', 'neutral', 'negative'].map((x) => (
              <button
                key={x}
                aria-pressed={sentiment === x}
                onClick={() => setSentiment(x)}
              >
                {x} {x === 'all' ? comments.length : sentiments[x] || 0}
              </button>
            ))}
          </div>
          <Bars values={sentiments} total={comments.length} />
          <Comments list={visible} />
        </>
      ) : tab === 'Emotions' ? (
        <>
          <h3>Different themes, different reactions.</h3>
          <label htmlFor="emotion-topic">Discussion theme</label>
          <select
            id="emotion-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option>All</option>
            {Object.keys(topics).map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <Bars
            values={count(visible, 'emotion')}
            total={Math.max(1, visible.length)}
          />
          <Comments list={visible} />
          <p className="demo-note">
            Emotion labels are manually assigned for this demonstration; they
            are not measured NLP outputs.
          </p>
        </>
      ) : tab === 'Topics' ? (
        <>
          <h3>A topic universe you can inspect.</h3>
          <div className="topic-universe">
            {Object.entries(topics).map(([name, n]) => (
              <button
                key={name}
                aria-pressed={topic === name}
                onClick={() => setTopic(name)}
                style={{ width: 96 + n * 18, height: 96 + n * 18 }}
              >
                <strong>{name}</strong>
                <span>{n} comments</span>
              </button>
            ))}
          </div>
          <p>
            Topics are hand-authored labels. A verified implementation would use
            BERTopic and embeddings to discover themes; these bubbles do not
            depict measured semantic distances.
          </p>
          <Comments
            list={
              topic === 'All'
                ? comments
                : comments.filter((c) => c.topic === topic)
            }
          />
        </>
      ) : tab === 'Semantic search' ? (
        <>
          <h3>Find related feedback.</h3>
          <label htmlFor="comment-search">
            Ask about the demonstration comments
          </label>
          <div className="comment-search">
            <Search size={20} />
            <input
              id="comment-search"
              value={query}
              maxLength={300}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Comments about security or slow builds"
            />
          </div>
          <div className="search-examples">
            {['security questions', 'slow builds', 'deployment'].map((q) => (
              <button key={q} onClick={() => setQuery(q)}>
                {q}
              </button>
            ))}
          </div>
          <p className="demo-note">
            Deterministic keyword/tag stand-in for semantic retrieval. No
            embeddings or FAISS search runs here; match counts are not cosine
            similarity.
          </p>
          <div className="search-ranks">
            {matches.map(({ comment, hits }) => (
              <div key={comment.id}>
                <span>{comment.id}</span>
                <i style={{ width: `${Math.min(100, hits * 25)}%` }} />
                <strong>{hits} keyword matches</strong>
              </div>
            ))}
          </div>
          <Comments list={matches.map((x) => x.comment)} />
        </>
      ) : tab === 'Explainability' ? (
        <>
          <h3>Inspect a prediction; don’t infer a cause.</h3>
          <label htmlFor="explain-comment">Synthetic comment</label>
          <select
            id="explain-comment"
            value={selected.id}
            onChange={(e) => setExplain(e.target.value)}
          >
            {comments.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} · {c.text.slice(0, 65)}
              </option>
            ))}
          </select>
          <div className="artifact-tabs">
            {['SHAP', 'Integrated Gradients'].map((m) => (
              <button
                key={m}
                aria-pressed={method === m}
                onClick={() => setMethod(m)}
              >
                {m} concept
              </button>
            ))}
          </div>
          <div className="token-explanation">
            {(selected.translation || selected.text)
              .split(' ')
              .map((word, i) => {
                const key = word.toLowerCase().replace(/[^a-z]/g, '');
                const weights: Record<string, number> = {
                  clear: 0.8,
                  useful: 0.6,
                  great: 0.7,
                  helped: 0.5,
                  slow: -0.8,
                  timeout: -0.7,
                  timed: -0.5,
                  not: -0.4,
                };
                const weight = weights[key] || 0;
                return (
                  <span
                    key={i}
                    title={`Illustrative influence ${weight}`}
                    style={{
                      background:
                        weight > 0
                          ? `rgba(120,149,126,${Math.abs(weight) * 0.5})`
                          : weight < 0
                            ? `rgba(165,107,79,${Math.abs(weight) * 0.5})`
                            : 'transparent',
                    }}
                  >
                    {word}
                    <small>{weight ? weight.toFixed(1) : '0'}</small>
                  </span>
                );
              })}
          </div>
          <p>
            {method} is a specified project explainability technique. This panel
            uses fixed teaching weights to illustrate influential words; it is
            not the output of either method.
          </p>
          <p className="demo-note">
            Attribution depends on the model and method. It does not establish
            causality, factual truth or a business outcome.
          </p>
        </>
      ) : tab === 'Audience score' ? (
        <>
          <div className="score-heading">
            <h3>A transparent demonstration score.</h3>
            <strong>
              {s.total.toFixed(1)}
              <small>/100</small>
            </strong>
          </div>
          <div className="score-components">
            {[
              ['Sentiment balance', s.sentiment, 0.5],
              ['Constructive comment share', s.constructive, 0.3],
              ['Non-question share', s.nonQuestion, 0.2],
            ].map(([label, value, weight]) => (
              <div key={String(label)}>
                <span>{label}</span>
                <i style={{ width: `${Number(value)}%` }} />
                <strong>
                  {Number(value).toFixed(1)} × {Number(weight) * 100}%
                </strong>
              </div>
            ))}
          </div>
          <p>
            Score = 50% sentiment balance + 30% constructive share + 20%
            non-question share. Sentiment balance gives positive = 1, neutral =
            0.5, negative = 0. All shares are calculated from this synthetic
            sample.
          </p>
          <p className="demo-note">
            <Info size={16} /> Portfolio-only formula, not the project's
            verified Audience Health Score or an industry standard. Questions
            are not inherently unhealthy; their weighting here is only a
            teaching assumption. The project formula has not been supplied.
          </p>
        </>
      ) : (
        <div className="evaluation-demo">
          <h3>Evaluation needs independent evidence.</h3>
          <table>
            <thead>
              <tr>
                <th>Synthetic test</th>
                <th>Reference</th>
                <th>Illustrative prediction</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>“clear and useful”</td>
                <td>positive</td>
                <td>positive</td>
                <td>match</td>
              </tr>
              <tr>
                <td>“build timed out”</td>
                <td>negative</td>
                <td>neutral</td>
                <td>mismatch</td>
              </tr>
              <tr>
                <td>“can it run locally?”</td>
                <td>neutral</td>
                <td>neutral</td>
                <td>match</td>
              </tr>
            </tbody>
          </table>
          <p>
            Two matching labels in three invented teaching cases. This is not a
            model benchmark. Multilingual evaluation should inspect label
            quality, class balance, per-language errors and held-out data.
          </p>
          <div className="evaluation-comparison">
            <span>
              Full proposed pipeline → sentiment + topics + semantic search
            </span>
            <span>
              Ablation concept → remove a component and compare independent
              results
            </span>
          </div>
          <p className="demo-note">
            Measured model performance and ablation results are unavailable.
            None are invented in this portfolio.
          </p>
        </div>
      )}
    </div>
  );
}
