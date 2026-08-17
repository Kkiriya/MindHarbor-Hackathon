# Remise — Hackathon MindHarbor

> **Mode d'emploi (à supprimer avant de déposer)**
>
> 1. Renommez ce fichier en `REMISE.md`.
> 2. Remplacez chaque valeur entre chevrons `<...>`. Supprimez les lignes de membres inutilisées.
> 3. Commitez `REMISE.md` à la racine de votre dépôt.
> 4. Déposez le **même fichier** sur Teams, dans le devoir prévu, **avant le dimanche 16 août 2026, 23 h 59**.
> 5. Un seul dépôt par équipe : c'est le capitaine qui remet.

- **Cours :** Service Web — Groupe 25604 — Session Été 2026
- **Équipe :** Jean-Simon Cyr et Émile Valade
- **Date de remise :** 2026-08-16 23h59

---

## 1. Dépôt GitHub

- **URL (public) :** <https://github.com/Kkiriya/MindHarbor-Hackathon>
- **Commit final à corriger :** ec71c42c68da914c3b293ce360d8a23a4e685dfc
- **Branche :** main
- [x] Vérifié en navigation privée : le dépôt est bien **PUBLIC**.

---

## 2. Membres de l'équipe

| #   | Prénom     | Nom    | Courriel           | Compte GitHub |
| --- | ---------- | ------ | ------------------ | ------------- |
| 1   | Jean-Simon | Cyr    | jsimcyr@gmail.com  | Jaska28       |
| 2   | Émile      | Valade | e.valade@proton.me | Kkiriya       |

**Capitaine :** Aucun

---

## 3. Comptes de démonstration

| Rôle           | Courriel                        | Mot de passe | Particularité                   |
| -------------- | ------------------------------- | ------------ | ------------------------------- |
| Administrateur | admin@mindharbor.com            | adminPswd    | Compte admin                    |
| Modérateur     | thomas.gagnon@mindharbor.local  | User123      | modère le groupe <anxietyGroup> |
| Utilisateur    | sophie.martin@mindharbor.local  | User123      | 30 jours de journal             |
| Utilisateur    | lucas.tremblay@mindharbor.local | User123      | profil privé                    |

---

## 4. État du projet

### Noyau obligatoire

| Fonctionnalité                | État                           | Remarque                                                                                                                                    |
| ----------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Journal de bien-être          | **complet** / partiel / absent |                                                                                                                                             |
| Analyse et tendances          | **complet** / partiel / absent |                                                                                                                                             |
| Ressources et favoris         | complet / partiel / **absent** | toutes les features absente sont presentes dans la base de donnees il manques simplement leur implementation dans le backend et le frontend |
| Groupes de soutien            | complet / partiel / **absent** |                                                                                                                                             |
| Messagerie et confidentialité | complet / partiel / **absent** |                                                                                                                                             |
| Profils et visibilité         | complet / partiel / **absent** |                                                                                                                                             |
| Tableau de bord               | **complet** / partiel / absent |                                                                                                                                             |
| Administration                | complet / partiel / **absent** |                                                                                                                                             |

### Extensions réalisées

aucune

### Non terminé / limitations connues

Les fonctionnalités principales qui restent à implémenter sont les suivantes :

- Ressources et exercices
- Groupes de soutien
- Messagerie privée et confidentialité des échanges
- Profils et visibilité
- Administration

Elles sont toutes déjà implémentées au niveau de la base de données. Cependant, leur implémentation au niveau du backend et du frontend n’a pas encore été réalisée.

Nous avons priorisé le journal de bien-être, l’analyse et les tendances, ainsi que le tableau de bord, car ce sont, selon nous, les fonctionnalités qui bénéficient le plus aux personnes dans le besoin.

---

## 5. Notre part de créativité

Nous avons choisi de concentrer notre travail sur une expérience simple et
apaisante. L’interface utilise une identité visuelle douce et
évite les formulations culpabilisantes lorsqu’une entrée de journal est absente.

Les ressources d’aide immédiate, notamment le 988, demeurent accessibles dans
le header et le footer afin qu’une personne en situation difficile puisse
obtenir de l’aide rapidement depuis n’importe quelle page.

Nous avons également conçu le tableau de bord pour présenter les informations
essentielles sans surcharger l’utilisateur : état du journal quotidien, résumé de
la semaine et observations personnalisées.

---

## 6. Vérifications avant dépôt

- [x] `npx tsc --noEmit` passe sans erreurs dans `server/` **et** dans `client/`
- [x] Le projet s'installe et démarre en suivant le README, sur une machine vierge
- [x] La base Neon est peuplée et restera accessible après la remise
- [x] Aucun fichier `.env` n'est commité ; les `.env.example` sont présents
- [x] Le scénario de validation de l'énoncé a été déroulé en entier
- [x] Le dépôt est public et le lien ci-dessus fonctionne en navigation privée
