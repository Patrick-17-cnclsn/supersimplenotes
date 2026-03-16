# 🔥 Configuration Firebase pour Super Simple Notes

## Étape 1 : Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur **"Ajouter un projet"**
3. Donnez un nom à votre projet (ex: `supersimplenotes`)
4. Désactivez Google Analytics (optionnel pour un projet BTS)
5. Cliquez sur **"Créer le projet"**

## Étape 2 : Ajouter une application Web

1. Dans la console Firebase, cliquez sur l'icône **Web** (`</>`)
2. Donnez un nom à votre app (ex: `SuperSimpleNotes`)
3. **NE PAS** cocher "Firebase Hosting"
4. Cliquez sur **"Enregistrer l'application"**
5. **COPIEZ** la configuration qui s'affiche (vous en aurez besoin !)

## Étape 3 : Activer l'authentification

1. Dans le menu de gauche, cliquez sur **"Authentication"**
2. Cliquez sur **"Commencer"**
3. Sélectionnez **"E-mail/Mot de passe"**
4. **Activez** la première option (E-mail/Mot de passe)
5. Cliquez sur **"Enregistrer"**

## Étape 4 : Créer la base de données Firestore

1. Dans le menu de gauche, cliquez sur **"Firestore Database"**
2. Cliquez sur **"Créer une base de données"**
3. Sélectionnez **"Démarrer en mode test"** (pour le développement)
4. Choisissez une région (ex: `europe-west1`)
5. Cliquez sur **"Activer"**

### ⚠️ Règles de sécurité Firestore

Remplacez les règles par défaut par celles-ci :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{noteId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Étape 5 : Configurer l'application

1. Ouvrez le fichier `core/config/firebase.ts`
2. Remplacez les valeurs par celles de votre configuration Firebase :

```typescript
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_PROJECT_ID.firebaseapp.com",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_PROJECT_ID.appspot.com",
  messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
  appId: "VOTRE_APP_ID"
};
```

## Étape 6 : Tester l'application

1. Lancez l'application : `npm start`
2. Créez un compte avec un email et mot de passe
3. Ajoutez des notes
4. Vérifiez dans Firebase Console que les données apparaissent dans Firestore

## 📱 Fonctionnalités implémentées

✅ **Authentification Firebase**
- Inscription / Connexion
- Déconnexion
- Protection des routes

✅ **Base de données Firestore**
- Synchronisation en temps réel
- Données par utilisateur
- Persistance cloud

✅ **Gestion des notes**
- Créer, modifier, supprimer
- Titre + description
- Dates de création/modification

✅ **Catégories**
- Personnel (Bleu)
- Travail (Rouge)
- Idées (Vert)
- Urgent (Orange)

✅ **Recherche et filtres**
- Recherche par titre/description
- Filtre par catégorie
- Tri par date ou titre

✅ **Favoris**
- Marquer des notes en favoris
- Affichage prioritaire


## 🐛 Dépannage

**Erreur "Firebase not configured"** : Vérifiez que vous avez bien remplacé les valeurs dans `firebase.ts`

**Erreur d'authentification** : Vérifiez que l'authentification Email/Password est activée dans Firebase Console

**Notes non synchronisées** : Vérifiez les règles de sécurité Firestore

**Erreur de build** : Exécutez `npm install` puis `npx expo prebuild --clean`

