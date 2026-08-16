import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import type { FormEvent } from "react";
import { login as loginRequest } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";
import RegisterForm from "../auth/RegisterForm";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isLoggedIn, login, logout, user } = useAuth();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      const authData = await loginRequest({ email, password });
      login(
        {
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
        },
        authData.user,
      );
      setShowLogin(false);
      setPassword("");
    } catch {
      setError("Courriel ou mot de passe invalide.");
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.urgentSupport}>
        Besoin d’aide immédiate ? <a href="tel:988">Appelle le 988</a> ou{" "}
        <a href="sms:988">envoie un texto au 988</a>.
      </div>

      <div className={styles.content}>
        <img src="/mindharbor-logo.png" alt="Logo MindHarbor" className={styles.logo} />

        <nav className={styles.nav} aria-label="Navigation principale">
          <ul>
            <li>
              <NavLink
                to="/personal-dashboard"
                className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
              >
                Tableau de bord
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/wellness-journal"
                className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
              >
                Journal de bien-être
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/analysis"
                className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
              >
                Analyse et tendances
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.authentication}>
          {isLoggedIn ? (
            <>
              <span>Connecté : {user?.firstName}</span>
              <button type="button" onClick={() => void logout()}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setShowLogin((currentValue) => !currentValue);
                  setShowRegister(false);
                }}
              >
                Se connecter
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowRegister((currentValue) => !currentValue);
                  setShowLogin(false);
                }}
              >
                S'inscrire
              </button>
            </>
          )}

          {showLogin && !isLoggedIn && (
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

          {showRegister && !isLoggedIn && (
            <RegisterForm
              onCancel={() => setShowRegister(false)}
              onSuccess={() => setShowRegister(false)}
            />
          )}
        </div>
      </div>
    </header>
  );
}
