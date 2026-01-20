// Types pour Cloudflare Pages Functions
// Voir: https://developers.cloudflare.com/pages/functions/api-reference/

declare global {
  /**
   * EventContext fourni par Cloudflare Pages Functions
   */
  interface EventContext<Env = unknown, P = unknown, Data = unknown> {
    request: Request;
    env: Env;
    params: P;
    waitUntil: (promise: Promise<unknown>) => void;
    next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
    data: Data;
  }

  /**
   * Type de fonction pour Cloudflare Pages
   */
  type PagesFunction<
    Env = unknown,
    Params = string,
    Data = unknown
  > = (context: EventContext<Env, Params, Data>) => Response | Promise<Response>;
}

export {};
