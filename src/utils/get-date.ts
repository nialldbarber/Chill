export function getCurrentTime(): string {
  let message: string;
  const today = new Date();
  const hours = today.getHours();

  if (hours < 12) {
    message = 'Good Morning';
  } else if (hours < 18) {
    message = 'Good Afternoon';
  } else {
    message = 'Good Evening';
  }

  return message;
}
