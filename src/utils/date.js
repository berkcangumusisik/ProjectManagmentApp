import {
  format,
  formatDistance,
  isToday,
  isTomorrow,
  isYesterday,
  differenceInDays,
} from 'date-fns';
import { tr, enUS } from 'date-fns/locale';

export function formatDate(date, locale = 'en', formatStr = 'PPP') {
  const locales = {
    en: enUS,
    tr: tr,
  };

  return format(new Date(date), formatStr, {
    locale: locales[locale] || locales.en,
  });
}

export function formatRelativeDate(date, locale = 'en') {
  const now = new Date();
  const targetDate = new Date(date);
  const daysDiff = differenceInDays(targetDate, now);

  if (isToday(targetDate)) {
    return locale === 'tr' ? 'Bugün' : 'Today';
  }

  if (isTomorrow(targetDate)) {
    return locale === 'tr' ? 'Yarın' : 'Tomorrow';
  }

  if (isYesterday(targetDate)) {
    return locale === 'tr' ? 'Dün' : 'Yesterday';
  }

  // Geçmiş tarihler için
  if (daysDiff < 0) {
    const days = Math.abs(daysDiff);
    return locale === 'tr' ? `${days} gün önce` : `${days} days ago`;
  }

  // Gelecek tarihler için
  if (daysDiff > 0) {
    return locale === 'tr' ? `${daysDiff} gün içinde` : `in ${daysDiff} days`;
  }

  // Fallback olarak date-fns'in formatDistance'ını kullanalım
  return formatDistance(targetDate, now, {
    addSuffix: true,
    locale: locale === 'tr' ? tr : enUS,
  });
}
