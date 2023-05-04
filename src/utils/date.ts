import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 中国标准时间
 */
const tz = 'Asia/Shanghai';

/**
 * 时间格式化
 * @param date
 * @returns
 */
export const dateToStr = (str?: string): string => {
  const date = dayjs(str);
  return dayjs.tz(date, tz).format('YYYY-MM-DD HH:mm:ss');
};
