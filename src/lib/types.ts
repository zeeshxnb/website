export interface PersonalInfo {
  name: string;
  initials: string;
  tagline: string;
  bio: string;
  status: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  location: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  organization: string;
  type: "education" | "work" | "project" | "achievement";
  summary: string;
  details: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

export interface Book {
  title: string;
  author: string;
  isbn?: string;
  coverUrl?: string;
}
