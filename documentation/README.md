# 🎯 Portfolio

Ce projet est réalisé avec Next.js

## 🚀 Installation

Plusieurs étapes sont nécessaires pour démarrer le projet en local :

1. **Installer les dépendances**

   ```bash
   pnpm i
   ```

2. **Variables d'environnement**

   Récupérer les variables d'environnement auprès d'un développeur de l'équipe :
   - `DATABASE_URL`
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL`
   - `RESEND_API_KEY`
   - `EMAIL`

3. **Configuration de l'environnement**

   Créer un fichier `.env.local` et y ajouter les variables récupérées

4. **Initialiser Prisma**

   ```bash
   npx prisma generate
   ```

5. **Synchroniser la base de données**

   ```bash
   npx prisma migrate dev
   ```

6. **Vérifier le build**

   ```bash
   npm run vercel-build
   ```

7. **Lancer les tests**
   ```bash
   npm run test
   ```

## 🏃‍♂️ Lancer le projet

Exécuter la commande suivante dans le terminal :

```bash
npm run dev
```

## 🔄 Mise à jour du projet

Après chaque pull, exécuter les commandes suivantes :

1. **Mettre à jour les dépendances**

   ```bash
   pnpm i
   ```

2. **Appliquer les nouvelles migrations**

   ```bash
   npx prisma migrate dev
   ```

3. **Vérifier le build**
   ```bash
   npm run vercel-build
   ```
4. **Vérifier les tests**

   ```bash
   npm run test
   ```

## 📂 Modification du schéma de base de données

1. **Modifier le fichier** `prisma/schema.prisma`

2. **Créer et appliquer la migration**

   ```bash
   npx prisma migrate dev --name <nom-de-la-migration>
   ```

## 📝 Normes de l'équipe

Respecter les conventions suivantes :

### Branches

- **Noms en anglais** uniquement
- **Commencer par une majuscule** et utiliser des tirets si nécessaire
- Exemple : `Feature-authentication`, `Fix-login-bug`

### Pull requests & commits

- **Noms en anglais** uniquement
- **Format standardisé** :
  ```
  [feat/fix/merge/prettier...] - Ce que ça apporte
  ```
- **Exemples** :
  - `[feat] - Add user authentication`
  - `[fix] - Resolve login validation error`
  - `[merge] - Merge develop into main`

## ✅ Avant de push

Vérifier que tout fonctionne correctement :

1. **Build de production**

   ```bash
   npm run vercel-build
   ```

2. **Tests unitaires/intégration**
   ```bash
   npm run test
   ```
