'use client';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Cloud,
  Database,
  Network,
  ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';
const nodes = [
  {
    name: 'MCP Client',
    tag: '01 / INTERFACE',
    icon: Network,
    description:
      'A compatible AI client selects a documented tool. The local bridge uses stdio; this diagram makes no live connection.',
  },
  {
    name: 'Python Bridge',
    tag: '02 / TRANSPORT',
    icon: ArrowRight,
    description:
      'The local Python bridge forwards requests using bearer authentication.',
  },
  {
    name: 'API Gateway',
    tag: '03 / BOUNDARY',
    icon: ShieldCheck,
    description:
      'An authenticated HTTPS entry point routes requests to the MCP service.',
  },
  {
    name: 'FastMCP Lambda',
    tag: '04 / TOOL DISPATCH',
    icon: Cloud,
    description:
      'Python tool handlers inspect permitted AWS APIs and return structured responses.',
  },
  {
    name: 'AWS APIs',
    tag: '05 / INSPECTION',
    icon: Network,
    description:
      'Costs, security hygiene, resources and diagnostics. Coverage depends on permissions, region and service availability.',
  },
  {
    name: 'DynamoDB Reports',
    tag: '06 / ASYNC STORAGE',
    icon: Database,
    description:
      'The scanner Lambda stores asynchronous scan reports in DynamoDB. This is a side path, not a mandatory stage of every MCP call.',
  },
];
export default function Blueprint() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(3);
  return (
    <div className="blueprint">
      <div className="blueprint-key">
        <span>
          <i /> REQUEST PATH
        </span>
        <span>
          <i /> ASYNC REPORTING
        </span>
        <span>SELECT A COMPONENT</span>
      </div>
      <div className="blueprint-path" aria-label="MCP request architecture">
        {nodes.slice(0, 5).map((node, i) => {
          const Icon = node.icon;
          return (
            <button
              key={node.name}
              aria-pressed={selected === i}
              className={selected === i ? 'selected' : ''}
              onClick={() => setSelected(i)}
            >
              <span className="blueprint-tag">{node.tag}</span>
              <Icon size={23} />
              <strong>{node.name}</strong>
              {i < 4 && (
                <span className="blueprint-wire" aria-hidden="true">
                  <ArrowRight size={13} />
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="blueprint-branches">
        <div>
          <span className="branch-label">EVENT-DRIVEN SCAN</span>
          <p>
            EventBridge <ArrowRight size={12} /> Scanner Lambda
          </p>
          <div className="branch-targets">
            <button
              aria-pressed={selected === 5}
              onClick={() => setSelected(5)}
            >
              <Database size={14} /> DynamoDB reports
            </button>
            <span>SNS notifications</span>
            <span>SQS failed events</span>
          </div>
        </div>
        <div>
          <span className="branch-label">SUPPORTING SERVICES</span>
          <p>Secrets Manager / bearer configuration</p>
          <p>Bedrock explanations</p>
          <p>CloudWatch diagnostics</p>
        </div>
      </div>
      <motion.div
        className="blueprint-inspector"
        aria-live="polite"
        key={selected}
        initial={false}
        animate={{ opacity: [0.6, 1], y: reduced ? 0 : [5, 0] }}
        transition={{ duration: reduced ? 0 : 0.22 }}
      >
        <span>INSPECTING / {nodes[selected].name}</span>
        <p>{nodes[selected].description}</p>
      </motion.div>
      <p className="micro">
        Interactive schematic · MCP-only deployment · no live AWS account
        connection
      </p>
    </div>
  );
}
