import React, { useRef, useState } from 'react';
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
        role: 'Data Science Intern',
        company: 'Meta',
        period: 'Summer 2026',
        description: 'Working on content farming metrics — measuring and modeling mass-produced content on the platform.',
        skills: ['Python', 'SQL', 'Data Science'],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
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
        period: 'Winter 2026',
        description: 'Developed a novel camera–LiDAR calibration method for autonomous vehicles, combining learned visual features with geometric optimization for accurate sensor alignment without structured calibration targets.',
        skills: ['C++', 'Computer Vision', 'Sensor Calibration'],
    },
    {
        role: 'AI Intern',
        company: 'Kenvue',
        period: 'Summer 2025',
        description: 'Deployed an LLM agent that makes interfacing with networking tools easier.',
        skills: ['LLMs', 'Python', 'Networking'],
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
        role: 'Computational Chemistry Research Intern',
        company: 'Princeton University',
        period: 'Summer 2024',
        description: 'Large-scale coarse-grained MD simulations of chromatin tension on the Princeton computing cluster (Jacobs Lab, Chemistry).',
        skills: ['C', 'Python', 'Simulation'],
        logo: 'https://www.princeton.edu/themes/custom/hobbes/logo.svg',
    },
    {
        role: 'AI Researcher',
        company: 'Rutgers GSET',
        period: 'Summer 2022',
        description: 'Led model development for an IEEE paper on biometric authentication via structure-borne sound, reaching >92.5% accuracy.',
        skills: ['MATLAB', 'Machine Learning', 'Signal Processing'],
    },
];

// Scrolls horizontally so its axis never lines up with the vertical
// wheel/swipe gesture that navigates back to the hub.
const Experience = () => {
    const scrollRef = useRef(null);
    const drag = useRef(null);

    const onMouseDown = (e) => {
        e.preventDefault();
        drag.current = { startX: e.clientX, startLeft: scrollRef.current.scrollLeft };
    };
    const onMouseMove = (e) => {
        if (!drag.current) return;
        scrollRef.current.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
    };
    const endDrag = () => { drag.current = null; };

    return (
        <div className="xsection">
            <h2 className="section-heading">Experience</h2>
            <div
                className="h-scroll"
                ref={scrollRef}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={endDrag}
                onMouseLeave={endDrag}
            >
                <div className="h-grid">
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
            <p className="x-hint">drag or scroll sideways</p>
        </div>
    );
};

export default Experience;
