/**
 * 时间格式化
 * @param date
 * @returns
 */
export const dateToStr = (date: Date): string => {
  const t = new Date(date);

  return t.toLocaleString(undefined, { hour12: false }).replace(/T/, ' ').replace(/\..+/, '');
};
