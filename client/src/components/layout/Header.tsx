import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import {useState} from "react";
import type {FormEvent} from "react";
import axios from "axios";
import {useAuth} from "../../context/AuthContext.tsx";

export default function Header() {
    // The form stays local to the header; authentication is shared by the context.
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {isLoggedIn, login, logout} = useAuth();

    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        // Prevents the browser from reloading the page when the form is submitted.
        event.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/auth/login",
                {email, password},
            );

            const {accesToken} = response.data.data;

            // The context stores the token and shares it with the rest of the app.
            login(accesToken);
            setShowLogin(false);
            setPassword("");
        } catch {
            setError("Courriel ou mot de passe invalide.");
        }
    }

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <img src="/mindharbor-logo.png" alt="Logo MindHarbor" className={styles.logo}/>

                <nav className={styles.nav}>
                    <ul>
                        {/* Link changes the page without reloading the React application. */}
                        <li><Link to="/personal-dashboard">Tableau de bord</Link></li>
                        <li><Link to="/wellness-journal">Journal de bien-être</Link></li>
                        <li><Link to="/analysis">Analyse et tendances</Link></li>
                    </ul>
                </nav>

                <div className={styles.authentication}>
                    {isLoggedIn ? (
                        <>
                            <span>Connecté</span>
                            <button type="button" onClick={logout}>Déconnexion</button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setShowLogin((currentValue) => !currentValue)}
                        >
                            Se connecter
                        </button>
                    )}

                    {showLogin && (
                        <form className={styles.loginForm} onSubmit={handleLogin}>
                            <label>
                                Courriel
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                Mot de passe
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </label>

                            {error && <p className={styles.loginError}>{error}</p>}

                            <button type="submit">Connexion</button>
                        </form>
                    )}
                </div>
            </div>
        </header>
    );
}
