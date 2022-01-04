
/**
 * A static class that is able to listen screen changies after media screen 
 * @param {Object} update				An object with properties to be merged into state
 * @param {Boolean} [overwrite=false]	If `true`, update will replace state instead of being merged into it
 */
class Media
{
    static bDebug = true;
 //   static recognition = new webkitSpeechRecognition() || new SpeechRecognition();

    /**
	 * This method is adding defined listener into window media. Here used int metod: initializeScreenListeners.
	 * @param {Object} mediafunc	A listener function, but here used set Media.screen object state,
     *                              or perhaps set another attributes false. See Screen.initializeScreenListeners
	 * @param {String} matchMediaStr A media min or max etc string value
	 */
    static addMediaListener(mediafunc, matchMediaStr, mediatype)
    {
        let x = window.matchMedia(matchMediaStr);
        mediafunc(x); // Call listener function at run time
        if (mediatype === undefined)
            x.addListener(mediafunc) // Attach listener function on state changes        
        else  // window.matchMedia('all')
            x.addListener(mediafunc) // Attach listener function on state changes        
    }

    static addMediaListenerSpeech(mediafunc, matchMediaStr)
    {
        Media.addMediaListener(mediafunc, matchMediaStr, 'speech');
    }

    /**
     * This static Media.screen object will change after media screen changies.
     */
    static screen = { 
        isLaptopOrDesktop_1224: false,
        isTabbletOrLike_1224: false,
        isTabbletOrMobile_1224: false,
        isSmartPhone_landskape: false,
        isSmartPhone_portrait: false,
        isPortrait: false,        
        isLandscape: false,
        isRretinaOrBigger_2d: false,
        isSpeech: false,
        isBraille: false, 
    };

    /**
     * Media.screen object with false values, except isPortrait and isLandscape.
     */
    static setScreenFalse = () =>
    {
        Media.screen.isLaptopOrDesktop_1224 = false;
        Media.screen.isTabbletOrLike_1224 = false;
        Media.screen.isTabbletOrMobile_1224 = false;
        Media.screen.isSmartPhone_landskape = false;
        Media.screen.isSmartPhone_portrait = false;
//        Media.screen.isPortrait = false;
  //      Media.screen.isLandscape = false;
        Media.screen.isRretinaOrBigger_2d = false;
        // Media.screen.isSpeech = false;
    }

