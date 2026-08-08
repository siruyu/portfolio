import { Project, Capability } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'tbrls',
    number: '00',
    title: 'TBRLS',
    tagline: 'Token Bucket Rate Limiter Service — a standalone, networked rate-limiting service with persistent state, admin API, and horizontal scalability.',
    category: 'BACKEND_SERVICE',
    description: 'A production-grade, networked rate-limiting service implementing Token Bucket and Sliding Window algorithms with PostgreSQL-persisted state. Enforces shared limits across service replicas via advisory locks, exposes runtime client configuration through a full admin API with named accounts and key rotation, returns standard X-RateLimit-* headers, and propagates config changes across replicas in milliseconds via LISTEN/NOTIFY. Ships a built-in React console, OpenTelemetry tracing, and k6-verified concurrency safety (500+ RPS, zero double-spends, p99 < 50ms).',
    image: '/images/3.png',
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'React', 'k6', 'OpenTelemetry'],
    duration: '10-Week Production Build',
    role: 'Lead Backend Engineer & Systems Architect',
    challenges: 'Guaranteeing atomic check-and-consume with zero double-spends under 500+ RPS concurrent load, and sharing exact bucket state across replicas without a message bus.',
    solutions: 'PostgreSQL advisory locks with single-transaction atomic check-and-consume, plus config propagation across replicas via LISTEN/NOTIFY. Correctness proven with k6 load tests: p99 < 50ms, 0% errors, exact ALLOW/DENY counts.',
    githubUrl: 'https://github.com/siruyu/tbrls'
  },
  {
    id: 'apisim',
    number: '01',
    title: 'APISIM',
    tagline: 'Tiered API Business Simulator — a stateless gateway that demonstrates the TBRLS platform working live inside a realistic multi-tenant API business.',
    category: 'GATEWAY_DEMO',
    description: 'A thin, stateless gateway in front of TBRLS that makes every rate-limiting feature visible, exerciseable, and demonstrable in real time. Wraps /api/v1/check directly and never reimplements rate limiting, forwarding X-RateLimit-* headers byte-for-byte and failing closed (503 + Retry-After) when TBRLS is unreachable. Ships a four-tab React console (Overview, Playground, Operate, Live), three seeded demo customers exercising both algorithms simultaneously, a continuous traffic simulator with weighted-cost payloads, and a scripted operator playbook covering live tier bumps, bucket refill/reset, new tenants, and admin key rotation.',
    image: '/images/4.png',
    techStack: ['Python', 'FastAPI', 'React', 'Vite', 'Tailwind', 'TBRLS'],
    duration: '6-Week Build',
    role: 'Full Stack Developer',
    challenges: 'Making TBRLS live-enforceable and demoable end-to-end — byte-for-byte header fidelity, a fail-safe relay with no silent ALLOW, and a console that turns real-time tier enforcement into a readable story.',
    solutions: 'A pure transparent wrapper over /api/v1/check with verbatim header forwarding, 503 + Retry-After on relay failure, and a four-tab React console plus scripted playbook for live tier changes, bucket ops, and weighted-cost demos.',
    githubUrl: 'https://github.com/siruyu/apisim'
  },
  {
    id: 'evolve',
    number: '02',
    title: 'Evolve',
    tagline: 'A multi-disciplinary creative agency blending brand direction, advanced technology, and performance marketing into one connected approach.',
    category: 'AGENCY',
    description: 'Evolve is a multi-disciplinary creative agency that blends brand direction, advanced technology, and performance marketing into one connected approach. We build authentic connections between brands and people — where every experience, physical or digital, becomes part of the same story.',
    image: '/images/2.png',
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS 4', 'Motion', 'PostCSS', 'Lenis'],
    duration: '4 Weeks (Agency Platform)',
    role: 'Full Stack Developer & Creative Director',
    challenges: 'Building a feature-rich agency website with a custom video hero, smooth Lenis scrolling, interactive service accordion, project slider with live KPIs, marquee ticker, and newsletter signup — all requiring precise animation timing and fast load performance across multiple sections.',
    solutions: 'Leveraged Next.js 15 App Router for server-component-first architecture and optimal code splitting. Used Motion for declarative spring animations, integrated Lenis for jank-free smooth scrolling, and built the entire UI with Tailwind CSS 4 + PostCSS for a minimal stylesheet footprint.',
    githubUrl: 'https://github.com/siruyu/evolve-agency',
    liveUrl: 'https://madewithevolve.vercel.app'
  },
  {
    id: 'ossuary',
    number: '03',
    title: 'Ossuary. digital graveyard',
    tagline: 'A clean memorial repository and digital tombstone network for keeping memories intact.',
    category: 'WEBAPP',
    description: 'Developed as a digital sanctuary to archive dropped ideas, deprecated lines of code, and nostalgic web projects that deserve a beautiful final resting place. Bridges raw minimalist styling with robust decentralized static hosting.',
    image: '/images/regenerated_image_1779605572562.png',
    techStack: ['React', 'IPFS/IPNS', 'TailwindCSS 4', 'Vite', 'Three.js GLSL'],
    duration: '3 Weeks (Experimental Project)',
    role: 'Lead Developer & Creative Director',
    challenges: 'Designing a lightweight 3D memorial grid system that runs perfectly inside web containers without causing fan throttle or CPU lag.',
    solutions: 'Built custom rendering pipelines with instanced WebGL nodes, reducing overall active drawing loops and keeping browser overhead below 2% CPU.',
    liveUrl: 'https://ossuary.vercel.app',
    githubUrl: 'https://github.com/siruyu/ossuary'
  },
  {
    id: 'musica',
    number: '04',
    title: 'MUSICA',
    tagline: 'Cloud music streaming platform with deep custom synthesized spatial filters and dynamic waveforms.',
    category: 'CLOUD_SUITE',
    description: 'An experimental cloud audio deck featuring raw real-time visualizers, high-performance web audio processing nodes, and playlist compilation using local decentralized storage engines.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
    techStack: ['Web Audio API', 'React 19', 'WebSockets', 'TailwindCSS', 'IndexedDB'],
    duration: '2 Months (SaaS Core Prototype)',
    role: 'Full Stack Audio Engineer',
    challenges: 'Achieving consistent sub-millisecond synchronization between visual feedback lines and dynamic audio spectrum output.',
    solutions: 'Utilized dedicated Web Workers to offload audio analytics processing, avoiding main thread layout blocking.',
    liveUrl: 'https://ais-dev-zxax54s43u5zw4m74mm7yz-603573215949.asia-southeast1.run.app',
    githubUrl: 'https://github.com/siruyu/Musica'
  },
  {
    id: 'ui-ux',
    number: '05',
    title: 'UI/UX ARCHITECTURE',
    tagline: 'Professional portfolio layouts focused on absolute typographic alignment and modular fluid grids.',
    category: 'DESIGN_ENGINE',
    description: 'A collective system of premium interactive code layouts built strictly around modular components, high-density layouts, custom typography scales, and custom timing transitions.',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1000&auto=format&fit=crop',
    techStack: ['Vite', 'TypeScript', 'Fluid Sizing', 'Motion CSS', 'SVG Vectorization'],
    duration: 'Continuous Engineering',
    role: 'Systems Architect',
    challenges: 'Implementing strict desktop-first pixel alignment that scales perfectly down to compact mobile displays without wrapping text in an awkward draft way.',
    solutions: 'Designed an elegant rem-scaling modular fluid grid, leveraging modern container queries and clamp functions for seamless density control.',
    liveUrl: 'https://ais-dev-zxax54s43u5zw4m74mm7yz-603573215949.asia-southeast1.run.app',
    githubUrl: 'https://github.com/siruyu/Musica'
  }
];

