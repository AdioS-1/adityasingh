export interface Project {
  id: string;
  number: string;
  title: string;
  slug: string;
  client: string;
  year: string;
  role: string;
  category: 'Branding' | 'UI/UX' | 'Motion' | 'Spatial' | 'Editorial';
  summary: string;
  heroImage: string;
  accentColor: string;
  layoutVariant: 'full-bleed' | 'split-duo' | 'tall-editorial' | 'asymmetric-banner';
  services: string[];
  overview: string;
  challenge: string;
  approach: string;
  designSystem: {
    primaryFont: string;
    secondaryFont: string;
    colors: { name: string; hex: string; role: string }[];
    gridMetric: string;
  };
  gallery: {
    url: string;
    caption: string;
    aspectRatio: string;
  }[];
  outcome: string;
  impact: {
    metric: string;
    label: string;
  }[];
  liveUrl?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  previewImage: string;
  tags: string[];
}

export interface PlaybookStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  methods: string[];
  deliverables: string[];
}

export interface ToolItem {
  id: string;
  name: string;
  shortName: string;
  category: 'Design & Systems' | 'Motion & 3D' | 'Digital & Code';
  iconType: 'illustrator' | 'figma' | 'aftereffects' | 'photoshop' | 'blender' | 'framer' | 'webflow' | 'code';
  proficiency: number;
  yearsOfUse: string;
  focus: string;
}

export interface PlayExperiment {
  id: string;
  number: string;
  title: string;
  medium: string;
  year: string;
  description: string;
  image: string;
  interactiveType?: 'generative-flow' | 'kinetic-type' | 'glitch-mesh' | 'chromatic';
  tags: string[];
}
