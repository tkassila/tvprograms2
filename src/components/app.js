import { h, Component, createRef, render } from "preact";
import { route, Router } from 'preact-router';
// import { Route, Router } from "wouter-preact";
// import Match from 'preact-router/match';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from "preact";

import Header from "./header/header";
import Profile from "../routes/profile";
import NotFound from "../routes/404";
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';
import Config from "../utils/Config";
import IsBrowser from "../utils/IsBrowser";
import store from "../utils/store";
import Media from "../utils/Media";
// import { Provider, connect } from "../unistore/integrations/preact";
//import Typography from 'preact-material-components/Typography';
//import 'preact-material-components/Typography/style.css';

// import YleHtml from '../components/ylehtml/YleHtml';
import YleRoute from "../routes/yle/YleRoute";
import TelkkuRoute from "../routes/telkku/TelkkuRoute";
import AmppariRoute from "../routes/amppari/AmppariRoute";
import HtmlTelkkuRoute from "../routes/telkkuhtml/HtmlTelkkuRoute";
import HtmlAmppariRoute from "../routes/ampparihtml/HtmlAmppariRoute";
// import { useMediaQuery } from 'react-responsive';
//import '../style'
import './AppBackgroundWhite.css'

// import makeMatcher from "wouter-preact/matcher";
// const defaultMatcher = makeMatcher();

/*
 * A custom routing matcher function that supports multipath routes
 */
/*
const multipathMatcher = (patterns, path) => {
  for (let pattern of [patterns].flat()) {
    const [match, params] = defaultMatcher(pattern, path);
    if (match) return [match, params];
  }

  return [false, null];
};
*/

export default class App extends Component {
  ContextStore = null;
  unsubscribelistener = null;
  currentProgsourceCntrl = null;
  ctrlYleRef = null;
  ctrlTelkkuRef = null;
  ctrlHtmlTelkkuRef = null;
  ctrlAmppariRef = null;
  ctrlHtmlAmppariRef = null;
  headerRef = null;
  store = null;
  innerHeight = window.innerHeight;
  innerWidth = window.innerWidth; // document.querySelector("#height");
  rtime = null;
  timeout = false;
  delta = 400;

  constructor(props) {
    super(props);
    innerHeight = window.innerHeight;
    innerWidth = window.innerWidth; // document.querySelector("#height");

    this.state = {
      themeChange: false,
      innerHeight: innerHeight,
      innerWidth: innerWidth,
      old_innerHeight: innerHeight,
      old_innerWidth: innerWidth,
      innerWidth_change: 0,
      yleapiparams: "?app_id=" + Config.yleapi + "&app_key=" + Config.ylekey,
      currentUrl: "/",
      currentProgsourceCntrl: null,
      themevalue: "",
      componentDidMount: false,
    };

   // this.ContextStore = createContext(store);

   // Config.bDebug = false;
   Config.bDebug = true;

    if (Config.bDebug) {
      console.log("app state");
      console.log(this.state);
    }

    if (Config.bDebug) console.log("Media.initializeScreenListeners()");
    Media.initializeScreenListeners();
    console.log("Media.screen");
    console.log(Media.screen.isRretinaOrBigger_2d);
    console.log("window.styleMedia.type");
    Config.setOwnserveraddress(location.hostname, location.host);
    console.log("IsBrowser.whichBrowser();");
   IsBrowser.whichBrowser();
   console.log("this.store = store;");
    this.store = store;
    console.log("after this.store = store;");

    if (Config.bDebug) {
      console.log("Isbrowser.---:");
     // console.log(this.store.getState().isbrowser.isChrome);

      console.log("Isbrowser.isChrome:");
      console.log(IsBrowser.isChrome);
      console.log("Isbrowser.isFirefox:");
      console.log(IsBrowser.isFirefox);
      console.log("Isbrowser.isOpera:");
      console.log(IsBrowser.isOpera);
      console.log("Isbrowser.isBlink:");
      console.log(IsBrowser.isBlink);
      console.log("Isbrowser.OS:");
      console.log(IsBrowser.OS);
    }

    console.log("this.store.setState({ isbrowser:  IsBrowser, darkstyle});");
    this.store.setState({ isbrowser:  IsBrowser, darkstyle: "" });
    console.log("after this.store.setState({ isbrowser:  IsBrowser, darkstyle});");

    if (Config.bDebug) console.log("Config");
    // console.log(Config);

    this.ctrlYleRef = createRef();
    // console.log("after ctrlYleRef");
    this.ctrlTelkkuRef = createRef();
    // console.log("after ctrlTelkkuRef");
    this.ctrlHtmlTelkkuRef = createRef();
    // console.log("after ctrlHtmlTelkkuRef");
    this.ctrlAmppariRef = createRef();
    // console.log("after ctrlAmppariRef");
    this.ctrlHtmlAmppariRef = createRef();
    // console.log("after ctrlHtmlAmppariRef");
    this.headerRef = createRef();

    // window.onresize = this.reportWindowSize;
    //  console.log("after headerRef");
    /*
		var is_screen = window.matchMedia("screen").matches;
		console.log(is_screen);
		var is_speech = window.matchMedia("aural").matches;
		console.log("is_speech");
		console.log(is_speech);
		*/
    //document.getElementsByTagName("body").style = " color: #FFF; background-color: black; border-color: #FFF; ";
    //document.body.style = " color: #FFF; background-color: black; border-color: #FFF; ";
    //	document.body.style = 'background: red;';

    // window.addEventListener("resize", this.resize_end);
  //  console.log("this.addEvent(window, resize, this.reportWindowSize, true);");
  //  this.addEvent(window, "resize", this.reportWindowSize, true);
  //  console.log("after this.addEvent(window, resize, this.reportWindowSize, true);");
  }

