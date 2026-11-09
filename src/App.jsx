import { useEffect, useMemo, useRef, useState } from "react";
import { initialPortfolio, STORAGE_KEY } from "./data/initialPortfolio";
import Navbar from "./components/Navbar";
import PortfolioEditor from "./components/PortfolioEditor";
import PortfolioPreview from "./components/PortfolioPreview";
import { buildPortfolioHTML } from "./utils/portfolioExport";
import "./App.css";

function loadPortfolio() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialPortfolio;
    const parsed = JSON.parse(saved);
    const personal = { ...initialPortfolio.personal, ...(parsed.personal || {}) };
    const projects = (Array.isArray(parsed.projects) ? parsed.projects : []).map((project) => ({
      id: project.id ?? Date.now() + Math.random(),
      title: project.title || project.name || "",
      description: project.description || "",
      technologies: Array.isArray(project.technologies) ? project.technologies : [],
      image: project.image || "",
      github: project.github || "",
      live: project.live || project.link || "",
    }));
    return {
      ...initialPortfolio,
      ...parsed,
      personal,
      skills: Array.isArray(parsed.skills) ? parsed.skills : [],
      projects,
      education: Array.isArray(parsed.education) ? parsed.education : [],
      experience: Array.isArray(parsed.experience) ? parsed.experience : [],
      template: ["developer", "minimal", "editorial"].includes(parsed.template) ? parsed.template : "developer",
    };
  } catch {
    return initialPortfolio;
  }
}

function App() {
  const [portfolio, setPortfolio] = useState(loadPortfolio);
  const [saveState, setSaveState] = useState("saved");
  const previewRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
        setSaveState("saved");
      } catch (error) {
        console.error("Could not save portfolio:", error);
        setSaveState("error");
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [portfolio]);

  const updatePersonal = (field, value) => {
    setPortfolio((current) => ({
      ...current,
      personal: { ...current.personal, [field]: value },
    }));
  };

  const updateSection = (section, value) => {
    setPortfolio((current) => ({ ...current, [section]: value }));
  };

  const openPreview = () => {
    const html = buildPortfolioHTML(
      portfolio,
      previewRef.current?.outerHTML || ""
    );
    const tab = window.open("", "_blank");
    if (!tab) {
      window.alert("Allow pop-ups for localhost to open the preview.");
      return;
    }
    tab.document.open();
    tab.document.write(html);
    tab.document.close();
  };

  const exportWebsite = () => {
    const html = buildPortfolioHTML(
      portfolio,
      previewRef.current?.outerHTML || ""
    );
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const filename = (portfolio.personal.name || "my-portfolio")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "my-portfolio";
    link.href = url;
    link.download = `${filename}.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const completion = useMemo(() => {
    const checks = [
      Boolean(portfolio.personal.name.trim()),
      Boolean(portfolio.personal.title.trim()),
      Boolean(portfolio.personal.about.trim()),
      portfolio.skills.length > 0,
      portfolio.projects.length > 0,
      portfolio.education.length > 0,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [portfolio]);

  return (
    <div className="app">
      <Navbar
        saveState={saveState}
        onPreview={openPreview}
        onExport={exportWebsite}
      />
      <main className="builder-workspace">
        <aside className="editor-sidebar">
          <PortfolioEditor
            portfolio={portfolio}
            updatePersonal={updatePersonal}
            updateSection={updateSection}
            completion={completion}
          />
        </aside>
        <section className="preview-workspace">
          <div className="preview-topbar">
            <div><span className="preview-indicator" /> LIVE WEBSITE PREVIEW</div>
            <span className="preview-size">Changes appear instantly</span>
          </div>
          <PortfolioPreview ref={previewRef} portfolio={portfolio} />
        </section>
      </main>
    </div>
  );
}

export default App;
