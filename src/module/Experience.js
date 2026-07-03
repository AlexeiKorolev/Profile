import React, { useState } from 'react';
import '../style/Sections.css';

const Logo = ({ company, logo }) => {
    const [failed, setFailed] = useState(false);
    if (!logo || failed) {
        const initials = company
            .split(/[\s-]+/)
            .slice(0, 2)
            .map((w) => w[0])
            .join('')
            .toUpperCase();
        return <div className="row-logo monogram">{initials}</div>;
    }
    return (
        <img
            src={logo}
            alt={`${company} logo`}
            className="row-logo"
            loading="lazy"
            onError={() => setFailed(true)}
        />
    );
};

const experiences = [
    {
        role: 'Software Engineering Intern',
        company: 'Merck',
        period: 'Summer 2026',
        description: 'Software engineering with Merck\'s IT organization, building internal tooling at enterprise scale.',
        skills: ['Software Engineering', 'Enterprise IT'],
    },
    {
        role: 'Machine Learning Researcher',
        company: 'NASA Ames Research Center',
        period: '2025 – Present',
        description: 'Working with the Ames Coronagraph Experiment (ACE) team on reinforcement learning and lightweight ML for wavefront control — a new way to drive deformable mirrors in space-telescope coronagraphs.',
        skills: ['Reinforcement Learning', 'Python', 'Optics'],
        logo: 'https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg',
    },
    {
        role: 'Software Engineering Intern',
        company: 'Nuro',
        period: 'Summer 2025',
        description: 'Software engineering at Nuro, an autonomous driving company, working on infrastructure for self-driving systems.',
        skills: ['C++', 'Python', 'Autonomous Vehicles'],
    },
    {
        role: 'Data Science Intern',
        company: 'Lycoming Engines',
        period: 'Spring 2025',
        description: 'Built machine learning models to predict aircraft engine failures, combining signal processing, mathematics, and physics.',
        skills: ['Python', 'Machine Learning', 'Forecasting'],
        logo: 'https://www.lycoming.com/themes/custom/themekit/logo.svg',
    },
    {
        role: 'Data Science Intern',
        company: 'WIT Sports',
        period: 'Jan – Feb 2025',
        description: 'Revamped Fan AI, an algorithm predicting fan engagement, and built an in-house database of US zipcode prosperity scores.',
        skills: ['Python', 'SQL', 'Feature Engineering'],
    },
    {
        role: 'Data Research Intern',
        company: 'Princeton University',
        period: 'Summer 2024',
        description: 'Large-scale coarse-grained MD simulations of chromatin tension on the Princeton computing cluster (Jacobs Lab, Chemistry).',
        skills: ['C', 'Python', 'Simulation'],
        logo: 'https://www.princeton.edu/themes/custom/hobbes/logo.svg',
    },
    {
        role: 'Software Engineering Intern',
        company: 'Orgo',
        period: 'Summers 2023 & 2024',
        description: 'Built a customer-invite system boosting user acquisition by 25–50%, plus infrastructure for an "import from Google" feature.',
        skills: ['React Native', 'Firebase', 'Google Cloud'],
    },
    {
        role: 'App Developer Intern',
        company: 'Huntington Breast Cancer Action Coalition',
        period: 'Summer 2023',
        description: 'Built a lifestyle-tracking Android app for cancer prevention with a Hive-backed storage system.',
        skills: ['Android', 'Java', 'Hive'],
    },
    {
        role: 'Game Developer Intern',
        company: 'BTU Games',
        period: '2022 – 2023',
        description: 'C++ backend in Unreal Engine: OAuth 2.0 multi-platform login and a character movement framework for a soft-body physics engine.',
        skills: ['C++', 'Unreal Engine', 'OAuth 2.0'],
        logo: 'https://btugames.net/images/btu_logo.svg',
    },
    {
        role: 'AI Researcher',
        company: 'Rutgers GSET',
        period: 'Summer 2022',
        description: 'Led model development for an IEEE paper on biometric authentication via structure-borne sound, reaching >92.5% accuracy.',
        skills: ['MATLAB', 'Machine Learning', 'Signal Processing'],
    },
];

const Experience = () => (
    <div className="section-inner">
        <h2 className="section-heading">Experience</h2>
        <div className="row-grid">
            {experiences.map((exp, i) => (
                <article className="info-row" key={i}>
                    <Logo company={exp.company} logo={exp.logo} />
                    <div className="row-body">
                        <div className="row-top">
                            <h3 className="row-title">{exp.role}</h3>
                            <span className="row-period">{exp.period}</span>
                        </div>
                        <span className="row-subtitle">{exp.company}</span>
                        <p className="row-text">{exp.description}</p>
                        <div className="pill-row">
                            {exp.skills.map((s, j) => (
                                <span className="pill" key={j}>{s}</span>
                            ))}
                        </div>
                    </div>
                </article>
            ))}
        </div>
    </div>
);

export default Experience;
