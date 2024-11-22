import Config from "./Config";

class IsBrowser {
  static isOpera = false;
  static isFirefox = false;
  static isSafari = false;
  static isIE = false;
  static isEdge = false;
  static isChrome = false;
  static isEdgeChromium = false;
  static isBlink = false;
  static OS = "";
  static currentBrowser = "";
  /*
    static let isOpera = false;
    static let isOpera = false;
    */

  static whichBrowser() {
    // console.log("navigator.userAgent");
    // console.log(navigator.userAgent);

    if (
      (navigator.userAgent.indexOf("Opera") != -1 ||
        navigator.userAgent.indexOf("OPR")) != -1
    ) {
      IsBrowser.isOpera = true;
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
      IsBrowser.isChrome = true;
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
      IsBrowser.isSafari = true;
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
      IsBrowser.isFirefox = true;
    } else if (
      navigator.userAgent.indexOf("MSIE") != -1 ||
      !!document.documentMode == true
    ) {
      //IF IE > 10
      IsBrowser.isIE = true;
    }

    IsBrowser.OS = IsBrowser.getOperatingSystem();
    IsBrowser.currentBrowser = IsBrowser.getBrowser();
  }

  static getOperatingSystem() {
    let operatingSystem = "Not known";
    let defos = navigator.appVersion;
    if (Config.bDebug) {
      console.log("defos");
      console.log(defos);
    }
    if (defos.indexOf("Win") !== -1) {
      operatingSystem = "Windows OS";
    }
    if (defos.indexOf("Mac") !== -1) {
      operatingSystem = "MacOS";
    }
    if (defos.indexOf("X11") !== -1) {
      operatingSystem = "UNIX OS";
    }
    if (defos.indexOf("Linux") !== -1) {
      operatingSystem = "Linux OS";
    }

    return operatingSystem;
  }

  static getBrowser() {
    let currentBrowser = "Not known";
    if (navigator.userAgent.indexOf("Chrome") !== -1) {
      currentBrowser = "Google Chrome";
    } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
      currentBrowser = "Mozilla Firefox";
    } else if (navigator.userAgent.indexOf("MSIE") !== -1) {
      currentBrowser = "Internet Exployer";
    } else if (navigator.userAgent.indexOf("Edge") !== -1) {
      currentBrowser = "Edge";
    } else if (navigator.userAgent.indexOf("Safari") !== -1) {
      currentBrowser = "Safari";
    } else if (navigator.userAgent.indexOf("Opera") !== -1) {
      currentBrowser = "Opera";
    } else if (navigator.userAgent.indexOf("Opera") !== -1) {
      currentBrowser = "YaBrowser";
    } else {
      console.log("Others");
    }

    return currentBrowser;
  }
}

export default IsBrowser;
