# Cahier des Charges - Super Simple Notes 📝

## 1. Introduction
**Super Simple Notes** est une application mobile de gestion de notes personnelle, développée dans le cadre d'un projet de fin d'études (BTS). L'objectif est de proposer une solution fluide, sécurisée et intuitive pour organiser ses idées au quotidien.

## 2. Objectifs du Projet
- Offrir une expérience utilisateur (UX) simple et moderne.
- Garantir la persistance et la synchronisation des données sur le cloud.
- Assurer la sécurité des données personnelles via une authentification robuste.
- Permettre une organisation efficace grâce à des catégories et des outils de recherche.

## 3. Spécifications Fonctionnelles

### 🔐 Authentification & Sécurité
- **Inscription/Connexion** : Création de compte via Email/Mot de passe.
- **Protection des données** : Chaque utilisateur ne peut accéder qu'à ses propres notes (règles de sécurité Firestore).
- **Gestion de session** : Persistance de la connexion au redémarrage de l'app.

### ✍️ Gestion des Notes (CRUD)
- **Création** : Ajouter une note avec un titre, un contenu et une catégorie.
- **Lecture** : Affichage de la liste des notes avec prévisualisation.
- **Modification** : Mise à jour en temps réel des notes existantes.
- **Suppression** : Possibilité de supprimer les notes obsolètes.

### 📂 Organisation & Recherche
- **Catégories colorées** : 
    - 🔵 Personnel
    - 🔴 Travail
    - 🟢 Idées
    - 🟠 Urgent
- **Favoris** : Marquer des notes importantes pour un accès rapide.
- **Recherche** : Barre de recherche par titre ou contenu.
- **Filtres** : Filtrage par catégorie et tri par date ou titre.

## 4. Spécifications Techniques

### 🛠 Stack Logicielle
- **Framework** : [React Native](https://reactnative.dev/) avec [Expo](https://expo.dev/) (SDK 54).
- **Langage** : [TypeScript](https://www.typescriptlang.org/) pour un code typé et robuste.
- **Base de données & Auth** : [Firebase](https://firebase.google.com/) (Firestore pour le NoSQL et Firebase Auth).
- **Gestion d'état** : [Zustand](https://github.com/pmndrs/zustand) pour un state management léger et performant.
- **Stylisation** : [NativeWind](https://www.nativewind.dev/) (Tailwind CSS pour React Native).
- **Navigation** : [Expo Router](https://docs.expo.dev/router/introduction/) (système basé sur les fichiers).

### ☁️ Architecture Cloud
- **Firestore** : Base de données NoSQL orientée documents.
- **Règles de sécurité** : Filtrage au niveau du serveur pour empêcher l'accès aux données d'autrui.

## 5. Guide d'Installation (Développement)

1. **Clonage du dépôt** :
   ```bash
   git clone https://github.com/Patrick-17-cnclsn/supersimplenotes
   cd supersimplenotes
   ```

2. **Installation des dépendances** :
   ```bash
   npm install
   ```

3. **Configuration Firebase** :
   - Créer un projet sur Firebase Console.
   - Activer l'Authentification (Email/Password).
   - Créer une base Firestore.
   - Copier vos identifiants dans `core/config/firebase.ts`.

4. **Lancement** :
   ```bash
   npx expo start
   ```

---
*Ce projet a été réalisé avec ❤️ pour démontrer les compétences en développement mobile hybride et intégration de services cloud.*
