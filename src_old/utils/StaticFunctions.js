static async postData(url = '', fetchparam = {}) {

    /*
      let strReferer = "";
      let strReferrerPolicy = "no-referrer";
      let strMode = "same-origin";
      let strcredentials = "same-origin";
      let headers = {};
      if (!Config.bUseOwnGatewayServer) 
      {
        strReferer = "about:client";
        strReferrerPolicy = "strict-origin-when-cross-origin";
        strMode = "cors";s
        strcredentials = "same-origin";

      const response = await fetch(url, fetchparam);
      return response; // parses JSON response into native JavaScript objects

      }
      */

      /*
      let testthis = true;
      if (testthis)
      {
        fetchparam.mode = 'no-cors'; // no-cors, *cors, same-origin
      }
      */

      // mode: 'no-cors'; // no-cors, *cors, same-origin
     // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
     // credentials: 'same-origin', // include, *same-origin, omit
     // redirect: 'follow', // manual, *follow, error
     // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

      // Internet Explorer 6-11
      const isIE = /*@cc_on!@*/false || !!document.documentMode;
      if (isIE != null && isIE)
      {
        await fetch(url, fetchparam).then(async (response)=> {
        return await response;
        });
      }
      else
      {
        const response = await fetch(url, fetchparam);
        return response; // parses JSON response into native JavaScript objects
      }
  }

}


export default StaticFunctions;