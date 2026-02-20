export type ExperienceProject = {
  name: string;
  summary?: string;
  contributions?: string[];
  results?: string[];
  tech?: string[];
};

export type ExperienceItem = {
  company: string;
  location: string;
  role: string;
  term: string;
  description: string;
  responsibilities?: string[];

  projects?: ExperienceProject[];
};

export interface ExperienceSection {
  title: string
  items: ExperienceItem[]
}
