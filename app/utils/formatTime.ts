export function formatTime(time: number) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    let hoursFormat = '';
    if (hours !== 0) {
        hoursFormat = hours === 1 ? '1 hour ' : `${hours} hours `;
    }

    let minutesFormat = ''
    if (minutes !== 0) {
        minutesFormat = minutes === 1 ? '1 minute' : `${minutes} minutes`;
    }

    return hoursFormat + minutesFormat;
}