  /*
    function: addEvent

    @param: obj         (Object)(Required)

        -   The object which you wish
            to attach your event to.

    @param: type        (String)(Required)

        -   The type of event you
            wish to establish.

    @param: callback    (Function)(Required)

        -   The method you wish
            to be called by your
            event listener.

    @param: eventReturn (Boolean)(Optional)

        -   Whether you want the
            event object returned
            to your callback method.
    */
  addEvent = (obj, type, callback, eventReturn) => {
    if (obj == null || typeof obj === "undefined") return;

    if (obj.addEventListener)
      obj.addEventListener(type, callback, eventReturn ? true : false);
    else if (obj.attachEvent) obj.attachEvent("on" + type, callback);
    else obj["on" + type] = callback;
  };

  watch = (evt) => {
    /*
        Older browser versions may return evt.srcElement
        Newer browser versions should return evt.currentTarget
    */
    var dimensions = {
      height: (evt.srcElement || evt.currentTarget).innerHeight,
      width: (evt.srcElement || evt.currentTarget).innerWidth,
    };
  };

  resize_end = () => {
    if (new Date() - this.rtime < this.delta) {
      setTimeout(this.resize_end, this.delta);
    } else {
      this.timeout = false;
      //    alert("Done resizing");
      this.reportWindowSize();
    }
  };

  reportWindowSize = () => {
    /*
        Older browser versions may return evt.srcElement
        Newer browser versions should return evt.currentTarget
    */
    /*
    var dimensions = {
      height: (event.srcElement || event.currentTarget).innerHeight,
      width: (event.srcElement || event.currentTarget).innerWidth,
    };
    */
    let innerHeight = window.innerHeight; // event.target.innerHeight; // window.innerHeight;
    let innerWidth = window.innerWidth; // event.target.innerWidth; // window.innerWidth;

    if (Config.bDebug) {
      console.log("innerHeight");
      console.log(innerHeight);
      console.log("innerWidth");
      console.log(innerWidth);
    }
    let old_innerHeight = this.state.innerHeight;
    let old_innerWidth = this.state.innerWidth;
    if (
      old_innerHeight == undefined ||
      innerHeight == undefined ||
      old_innerWidth == undefined ||
      innerWidth == undefined
    )
      return;
    if (old_innerWidth == innerWidth) return;
    if (Config.bDebug) console.log("kissa");

    this.store.setState({
      old_innerHeight: old_innerHeight,
      old_innerWidth: old_innerWidth,
      innerHeight: innerHeight,
      innerWidth: innerWidth,
      innerWidth_change: innerWidth - old_innerWidth,
    });
    this.setState({
      innerWidth: innerHeight,
      innerWidth: innerWidth,
      innerWidth_change: innerHeight - old_innerHeight,
    });
  };

