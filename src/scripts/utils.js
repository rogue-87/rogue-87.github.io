export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "short",
  });
}
