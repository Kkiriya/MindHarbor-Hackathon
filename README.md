# MindHarbor-Hackathon

## Technical Requirements

- TypeScript (Whole project in TS with strict mode activated)
- Neon PostgreSQL (for the DB)
- Prisma (for DB connection)
- Express (for routes)
- JWT Auth
- Axios (for internal API)
- React (for frontend ui)
- Git (for version control)

## Installation

**Clone the repo**
```bash
git https://github.com/Kkiriya/MindHarbor-Hackathon
cd MindHarbor-Hackathon
```

**Install dependencies**
```bash
npm install
```

**Set up the environment variables**
use the .env.example to set them up

**Generate prisma Client**
```bash
npx prisma generate
```

**Set up the database**
```bash
npx prisma deploy
```

**For demo, Seed the db**
```bash
npm run seed
```
**launch the backend server**
```bash
cd server
npm run dev
```

**launch the frontend server**
```
cd client
npm run dev
```

## Variables d'environment

.env (server)

```.env
DATABASE_URL="url de la connexion NEON"
DEVELOPMENT_DATABASE_URL="url de la connexion NEON, branche dev"
JWT_ACCESS_SECRET="secret_JWT"
JWT_REFRESH_SECRET="secret_JWT"
ACCESS_TOKEN_TTL="temps avant expiration du token"
REFRESH_TOKEN_TTL="temps avant expiration du token"
PORT="Port sur lequel le serveur s'execute"
CLIENT_URL="url pour le client"
```

.env (client)

```.env
VITE_API_URL="url pour l'api"
DATABASE_URL="url pour la base de donnees"
```

## Commandes

commandes (server)

```bash
# Lancer le seed
npm run seed

# Lancer le server
npm run dev
```

commandes (client)

```bash
# Lancer le server
npm run dev
```

## Comptes de démonstration

| Rôle           | Courriel                        | Mot de passe | Particularité                   |
| -------------- | ------------------------------- | ------------ | ------------------------------- |
| Administrateur | admin@mindharbor.com            | adminPswd    | Compte admin                    |
| Modérateur     | thomas.gagnon@mindharbor.local  | User123      | modère le groupe <anxietyGroup> |
| Utilisateur    | sophie.martin@mindharbor.local  | User123      | 30 jours de journal             |
| Utilisateur    | lucas.tremblay@mindharbor.local | User123      | profil privé                    |

## Points d'acces API

**implémenter et fonctionel**

**Authentification**
| Method | Route | Access |
| ------ | ----- | ------ |
| POST | /api/v1/auth/register | Public |
| POST | /api/v1/auth/login | Public |
| POST | /api/v1/auth/refresh | Public, jeton valide |
| POST | /api/v1/auth/logout | Authentifié |
| GET | /api/v1/auth/me | Authentifié |

**Journal et tendances**
| Method | Route | Access |
| ------ | ----- | ------ |
| GET | /api/v1/journal (iste paginée de mes entrées) | Auteur seulement |
| POST | /api/v1/journal (entrée du jour) | Auteur seulement | Auteur seulement |
| GET | /api/v1/journal/:date | Auteur seulement |
| PATCH | /api/v1/journal/:date (jusqu’à minuit) | Auteur seulement |
| GET | /api/v1/journal/stats?range=30d | Auteur seulement |
| GET | /api/v1/journal/insights | Auteur seulement |

## Diagramme ERD

