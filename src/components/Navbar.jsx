import { Code2, Download, ExternalLink } from "lucide-react";

function Navbar({ saveState, onPreview, onExport }) {
  const status = {
    saved: "All changes saved on this device",
    saving: "Saving changes…",
    error: "Could not save — storage may be full",
  }[saveState] || "";

  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-icon"><Code2 size={21} /></div>
        <div><h2>Portify</h2><span>Visual Portfolio Studio</span></div>
      </div>
      <div className={`navbar-center save-${saveState}`}>
        <span className="save-indicator" />{status}
      </div>
      <div className="navbar-actions">
        <button className="nav-button" onClick={onPreview} type="button">
          <ExternalLink size={15} /> Preview
        </button>
        <button className="export-button" onClick={onExport} type="button">
          <Download size={15} /> Export HTML
        </button>
      </div>
    </header>
  );
}

export default Navbar;
