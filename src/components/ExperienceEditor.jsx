import { useState } from "react";
import { Plus, Trash2, Pencil, X } from "lucide-react";
const blank = { company: "", role: "", duration: "", description: "" };
function ExperienceEditor({ experience, updateSection }) {
  const [form, setForm] = useState(blank); const [editingId, setEditingId] = useState(null); const [showForm, setShowForm] = useState(false);
  const change = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const save = (event) => { event.preventDefault(); if (!form.company.trim() || !form.role.trim()) return; const entry = { ...form, id: editingId ?? Date.now() }; updateSection("experience", editingId ? experience.map((item) => item.id === editingId ? entry : item) : [...experience, entry]); setForm(blank); setEditingId(null); setShowForm(false); };
  const edit = (item) => { setForm({ ...item }); setEditingId(item.id); setShowForm(true); };
  const remove = (id) => { if (window.confirm("Delete this experience entry?")) updateSection("experience", experience.filter((item) => item.id !== id)); };
  return <div className="collection-editor"><div className="section-header"><div><h3>Experience</h3><p className="form-description">Add jobs, internships, freelance work or volunteering.</p></div><button className="add-new-button" type="button" onClick={() => { setForm(blank); setEditingId(null); setShowForm(true); }}><Plus size={15}/> Add experience</button></div>
    {experience.map((item) => <article className="management-card" key={item.id}><div><strong>{item.role}</strong><p>{item.company}</p><small>{item.duration}</small></div><div className="management-actions"><button type="button" onClick={() => edit(item)}><Pencil size={15}/></button><button type="button" onClick={() => remove(item.id)}><Trash2 size={15}/></button></div></article>)}
    {!experience.length && <p className="empty-state">No experience entries yet.</p>}
    {showForm && <form className="management-form" onSubmit={save}><div className="form-title-row"><h4>{editingId ? "Edit experience" : "New experience"}</h4><button type="button" onClick={() => setShowForm(false)}><X size={17}/></button></div>
      <label className="form-field"><span>Company / organization *</span><input required value={form.company} onChange={(e) => change("company", e.target.value)} placeholder="Organization name"/></label>
      <label className="form-field"><span>Role / job title *</span><input required value={form.role} onChange={(e) => change("role", e.target.value)} placeholder="e.g. Software Engineering Intern"/></label>
      <label className="form-field"><span>Duration</span><input value={form.duration} onChange={(e) => change("duration", e.target.value)} placeholder="Jun 2025 – Aug 2025"/></label>
      <label className="form-field"><span>Description</span><textarea rows={4} value={form.description} onChange={(e) => change("description", e.target.value)} placeholder="Describe your responsibilities and impact"/></label>
      <button className="save-entry-button" type="submit">{editingId ? "Update experience" : "Save experience"}</button></form>}
  </div>;
}
export default ExperienceEditor;