```mermaid
erDiagram

    USER {
        UUID userId PK
        String email UK
        String password
        UserRole role
        String username UK
        String firstName
        String lastName
        String avatarPictureUrl
        String bio
        UserVisibilityLevel visibilityLevel
        UserPrivateMessageLevel privateMessageLevel
        DateTime createdAt
        DateTime updatedAt
    }

    RESOURCE {
        UUID resourceId PK
        String name UK
        ResourceCategory category
        ResourceType type
        Float duration
        Int level
        DateTime createdAt
        DateTime updatedAt
    }

    ACTIVITY {
        UUID activityId PK
        String name UK
        String desc
        DateTime createdAt
        DateTime updatedAt
    }

    JOURNAL_ENTRY {
        UUID journalId PK
        UUID userId FK
        Date date
        Int generalMood
        Int energyLevel
        Int sleepQuality
        Int stressLevel
        String keyEvents
        String dailyGratitude
        DateTime createdAt
        DateTime updatedAt
    }

    JOURNAL_ACTIVITY {
        UUID journalId PK, FK
        UUID activityId PK, FK
    }

    GROUP {
        UUID groupId PK
        String name UK
        String theme
        String desc
        String rules
        GroupVisibility visibility
        DateTime createdAt
        DateTime updatedAt
    }

    GROUP_MEMBER {
        UUID userId PK, FK
        UUID groupId PK, FK
        GroupRole role
        GroupRequestStatus requestStatus
        DateTime createdAt
        DateTime updatedAt
    }

    POST {
        UUID postId PK
        UUID userId FK
        UUID groupId FK
        String title
        String body
        DateTime createdAt
        DateTime updatedAt
    }

    COMMENT {
        UUID commentId PK
        UUID userId FK
        UUID postId FK
        String comment
        DateTime createdAt
        DateTime updatedAt
    }

    MESSAGE {
        UUID messageId PK
        UUID senderId FK
        UUID recipientId FK
        String message
        MessageReadReceipt readReceipt
        DateTime createdAt
        DateTime updatedAt
    }

    REPORT {
        UUID reportId PK
        UUID postId FK
        UUID userId FK
        ReportCategory category
        ReportStatus status
        DateTime createdAt
        DateTime updatedAt
    }

    REFRESH_TOKEN {
        UUID refreshTokenId PK
        UUID userId FK
        String tokenHash
        DateTime expiresAt
        DateTime createdAt
        DateTime revokedAt
        DateTime updatedAt
    }

    FAVORITE {
        UUID userId PK, FK
        UUID resourceId PK, FK
        DateTime createdAt
    }

    %% =========================
    %% RELATIONSHIPS
    %% =========================

    USER ||--o{ JOURNAL_ENTRY : creates

    JOURNAL_ENTRY ||--o{ JOURNAL_ACTIVITY : contains
    ACTIVITY ||--o{ JOURNAL_ACTIVITY : used_in

    USER ||--o{ GROUP_MEMBER : joins
    GROUP ||--o{ GROUP_MEMBER : has

    USER ||--o{ POST : creates
    GROUP ||--o{ POST : contains

    POST ||--o{ COMMENT : has
    USER ||--o{ COMMENT : writes

    USER ||--o{ MESSAGE : sends
    USER ||--o{ MESSAGE : receives

    POST ||--o{ REPORT : has
    USER ||--o{ REPORT : submits

    USER ||--o{ REFRESH_TOKEN : owns

    USER ||--o{ FAVORITE : creates
    RESOURCE ||--o{ FAVORITE : contains
```

Nous avons décidé de prendre en compte toutes les **core features** lors de la conception de la base de données afin de faciliter toute intégration supplémentaire que nous souhaiterions faire.

**User**
Cette table contient toutes les informations liées à un utilisateur, soit son mot de passe, son nom d'utilisateur, son courriel, son rôle, etc.

**Journal_Entry**
Cette table contient toutes les informations nécessaires à la création d'une entrée de journal. Elle est également reliée à la table **Activity** par une table de jonction **Journal_Activity**. Cette table de jonction est nécessaire puisque les activités sont universelles et peuvent être reliées à plusieurs journaux en même temps, tandis qu'un journal peut également contenir plusieurs activités.

**Activity**
Cette table contient toutes les informations nécessaires pour définir une activité.

**Group**
Cette table contient toutes les informations nécessaires à la conception d'un groupe. Elle est reliée à la table **User** par une table de jonction **Group_member**. Cette table de jonction est nécessaire puisqu'un utilisateur peut appartenir à plusieurs groupes en même temps et qu'un groupe peut avoir plusieurs utilisateurs en même temps.

**Post**
Cette table contient toutes les informations nécessaires à la conception d'un post.

**Comment**
Cette table contient toutes les informations nécessaires à la conception d'un commentaire.

**Message**
Cette table contient toutes les informations nécessaires à la conception d'un message.

**Report**
Cette table contient toutes les informations nécessaires à la conception d'un signalement.

**RefreshToken**
Cette table contient les refresh tokens hachés de chaque utilisateur.

**Ressource**
Cette table contient toutes les informations nécessaires à la conception d'une ressource. Elle est reliée à la table **User** par une table de jonction **Favorite**. Cette table de jonction est nécessaire puisqu'une ressource peut exister indépendamment d'un utilisateur, qu'un utilisateur peut avoir plusieurs ressources dans ses favoris et qu'une même ressource peut être ajoutée aux favoris par plusieurs utilisateurs différents.
