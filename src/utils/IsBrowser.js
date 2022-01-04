class IsBrowser 
{
    static isOpera = false;
    static isFirefox = false;
    static isSafari = false;
    static isIE = false;
    static isEdge = false;
    static isChrome = false;
    static isEdgeChromium = false;
    static isBlink = false;
    /*
    static let isOpera = false;
    static let isOpera = false;
    */

    static whichBrowser()
    {
        // console.log("navigator.userAgent");
        // console.log(navigator.userAgent);

        if((navigator.userAgent.indexOf("Opera") != -1 || navigator.userAgent.indexOf('OPR')) != -1 ) 
        {
            IsBrowser.isOpera = true;
        }        
        else
        if(navigator.userAgent.indexOf("Chrome") != -1 )
        {
            IsBrowser.isChrome = true;
        }
        else
        if(navigator.userAgent.indexOf("Safari") != -1)
        {
            IsBrowser.isSafari = true;
        }
        else
        if(navigator.userAgent.indexOf("Firefox") != -1 ) 
        {
            IsBrowser.isFirefox = true;
        }
        else
        if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
        {
            IsBrowser.isIE = true;
        }  
    } 
}

export default IsBrowser;