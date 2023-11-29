export default function processYearMonthData(date: Date) {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;
  return `${year}/${month}`;
}
