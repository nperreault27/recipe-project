export function formatTime(timeInSeconds: number) {
    const hours = Math.floor(timeInSeconds / (60 * 60));
    const minutes = Math.floor(timeInSeconds / 60 % 60);
    const seconds = Math.floor(timeInSeconds % 60);

    let hoursFormat = '';
    if (hours !== 0) {
        hoursFormat = hours === 1 ? '1 hour ' : `${hours} hours `;
    }

    let minutesFormat = ''
    if (minutes !== 0) {
        minutesFormat = minutes === 1 ? '1 minute ' : `${minutes} minutes `;
    }

    let secondsFormat = ''
    if (seconds !== 0) {
        secondsFormat = seconds === 1 ? '1 second' : `${seconds} seconds`;
    }

    return hoursFormat + minutesFormat + secondsFormat;
}

export function parseTimeToSeconds(input: string): number {
    const timeUnits: { [key: string]: number } = {
        h: 3600,
        hr: 3600,
        hrs: 3600,
        hour: 3600,
        hours: 3600,
        m: 60,
        min: 60,
        mins: 60,
        minute: 60,
        minutes: 60,
        s: 1,
        sec: 1,
        secs: 1,
        second: 1,
        seconds: 1
    };

    const regex = /(\d+(?:\.\d+)?)\s*(h|hr|hrs|hour|hours|m|min|mins|minute|minutes|s|sec|secs|second|seconds)\b/gi;

    let totalSeconds = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(input)) !== null) {
        const value = parseFloat(match[1]);
        const unit = match[2].toLowerCase();
        const multiplier = timeUnits[unit];
        totalSeconds += value * multiplier;
    }

    return totalSeconds;
}
