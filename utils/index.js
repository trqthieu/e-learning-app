export function convertTime(minutes) {
  let hours = Math.floor(minutes / 60);
  let remainingMinutes = minutes % 60;
  return hours + " hours and " + remainingMinutes + " minutes";
}

export const sortDescending = (a, b) => {
  return b.order - a.order;
};

export const sortAscending = (a, b) => {
  return a.order - b.order;
};
