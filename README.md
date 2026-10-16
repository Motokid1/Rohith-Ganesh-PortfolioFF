# The Builder’s DNA

Rohith Ganesh’s interactive engineering portfolio. Next.js App Router, React,
TypeScript, Three.js, React Three Fiber, Framer Motion and Tailwind CSS.
Static export includes eight case studies and a services studio.

## Development

Use Node.js 20.9 or later and npm:

```sh
npm ci
npm run dev
```

The development server is available at http://localhost:3000.

```sh
npm run format       # Format source and documentation
npm run format:check # Check formatting without editing
npm run typecheck    # Check TypeScript
npm run build        # Produce the static site in out/
```

Deploy `out/` to a static host. `.openai/hosting.json` preserves the existing
Sites project identity and declares the output directory. When changing domains,
update `app/layout.tsx`, `app/robots.ts` and `app/sitemap.ts`.

## Source structure

| Directory            | Purpose                                                    |
| -------------------- | ---------------------------------------------------------- |
| app/                 | Homepage, studio, case-study routes and metadata           |
| components/          | Reactor, project previews, demonstrations and inquiry form |
| data/                | Projects, profile, skills, services and demo fixtures      |
| styles/portfolio.css | Shared styles, responsive layouts and demo visual systems  |
| public/              | Social artwork and downloadable resumes                    |
| scripts/             | Production build, resume generation and source packaging   |

Edit projects in `data/projects.ts`, contact details and credentials in
`data/profile.ts`, skills in `data/skills.ts` and service offerings in
`data/services.ts`. `data/content.ts` re-exports these domains. Audience,
deployment and scoping fixtures have their own data files.

`WorkSection.tsx` controls homepage previews. `CaseStudy.tsx` owns case-study
perspectives; individual demo components own their interactions. Styles are
grouped by purpose in one stylesheet, preserving cascade order. The social SVG
is the editable source for the PNG used in metadata.

## Configuration

Copy `.env.example` to `.env.local` before building. NEXT_PUBLIC variables are
embedded in the static export and must never contain secrets. Email and LinkedIn
default to the supplied owner details. Availability is inquiry-only unless
NEXT_PUBLIC_AVAILABILITY=open. The booking link appears only when configured.

The contact form opens a prefilled email draft by default. To submit through a
provider, set NEXT_PUBLIC_CONTACT_ENDPOINT to a trusted HTTPS endpoint accepting
JSON `{name,email,message}`. The provider must support CORS and enforce validation,
rate limiting and spam prevention. The client handles validation, a honeypot,
timeouts and failures; it reports success only after a successful provider response.

## Demonstrations and evidence

All portfolio demonstrations use synthetic data and run locally. They do not
access AWS accounts, medical records, databases, YouTube or LLM APIs. Deployment
artifacts are teaching excerpts; audience labels and token weights are illustrative.
The audience demonstration score is a disclosed local formula, not a project
benchmark. Query examples use frozen data and deterministic responses.

DeployForge AI and AudienceLens AI are owner-supplied specifications with source
verification pending. Their case studies do not establish implemented functionality.
The other six case studies reflect their supplied repositories. AWS and PatientScope
test figures are historical repository-reported snapshots, not tests run here.
QueryBridge held-out accuracy and external application uptime are unverified.
Professional history and credentials are owner-supplied.

## Accessibility and assets

Navigation, forms and controls have semantic labels and visible focus states.
Reactor selection has equivalent HTML buttons and a static error fallback.
Responsive styles and reduced-motion alternatives cover diagrams and animations.
No external 3D assets, analytics or tracking are loaded. Google Fonts have local
fallbacks. Phone-width browser checks are emulations, not physical-device tests.

The PDFs contain selectable text and links. Regenerate them with
`python scripts/create_resume.py` after updating resume content; this requires
reportlab, pypdf and pypdfium2. Review the PDFs and ignored `.resume-preview/`
renders before replacing the downloads.

Create a source ZIP with `python scripts/package-source.py`. It excludes Git
metadata, dependencies, build output, local environment files and preview caches.
Keep package-lock.json, the hosting manifest and AGENTS.md in source control.
