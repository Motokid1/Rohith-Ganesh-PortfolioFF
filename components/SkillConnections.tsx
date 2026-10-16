'use client';
import Link from 'next/link';
import type { Project } from '../data/content';
import { casePath } from '../data/routes';
export default function SkillConnections({
  skill,
  related,
}: {
  skill: string;
  related: Project[];
}) {
  const height = Math.max(180, related.length * 52 + 40);
  return (
    <div className="skill-connections">
      <svg viewBox={`0 0 620 ${height}`} aria-hidden="true">
        <rect
          x="12"
          y={height / 2 - 28}
          width="185"
          height="56"
          fill="#202421"
          rx="2"
        />
        <text
          x="104"
          y={height / 2 + 5}
          textAnchor="middle"
          fill="#f6f4ef"
          fontSize="15"
        >
          {skill}
        </text>
        {related.map((p, i) => {
          const y = 36 + i * 52;
          return (
            <g key={p.id}>
              <path
                d={`M197 ${height / 2} C 275 ${height / 2} 280 ${y} 350 ${y}`}
                fill="none"
                stroke={p.color}
                strokeWidth="1.5"
              />
              <circle cx="350" cy={y} r="4" fill={p.color} />
              <text x="370" y={y + 5} fill="#202421" fontSize="14">
                {p.title}
                {!p.repo ? ' / specification' : ''}
              </text>
            </g>
          );
        })}
      </svg>
      <div>
        <span className="eyebrow">{skill} → project evidence</span>
        {related.length ? (
          related.map((p) => (
            <Link href={casePath(p.id)} key={p.id}>
              {p.title}
              <span>
                {p.repo ? 'Repository documented' : 'Owner specification'} ↗
              </span>
            </Link>
          ))
        ) : (
          <p>
            Listed engineering knowledge. No direct project evidence is claimed
            for this technology in these cases.
          </p>
        )}
      </div>
    </div>
  );
}
