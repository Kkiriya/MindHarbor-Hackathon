import {useState} from "react";
import type {FormEvent} from "react";
import axios from "axios";
import {useAuth} from "../../context/AuthContext.tsx";

interface Props {
    onCancel: () => void;
    onSuccess: () => void;
}

export default function RegisterForm({onCancel, onSuccess}: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const {login} = useAuth();

    async function handleRegister(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        setError("");

        try {
            //First request to register the user
            await axios.post("http://localhost:3000/api/v1/auth/register",
                {email, password, firstName, lastName, username}
            );

            // The route register don't return a token, so we need to login the user after registration
            const loginResponse = await axios.post(
                "http://localhost:3000/api/v1/auth/login",
                {email, password},
            );

            const {accesToken, user} = loginResponse.data.data;

            // Register token in AuthContext
            login(accesToken, user)

            onSuccess();

        } catch (error) {
            setError("Impossible de créer un compte avec ces informations.");
        }
    }

    return (
        <form onSubmit={handleRegister}>
            <h2>Créer un compte</h2>

            <label>
                Prénom:
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </label>

            <label>
                Nom:
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </label>

            <label>
                Nom d’utilisateur
                <input
                    type="text"
                    value={username}
                    onChange={(event) =>
                        setUsername(event.target.value)
                    }
                    minLength={3}
                    maxLength={30}
                    required
                />
            </label>

            <label>
                Courriel
                <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                    required
                />
            </label>

            <label>
                Mot de passe
                <input
                    type="password"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                    minLength={8}
                    required
                />
            </label>

            <small>
                Le mot de passe doit contenir au moins huit caractères,
                une majuscule et un chiffre.
            </small>

            {error && <p>{error}</p>}

            <button type="submit">
                Créer le compte
            </button>

            <button type="button" onClick={onCancel}>
                Annuler
            </button>
        </form>
    );
}

