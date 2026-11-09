import { forwardRef } from "react";
import { Code2, UserRound, Mail, MapPin, Globe, ArrowUpRight } from "lucide-react";

const PortfolioPreview = forwardRef(function PortfolioPreview({ portfolio }, ref) {
  const { personal, skills, projects, education, experience } = portfolio;
  const hasContent = Boolean(
    personal.name || personal.title || personal.tagline || personal.about ||
    skills.length || projects.length || education.length || experience.length
  );

  return (
    <div ref={ref} className={`website-preview preview-${portfolio.template || "developer"}`}>
      <header className="website-nav">
        <a className="preview-brand" href="#top">{personal.name || "Your Name"}</a>
        <nav aria-label="Portfolio navigation">
          {personal.about && <a href="#about">About</a>}
          {skills.length > 0 && <a href="#skills">Skills</a>}
          {projects.length > 0 && <a href="#projects">Projects</a>}
          {education.length > 0 && <a href="#education">Education</a>}
          {experience.length > 0 && <a href="#experience">Experience</a>}
          {(personal.email || personal.github || personal.linkedin) && <a href="#contact">Contact</a>}
        </nav>
      </header>

      {!hasContent ? (
        <section className="preview-empty" id="top">
          <span className="section-eyebrow">YOUR PORTFOLIO STARTS HERE</span>
          <h1>Make your work<br/>visible.</h1>
          <p>Add your details in the editor. Your portfolio will take shape here.</p>
        </section>
      ) : (
        <>
          <section className="website-hero" id="top">
            <div className="hero-content">
              <span className="hero-eyebrow">{personal.location || "PORTFOLIO"}</span>
              <h1>{personal.name || "Your Name"}</h1>
              {personal.title && <h2>{personal.title}</h2>}
              {personal.tagline && <p className="hero-tagline">{personal.tagline}</p>}
              {personal.email && <a className="hero-contact" href={`mailto:${personal.email}`}>Get in touch <ArrowUpRight size={15}/></a>}
            </div>
            {personal.profileImage ? <img src={personal.profileImage} alt={personal.name || "Profile"} className="hero-image"/> : <div className="hero-placeholder">{(personal.name || "Y").charAt(0).toUpperCase()}</div>}
          </section>

          {personal.about && <section className="website-section" id="about"><span className="section-eyebrow">01 / ABOUT</span><h2>About me</h2><p className="about-text">{personal.about}</p>{personal.location && <div className="location-info"><MapPin size={14}/>{personal.location}</div>}</section>}

          {skills.length > 0 && <section className="website-section" id="skills"><span className="section-eyebrow">02 / EXPERTISE</span><h2>Skills & technologies</h2><div className="website-skills">{skills.map((skill, index) => <span key={`${skill}-${index}`}>{skill}</span>)}</div></section>}

          {projects.length > 0 && <section className="website-section" id="projects"><span className="section-eyebrow">03 / SELECTED WORK</span><h2>Featured projects</h2><div className="website-projects">{projects.map((project) => <article className="website-project-card" key={project.id}>{project.image && <img className="project-cover" src={project.image} alt={`${project.title} preview`}/>}<div className="project-card-content"><h3>{project.title}</h3>{project.description && <p>{project.description}</p>}{project.technologies?.length > 0 && <div className="project-tags">{project.technologies.map((tech, index) => <span key={`${tech}-${index}`}>{tech}</span>)}</div>}<div className="project-links">{project.github && <a href={project.github} target="_blank" rel="noreferrer"><Code2 size={14}/> Source code</a>}{project.live && <a href={project.live} target="_blank" rel="noreferrer"><Globe size={14}/> Live demo</a>}</div></div></article>)}</div></section>}

          {education.length > 0 && <section className="website-section" id="education"><span className="section-eyebrow">04 / EDUCATION</span><h2>Education</h2>{education.map((item) => <article className="timeline-item" key={item.id}><div><h3>{item.degree}</h3><p className="timeline-place">{item.institution}</p>{item.description && <p>{item.description}</p>}</div>{item.year && <span className="timeline-date">{item.year}</span>}</article>)}</section>}

          {experience.length > 0 && <section className="website-section" id="experience"><span className="section-eyebrow">05 / EXPERIENCE</span><h2>Experience</h2>{experience.map((item) => <article className="timeline-item" key={item.id}><div><h3>{item.role}</h3><p className="timeline-place">{item.company}</p>{item.description && <p>{item.description}</p>}</div>{item.duration && <span className="timeline-date">{item.duration}</span>}</article>)}</section>}

          {(personal.email || personal.github || personal.linkedin || personal.website) && <section className="website-contact" id="contact"><span className="section-eyebrow">LET'S CONNECT</span><h2>Have a project in mind?</h2><p>Get in touch and let's start a conversation.</p><div className="contact-links">{personal.email && <a href={`mailto:${personal.email}`}><Mail size={16}/>{personal.email}</a>}{personal.github && <a href={personal.github} target="_blank" rel="noreferrer"><Code2 size={16}/>GitHub</a>}{personal.linkedin && <a href={personal.linkedin} target="_blank" rel="noreferrer"><UserRound size={16}/>LinkedIn</a>}{personal.website && <a href={personal.website} target="_blank" rel="noreferrer"><Globe size={16}/>Website</a>}</div></section>}
          <footer className="website-footer">© {new Date().getFullYear()} {personal.name || "Portfolio"}. All rights reserved.</footer>
        </>
      )}
    </div>
  );
});

export default PortfolioPreview;
