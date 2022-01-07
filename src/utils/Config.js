// import { fetchJsonp } from 'fetch-jsonp';

import ProxyServerPort from './proxyserverport';

class Config
{
    static bDebug = false;
   static yleserverurl = 'https://external.api.yle.fi/v1/';
  // static yleserverurl = 'http://localhost:80/yle/';

    /* this app is not using yle api, because that yle has removed many of filtering
       or classifieding service api! This app is using enstead of onw proxy server. This
       proxy server is then calling different tv sources with curl app and is parsing or returning 
       received html xml elelements or json into tbis client app.
       */
    static yleapi = 'ddfdf';
    static ylekey = 'dfdffd';
    static yleapiparams = null;

    static yleschedules = null;

    static ownserveraddress = null;
    static http_ownserver = null;
    static http_curlserver = null

    static textFieldFocus = '  outline: 4px solid black; color: black; caret-color: auto; background-color: white; ';
    static textFieldFocusWhite = ' outline: 4px solid white; color: white; caret-color: auto; background-color: black; ';
    static textFieldStype = ' outline: 1px solid black; width: 90%; caret-color: auto; color: black; background-color: white; ';
    static textFieldStypeWhite = ' outline: 1px solid white; width: 90%; caret-color: auto; color: #FFF; background-color: black; ';

    static callFocusOfId(compid)
    {
      let aField = document.getElementById(compid);
      // aField.style.display='none';
      // aField.style.display='inline';
    // if (aField)
      //   setTimeout("aField.focus()", 500);
      setTimeout(function(){
         aField.focus();
      },500);
    }

    static setOwnserveraddress(p_hostname, p_host)
    {
      Config.ownserveraddress = p_host;
      /*
      let tmp = new String(p_host);
      let ind = tmp.indexOf(":");
      if (ind > -1)
         tmp = tmp.substring(0, ind);
         */
      Config.http_ownserver = "http://" +p_host;
      Config.http_curlserver = "http://" +p_hostname +":" +ProxyServerPort.port;
    }

    /*
    static _fetchJsonp = async props => {
      const { endpoint, options } = props
      return await fetchJsonp(endpoint)
      .then(async res => {
         if (res.ok) {
            return await res.clone().json().catch(() => res.text())
         }
         return res;
      })
      .catch(err => {
         console.error("api", "_fetch", "err", err)
         return false
      });
   }
      */
}

export default Config;