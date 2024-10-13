export const formatTime = (time: number): string => {
    let hours: number | string = Math.floor((time / 60 / 60) % 24);
    let minutes: number | string = Math.floor((time / 60) % 60);
    let seconds: number | string = Math.floor(time % 60);
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${hours}:${minutes}:${seconds}`;
};
