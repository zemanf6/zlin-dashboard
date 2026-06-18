import { Link } from "react-router-dom";
import { CloudSun, ExternalLink, LogOut, UserRound } from "lucide-react";
import "../styles/appHeader.css";

const headerLinks = [
  {
    label: "Všechny služby města",
    href: "https://portal.zlin.eu/",
  },
  {
    label: "Město Zlín",
    href: "https://www.zlin.eu/",
  },
];

export function AppHeader() {
  const logoSrc = `${import.meta.env.BASE_URL}images/portal-obcana-logo.png`;

  return (
    <header className="app-header">
      <div className="app-header__left">
        <Link
          className="app-header__brand"
          to="/"
          aria-label="Portál Zlíňáka"
        >
          <img
            className="app-header__logo"
            src={logoSrc}
            alt="Zlín portál Zlíňáka"
          />
        </Link>

        <nav className="app-header__links" aria-label="Hlavní odkazy">
          {headerLinks.map((link) => (
            <a
              className="app-header__link"
              href={link.href}
              target="_blank"
              rel="noreferrer"
              key={link.href}
            >
              <span>{link.label}</span>
              <ExternalLink size={15} strokeWidth={2} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>

      <nav className="app-header__actions" aria-label="Uživatelské menu">
        <div className="app-header__weather" aria-label="Počasí a datum">
          <CloudSun size={21} strokeWidth={1.8} aria-hidden="true" />
          <span>26.4 °C | 18. 6. 2026</span>
        </div>

        <Link className="app-header__profile-link" to="/profil">
          <span className="app-header__profile-icon" aria-hidden="true">
            <UserRound size={20} strokeWidth={1.9} />
          </span>
          <span className="app-header__profile-text">
            <span className="app-header__profile-label">Můj profil</span>
            <span className="app-header__profile-name">Jan Novák</span>
          </span>
        </Link>

        <button className="app-header__logout-button" type="button">
          <LogOut size={19} strokeWidth={1.9} aria-hidden="true" />
          <span>Odhlásit</span>
        </button>
      </nav>
    </header>
  );
}