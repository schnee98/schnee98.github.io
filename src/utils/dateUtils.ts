const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

const dateUtils = {
  parseDate: (date: string) =>
    new Date(date).toLocaleDateString("ko-KR", DATE_OPTIONS),
};

export default dateUtils;
