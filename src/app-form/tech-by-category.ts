export const FRONTEND_SKILLS = [
    'JavaScript',
    'TypeScript',
    'Webpack',
    'Jest',
    'Angular',
    'React',
    'Vue',
    'Svelte',
    'Tailwind',
    'Lit',
    'Alpine',
    'SolidJS',
    'Git',
];

export const BACKEND_SKILLS = [
    'NodeJS',
    'Python',
    'NestJS',
    'Django',
    'PHP',
    'Laravel',
    'SQL',
    'AWS',
    'Rust',
    'Go',
    'Java',
    'Git',
    'C#',
    'C++',
    'Elixir',
    'MongoDB',
    'Redis',
    'RabbitMQ',
    'Kafka',
    'GCP',
    'Azure',
];

export const FULLSTACK_SKILLS = Array.from(new Set([
    ...BACKEND_SKILLS,
    ...FRONTEND_SKILLS,
]));

export const MOBILE_SKILLS = [
    'Flutter',
    'React Native',
    'Swift',
    'Objective C',
    'Java',
    'Android',
    'iOS'
];

export const DEVOPS_SKILLS = [
    'Git',
    'Kubernetes',
    'Jenkins',
    'Docker',
    'Chef',
    'AWS',
    'GCP',
    'Azure'
];

export const TECH_BY_CATEGORY = {
    frontend: FRONTEND_SKILLS,
    backend: BACKEND_SKILLS,
    fullstack: FULLSTACK_SKILLS,
    mobile: MOBILE_SKILLS,
    devops: DEVOPS_SKILLS
};

export const CATEGORIES = [
    {
        label: 'Backend',
        value: 'backend'
    },
    {
        label: 'Frontend',
        value: 'frontend'
    },
    {
        label: 'Fullstack',
        value: 'fullstack'
    },
    {
        label: 'Mobile',
        value: 'mobile'
    },
    {
        label: 'Testing',
        value: 'testing'
    },
    {
        label: 'Devops',
        value: 'devops'
    },
    {
        label: 'Embedded',
        value: 'embedded'
    },
    {
        label: 'Architecture',
        value: 'architecture'
    },
    {
        label: 'Security',
        value: 'security'
    },
    {
        label: 'Game dev',
        value: 'game-dev'
    },
    {
        label: 'Artificial Intelligence',
        value: 'ai'
    }
];
