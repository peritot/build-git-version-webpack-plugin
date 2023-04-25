import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Shanghai');

/**
 * 时间格式化
 * @param date
 * @returns
 */
export const dateToStr = (str?: string): string => {
  return dayjs.tz(str).format('YYYY-MM-DD HH:mm:ss');
};
