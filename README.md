# 💧⚡ Sign'EauxL'Ecte

## 📌 Description

**Sign'EauxL'Ecte** est une application web collaborative permettant aux citoyens de signaler les coupures d'eau et d'électricité dans leur quartier.

Les signalements sont visibles par les autres utilisateurs qui peuvent les vérifier afin d'augmenter leur fiabilité. Un administrateur peut ensuite gérer, certifier ou supprimer les signalements selon leur pertinence.

L'objectif est de faciliter le partage d'informations en temps réel et d'améliorer le suivi des interruptions de services.

---

## 🚀 Fonctionnalités

### 👤 Citoyen

- Créer un compte et se connecter
- Créer un signalement de coupure
- Consulter les signalements disponibles
- Vérifier un signalement existant
- Voir ses propres signalements
- Modifier ses signalements
- Supprimer ses signalements

### 🛡️ Administrateur

- Consulter tous les signalements
- Filtrer et rechercher des signalements
- Certifier un signalement valide
- Rejeter ou supprimer un faux signalement
- Consulter les statistiques globales

---

## 🛠️ Technologies utilisées

### Frontend

- React
- TypeScript
- React Router
- CSS3 Responsive Design

### Backend / Services

- Firebase Authentication
- Cloud Firestore

---

## 📂 Architecture du projet
src/
│
├── components/ # Composants réutilisables
├── pages/ # Pages de l'application
├── layouts/ # Structures globales
├── services/ # Logique Firebase
├── firebase/ # Configuration Firebase
├── hooks/ # Hooks personnalisés
├── contexts/ # Gestion des états globaux
├── types/ # Interfaces TypeScript
└── utils/ # Fonctions utilitaires


---

## 🎨 Design

L'interface utilise un thème inspiré de la JIRAMA :

- 🟠 Orange : `#F58220`
- ⚫ Noir : `#111111`

Le design est responsive et adapté aux :

- Ordinateurs
- Tablettes
- Smartphones

---

## 🔥 Base de données Firebase

### Collection `users`

Stocke les informations des utilisateurs.

```json
{
  "uid": "user_id",
  "name": "Utilisateur",
  "email": "email@example.com",
  "role": "citizen"
}
