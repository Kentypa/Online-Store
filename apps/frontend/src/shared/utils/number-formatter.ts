export function numberFormatter(number: number) {
  const formatter = Intl.NumberFormat("ua");
  return formatter.format(number).replace(/,/g, " ");
}
