import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand" aria-label="Kino XII brand">
          <span className="footer__brand-text">KINO</span>
          <span className="footer__brand-accent">XII</span>
        </div>

        <p className="footer__copyright">&copy; 2026 Kino XII. All rights reserved.</p>
      </div>
    </footer>
  );
}