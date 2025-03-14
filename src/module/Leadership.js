import React from 'react';
import '../style/Leadership.css';
import pavelogo from '../assets/logos/pave-logo.png';  // Add your actual logo files
import tigerlaunchLogo from '../assets/logos/tigerlaunch-logo.png';

const Leadership = () => {
    const leadershipRoles = [
        {
            title: "Head of Software and Computer Vision",
            organization: "Princeton Autonomous Vehicle Engineering (PAVE)",
            period: "2023 - Present",
            description: "Promoted to Head of Software / Computer Vision, and currently designing a low-cost autonomous vehicle platform.",
            impact: ["Managed a team of 15 motivated students", "Designed and trained object detection and image segmentation models", "Led the design of a steering solution algorithm from sensory data", "Led the design of a virtual pilot simulation", "Planned and guided a subteam to create an ultrasonic dot cloud sensor", "Provided mentorship, guidance, and planning"],
            url: "https://blogs.princeton.edu/pave/about",
            logo: pavelogo
        },
        {
            title: "Head of Partnerships",
            organization: "TigerLaunch",
            period: "2023 - Present",
            description: "Two-year partnerships officer @ TigerLaunch, the world’s largest student-run entrepreneurship competition.",
            impact: ["Led a team of 6 and helped secure $130K in sponsorship funds for the 2024-2025 season.", "Built a robust desktop app that web-scrapes Princeton alumni contacts, increasing outreach output by 7x.", "Opened a new regional competition in Istanbul, Turkie, partnering with Turkie’s largest Venture Capital organization."],
            url: "https://tigerlaunch.com/home",
            logo: tigerlaunchLogo
        }
    ];

    const handleCardClick = (url) => {
        window.open(url, '_blank', 'noopener noreferrer');
    };

    return (
        <section className="leadership-section">
            <h2 className="section-title" id="leadership">Leadership</h2>
            <div className="leadership-container">
                <div className="leadership-left">
                    <h3>Making an Impact</h3>
                    <p className="leadership-intro">
                        Beyond my technical work, I am active on campus in various leadership roles. Here is some of the work I've been doing.
                    </p>
                </div>
                <div className="leadership-right">
                    {leadershipRoles.map((role, index) => (
                        <div 
                            key={index} 
                            className="leadership-card" 
                            onClick={() => handleCardClick(role.url)}
                            role="link"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleCardClick(role.url);
                                }
                            }}
                        >
                            <div className="leadership-header">
                                <img src={role.logo} alt={`${role.organization} logo`} className="organization-logo" />
                                <div className="header-text">
                                    <h4>{role.title}</h4>
                                    <span className="organization">{role.organization}</span>
                                    <span className="period">{role.period}</span>
                                </div>
                            </div>
                            <p className="description">{role.description}</p>
                            <ul className="impact-list">
                                {role.impact.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Leadership;