  toggleDarkTheme = () => {
    //	if (this._underSwitchChange)
    //		return true;

    // document.body.style = 'max-height: 100%; background-color: red; height: 100vh';

    const bValue = !this.state.themeChange;
    let themeValue = this.state.themevalue;
    if (bValue) {
      document.body.classList.add("mdc-theme--dark");
      themeValue = "--dark";
    } else {
      document.body.classList.remove("mdc-theme--dark");    
      themeValue = "";
    }

    this.setState(
      {
        themeChange: bValue, themevalue: themeValue,
      }
    );
    this.store.setState({ darkstyle: themeValue });


  };

  getPathOfRadioProgSourceChanged = (id) => {
    let ret = null;
    switch (id) {
      case "radio_yle":
        ret = "/";
        break;
      case "radio_telkku":
        ret = "/telkku";
        break;
      case "radio_telkkuhtml":
        ret = "/htmltelkku";
        break;
      case "radio_amppari":
        ret = "/amppari";
        break;
      case "radio_htmlamppari":
        ret = "/htmlamppari";
        break;
      default:
        ret = "/yle";
        break;
    }
    return ret;
  };


  listenerStoreChange2 = (storestate) => {
    if (Config.bDebug) {
      console.log("app.js listenerStoreChange2");
      console.log(storestate);
    }
    if (storestate === undefined || storestate === null) {
      console.log("Amppari listenerStoreChange storestate");
      return;
    }

    const newlocation = storestate.newlocation;
    if (newlocation) {
      let data = {};
      data.url = newlocation;
      this.handleUri(data);
      // this.setState({ currentUrl: newlocation });
    }
  };

  removelisteners = () => {
    if (this.unsubscribelistener != null) {
      this.unsubscribelistener();
      this.unsubscribelistener = null;
    }
  };

  componentWillUnmount() {
    this.removelisteners();
    //	this.setState({});
    //	this.store.setStateNoneCallListeners({fetchitems: [], channeltypeitems: [],
    //		programtypeitems: [], categories: [], schedules: [],
    //	     });
  }

  componentDidMount() {
    /* @babel/plugin-transform-react-jsx-source

    let keys = [];
    keys.push("newlocation");
    this.unsubscribelistener = this.store.subscribeAttributeNameListener(
      keys,
      (state) => this.listenerStoreChange2(state)
    );
    */

    this.state.componentDidMount = true;
    const uri = document.documentURI;
    const url = document.URL;
    if (uri !== undefined || uri !== null) {
      let modUri = url.replace(url);
      if (modUri == undefined || modUri === null || modUri == "undefined")
        modUri = "/";
      //	this.state.currentUrl = modUri;
      if (Config.bDebug) {
        console.log("this.state.currentUrl");
        console.log(this.state.currentUrl);
      }
      //	route(modUri);
    }
  //  this.themeChange("");

    console.log("this.addEvent(window, resize, this.reportWindowSize, true);");
    this.addEvent(window, "resize", this.reportWindowSize, true);
    console.log("after this.addEvent(window, resize, this.reportWindowSize, true);");
    //	this.state.currentProgsourceCntrl = this.ctrlYleRef;
    // this.state.currentUrl = '/';
    //	this.headerRef.toggleDarkTheme();
  }

  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = async (e) => {
    if (Config.bDebug) console.log("app.js handleRoute");
    this.handleUri(e);
    /*
		this.setState({
			currentUrl: e.url
		});
		*/
    // route(e.url);
  };

  handleUri = (e) => {
      if (e == null || e == undefined /* || !this.state.componentDidMount */)
      return;

    if (e.url === undefined || e.url === null) return;

    switch (e.url) {
      case "/":
        this.currentProgsourceCntrl = this.ctrlYleRef;
        break;
      case "/telkku":
        this.currentProgsourceCntrl = this.ctrlTelkkuRef;
        break;
      case "/htmltelkku":
        this.currentProgsourceCntrl = this.ctrlHtmlTelkkuRef;
        break;
      case "/amppari":
        this.currentProgsourceCntrl = this.ctrlAmppariRef;
        break;
      case "/htmlamppari":
        this.currentProgsourceCntrl = this.ctrlHtmlAmppariRef;
        break;
      default:
        this.currentProgsourceCntrl = this.ctrlYleRef;
        break;
    }

    this.setState({ currentUrl: e.url, currentProgsourceCntrl: this.currentProgsourceCntrl });

  }

  
  // 					<Home path="/" yleapiparams={state.yleapiparams} store={store} />

