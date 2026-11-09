import { useState } from "react";
import {
  UserRound, Code2, Layers, GraduationCap, BriefcaseBusiness, Palette,
  Trash2,
} from "lucide-react";
import ProjectsEditor from "./ProjectsEditor";
import EducationEditor from "./EducationEditor";
import ExperienceEditor from "./ExperienceEditor";

const sections = [
  { id: "personal", label: "Personal information", icon: UserRound },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: Layers },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "templates", label: "Design templates", icon: Palette },
];

function readImage(file, callback) {
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    window.alert("Please choose an image file.");
    return;
  }
  if (file.size > 3 * 1024 * 1024) {
    window.alert("Please choose an image smaller than 3 MB.");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

function PortfolioEditor({ portfolio, updatePersonal, updateSection, completion }) {
  const [activeSection, setActiveSection] = useState("personal");
  const [newSkill, setNewSkill] = useState("");

  const addSkill = (event) => {
    event.preventDefault();
    const skill = newSkill.trim();
    if (!skill) return;
    if (portfolio.skills.some((item) => item.toLowerCase() === skill.toLowerCase())) {
      window.alert("That skill is already in your list.");
      return;
    }
    updateSection("skills", [...portfolio.skills, skill]);
    setNewSkill("");
  };

  return (
    <div className="editor-layout">
      <div className="editor-title">
        <h3>Build your portfolio</h3>
        <p>Enter your details. Your website updates as you work.</p>
      </div>

      <div className="editor-progress">
        <div className="progress-label"><span>Portfolio completion</span><strong>{completion}%</strong></div>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${completion}%` }} /></div>
      </div>

      <span className="navigation-label">WEBSITE CONTENT</span>
      <nav className="editor-navigation" aria-label="Portfolio sections">
        {sections.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" className={`editor-nav-item ${activeSection === id ? "selected" : ""}`} onClick={() => setActiveSection(id)}>
            <Icon size={17} /><span>{label}</span><span className="nav-chevron">›</span>
          </button>
        ))}
      </nav>

      <div className="editor-form-area">
        {activeSection === "personal" && (
          <div>
            <h3>Personal information</h3>
            <p className="form-description">These details introduce you to visitors. Fields are optional until you export.</p>
            {[
              ["name", "Full name", "e.g. Alex Morgan"],
              ["title", "Professional title", "e.g. Frontend Developer"],
              ["tagline", "Short headline", "A sentence that describes your work"],
              ["email", "Email address", "you@example.com"],
              ["location", "Location", "City, Country"],
              ["github", "GitHub profile", "https://github.com/username"],
              ["linkedin", "LinkedIn profile", "https://linkedin.com/in/username"],
              ["website", "Other website", "https://example.com"],
            ].map(([field, label, placeholder]) => (
              <label className="form-field" key={field}><span>{label}</span><input value={portfolio.personal[field] || ""} placeholder={placeholder} onChange={(event) => updatePersonal(field, event.target.value)} /></label>
            ))}
            <label className="form-field"><span>About you</span><textarea rows={5} value={portfolio.personal.about} placeholder="Describe your background, interests and the work you do…" onChange={(event) => updatePersonal("about", event.target.value)} /></label>
            <div className="form-field"><span>Profile photograph</span>
              <input type="file" accept="image/*" onChange={(event) => readImage(event.target.files?.[0], (value) => updatePersonal("profileImage", value))} />
              <small>JPG, PNG or WebP. Maximum 3 MB.</small>
              {portfolio.personal.profileImage && <div className="image-control"><img src={portfolio.personal.profileImage} alt="Profile preview" /><button type="button" onClick={() => updatePersonal("profileImage", "")}><Trash2 size={14}/> Remove image</button></div>}
            </div>
          </div>
        )}

        {activeSection === "skills" && (
          <div><h3>Skills</h3><p className="form-description">Add tools, technologies and areas of expertise.</p>
            {portfolio.skills.map((skill, index) => <div className="simple-list-item" key={`${skill}-${index}`}><span>{skill}</span><button type="button" onClick={() => updateSection("skills", portfolio.skills.filter((_, i) => i !== index))}>Remove</button></div>)}
            {!portfolio.skills.length && <p className="empty-state">No skills added yet. Add your first skill below.</p>}
            <form className="add-item-form" onSubmit={addSkill}><input value={newSkill} onChange={(event) => setNewSkill(event.target.value)} placeholder="e.g. React, Python, UI Design" /><button type="submit">+ Add skill</button></form>
          </div>
        )}

        {activeSection === "projects" && <ProjectsEditor projects={portfolio.projects} updateSection={updateSection} />}
        {activeSection === "education" && <EducationEditor education={portfolio.education} updateSection={updateSection} />}
        {activeSection === "experience" && <ExperienceEditor experience={portfolio.experience} updateSection={updateSection} />}

        {activeSection === "templates" && (
          <div><h3>Design templates</h3><p className="form-description">Choose a visual direction. Your content stays the same.</p>
            {[ ["developer", "Developer", "Structured, technical and confident"], ["minimal", "Minimal", "Quiet typography and generous whitespace"], ["editorial", "Editorial", "Expressive typography and warm tones"] ].map(([id, name, description]) => <button type="button" key={id} className={`template-option ${portfolio.template === id ? "selected" : ""}`} onClick={() => updateSection("template", id)}><span><strong>{name}</strong><small>{description}</small></span>{portfolio.template === id && <b>Selected</b>}</button>)}
          </div>
        )}
      </div>
    </div>
  );
}

export default PortfolioEditor;
