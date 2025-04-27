# 🍳 Kitchen Frontend

## 📝 Description

Cette application Vue.js constitue la partie front-end de mon application de cuisine. Elle permet de:

- 📱 Visualiser et gérer mon inventaire d'ingrédients en cuisine
- 🛒 Consulter les listes de courses générées automatiquement selon les stocks critiques
- 🍽️ Découvrir des recettes adaptées aux ingrédients disponibles
- ⚖️ Interagir avec les balances connectées pour une mise à jour automatique des stocks

L'application communique avec l'API backend pour centraliser toutes les données et offrir une interface utilisateur intuitive.

## 🛠️ Installation locale

### ⚙️ Configuration de l'environnement

1. Créez un fichier `.env` à la racine du projet en copiant le fichier `.env.example`:

   ```bash
   cp .env.example .env
   ```

2. Configurez les paramètres de déploiement:

   ```
   SSH_DEPLOY_KEY=~/.ssh/votre_clé_ssh
   REMOTE_USER=votre_utilisateur
   REMOTE_HOST=votre_host
   REMOTE_PORT=votre_port
   REMOTE_PATH=votre_chemin/example
   ```

3. Configurez l'URL de l'API:
   ```
   VITE_API_URL=https://votreapi.exemple.com
   ```

### 📦 Installation des dépendances

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 🚀 Lancement du serveur de développement

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

### 🔨 Compilation pour la production

```bash
npm run build
# ou
yarn build
# ou
pnpm build
```

## 📦 Déploiement

### 🔄 Déploiement automatique

Utilisez le script de déploiement automatique:

```bash
node deploy-app.js
# ou
npm run deploy
# ou
pnpm deploy
```

Ce script va:

1. Construire l'application pour la production
2. Se connecter au serveur distant via SSH
3. Transférer les fichiers compilés vers le serveur
4. Effectuer les opérations nécessaires post-déploiement
