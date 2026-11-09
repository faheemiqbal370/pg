import { useState } from "react";
import { Plus, Trash2, Pencil, X } from "lucide-react";

const blankProject = { title: "", description: "", technologies: "", image: "", github: "", live: "" };

function ProjectsEditor({ projects, updateSection }) {
  const [form, setForm] = useState(blankProject);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const change = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const save = (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    const entry = {
      ...form,
      id: editingId ?? Date.now(),
      technologies: Array.isArray(form.technologies) ? form.technologies : form.technologies.split(",").map((item) => item.trim()).filter(Boolean),
    };
    updateSection("projects", editingId ? projects.map((item) => item.id === editingId ? entry : item) : [...projects, entry]);
    setForm(blankProject); setEditingId(null); setShowForm(false);
  };

  const edit = (project) => {
    setForm({ ...project, technologies: (project.technologies || []).join(", ") });
    setEditingId(project.id); setShowForm(true);
  };

  const uploadImage = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 3 * 1024 * 1024) {
      window.alert("Choose an image under 3 MB."); return;
    }
    const reader = new FileReader();
    reader.onload = () => change("image", reader.result);
    reader.readAsDataURL(file);
  };

  const remove = (id) => {
    if (window.confirm("Delete this project?")) updateSection("projects", projects.filter((item) => item.id !== id));
  };

  return <div className="collection-editor">
    <div className="section-header"><div><h3>Projects</h3><p className="form-description">Show the work you want people to see.</p></div><button className="add-new-button" type="button" onClick={() => { setForm(blankProject); setEditingId(null); setShowForm(true); }}><Plus size={15}/> Add project</button></div>
    {projects.map((project) => <article className="management-card" key={project.id}>
      <div className="management-main">{project.image && <img className="management-thumb" src={project.image} alt=""/>}<div><strong>{project.title}</strong><p>{project.description}</p><small>{(project.technologies || []).join(" · ")}</small></div></div>
      <div className="management-actions"><button type="button" title="Edit" onClick={() => edit(project)}><Pencil size={15}/></button><button type="button" title="Delete" onClick={() => remove(project.id)}><Trash2 size={15}/></button></div>
    </article>)}
    {!projects.length && <p className="empty-state">No projects yet. Add your first project.</p>}
    {showForm && <form className="management-form" onSubmit={save}>
      <div className="form-title-row"><h4>{editingId ? "Edit project" : "New project"}</h4><button type="button" onClick={() => setShowForm(false)}><X size={17}/></button></div>
      <label className="form-field"><span>Project name *</span><input required value={form.title} onChange={(e) => change("title", e.target.value)} placeholder="e.g. Task management app"/></label>
      <label className="form-field"><span>Description</span><textarea rows={3} value={form.description} onChange={(e) => change("description", e.target.value)} placeholder="What did you build? What problem does it solve?"/></label>
      <label className="form-field"><span>Technologies</span><input value={form.technologies} onChange={(e) => change("technologies", e.target.value)} placeholder="React, Node.js, MongoDB"/><small>Separate items with commas.</small></label>
      <label className="form-field"><span>Project image</span><input type="file" accept="image/*" onChange={(e) => uploadImage(e.target.files?.[0])}/><small>Optional. Maximum 3 MB.</small>{form.image && <div className="image-control"><img src={form.image} alt="Project preview"/><button type="button" onClick={() => change("image", "")}><Trash2 size={14}/> Remove image</button></div>}</label>
      <label className="form-field"><span>GitHub repository URL</span><input type="url" value={form.github} onChange={(e) => change("github", e.target.value)} placeholder="https://github.com/…"/></label>
      <label className="form-field"><span>Live demo URL</span><input type="url" value={form.live} onChange={(e) => change("live", e.target.value)} placeholder="https://…"/></label>
      <button className="save-entry-button" type="submit">{editingId ? "Update project" : "Save project"}</button>
    </form>}
  </div>;
}

export default ProjectsEditor;
