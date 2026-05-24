export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  image: string;
  techStack: string[];
  duration: string;
  role: string;
  challenges: string;
  solutions: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Capability {
  id: string;
  num: string;
  title: string;
  description: string;
  details: string[];
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface SystemSettings {
  accentColor: 'red' | 'cyan' | 'lime' | 'amber';
  sphereSpeed: number; // 0.1 to 3
  particleDensity: number; // 100 to 1000
  showGridLines: boolean;
  wireframeStyle: 'points-and-lines' | 'lines' | 'points';
  matrixRain: boolean;
}
