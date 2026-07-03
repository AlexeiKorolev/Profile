import React from 'react';
import '../style/Sections.css';
import pavelogo from '../assets/logos/pave-logo.png';
import tigerlaunchLogo from '../assets/logos/tigerlaunch-logo.png';

const leadershipRoles = [
    {
        title: 'Lead of Software & Computer Vision',
        organization: 'Princeton Autonomous Vehicle Engineering (PAVE)',
        period: '2023 – Present',
        description: 'Leading the software and computer vision team building a low-cost autonomous vehicle platform.',
        impact: [
            'Manage a team of 15 students across perception, planning, and simulation',
            'Designed and trained object detection and image segmentation models',
            'Led the design of a steering solution algorithm from sensory data',
            'Built a virtual pilot simulation and guided an ultrasonic point-cloud sensor subteam',
        ],
        url: 'https://blogs.princeton.edu/pave/about',
        logo: pavelogo,
    },
    {
        title: 'Head of Partnerships',
        organization: 'TigerLaunch',
        period: '2023 – Present',
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
