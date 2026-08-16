url de de base /

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
