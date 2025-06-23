export function validateNumbers(value: string) {
  return value.replace(/[^0-9]|^0+(?=[1-9])|^0+(?!$)/g, "");
}
