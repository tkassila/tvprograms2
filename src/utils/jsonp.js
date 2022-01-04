export default (url, callback) => {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data);
    };
  
    var script = document.createElement('script');
    script.src =
      url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    
if(Config.bDebug)

if(Config.bDebug)

if(Config.bDebug)

if(Config.bDebug)
console.log("jsonp.js src=" +script.src);
    document.body.appendChild(script);
  };
  
