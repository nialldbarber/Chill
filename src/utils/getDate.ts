/**
 * Prints a greeting that changes depending on the time of the day

 * @return {string} greeting based on time of day
 */

enum TIMES_IN_DIGITAL {
  'morning' = 12,
  'afternoon' = 18,
}

export function timeOfDayGreeting(): string {
  let message: string;
  const today = new Date();
  const hours = today.getHours();

  if (hours < TIMES_IN_DIGITAL.morning) {
    message = 'Good Morning';
  } else if (hours < TIMES_IN_DIGITAL.afternoon) {
    message = 'Good Afternoon';
  } else {
    message = 'Good Evening';
  }

  return message;
}
