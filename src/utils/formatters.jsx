import React from 'react';

/**
 * Safely parses any date representation (ISO string, number, Date, Firestore timestamp).
 * @param {any} raw 
 * @returns {Date|null}
 */
export const parseRawDate = (raw) => {
  if (!raw) return null;
  if (raw instanceof Date) return isNaN(raw.getTime()) ? null : raw;
  if (typeof raw === 'number') {
    const d = new Date(raw);
    return isNaN(d.getTime()) ? null : d;
  }
  if (typeof raw.toDate === 'function') {
    try {
      const d = raw.toDate();
      return isNaN(d.getTime()) ? null : d;
    } catch {
      return null;
    }
  }
  if (raw.seconds) {
    const d = new Date(raw.seconds * 1000);
    return isNaN(d.getTime()) ? null : d;
  }
  if (typeof raw === 'string') {
    const d = new Date(raw);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
};

/**
 * Formats a date string, number, or Firestore timestamp into a colorful JSX element with date and time.
 * @param {any} raw - The date to format.
 * @returns {JSX.Element|string} A JSX span element or readable fallback string.
 */
export const formatDateTime = (raw) => {
  if (!raw) {
    return 'Recently';
  }

  try {
    const date = parseRawDate(raw);
    if (!date) {
      return 'Recently';
    }

    // Get the local timezone for accurate display
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

    const dateOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone,
    };
    const timeOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone,
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
    const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date);

    return (
      <span className="datetime-display">
        <span className="date-part">{formattedDate}</span>{' '}
        <span className="time-part">{formattedTime}</span>
      </span>
    );
  } catch (error) {
    console.warn("Error in formatDateTime:", error);
    return 'Recently';
  }
};