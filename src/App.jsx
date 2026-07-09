import { useEffect, useState } from "react"
import { profile, experience, projects, volunteering } from "./data.js"
import {
  MoonIcon,
  SunIcon,
  LinkIcon,
  ArrowIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  BirdIcon,
} from "./components/Icons.jsx"

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme")
    if (saved) return saved
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  return [theme, () => setTheme((t) => (t === "light" ? "dark" : "light"))]
}

function Nav({ theme, onToggle }) {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <div className="nav-links">
          <a className="nav-link" href="#home">
            home
          </a>
          <a className="nav-link" href="#experience">
            experience
          </a>
          <a className="nav-link" href="#volunteering">
            volunteering
          </a>
          <a className="nav-link" href="#projects">
            projects
          </a>
        </div>
        <button
          className="theme-toggle"
          onClick={onToggle}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="section">
      <h1 className="hero-title">
        Howdy! I'm Dhruv{" "}
        <span role="img" aria-label="waving hand">
          👋
        </span>
      </h1>
      <div className="hero-now">
        <BirdIcon size={18} />
        <span>
          Currently building agentic RAG systems @ Powell :)
        </span>
      </div>
      <p className="hero-text">
        I love building <strong>applied AI/ML projects</strong> in prod environments and acquiring{" "}
        <strong>real estate</strong>.{" "}
        <a href={`mailto:${profile.email}`}>Let's chat!</a>
      </p>
      <p className="hero-text">
        Artificial Intelligence @ Texas A&M (Dean's List), and licensed in Real Estate.
      </p>
    </section>
  )
}

function XpItem({ xp }) {
  return (
    <article className="xp-item">
      <span className="xp-badge" aria-hidden="true">
        {xp.logo
          ? <img src={xp.logo} alt="" className="xp-badge-img" />
          : xp.monogram}
      </span>
      <div>
        <h3 className="xp-role">{xp.role}</h3>
        <p className="xp-company">{xp.company}</p>
      </div>
      <span className="xp-period">{xp.period}</span>
      <div className="xp-body">
        <p className="xp-desc">{xp.description}</p>
        <div className="pills">
          {xp.tags.map((tag) => (
            <span className="pill" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        {xp.link && (
          <a className="xp-link" href={xp.link.href} target="_blank" rel="noreferrer">
            <span className="xp-link-icon">
              <LinkIcon />
            </span>
            <span>
              <span className="xp-link-label">{xp.link.label}</span>
              <br />
              <span className="xp-link-sub">{xp.link.sub}</span>
            </span>
          </a>
        )}
      </div>
    </article>
  )
}

function Experience() {
  return (
    <section id="experience" className="section">
      <h2 className="section-title">Experience</h2>
      <div>
        {experience.map((xp) => (
          <XpItem xp={xp} key={xp.role + xp.company} />
        ))}
      </div>
    </section>
  )
}

function Volunteering() {
  return (
    <section id="volunteering" className="section">
      <h2 className="section-title">Volunteering</h2>
      <div>
        {volunteering.map((xp) => (
          <XpItem xp={xp} key={xp.role + xp.company} />
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="section-title">Projects</h2>
      <div className="post-list">
        {projects.map((p) => {
          const inner = (
            <>
              <h3 className="post-title">{p.title}</h3>
              <div className="post-meta">
                <span>{p.period}</span>
                <span aria-hidden="true">·</span>
                <span>{p.meta}</span>
                {p.href && <ArrowIcon size={14} />}
              </div>
            </>
          )
          return p.href ? (
            <a className="post-card" href={p.href} target="_blank" rel="noreferrer" key={p.title}>
              {inner}
            </a>
          ) : (
            <div className="post-card" key={p.title}>
              {inner}
            </div>
          )
        })}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="socials">
          <a className="social-link" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a className="social-link" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
          <a className="social-link" href={`mailto:${profile.email}`} aria-label="Email">
            <MailIcon />
          </a>
        </div>
        <span className="footer-updated">updated {profile.updated}</span>
      </div>
    </footer>
  )
}

export default function App() {
  const [theme, toggleTheme] = useTheme()

  return (
    <>
      <Nav theme={theme} onToggle={toggleTheme} />
      <main className="container">
        <Hero />
        <Experience />
        <Volunteering />
        <Projects />
      </main>
      <Footer />
    </>
  )
}
