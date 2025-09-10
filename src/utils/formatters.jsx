import React from 'react';

/**
 * Formats an ISO date string into a colorful JSX element with date and time.
 * @param {string} isoString - The date string to format.
 * @returns {JSX.Element|null} A JSX span element or null if the input is invalid.
 */
export const formatDateTime = (isoString) => {
  if (!isoString) {
    return null;
  }

  try {
    const date = new Date(isoString);

    // Get the local timezone for accurate display
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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
        <span className="date-part">{formattedDate}</span>
        <span className="time-part">{formattedTime}</span>
      </span>
    );
  } catch (error) {
    console.error("Invalid date string provided to formatDateTime:", error);
    return null;
  }
};