import {Link} from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <section className={styles.section}>
                    <img src="/mindharbor-logo-complet.png" alt="Logo" className={styles.logo}/>
                </section>

                <section className={styles.section}>
                    <h3>Navigation</h3>
                    <nav>
                        <ul>
                            <li><Link to="/personal-dashboard">Tableau de bord</Link></li>
                            <li><Link to="/wellness-journal">Journal de bien-être</Link></li>
                            <li><Link to="/analysis">Analyse et tendances</Link></li>
                        </ul>
                    </nav>
                </section>

                <section className={styles.section}>
                    <h3>T'as besoin d'aide ?</h3>
                    <ul>
                        <li>
                            Soutien en cas de crise :
                            <a href="tel:988"> appeler le 988</a>
                            {" ou "}
                            <a href="sms:988">envoyer un texto</a>
                        </li>

                        <li>
                            <a href="https://suicide.ca/fr" target="_blank" rel="noreferrer">
                                Suicide
                            </a>
                        </li>

                        <li>
                            <a
                                href="https://www.quebec.ca/sante/sante-mentale/trouver-aide-et-soutien-en-sante-mentale"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Ressources en santé mentale
                            </a>
                        </li>

                        <li>
                            <a
                                href="https://www.quebec.ca/sante/trouver-une-ressource/info-social-811"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Info-Social 811
                            </a>
                        </li>
                    </ul>
                </section>

                <section className={styles.footerImageSection}>
                    <img
                        src="/mindharbor-footer.png"
                        alt="Illustration MindHarbor"
                        className={styles.footerImage}
                    />
                </section>
            </div>

            <p className={styles.copyright}>© 2026 MindHarbor</p>

        </footer>
    )
}
