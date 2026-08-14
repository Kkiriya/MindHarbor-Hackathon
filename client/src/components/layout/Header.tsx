import styles from './Header.module.css'
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <img src="/mindharbor-logo.png" alt="Logo" className={styles.logo}/>
                <nav className={styles.nav}>
                    <ul>
                        {/* Link vs a: Link don't reload the page */}
                        <li><Link to="/personal-dashboard" className={styles.Link}>Tableau de bord</Link></li>
                        <li><Link to="/wellness-journal" className={styles.Link}>Journal de bien-être</Link></li>
                        <li><Link to="/analysis" className={styles.Link}>Analyse et tendances</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}