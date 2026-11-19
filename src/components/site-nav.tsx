export function SiteNav() {
  return (
    <header className="site-nav">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className="nav-logo"
        aria-label="Focus Point Photography — Back to top"
      >
        <img src="/prints/signature.png" alt="Focus Point Photography" />
      </a>
    </header>
  )
}
