export const formatDateTime = (dateString) =>
{
    
const dateOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
};
const timeOptions = {
  hour12: true,
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
};

const date_time = {
  ...timeOptions, ... dateOptions
};
    
return new Date (dateString).toLocaleDateString('en-US', date_time)
}