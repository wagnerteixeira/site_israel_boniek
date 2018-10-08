const dateAndTimeFormat = date => {    
    const objDate = new Date(date);    
    return `${(`0${(objDate.getDay())}`).slice(-2)}/${(`0${(objDate.getMonth() + 1)}`).slice(-2)}/${objDate.getFullYear()} ${(`0${(objDate.getHours())}`).slice(-2)}:${(`0${(objDate.getMinutes())}`).slice(-2)}:${(`0${(objDate.getSeconds())}`).slice(-2)}`;    
};

export {
    dateAndTimeFormat
};
