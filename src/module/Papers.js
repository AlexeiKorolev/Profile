import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Sections.css';

const papers = [
    {
        title: 'Othello-GPT: World Model Emergence and Drift During Training',
        venue: 'Independent research · UW Hyak (klone) compute',
        year: '2026',
        authors: 'A. Korolev',
        description: 'Traced when the board world model appears during training and whether it is stable once formed. The representation is decodable by epoch 2 and causally mature by epoch 4, but continues to drift for the remainder of the run, with a measurable asymmetry between early and late probes.',
        links: { report: '/othello-gpt' },
    },
    {
        title: 'Lightweight Machine Learning for Wavefront Control in Coronagraphs',
        venue: 'NASA Ames Coronagraph Experiment (ACE) collaboration',
        year: '2025 – Present',
        authors: 'A. Korolev, with the NASA Ames ACE team',
        description: 'Investigating lightweight and reinforcement-learning approaches to wavefront control for deformable mirrors in space-telescope coronagraphs.',
        links: { github: 'https://github.com/AlexeiKorolev/Lightweight-ML-for-Wavefront-Control-in-Coronagraphs' },
    },
    {
        title: 'Inferring LLM Training-Data Composition from BPE Tokenizer Merge Rules',
        venue: 'Princeton University, COS 484 (Natural Language Processing)',
        year: '2025',
        authors: 'A. Korolev, M. Zhang, B. Zhou',
        description: 'Cast BPE merge order into a linear program to estimate what DeepSeek models were trained on (e.g. 56% code for R1), and proposed a K-Random BPE defense that blunts the attack at ~0.02 extra tokens per word.',
        links: { github: 'https://github.com/AlexeiKorolev/DeepSeek-Tokenizer-Attack' },
    },
    {
        title: 'Measuring Chromatin Tension via Coarse-Grained Molecular Dynamics',
        venue: 'Princeton Summer Research Colloquium · Jacobs Lab, Dept. of Chemistry',
        year: '2024',
        authors: 'A. Korolev, advised by Prof. William Jacobs',
        description: 'Designed and validated a Python tool for calculating and visualizing molecular tension in large-scale chromatin simulations run on the Princeton computing cluster.',
        links: { website: 'https://arxiv.org/abs/2606.02275v1' },
    },
    {
        title: 'A Secure and Reliable Mobile Authentication Alternative Utilizing Hand Structure',
        venue: 'IEEE MIT Undergraduate Research Technology Conference (URTC)',
        year: '2022',
        authors: 'S. Chatiwala, R. Hajarnis, A. Korolev, D. Park, D. Shenkerman',
        description: 'Proposed a biometric authentication system using hand structure and structure-borne sound; led the AI model development, achieving >92.5% accuracy without overfitting.',
        links: { website: 'https://ieeexplore.ieee.org/document/10002184' },
    },
    {
        title: 'Phonetic Sentiment: How Pronunciation Encodes Meaning in English',
        venue: 'Independent research',
        year: '2024',
        authors: 'A. Korolev',
        description: 'Demonstrated that English encodes sentiment within the phonetics of words. It\'s a proof of concept for extremely lightweight sentiment models.',
        links: { github: 'https://github.com/AlexeiKorolev/NLP-Phonetic-Sentiment' },
    },
];

const Papers = () => (
    <div className="section-inner">
        <h2 className="section-heading">Papers &amp; Research</h2>
        <div className="paper-list">
            {papers.map((paper, i) => (
                <article className="paper-card" key={i}>
                    <div className="row-top">
                        <h3 className="row-title">{paper.title}</h3>
                        <span className="row-period">{paper.year}</span>
                    </div>
                    <span className="row-subtitle">{paper.venue}</span>
                    <span className="paper-authors">{paper.authors}</span>
                    <p className="row-text">{paper.description}</p>
                    <div className="link-row">
                        {paper.links.report && (
                            <Link className="link-strong" to={paper.links.report}>
                                <i className="fas fa-book-open"></i> Read the report
                            </Link>
                        )}
                        {paper.links.website && (
                            <a href={paper.links.website} target="_blank" rel="noopener noreferrer">
                                <i className="fas fa-external-link-alt"></i> View
                            </a>
                        )}
                        {paper.links.github && (
                            <a href={paper.links.github} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-github"></i> Code
                            </a>
                        )}
                    </div>
                </article>
            ))}
        </div>
    </div>
);

export default Papers;
