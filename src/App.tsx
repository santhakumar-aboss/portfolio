import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Sun,
  Moon,
  Menu,
  X,
  GraduationCap
} from 'lucide-react';
import {
  PERSONAL_INFO,
  SKILLS,
  EXPERIENCE,
  PROJECTS,
  EDUCATION
} from './constants';
import './index.css';

const Navbar = ({ toggleTheme, theme }: { toggleTheme: () => void; theme: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'var(--nav-bg)',
    }}>
      <div style={{ fontFamily: 'var(--font-header)', fontSize: '1.5rem', fontWeight: 800, cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>
        SK<span style={{ color: 'var(--primary-accent)' }}>.</span>
      </div>

      {/* Desktop Menu */}
      <div className="nav-menu" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        <a href="#about" className="nav-link">About</a>
        <a href="#skills" className="nav-link">Expertise</a>
        <a href="#experience" className="nav-link">Journey</a>
        <a href="#projects" className="nav-link">Work</a>
        <a href="#contact" className="nav-link">Contact</a>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Mobile Right Controls */}
      <div style={{ display: 'none' }} className="mobile-controls">
        <button onClick={toggleTheme} className="theme-toggle" style={{ marginRight: '1rem' }}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button onClick={() => setIsOpen(!isOpen)} className="theme-toggle">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-menu { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
      `}</style>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass"
            style={{
              position: 'fixed',
              top: '70px',
              left: '1rem',
              right: '1rem',
              padding: '2rem',
              zIndex: 999,
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              alignItems: 'center',
              fontWeight: 600
            }}
          >
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} style={{ color: 'var(--text-primary)' }}>{item}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    style={{ marginBottom: '4rem' }}
  >
    <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>{title}</h2>
    <div style={{ height: '4px', width: '80px', background: 'var(--primary-accent)', borderRadius: '4px', marginBottom: '1.5rem' }}></div>
    {subtitle && <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px' }}>{subtitle}</p>}
  </motion.div>
);

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  return (
    <div style={{ position: 'relative' }}>
      <div className="bg-glow"></div>
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary-accent)', scaleX, transformOrigin: '0%', zIndex: 1001 }} />
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      {/* Hero Section */}
      <section id="about" className="section-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}>
        <div className="hero-grid">
          <motion.div className="hero-text" initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <span style={{ color: 'var(--primary-accent)', fontWeight: 700, letterSpacing: '0.2em', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block' }}>Senior {PERSONAL_INFO.role}</span>
            <h1 style={{ fontSize: '5rem', lineHeight: 1, marginBottom: '2.5rem', fontStyle: 'italic' }}>
              Crafting Digital <br />
              <span style={{ color: 'var(--primary-accent)' }}>Masterpieces.</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '3.5rem', maxWidth: '600px', lineHeight: 1.8 }}>
              Hi, I'm <strong style={{ color: 'var(--text-primary)' }}>{PERSONAL_INFO.name}</strong>. {PERSONAL_INFO.profile}
            </p>
            <div className="hero-buttons" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView()}>Get In Touch</button>
              <button className="glass" style={{ padding: '1rem 2.5rem', borderRadius: '4px', fontWeight: 700, border: '1px solid var(--border-color)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.82rem' }} onClick={() => document.getElementById('projects')?.scrollIntoView()}>Explore Portfolio</button>
            </div>
          </motion.div>

          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} style={{ position: 'relative', width: '100%' }}>
            <div style={{ width: '100%', aspectRatio: '1', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
              <img src={PERSONAL_INFO.avatar} alt="Sathish Kumar" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
            </div>
            <div className="glass badge-classic">
              <div style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1, fontFamily: 'var(--font-header)', color: 'var(--primary-accent)' }}>4+</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.15em', marginTop: '0.5rem' }}>YEARS OF COMMITMENT</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="skills" className="section-container">
        <SectionHeader title="Technical Expertise" subtitle="A multi-disciplinary stack developed to solve enterprise challenges." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          {categories.map((cat, idx) => (
            <motion.div key={cat} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="glass" style={{ padding: '3rem', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>
                {cat}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {SKILLS.filter(s => s.category === cat).map(skill => (
                  <div key={skill.name} className="skill-chip">
                    {skill.name}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-container">
        <SectionHeader title="Professional History" subtitle="Leading and contributing to high-impact projects at ABOSS Technologies." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {EXPERIENCE.map((exp, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="experience-grid" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '5rem' }}>
              <div>
                <h3 style={{ color: 'var(--primary-accent)', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{exp.company}</h3>
                <p style={{ fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>{exp.period}</p>
              </div>
              <div className="experience-details" style={{ paddingLeft: '3rem', borderLeft: '1px solid var(--border-color)', position: 'relative' }}>
                <div className="experience-marker" style={{ position: 'absolute', left: '-5px', top: '10px', width: '9px', height: '9px', borderRadius: '50%', background: 'var(--primary-accent)' }}></div>
                <h4 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--text-primary)', fontStyle: 'italic' }}>{exp.role}</h4>
                <ul style={{ color: 'var(--text-secondary)', display: 'grid', gap: '1.25rem' }}>
                  {exp.description.map((desc, i) => (
                    <li key={i} style={{ display: 'flex', gap: '1rem' }}>
                      <ChevronRight size={18} style={{ color: 'var(--primary-accent)', flexShrink: 0, marginTop: '4px' }} />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-container" style={{ background: 'var(--surface-color)', padding: '3rem' }}>
        <SectionHeader title="Hand-Picked Work" subtitle="A selection of enterprise projects showcasing my ability to build complex backends." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '4rem' }}>
          {PROJECTS.map((project, idx) => (
            <motion.div key={idx} whileHover={{ y: -10 }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="glass" style={{ borderRadius: '32px', overflow: 'hidden' }}>
              {project.image && (
                <div style={{ height: '240px', position: 'relative' }}>
                  <img src={project.image} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, var(--bg-color), transparent)' }}></div>
                </div>
              )}
              <div style={{ padding: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  {project.tags?.map(tag => (
                    <span key={tag} style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.3rem 0.8rem', borderRadius: '100px', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>{tag}</span>
                  ))}
                </div>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{project.name}</h3>
                <div style={{ color: 'var(--primary-accent)', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem' }}>{project.role}</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="section-container">
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr', gap: '6rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <SectionHeader title="Get In Touch" subtitle="I'm currently seeking new challenges. Whether you have a question or just want to say hi, I'll try my best to get back to you!" />
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="social-link">
                <div className="icon-box"><Mail size={24} /></div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.15em' }}>EMAIL</div>
                  <div style={{ fontWeight: 500, fontSize: '1.2rem', fontFamily: 'var(--font-header)' }}>{PERSONAL_INFO.email}</div>
                </div>
              </a>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="social-link">
                <div className="icon-box"><Phone size={24} /></div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.15em' }}>PHONE</div>
                  <div style={{ fontWeight: 500, fontSize: '1.2rem', fontFamily: 'var(--font-header)' }}>{PERSONAL_INFO.phone}</div>
                </div>
              </a>
              <div className="social-link">
                <div className="icon-box"><MapPin size={24} /></div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.15em' }}>LOCATION</div>
                  <div style={{ fontWeight: 500, fontSize: '1.2rem', fontFamily: 'var(--font-header)' }}>{PERSONAL_INFO.location}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass" style={{ padding: '4rem', borderRadius: '40px' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '3rem' }}>Education</h3>
            <div style={{ display: 'grid', gap: '3rem' }}>
              {EDUCATION.map((edu, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', color: 'var(--primary-accent)' }}>
                    <GraduationCap size={20} />
                    <span style={{ fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.1em' }}>UNIVERSITY</span>
                  </div>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: 700 }}>{edu.school}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{edu.degree}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{edu.period}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '4rem', display: 'flex', gap: '1rem' }}>
              <a href={PERSONAL_INFO.linkedin} target="_blank" className="btn-primary" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 600, fontFamily: 'var(--font-header)' }}>
                <Linkedin size={20} /> LinkedIn
              </a>
              <a href="#" className="glass" style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', display: 'flex', gap: '0.75rem', alignItems: 'center', fontWeight: 600 }}>
                <Github size={20} /> GitHub
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '8rem', paddingTop: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. Optimized for modern browsers.
        </div>
      </footer>
    </div>
  );
}