  /*
					<YleHtml path="/" store={store} ref={this.ctrlYleRef} />
					<Telkku path="/telkku" store={store} ref={this.ctrlTelkkuRef}/>;
					<HtmlTelkku path="/htmltelkku" store={store} ref={this.ctrlHtmlTelkkuRef}/>;		
					<Amppari path="/amppari" store={store} 
					ref={this.ctrlAmppariRef}/>;
					<HtmlAmppari path="/htmlamppari" store={store} 
						ref={this.ctrlHtmlAmppariRef}/>
	*/

  themeChange = (themevalue) => {
    if (themevalue != undefined) {
      this.setState({ themevalue: themevalue });

      if (Config.bDebug) {
        console.log("themevalue");
        console.log("'" + themevalue + "'");
      }
      if (themevalue.trim() == "") {
        //		import('./App.css');
        // documen.body.style.display = "background-color: white; color: black";
        //	import('./AppBackgroundWhite.css');
        //				import('../style');
        // ument.html.style.display = "background-color: white;";
      } else {
        //				import('./App.css');
        // document.body.style.display = "background-color: black<; ; color: white";
        //	import('./AppBackgroundBlack.css');
        //	document.body.style.display = "background-color: green; min-height: 100%;";
        // document.html.style.display = "background-color: black;";
      }
    }
    //		this.setState({ themevalue: themevalue });
  };

  /*
	getImportTelkkuRoute = () =>
	{
		// import('../routes/telkku/TelkkuRoute');
		return <TelkkuRoute path="/telkku" store={store}
		   ref={this.ctrlTelkkuRef}
		   themevalue={this.state.themevalue} /> ;
	}

	getImportYleRoute = () =>
	{
		// import('../routes/yle/YleRoute');
		return <YleRoute path="/" store={store} ref={this.ctrlYleRef} 
			themevalue={this.state.themevalue} /> ;
	}

	getImportAmppariRoute = () =>
	{
		// import('../routes/amppari/AmppariRoute');
		return <AmppariRoute path="/amppari" store={store}
				ref={this.ctrlAmppariRef} 
				themevalue={this.state.themevalue}/> ;
	}

	getImportHtmlTelkkuRoute = () =>
	{
		// import('../routes/telkkuhtml/HtmlTelkkuRoute');
		return <HtmlTelkkuRoute path="/htmltelkku" store={store}
				ref={this.ctrlHtmlAmppariRef}
				themevalue={this.state.themevalue} /> ;
	}

	getImportHtmlAmppariRoute = () =>
	{
		// import('../routes/ampparihtml/HtmlAmppariRoute');
		return <HtmlAmppariRoute path="/htmlamppari" store={store}
				ref={this.ctrlHtmlAmppariRef}
				themevalue={this.state.themevalue} /> ;
	}
	*/

  render(props, state) {
    //console.log("start App.js render");

    const darkstyle = state.themevalue;
    let divDialogStyle =
      state.themevalue !== undefined && state.themevalue !== ""
        ? "color: #FFF; background-color: black; border-color: #FFF;"
        : "color: black; background-color: white; border-color: #FFF;";

    // 			<Typography body1>

    /*
		let cntrlRoute = null;
		if (state.currentUrl && state.currentUrl === '/telkku')
			cntrlRoute = this.getImportTelkkuRoute();
		else
		if (state.currentUrl && state.currentUrl === '/')
			cntrlRoute = this.getImportYleRoute();
		else
		if (state.currentUrl && state.currentUrl === '/amppari')
			cntrlRoute = this.getImportAmppariRoute();
		else
		if (state.currentUrl && state.currentUrl === '/htmltelkku')
			cntrlRoute = this.getImportHtmlTelkkuRoute();
		else
		if (state.currentUrl && state.currentUrl === '/htmlamppari')
			cntrlRoute = this.getImportHtmlAmppariRoute();
		*/

    /*
    if (state.themeChange) {
      import("./AppBackgroundBlack.css");
    } else {
    }
    */
    // console.log("start App.js render 2");
    console.log("before app render return");

    //       <Provider store={this.store}>
    //         <this.ContextStore.Provider value={this.store}>

    return (
        <div
          id="app"
          style={
            "  margin:0px; height:100%; min-height:100%;min-height:100%; height:100%; " +
            divDialogStyle
          }
        >
          <Header
            selectedRoute={state.currentUrl}  
            currentProgsourceCntrl={state.currentProgsourceCntrl}
            themeChange={this.themeChange}
            darkThemeEnabled={state.themeChange}
            toggleDarkTheme={this.toggleDarkTheme}
          />
           <br/> <br/>
          <Router onChange={this.handleRoute}>        
              <HtmlAmppariRoute
                path="/htmlamppari"
                store={this.store}
                ref={this.ctrlHtmlAmppariRef}
                themevalue={state.themevalue}
              />    
              
              <HtmlTelkkuRoute
                path="/htmltelkku"
                store={this.store}
                ref={this.ctrlHtmlAmppariRef}
                themevalue={state.themevalue}
              />  

              <TelkkuRoute
                path="/telkku"
                store={this.store}
                ref={this.ctrlTelkkuRef}
                themevalue={state.themevalue}
              />
              
              <AmppariRoute
                type="text/partytown"
                path="/amppari"
                store={this.store}
                ref={this.ctrlAmppariRef}
                themevalue={state.themevalue}
              />

              <YleRoute
                type="text/partytown"
                path="/"
                store={this.store}
                ref={this.ctrlYleRef}
                themevalue={state.themevalue}
                innerWidth_change={state.innerWidth_change}
              />
          
          </Router>
        </div>
        
    ); // 				</Typography>  </Provider> </this.ContextStore.Provider>
  }
}

