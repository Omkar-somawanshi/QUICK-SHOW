const isoTimeFormat = (dateTime) => {
  const date = new Date(dateTime);
  const localTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // 12-hour format (e.g., 04:30 PM)
  });
  return localTime;
};

export default isoTimeFormat;
