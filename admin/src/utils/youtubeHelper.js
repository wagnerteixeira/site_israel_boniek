const youtubeUrlParser = (url) => {
    if (!url)
      return '';
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;    
    //var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;  era assim, o webpack chiou
    const match = url.match(regExp);
    return (match && match[7].length === 11)? match[7] : '';
}

export {
    youtubeUrlParser
}