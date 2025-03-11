import React from 'react';
import '../style/Experience.css';

const ExperienceCard = ({ role, company, period, description, skills }) => (
    <div className="experience-card">
        <div className="experience-header">
            <h3 className="role">{role}</h3>
            <span className="company">{company}</span>
            <span className="period">{period}</span>
        </div>
        <p className="description">{description}</p>
        <div className="skills">
            {skills.map((skill, index) => (
                <span key={index} className="skill-pill">{skill}</span>
            ))}
        </div>
    </div>
);

const Experience = () => {
    const experiences = [
        {
            role: "Software Engineer",
            company: "Company Name",
            period: "2022 - Present",
            description: "Led development of AI-powered solutions and implemented scalable microservices architecture.",
            skills: ["React", "Python", "AWS", "Machine Learning"]
        },
        {
            role: "Data Scientist",
            company: "Previous Company",
            period: "2020 - 2022",
            description: "Developed predictive models and implemented data pipelines for large-scale analytics.",
            skills: ["Python", "TensorFlow", "SQL", "Data Analysis"]
        },
        {
            role: "Data Scientist",
            company: "Previous Company",
            period: "2020 - 2022",
            description: "Developed predictive models and implemented data pipelines for large-scale analytics.",
            skills: ["Python", "TensorFlow", "SQL", "Data Analysis"]
        },
        {
            role: "Data Scientist",
            company: "Previous Company",
            period: "2020 - 2022",
            description: "Developed predictive models and implemented data pipelines for large-scale analytics.",
            skills: ["Python", "TensorFlow", "SQL", "Data Analysis"]
        },
        {
            role: "Data Scientist",
            company: "Previous Company",
            period: "2020 - 2022",
            description: "Developed predictive models and implemented data pipelines for large-scale analytics.",
            skills: ["Python", "TensorFlow", "SQL", "Data Analysis"]
        }
    ];

    return (
        <section className="experience-section">
            <h2 className="section-title">Work Experience</h2>
            <div className="experience-container">
                {experiences.map((exp, index) => (
                    <ExperienceCard key={index} {...exp} />
                ))}
            </div>
        </section>
    );
};

export default Experience;