export const CAPABILITIES: Capability[] = [
  {
    id: 'cap1',
    num: '01',
    title: 'Digital Platform Design',
    description: 'Architecting ultra-responsive design environments for web and desktop installations.',
    details: [
      'Precision fluid grids configured using raw mathematical parameters.',
      'Highly accessible typography pairs built on the Golden Ratio.',
      'Structured views designed to host massive datasets neatly.'
    ]
  },
  {
    id: 'cap2',
    num: '02',
    title: 'Brand Architecture',
    description: 'Developing consistent, high-impact semantic token definitions for visual integrity.',
    details: [
      'Tailored color palettes designed for maximum dark or light room eye-safety.',
      'Systematic design-to-code components using standardized layouts.',
      'Rigid design rule sets preventing aesthetic fragmentation.'
    ]
  },
  {
    id: 'cap3',
    num: '03',
    title: 'Creative Engineering',
    description: "Bridging the gap between brutalist aesthetics and high-performance code, ensuring structural permanence.",
    details: [
      "I don't just design; I construct. Bridging the gap between brutalist aesthetics and high-performance code, ensuring every digital structure is built for permanence and speed.",
      "Optimized DOM node management keeping page paint time below 45ms.",
      "Clean server integration supporting highly robust metadata storage."
    ]
  },
  {
    id: 'cap4',
    num: '04',
    title: 'Motion & Interaction',
    description: 'Fostering deep client focus through spring-based layouts and instant click responses.',
    details: [
      'Spring physics curves that respond directly to cursor drag vectors.',
      'Staggered lists that unveil content logically rather than jarring the client.',
      'Interactive canvas particles rendering on responsive high-resolution contexts.'
    ]
  }
];

export const BIOGRAPHY = {
  name: 'Aisik_SAHA',
  role: 'Creative System Developer',
  yearsActive: 'Est. 2024',
  tagline: 'As a developer, I operate with a clear preference for efficiency, speed, and deep technical control. My projects range from high-level cinematic automation to practical, business-oriented applications like SaaS solutions for retail.',
  aboutMeLong: "Currently in my 2nd year of a Bachelor's degree in Computer Science. I construct for digital permanence, rejecting ephemeral design movements. By employing systematic code structures and high-performance rendering libraries, I build web layouts that remain forever crisp, clean, and highly effective.",
  details: {
    location: 'India',
    email: 'saha.rik2006@gmail.com',
    currentFocus: 'Prisma & High-performance SQLite database engines',
    collaboration: 'Web Projects, Creative Design, Prototyping',
    interests: 'Video Editing & Cinematic Production, Cinematic Automation, SaaS for retail'
  }
};
