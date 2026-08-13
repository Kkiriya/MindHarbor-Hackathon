import styles from './Header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <section>
                <nav>
                    <ul>
                        <li><a href="#">Tableau de bord</a></li>
                        <li><a href="/wellness-journal">Journal de bien-être</a></li>
                        <li><a href="#">Analyse et tendances</a></li>
                    </ul>
                </nav>
            </section>
        </header>
    )
}