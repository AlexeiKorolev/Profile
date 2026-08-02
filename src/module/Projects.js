import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Sections.css';
import nlpVideo from '../assets/videos/nlp.mp4';
import smlVideo from '../assets/videos/SML 310.mp4';
import particleVideo from '../assets/videos/Particle Sim.mp4';
import profileVideo from '../assets/videos/Profile.mp4';

const projects = [
    {
        title: 'Othello-GPT: World Model Emergence and Drift',
        description: 'A study of when the board world model appears during training and how stable it is afterward. It becomes decodable by epoch 2 and causally mature by epoch 4, after which further probe improvement yields no causal gain, while the representation continues to drift for the rest of the run.',
        skills: ['PyTorch', 'Interpretability', 'Transformers'],
        links: { report: '/othello-gpt' },
        featured: true,
    },
    {
        title: 'RL Wavefront Control for Space Telescopes',
        description: 'Reinforcement learning models for driving deformable mirrors in coronagraphs, built with the NASA Ames Coronagraph Experiment team.',
        skills: ['Python', 'Reinforcement Learning', 'Optics'],
        links: { github: 'https://github.com/AlexeiKorolev/NASA-RL-Wavefront-Control' },
    },
    {
        title: 'DeepSeek Tokenizer Attack',
        description: 'Inferred the training-data composition of DeepSeek models from their BPE tokenizer merge rules, and designed a K-Random BPE defense.',
        skills: ['Python', 'LLMs', 'Security'],
        links: { github: 'https://github.com/AlexeiKorolev/DeepSeek-Tokenizer-Attack' },
    },
    {
        title: 'Molecular Gas Simulation Engine',
        description: 'Optimized 3D molecular dynamics simulator in C++ (Lennard-Jones forces, periodic boundaries) — 10× faster than the Python baseline; derived the Boltzmann distribution from the sim.',
        skills: ['C++', 'Simulation', 'Optimization'],
        video: particleVideo,
        links: { github: 'https://github.com/AlexeiKorolev/Gas-Simulation' },
    },
    {
        title: 'Forecasting StarCraft II Victories',
        description: 'LSTM networks predicting StarCraft II match outcomes with 92% accuracy — nearly 10% over prior research.',
        skills: ['Python', 'RNNs', 'Machine Learning'],
        video: smlVideo,
        links: { github: 'https://github.com/AlexeiKorolev/Starcraft-LSTM-Prediction' },
    },
    {
        title: 'TigerLaunch Alumni Scraper',
        description: 'Desktop app that web-scrapes Princeton alumni contacts with a controlled browser, UI, and data exports — 7× outreach output for TigerLaunch.',
        skills: ['Python', 'Automation', 'UI'],
        links: { github: 'https://github.com/AlexeiKorolev/TigerLaunch-Scraper' },
    },
    {
        title: 'TigerMarket',
        description: 'AI-augmented marketplace web app for Princeton students.',
        skills: ['React', 'Node.js', 'Full Stack'],
        video: nlpVideo,
        links: { website: 'https://tigermarket-f7555a069d76.herokuapp.com/' },
    },
    {
        title: 'Phonetic Sentiment Model',
        description: 'Showed that English encodes sentiment in the phonetic pronunciation of words — a proof of concept for lightweight NLP sentiment models.',
        skills: ['Python', 'NLP', 'Research'],
        video: nlpVideo,
        links: { github: 'https://github.com/AlexeiKorolev/NLP-Phonetic-Sentiment' },
    },
    {
        title: 'This Website',
        description: 'A hand-built React portfolio with plus-shaped spatial navigation. No templates.',
        skills: ['React', 'CSS', 'Design'],
        video: profileVideo,
        links: { github: 'https://github.com/AlexeiKorolev/Profile' },
    },
];

const ProjectCard = ({ title, description, video, skills, links, featured }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <article
            className={`project-tile ${featured ? 'project-tile-featured' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {video && isHovered && (
                <video className="tile-video" autoPlay muted loop playsInline>
                    <source src={video} type="video/mp4" />
                </video>
            )}
            <div className="tile-content">
                {featured && <span className="tile-flag">Featured research</span>}
                <h3 className="row-title">{title}</h3>
                <p className="row-text">{description}</p>
                <div className="pill-row">
                    {skills.map((s, i) => (
                        <span className="pill" key={i}>{s}</span>
                    ))}
                </div>
                <div className="link-row">
                    {links.report && (
                        <Link className="link-strong" to={links.report}>
                            <i className="fas fa-book-open"></i> Read the report
                        </Link>
                    )}
                    {links.github && (
                        <a href={links.github} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i> GitHub
                        </a>
                    )}
                    {links.website && (
                        <a href={links.website} target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-globe"></i> Website
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
};

const Projects = () => (
    <div className="section-inner">
        <h2 className="section-heading">Projects</h2>
        <div className="tile-grid">
            {projects.map((project, i) => (
                <ProjectCard key={i} {...project} />
            ))}
        </div>
        <a
            className="section-more"
            href="https://github.com/AlexeiKorolev"
            target="_blank"
            rel="noopener noreferrer"
        >
            <i className="fab fa-github"></i> More on GitHub
        </a>
    </div>
);

export default Projects;
