const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

export function parseDate(date: string) {
  return new Date(date).toLocaleDateString("ko-KR", dateOptions);
}
