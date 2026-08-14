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
                            <li><Link to="/personal-dashboard" className={styles.Link}>Tableau de bord</Link></li>
                            <li><Link to="/wellness-journal" className={styles.Link}>Journal de bien-être</Link></li>
                            <li><Link to="/analysis" className={styles.Link}>Analyse et tendances</Link></li>
                        </ul>
                    </nav>
                </section>
            </div>

            <p className={styles.copyright}>© 2026 MindHarbor</p>

        </footer>
    )
}