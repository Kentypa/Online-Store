import { numberFormatter } from "@utils/number-formatter.ts";

export function textFormatter(text: string | number): string {
  return text
    .toString()
    .replace(/\d+/g, (match) => numberFormatter(Number.parseFloat(match)));
}
