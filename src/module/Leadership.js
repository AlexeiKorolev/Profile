import React from 'react';
import '../style/Sections.css';
import pavelogo from '../assets/logos/pave-logo.png';
import tigerlaunchLogo from '../assets/logos/tigerlaunch-logo.png';

const leadershipRoles = [
    {
        title: 'Co-President',
        organization: 'Princeton Autonomous Vehicle Engineering (PAVE)',
        period: '2023 – 2026',
        description: 'Co-president of Princeton\'s top undergraduate autonomous vehicle engineering club, after leading its software & computer vision team.',
        impact: [
            'Led 25 members across 4 subteams building an AI driver — depth sensing, object detection, custom image-embedding models, and microcontrollers',
            'Hosted an autonomous vehicle demo day with Google DeepMind, Blue Origin, and Toyota — 100+ attendees',
            'Integrated the team into Professor Felix Heide\'s lab: access to a road-legal car outfitted with high-end sensors',
            'Brought in Waymo and Aurora Flight Sciences as speakers; helped secure $15K in project funding',
        ],
        url: 'https://blogs.princeton.edu/pave/about',
        logo: pavelogo,
    },
    {
        title: 'Head of Partnerships',
        organization: 'TigerLaunch',
        period: '2023 – 2025',
        description: 'Partnerships lead at the world\'s largest student-run entrepreneurship competition.',
        impact: [
            'Led a team of 6 and secured >$90K in sponsorships for the 2024–25 season',
            'Built a desktop app that scrapes Princeton alumni contacts, a 7× boost to outreach',
            'Opened a new regional competition in Istanbul with Türkiye\'s largest VC organization',
        ],
        url: 'https://tigerlaunch.com/home',
        logo: tigerlaunchLogo,
    },
];

const Leadership = () => (
    <div className="section-inner">
        <h2 className="section-heading">Leadership</h2>
        <p className="section-lede">
            Beyond technical work, I'm active on campus in leadership roles.
        </p>
        <div className="leader-list">
            {leadershipRoles.map((role, i) => (
                <a
                    className="leader-card"
                    key={i}
                    href={role.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="leader-header">
                        <img src={role.logo} alt={`${role.organization} logo`} className="row-logo" loading="lazy" />
                        <div className="row-body">
                            <div className="row-top">
                                <h3 className="row-title">{role.title}</h3>
                                <span className="row-period">{role.period}</span>
                            </div>
                            <span className="row-subtitle">{role.organization}</span>
                        </div>
                    </div>
                    <p className="row-text">{role.description}</p>
                    <ul className="impact-list">
                        {role.impact.map((item, j) => (
                            <li key={j}>{item}</li>
                        ))}
                    </ul>
                </a>
            ))}
        </div>
    </div>
);

export default Leadership;
