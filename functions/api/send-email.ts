import { Resend } from 'resend';

interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL_TO: string;
  CONTACT_EMAIL_FROM: string;
  VITE_SANITY_PROJECT_ID: string;
  VITE_SANITY_DATASET: string;
  SANITY_API_TOKEN: string;
}

interface ContactFormData {
  email: string;
  message: string;
}

interface SanityMutationResponse {
  transactionId: string;
  results: {
    id: string;
    operation: string;
  }[];
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;

    // Vérifier que les variables d'environnement sont définies
    if (!env.RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Configuration serveur manquante: RESEND_API_KEY' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!env.CONTACT_EMAIL_TO || !env.CONTACT_EMAIL_FROM) {
      return new Response(
        JSON.stringify({ error: 'Configuration serveur manquante: emails' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parser le corps de la requête
    let body: ContactFormData;
    try {
      body = await request.json() as ContactFormData;
    } catch {
      return new Response(
        JSON.stringify({ error: 'Corps de la requête invalide' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Valider les données
    if (!body.email || !body.message) {
      return new Response(
        JSON.stringify({ error: 'Email et message requis' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validation simple de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(
        JSON.stringify({ error: 'Adresse email invalide' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Limiter la longueur du message (protection contre le spam)
    if (body.message.length > 5000) {
      return new Response(
        JSON.stringify({ error: 'Message trop long (max 5000 caractères)' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 1. Envoyer l'email avec Resend
    const resend = new Resend(env.RESEND_API_KEY);
    const emailData = await resend.emails.send({
      from: env.CONTACT_EMAIL_FROM,
      to: env.CONTACT_EMAIL_TO,
      replyTo: body.email,
      subject: `Nouveau message de ${body.email}`,
      text: `
Email de: ${body.email}

Message:
${body.message}
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      border-bottom: 2px solid #000;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .from {
      font-weight: bold;
      color: #000;
    }
    .message {
      background-color: #f5f5f5;
      padding: 15px;
      border: 1px solid #000;
      border-radius: 0;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>Nouveau message de contact</h2>
  </div>
  <p class="from">De: ${body.email}</p>
  <div class="message">
    <p><strong>Message:</strong></p>
    <p>${body.message.replace(/\n/g, '<br>')}</p>
  </div>
</body>
</html>
      `.trim(),
    });

    // 2. Sauvegarder dans Sanity (si configuré)
    let sanityResult: SanityMutationResponse | null = null;
    let sanityError: string | null = null;

    if (env.VITE_SANITY_PROJECT_ID && env.VITE_SANITY_DATASET && env.SANITY_API_TOKEN) {
      try {
        const mutations = [
          {
            create: {
              _type: 'contact',
              email: body.email,
              message: body.message,
              sentAt: new Date().toISOString(),
            }
          }
        ];

        const sanityUrl = `https://${env.VITE_SANITY_PROJECT_ID}.api.sanity.io/v2025-12-26/data/mutate/${env.VITE_SANITY_DATASET}`;
        
        const sanityResponse = await fetch(sanityUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.SANITY_API_TOKEN}`
          },
          body: JSON.stringify({ mutations })
        });

        if (sanityResponse.ok) {
          sanityResult = await sanityResponse.json();
        } else {
          const errorText = await sanityResponse.text();
          console.error('Sanity Error:', errorText);
          sanityError = `Sanity API Error: ${sanityResponse.status} ${sanityResponse.statusText}`;
        }
      } catch (err) {
        console.error('Sanity Mutation Error:', err);
        sanityError = err instanceof Error ? err.message : 'Unknown Sanity Error';
      }
    } else {
      console.warn('Sanity configuration missing, skipping document creation');
    }

    // Retourner la réponse
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email envoyé avec succès',
        emailId: emailData.data?.id || null,
        sanity: {
          saved: !!sanityResult,
          id: sanityResult?.results?.[0]?.id || null,
          error: sanityError
        }
      }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        } 
      }
    );

  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Erreur lors de l\'envoi',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
};

// Gérer les requêtes OPTIONS pour CORS
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
