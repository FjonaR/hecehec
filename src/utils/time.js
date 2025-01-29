import { formatDistanceToNow } from 'date-fns';

export const formatRelativeTime = (date) => {
  // check if date is a valid date or invalid time
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  return formatDistanceToNow(date, { addSuffix: true });
};

export function getFirebaseDate(date) {
  return date?.toDate ? date.toDate() : date;
}
