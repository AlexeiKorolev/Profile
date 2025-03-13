import React, { useState, useEffect } from 'react';
import '../style/Experience.css';
import '../style/App.css';
import { useInView } from 'react-intersection-observer';


const ExperienceCard = ({ role, company, period, description, skills, detailedSkills, logo }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [flipper, setFlipper] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    useEffect(() => {
        const blurElement = document.querySelector('.blur-er');
        if (blurElement) {
            if (isHovered) {
                blurElement.classList.add('active');
            } else {
                blurElement.classList.remove('active');
            }
        }
    }, [isHovered, flipper]);

    return (
        <div ref={ref} className={`experience-card-wrapper ${inView ? 'visible' : ''}`}>
        
            <div 
                className="experience-card"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={() => setFlipper(!flipper)}

            >
                <div className="card-content">
                
                    <div className="logo-container">
                        <img src={logo} alt={`${company} logo`} className="company-logo" />
                    </div>
                    <div className="content-container">
                        <div className="experience-header">
                            <div className="experience-info">
                                <h3 className="role">{role}</h3>
                                <span className="company">{company}</span>
                                <span className="period">{period}</span>
                            </div>
                        </div>
                        <div className="skills">
                            {skills.map((skill, index) => (
                                <span key={index} className="skill-pill">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={`detailed-card ${isHovered ? 'active' : ''}`}>
                <div className="detailed-content">
                    <div className="detailed-header">
                        <img src={logo} alt={`${company} logo`} className="detailed-logo" />
                        <div className="detailed-title">
                            <h2>{role}</h2>
                            <h3>{company}</h3>
                            <p className="detailed-period">{period}</p>
                        </div>
                    </div>
                    <div className="detailed-description">
                        <p>{description}</p>
                    </div>
                    <div className="detailed-skills">
                        <h4>Technologies & Skills</h4>
                        <div className="detailed-skills-list">
                            {detailedSkills.map((skill, index) => (
                                <span key={index} className="skill-pill">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Experience = () => {

    const experiences = [
        {
            role: "Data Science Intern",
            company: "Lycoming Engines",
            period: "Feb 2025 - Present",
            description: "Developed machine learning models to predict engine failures. Built predictive engine behavior models using signal processing, mathematics, and physics.",
            skills: ["Python", "Data Analysis", "SQL", "Data Preprocessing"],
            detailedSkills: ["Python", "Data Analysis", "SQL", "Data Preprocessing", "Python", "Data Analysis", "SQL", "Data Preprocessing"],
            logo: "https://www.lycoming.com/themes/custom/themekit/logo.svg"
        },
        {
            role: "Data Science Intern",
            company: "WIT Sports",
            period: "Jan 2025 - Feb 2025",
            description: "Revamped Fan AI, an algorithm that predicts how engaged a fan is with their sports team. Augmented the feature engineering process and built an in-house comprehensive database of zipcode prosperity scores in the US.",
            skills: ["Python", "TensorFlow", "SQL", "Data Analysis"],
            detailedSkills: ["Python", "Data Analysis", "SQL", "Data Preprocessing", "Python", "Data Analysis", "SQL", "Data Preprocessing"],

            logo: "https://media.licdn.com/dms/image/v2/C4E0BAQE9LCAou1mpHw/company-logo_200_200/company-logo_200_200/0/1675090608394/wit_sports_logo?e=1749686400&v=beta&t=hDNQ-m9Xc7ix28282Oi2Zc06Gz7VxTnngzxLFoZb614"
        },
        {
            role: "Software Engineering Intern",
            company: "Orgo",
            period: "Summers 2023, 2024",
            description: "Created a new customer invites system, boosting user acquisition by 25-50% using React and Firebase. Added the infrastructure necessary for an \"import from Google\" feature.",
            skills: ["Python", "TensorFlow", "SQL", "Data Analysis"],
            detailedSkills: ["Python", "Data Analysis", "SQL", "Data Preprocessing", "Python", "Data Analysis", "SQL", "Data Preprocessing"],

            logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGLKyBrDo6cwg/company-logo_200_200/company-logo_200_200/0/1719832434601?e=1749686400&v=beta&t=LRUiiejHzKhaX7X5kE6_Wsj-COfZDRlCSlTuctOkWEs"
        },
        {
            role: "Data Research Intern",
            company: "Princeton University",
            period: "Summer 2024",
            description: "Designed large-data simulations through the Princeton Computing Cluster to conduct quantitative research. Designed and tested a Python program for calculating and visualizing molecular tension, yielding an accurate way to quantify induced simulation tension on chromatin.",
            skills: ["Python", "TensorFlow", "SQL", "Data Analysis"],
            detailedSkills: ["Python", "Data Analysis", "SQL", "Data Preprocessing", "Python", "Data Analysis", "SQL", "Data Preprocessing"],

            logo: "https://www.princeton.edu/themes/custom/hobbes/logo.svg"
        },
        {
            role: "App Developer Intern",
            company: "Huntington Breast Cancer Action Coalition",
            period: "Summer 2023",
            description: "Created a lifestyle-watching app that helps prevent up to 40% of cancer cases through habit-changing. Designed a backend storage system through Hive. Assisted the front-end team with animation design.",
            skills: ["Python", "TensorFlow", "SQL", "Data Analysis"],
            detailedSkills: ["Python", "Data Analysis", "SQL", "Data Preprocessing", "Python", "Data Analysis", "SQL", "Data Preprocessing"],

            logo: "https://images.squarespace-cdn.com/content/v1/6424aaf304d49156a143702f/8bc2339f-0353-4e83-9256-917819fcdb89/Untitled+design.png?format=1500w"
        },
        {
            role: "Game Developer Intern",
            company: "BTU Games",
            period: "Nov 2022 - May 2023",
            description: "Designed C++ backend code in Unreal engine that integrated the OAuth 2.0 plugin for multi-platform login capabilities. Created and implemented the character movement framework to interact seamlessly with a soft-body physics engine.",
            skills: ["Python", "TensorFlow", "SQL", "Data Analysis"],
            detailedSkills: ["Python", "Data Analysis", "SQL", "Data Preprocessing", "Python", "Data Analysis", "SQL", "Data Preprocessing"],

            logo: "https://btugames.net/images/btu_logo.svg"
        },
        {
            role: "Programming Instructor",
            company: "Code Ninjas",
            period: "Nov 2022 - May 2023",
            description: "Taught computer science and mathematics concepts in understandable ways (ex. 2D array representation, motion physics, etc.) Was called \"Mister\" for the first time. ",
            skills: ["Python", "TensorFlow", "SQL", "Data Analysis"],
            detailedSkills: ["Python", "Data Analysis", "SQL", "Data Preprocessing", "Python", "Data Analysis", "SQL", "Data Preprocessing"],

            logo: "https://www.codeninjas.com/hubfs/Group%201.svg"
        }
    ];

    return (
        <section className="experience-section">
        
            <h2 className="section-title">Recent Work Experience</h2>
            <div className="experience-container">
                {experiences.map((exp, index) => (
                    <ExperienceCard key={index} {...exp} />
                ))}
            </div>
            <div className='blur-er'></div>
        </section>
    );
};

export default Experience;