/*    <Header
            selectedRoute={state.currentUrl}  
            store={this.store}
            currentProgsourceCntrl={state.currentProgsourceCntrl}
            themeChange={this.themeChange}
          />

<Router matcher={multipathMatcher}>
    <Route path={["/htmltelkku"]}>
            <Route path={["/htmlamppari"]}>       
            </Route>
                    <Route path={["/telkku"]}>
            <Route path={["/amppari"]}>
            <Route path={["/"]}>
    
      <HtmlAmppariRoute
                path="/htmlamppari"
                store={this.store}
                ref={this.ctrlHtmlAmppariRef}
                themevalue={state.themevalue}
              />    
              
                   <HtmlTelkkuRoute
                path="/htmltelkku"
                store={this.store}
                ref={this.ctrlHtmlAmppariRef}
                themevalue={state.themevalue}
              />  

              <TelkkuRoute
                path="/telkku"
                store={this.store}
                ref={this.ctrlTelkkuRef}
                themevalue={state.themevalue}
              />
              
     <AmppariRoute
                type="text/partytown"
                path="/amppari"
                store={this.store}
                ref={this.ctrlAmppariRef}
                themevalue={state.themevalue}
              />

     <YleRoute
                type="text/partytown"
                path="/"
                store={this.store}
                ref={this.ctrlYleRef}
                themevalue={state.themevalue}
                innerWidth_change={state.innerWidth_change}
              />
                   
*/

/*
	<Provider store={store}>
			<div id="app" style={"  margin:0px; height:100%; height:100%; " +divDialogStyle}>
			<Header selectedRoute={state.currentUrl} store={store}
				  currentProgsourceCntrl={state.currentProgsourceCntrl}
				  themeChange={this.themeChange} />
		
			<Router matcher={multipathMatcher}>
			<Route path={["/telkku"]}>	
			        <TelkkuRoute path="/telkku" store={store}
					   ref={this.ctrlTelkkuRef}
					   themevalue={state.themevalue} />
			 </Route>	
			 <Route path={["/"]}>	
				 <YleRoute path="/" store={store} ref={this.ctrlYleRef} 
					 themevalue={state.themevalue} />
			 </Route>	
			 <Route path={["/amppari"]}>	
				 <AmppariRoute path="/amppari" store={store}
					   ref={this.ctrlAmppariRef} 
					   themevalue={state.themevalue}/>
			 </Route>	
			 <Route path={["/htmltelkku"]}>	
				 <HtmlTelkkuRoute path="/htmltelkku" store={store}
					   ref={this.ctrlHtmlAmppariRef}
					   themevalue={state.themevalue} />	
			 </Route>	
			 <Route path={["/htmlamppari"]}>	
				 <HtmlAmppariRoute path="/htmlamppari" store={store}
					   ref={this.ctrlHtmlAmppariRef}
					   themevalue={state.themevalue} />
			 </Route>	
				</Router>
				</div>
			
			</Provider>
*/
