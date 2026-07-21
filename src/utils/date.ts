const czechDateFormatter = new Intl.DateTimeFormat("cs-CZ", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

export function formatCzechDate(date: Date) {
  return czechDateFormatter.format(date);
}

export function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
