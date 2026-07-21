import { ArrowRight, CircleHelp, KeyRound, Mail, ShieldCheck } from "lucide-react";
import "../styles/login.css";

type LoginPageProps = {
  onLogin: () => void;
};

export function LoginPage({ onLogin }: LoginPageProps) {
  const logoSrc = `${import.meta.env.BASE_URL}images/portal-obcana-logo-transparent.png`;
  const imageSrc = `${import.meta.env.BASE_URL}images/zlin-login.jpg`;

  return <main className="login-page">
    <section className="login-panel" aria-labelledby="login-title">
      <img className="login-logo" src={logoSrc} alt="Zlín – portál Zlíňáka" />
      <div className="login-heading"><p>Bezpečný přístup k městským službám</p><h1 id="login-title">Přihlaste se do Portálu Zlíňáka</h1><span>Vyberte způsob, kterým chcete bezpečně ověřit svou totožnost.</span></div>

      <div className="login-options">
        <article className="login-card">
          <header><span><ShieldCheck size={27} /></span><div><h2>Přes elektronickou nebo bankovní identitu</h2><small>Doporučená možnost</small></div></header>
          <p>Použijte bankovní identitu, Mobilní klíč eGovernmentu, mojeID nebo jiný prostředek Identity občana.</p>
          <button type="button" onClick={onLogin}>Přihlásit se přes Identitu občana <ArrowRight size={17} /></button>
        </article>

        <article className="login-card">
          <header><span><Mail size={27} /></span><div><h2>Přes datovou schránku</h2><small>Pro fyzické osoby, OSVČ i organizace</small></div></header>
          <p>Přihlaste se údaji ke své datové schránce. V této ukázce budete rovnou přesměrováni do portálu.</p>
          <button type="button" onClick={onLogin}>Přihlásit se datovou schránkou <ArrowRight size={17} /></button>
        </article>

        <article className="login-card login-card--help">
          <header><span><CircleHelp size={27} /></span><div><h2>Potřebuji pomoci s přihlášením</h2><small>Jednoduchý návod krok za krokem</small></div></header>
          <p>Podívejte se, jak jednotlivé možnosti fungují a co budete k přihlášení potřebovat.</p>
          <button type="button">Přejít na návod <KeyRound size={17} /></button>
        </article>
      </div>
    </section>

    <aside className="login-visual" aria-label="Baťův mrakodrap a fotopoint ve Zlíně">
      <img src={imageSrc} alt="Baťův mrakodrap a fotopoint Zlín" />
      <div><strong>Město nekonečných možností</strong></div>
    </aside>
  </main>;
}
