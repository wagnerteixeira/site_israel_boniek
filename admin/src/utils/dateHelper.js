const dateAndTimeFormat = seconds => {
    const date = new Date(seconds * 1000);
    return `${(`0${(date.getDay())}`).slice(-2)}/${(`0${(date.getMonth() + 1)}`).slice(-2)}/${date.getFullYear()} ${(`0${(date.getHours())}`).slice(-2)}:${(`0${(date.getMinutes())}`).slice(-2)}:${(`0${(date.getSeconds())}`).slice(-2)}`;
};

export {
    dateAndTimeFormat
};
