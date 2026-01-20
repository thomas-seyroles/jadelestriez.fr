# Configuration de l'envoi d'emails avec Cloudflare Pages Functions

Ce projet utilise **Cloudflare Pages Functions** pour gérer l'envoi d'emails via **Resend**.

## Structure des fichiers

```
functions/
├── types.d.ts               # Types TypeScript pour Cloudflare Pages
└── api/
    └── send-email.ts        # Route API pour l'envoi d'emails
```

## Configuration

### 1. Variables d'environnement Cloudflare Pages

Vous devez configurer les variables d'environnement suivantes dans le dashboard Cloudflare Pages:

1. Allez sur votre projet Cloudflare Pages
2. **Settings** > **Environment variables**
3. Ajoutez les variables suivantes:

| Variable             | Description           | Exemple                              |
| -------------------- | --------------------- | ------------------------------------ |
| `RESEND_API_KEY`     | Clé API Resend        | `re_xxxxxxxxxxxxx`                   |
| `CONTACT_EMAIL_TO`   | Email de destination  | `[email protected]`                  |
| `CONTACT_EMAIL_FROM` | Email d'envoi vérifié | `Jade Portfolio <[email protected]>` |

### 2. Configuration Resend

1. Créez un compte sur [Resend](https://resend.com)
2. Vérifiez votre domaine dans **Domains**
3. Créez une API Key dans **API Keys**
4. Utilisez un email de votre domaine vérifié pour `CONTACT_EMAIL_FROM`

## Route API

### Endpoint

```
POST /api/send-email
```

### Format de la requête

```json
{
  "email": "[email protected]",
  "message": "Votre message ici"
}
```

### Réponse en cas de succès

```json
{
  "success": true,
  "message": "Email envoyé avec succès",
  "emailId": "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794"
}
```

### Réponse en cas d'erreur

```json
{
  "error": "Description de l'erreur"
}
```

## Sécurité

- Validation de l'email côté serveur
- Limite de 5000 caractères pour les messages
- Protection CORS configurée
- Gestion des erreurs complète

## Développement local

Pour tester en local avec Wrangler:

```bash
# Installer Wrangler (si pas déjà fait)
pnpm add -D wrangler

# Créer un fichier .dev.vars pour les variables locales
cat > .dev.vars << EOL
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL_TO=[email protected]
CONTACT_EMAIL_FROM=Jade Portfolio <[email protected]>
EOL

# Lancer le serveur de développement avec Pages
npx wrangler pages dev dist --compatibility-date=2024-01-01
```

**Note:** Les fichiers `.dev.vars` sont automatiquement ignorés par git pour la sécurité.

## Déploiement

Les Cloudflare Pages Functions sont automatiquement déployées avec votre projet. Assurez-vous simplement que:

1. Le dossier `functions/` est à la racine de votre projet
2. Les variables d'environnement sont configurées dans Cloudflare Pages
3. Votre domaine est vérifié sur Resend

## Routage

Cloudflare Pages utilise le routage basé sur les fichiers:

- `functions/api/send-email.ts` → `https://votre-site.pages.dev/api/send-email`

Les exports disponibles:

- `onRequestPost` : Gère les requêtes POST
- `onRequestOptions` : Gère les requêtes OPTIONS (CORS)

## Documentation officielle

- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
- [Resend avec Cloudflare Workers](https://resend.com/docs/send-with-cloudflare-workers)
- [Resend API Reference](https://resend.com/docs/api-reference/emails/send-email)
