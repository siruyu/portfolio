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
