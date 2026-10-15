import { useState, useEffect } from 'react'
import './App.css'

const CHAT_IFRAME_URL = 'https://apex-precision-industries-ltd.insplora.ip.inspironlabs.com/embed/69cf0d91a2cad9d987e6c829d3f84463'
const SEARCH_IFRAME_URL = 'http://localhost:3000/embed/c6f3561d5bd30e707c9617e4efc5d12f'

const SITE_NAV = [
  {
    label: 'Services',
    min: 0,
    items: ['Product Engineering', 'AI & Machine Learning', 'Cloud & DevOps', 'Data Engineering & Analytics', 'UI/UX Design'],
  },
  {
    label: 'Industries',
    min: 0,
    items: ['Banking & FinTech', 'Healthcare', 'Retail & E-commerce', 'Logistics', 'EdTech', 'Media & Entertainment'],
  },
  {
    label: 'AI Labs',
    min: 0,
    items: ['GenAI strategy', 'Rapid prototyping', 'AI agents'],
  },
  { label: 'Success Stories', min: 2 },
  { label: 'About Us', min: 1 },
  { label: 'Insights', min: 2 },
  { label: 'Career', min: 1 },
]

function App() {
  const [width, setWidth] = useState(() => (typeof window === 'undefined' ? 1200 : window.innerWidth))
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isChatMaximized, setIsChatMaximized] = useState(false)
  const [hasPromptedBubble, setHasPromptedBubble] = useState(true)

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== 'Escape') return
      if (isSearchOpen) setIsSearchOpen(false)
      else if (isChatOpen) setIsChatOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen, isChatOpen])

  useEffect(() => {
    document.body.style.overflow = isSearchOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isSearchOpen])

  const navPriority = width >= 1150 ? 2 : width >= 820 ? 1 : width >= 640 ? 0 : -1
  const visibleNav = SITE_NAV.filter((item) => item.min <= navPriority)

  const closeChat = () => setIsChatOpen(false)

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev)
    setHasPromptedBubble(false)
  }

  return (
    <div className="page">
      <div className="glow glow-a" aria-hidden="true" />
      <div className="glow glow-b" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="site-header">
        <a href="#top" aria-label="Inspiron Labs home">
          <img className="site-logo" src="/inspiron-labs-logo.png" alt="Inspiron Labs" />
        </a>
        <nav className="site-nav" aria-label="Primary">
          {visibleNav.map((item) => (
            <div className="site-nav-item" key={item.label}>
              <a className="site-nav-link" href={`#${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <span>{item.label}</span>
                {item.items && (
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                    <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </a>
              {item.items && (
                <div className="site-dropdown">
                  {item.items.map((entry) => (
                    <a key={entry} href={`#${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                      {entry}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            className="site-search"
            aria-label="Open search"
            onClick={() => setIsSearchOpen(true)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>Search</span>
          </button>
          <a className="site-contact" href="#begin">
            CONTACT
          </a>
        </nav>
      </header>

      <button
        type="button"
        className="site-close"
        aria-label="Close"
        onClick={() => {
          if (isSearchOpen) setIsSearchOpen(false)
          else closeChat()
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path d="M2 2l14 14M16 2L2 16" stroke="#091426" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </button>

      <main id="top">
        <section className="hero">
          <p className="eyebrow">A quieter way to wander</p>
          <h1>
            Find the spark
            <em> that was always yours.</em>
          </h1>
          <p className="lede">
            Insplora is a landing place for curiosity — a single, luminous page
            where ideas gather, slow down, and become something you can hold.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => setIsChatOpen(true)}
            >
              Start exploring
            </button>
            <a className="btn ghost" href="#story">
              Read the story
            </a>
          </div>
          <div className="orbit" aria-hidden="true">
            <span className="orb orb-1" />
            <span className="orb orb-2" />
            <span className="orb orb-3" />
          </div>
        </section>

        <section id="story" className="story">
          <div className="story-copy">
            <p className="eyebrow">The idea</p>
            <h2>Beauty first. Noise never.</h2>
            <p>
              Most screens shout. This one listens. Soft light, generous space,
              and a rhythm that invites you to stay — not because you have to,
              but because it feels like arriving somewhere true.
            </p>
          </div>
          <div className="story-panel">
            <blockquote>
              “Inspiration is not a lightning strike. It is a room you can
              return to.”
            </blockquote>
            <cite>— Insplora, quietly</cite>
          </div>
        </section>

        <section id="paths" className="paths">
          <p className="eyebrow">Three paths</p>
          <h2>Choose how you want to begin</h2>
          <div className="cards">
            <article className="card">
              <span className="card-index">01</span>
              <h3>Wonder</h3>
              <p>
                Follow questions without a map. Let the next thought arrive on
                its own time.
              </p>
            </article>
            <article className="card">
              <span className="card-index">02</span>
              <h3>Craft</h3>
              <p>
                Shape what you notice into something you can share — a note, a
                sketch, a first sentence.
              </p>
            </article>
            <article className="card">
              <span className="card-index">03</span>
              <h3>Return</h3>
              <p>
                Come back to the same page. Familiar light. A new way of seeing
                what was already here.
              </p>
            </article>
          </div>
        </section>

        <section id="moments" className="moments">
          <div className="moment">
            <strong>Dawn</strong>
            <span>When ideas are still warm</span>
          </div>
          <div className="moment">
            <strong>Noon</strong>
            <span>When you need a still point</span>
          </div>
          <div className="moment">
            <strong>Dusk</strong>
            <span>When the day can finally speak</span>
          </div>
        </section>

        <section id="begin" className="cta">
          <h2>Ready when you are.</h2>
          <p>
            This page is complete on its own. When you say the word, we will
            open a conversation here — gently, in its own frame.
          </p>
          <button
            type="button"
            className="btn primary"
            onClick={() => setIsChatOpen(true)}
          >
            Launch Assistant
          </button>
        </section>
      </main>

      <footer className="footer">
        <span>Insplora</span>
        <span>A single page, made with care.</span>
      </footer>

      {/* Floating Bottom-Right Chatbot Widget */}
      <div className="chatbot-container">
        {/* Floating Trigger Button & Tooltip Bubble */}
        <div className="chatbot-launcher-wrapper">
          {hasPromptedBubble && !isChatOpen && (
            <div className="chatbot-prompt-bubble" onClick={toggleChat}>
              <div className="chatbot-prompt-avatar">✦</div>
              <div className="chatbot-prompt-content">
                <span className="chatbot-prompt-title">Need inspiration?</span>
                <span className="chatbot-prompt-subtitle">Chat with Insplora AI</span>
              </div>
              <button
                type="button"
                className="chatbot-prompt-close"
                onClick={(e) => {
                  e.stopPropagation()
                  setHasPromptedBubble(false)
                }}
                aria-label="Dismiss message"
              >
                ✕
              </button>
            </div>
          )}

          <button
            type="button"
            className={`chatbot-fab ${isChatOpen ? 'active' : ''}`}
            onClick={toggleChat}
            aria-label={isChatOpen ? 'Close chat' : 'Open chatbot'}
            aria-expanded={isChatOpen}
            title={isChatOpen ? 'Close chat' : 'Chat with Insplora Assistant'}
          >
            <span className="chatbot-fab-glow" aria-hidden="true" />
            <div className="chatbot-fab-icon-container">
              {isChatOpen ? (
                <svg
                  className="chatbot-fab-close-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  className="chatbot-fab-chat-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              )}
            </div>
            {!isChatOpen && <span className="chatbot-online-dot" aria-hidden="true" />}
          </button>
        </div>

        {/* Floating Chat Window (Iframe) */}
        {isChatOpen && (
          <aside
            className={`chatbot-window ${isChatMaximized ? 'maximized' : ''}`}
            role="region"
            aria-label="Insplora Chatbot Widget"
          >
            {/* Widget Header */}
            <header className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="chatbot-header-avatar">
                  <span className="brand-mark">✦</span>
                </div>
                <div>
                  <h3 className="chatbot-header-title">Insplora Assistant</h3>
                  <div className="chatbot-status">
                    <span className="status-indicator" />
                    <span>Always available</span>
                  </div>
                </div>
              </div>

              <div className="chatbot-header-actions">
                <button
                  type="button"
                  className="chatbot-action-btn"
                  onClick={() => setIsChatMaximized((prev) => !prev)}
                  aria-label={isChatMaximized ? 'Minimize size' : 'Maximize window'}
                  title={isChatMaximized ? 'Restore window size' : 'Expand window'}
                >
                  {isChatMaximized ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="4 14 10 14 10 20" />
                      <polyline points="20 10 14 10 14 4" />
                      <line x1="14" y1="10" x2="21" y2="3" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  )}
                </button>
                <button
                  type="button"
                  className="chatbot-action-btn close"
                  onClick={() => setIsChatOpen(false)}
                  aria-label="Close chatbot"
                  title="Close (ESC)"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </header>

            {/* Widget Iframe Container */}
            <div className="chatbot-iframe-container">
              <iframe
                src={CHAT_IFRAME_URL}
                title="Insplora Chatbot"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="clipboard-write"
                referrerPolicy="origin"
                className="chatbot-iframe"
              />
            </div>
          </aside>
        )}
      </div>

      {isSearchOpen && (
        <div className="search-screen" role="dialog" aria-modal="true" aria-label="InspironLabs AI Search">
          <header className="site-header">
            <a href="#top" aria-label="Inspiron Labs home" onClick={() => setIsSearchOpen(false)}>
              <img className="site-logo" src="/inspiron-labs-logo.png" alt="Inspiron Labs" />
            </a>
            <nav className="site-nav" aria-label="Primary">
              {visibleNav.map((item) => (
                <div className="site-nav-item" key={item.label}>
                  <a className="site-nav-link" href={`#${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span>{item.label}</span>
                    {item.items && (
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                        <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </a>
                </div>
              ))}
              <button type="button" className="site-search is-active" aria-label="Search is open">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>Search</span>
              </button>
              <a className="site-contact" href="#begin" onClick={() => setIsSearchOpen(false)}>
                CONTACT
              </a>
            </nav>
          </header>
          <button
            type="button"
            className="site-close"
            aria-label="Close search"
            onClick={() => setIsSearchOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M2 2l14 14M16 2L2 16" stroke="#091426" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
          <iframe
            className="search-screen-frame"
            src={SEARCH_IFRAME_URL}
            title="InspironLabs AI Search"
            allow="clipboard-write"
            referrerPolicy="origin"
          />
        </div>
      )}
    </div>
  )
}

export default App
