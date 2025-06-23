declare module "express" {
  interface Request {
    body: unknown;
    cookies: unknown;
    route: unknown;
    signedCookies: unknown;
  }
}

export {};
