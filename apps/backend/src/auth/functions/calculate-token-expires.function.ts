export function calculateTokenExpires(tokenExpiresTime: string): Date {
  return new Date(Date.now() + parseInt(tokenExpiresTime));
}