    /**
     * Call this Media.initializeScreenListeners() function in beginiing of React/Preact etc app.
     * After this call, read states from Media.screen object, like: Media.screen.isPortrait
     */
    static initializeScreenListeners = () =>
    {

		console.log("Media.initializeScreenListeners");

        var synth = window.speechSynthesis;
        var utterance1 = new SpeechSynthesisUtterance('How about we say this now? This is quite a long sentence to say.');
        var utterance2 = new SpeechSynthesisUtterance('We should say another sentence too, just to be on the safe side.');

    //   synth.speak(utterance1);
     //   synth.speak(utterance2);

        var amISpeaking = synth.speaking; // will return true if utterance 1 or utterance 2 are currently being spoken
		console.log("Media.amISpeaking");
		console.log(amISpeaking);

        /*
        if (Media.recognition)   
        {            
            console.log('Audio listening:');
            */
            /*
            Media.recognition.addEventListener('audiostart', function() {
                console.log('Audio capturing is starting');
                Media.screen.isSpeech = true;
            });
            */
           /*
            Media.recognition.onaudioend = function() {
                console.log('Audio capturing ended');
                Media.screen.isSpeech = true;
              };
              */
       // }
        
        // speech: 
        /*
        Media.addMediaListener(x => { if (!x.matches) return; Media.setScreenFalse();
                Media.screen.isLaptopOrDesktop_1224 = true; Media.screen.isSpeech = true; }, 
                'only speech and body { voice-family: Paul } and screen and (min-device-width: 1224px)');
        Media.addMediaListener(x => { if (!x.matches) return; Media.setScreenFalse();
                Media.screen.isTabbletOrLike_1224 = true; Media.screen.isSpeech = true; }, 
                'only speech and body { voice-family: Paul } and screen and (min-device-width: 1824px)');
        Media.addMediaListener(x => { if (!x.matches) return; Media.setScreenFalse();
                Media.screen.isTabbletOrMobile_1224 = true; Media.screen.isSpeech = true; }, 
                'only speech and body { voice-family: Paul } and screen and (max-width: 1224px)');
        Media.addMediaListener(x => { if (!x.matches) return; Media.screen.isLandscape = false;
                Media.screen.isPortrait = true; Media.screen.isSpeech = true; }, 
                'only speech and body { voice-family: Paul } and screen and (orientation: portrait)');
        Media.addMediaListener(x => { if (!x.matches) return; Media.screen.isPortrait = false;
                Media.screen.isLandscape = true; Media.screen.isSpeech = true; }, 
         ,        'only speech and body { voice-family: Paul } and screen and (orientation: landscape)');
        Media.addMediaListener(x => { if (!x.matches) return; Media.setScreenFalse();
                Media.screen.isRretinaOrBigger_2d = true;Media.screen.isSpeech = true; }, 
                'only speech and body { voice-family: Paul } and screen and (min-resolution: 2dppx)');
          */  

        Media.addMediaListener(x => { if (!x.matches) return; Media.setScreenFalse();
                Media.screen.isLaptopOrDesktop_1224 = true; }, 
                'screen and (min-device-width: 1224px)');
        Media.addMediaListener(x => { if (!x.matches) return; Media.setScreenFalse();
                Media.screen.isTabbletOrLike_1224 = true; }, 
                'screen and (min-device-width: 1824px)');
        Media.addMediaListener(x => { if (!x.matches) return; Media.setScreenFalse();
                Media.screen.isTabbletOrMobile_1224 = true; }, 
                'screen and (max-width: 1224px)');
        Media.addMediaListener(x => { if (!x.matches) return; Media.screen.isLandscape = false;
                Media.screen.isPortrait = true; }, 
                'screen and (orientation: portrait)');                
        Media.addMediaListener(x => { if (!x.matches) return; Media.screen.isPortrait = false;
                Media.screen.isLandscape = true; }, 
                'screen and (orientation: landscape)');
        Media.addMediaListener(x => { if (!x.matches) return; Media.setScreenFalse();
                Media.screen.isRretinaOrBigger_2d = true; }, 
                'screen and (min-resolution: 2dppx)');
        Media.addMediaListener(x => { if (!x.matches) return; Media.setScreenFalse();
                Media.screen.isSmartPhone_landskape = true; }, 
                'only screen and (min-width : 321px)');
        Media.addMediaListener(x => { if (!x.matches) return; Media.setScreenFalse();
                Media.screen.isSmartPhone_portrait = true; }, 
                'only screen and (max-width : 320px)');
        }

    /*
    <MediaQuery query='(min-device-width: 1224px)'>
    <div>You are a desktop or laptop</div>
    <MediaQuery query='(min-device-width: 1824px)'>
      <div>You also have a huge screen</div>
    </MediaQuery>
    <MediaQuery query='(max-width: 1224px)'>
      <div>You are sized like a tablet or mobile phone though</div>
    </MediaQuery>
  </MediaQuery>
  <MediaQuery query='(max-device-width: 1224px)'>
    <div>You are a tablet or mobile phone</div>
  </MediaQuery>
  <MediaQuery query='(orientation: portrait)'>
    <div>You are portrait</div>
  </MediaQuery>
  <MediaQuery query='(orientation: landscape)'>
    <div>You are landscape</div>
  </MediaQuery>
  <MediaQuery query='(min-resolution: 2dppx)'>
    <div>You are retina</div>
  </MediaQuery>
  */
}

export default Media;