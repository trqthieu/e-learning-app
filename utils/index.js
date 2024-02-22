export function convertTime(minutes) {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    return hours + " hours and " + remainingMinutes + " minutes";
}