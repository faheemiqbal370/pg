import { useState } from "react";
import { Plus, Trash2, Pencil, X } from "lucide-react";
const blank = { institution: "", degree: "", year: "", description: "" };
function EducationEditor({ education, updateSection }) {
  const [form, setForm] = useState(blank); const [editingId, setEditingId] = useState(null); const [showForm, setShowForm] = useState(false);
  const change = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const save = (event) => { event.preventDefault(); if (!form.institution.trim() || !form.degree.trim()) return; const entry = { ...form, id: editingId ?? Date.now() }; updateSection("education", editingId ? education.map((item) => item.id === editingId ? entry : item) : [...education, entry]); setForm(blank); setEditingId(null); setShowForm(false); };
  const edit = (item) => { setForm({ ...item }); setEditingId(item.id); setShowForm(true); };
  const remove = (id) => { if (window.confirm("Delete this education entry?")) updateSection("education", education.filter((item) => item.id !== id)); };
  return <div className="collection-editor"><div className="section-header"><div><h3>Education</h3><p className="form-description">Add degrees, courses or certifications.</p></div><button className="add-new-button" type="button" onClick={() => { setForm(blank); setEditingId(null); setShowForm(true); }}><Plus size={15}/> Add education</button></div>
    {education.map((item) => <article className="management-card" key={item.id}><div><strong>{item.degree}</strong><p>{item.institution}</p><small>{item.year}</small></div><div className="management-actions"><button type="button" onClick={() => edit(item)}><Pencil size={15}/></button><button type="button" onClick={() => remove(item.id)}><Trash2 size={15}/></button></div></article>)}
    {!education.length && <p className="empty-state">No education entries yet.</p>}
    {showForm && <form className="management-form" onSubmit={save}><div className="form-title-row"><h4>{editingId ? "Edit education" : "New education"}</h4><button type="button" onClick={() => setShowForm(false)}><X size={17}/></button></div>
      <label className="form-field"><span>Institution *</span><input required value={form.institution} onChange={(e) => change("institution", e.target.value)} placeholder="School or university"/></label>
      <label className="form-field"><span>Degree / qualification *</span><input required value={form.degree} onChange={(e) => change("degree", e.target.value)} placeholder="e.g. BSc Computer Science"/></label>
      <label className="form-field"><span>Years</span><input value={form.year} onChange={(e) => change("year", e.target.value)} placeholder="2022 – 2026"/></label>
      <label className="form-field"><span>Details</span><textarea rows={3} value={form.description} onChange={(e) => change("description", e.target.value)} placeholder="Relevant coursework, honors or achievements"/></label>
      <button className="save-entry-button" type="submit">{editingId ? "Update education" : "Save education"}</button></form>}
  </div>;
}
export default EducationEditor;
