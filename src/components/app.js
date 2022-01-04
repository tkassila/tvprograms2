import { h, Component, createRef, render } from 'preact';
// import { route, Router } from 'preact-router';
import { Route, Router } from "wouter-preact";
// import Match from 'preact-router/match';
// import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './header';
import Profile from '../routes/profile';
import NotFound from '../routes/404';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';
import Config from '../utils/Config';
import IsBrowser from '../utils/IsBrowser';
import store from '../utils/store';
import Media from '../utils/Media';
import { Provider, connect } from '../unistore/integrations/preact';
//import Typography from 'preact-material-components/Typography';
//import 'preact-material-components/Typography/style.css';

// import YleHtml from '../components/ylehtml/YleHtml';
import YleRoute from '../routes/yle/YleRoute';
import TelkkuRoute from '../routes/telkku/TelkkuRoute';
import AmppariRoute from '../routes/amppari/AmppariRoute';
import HtmlTelkkuRoute from '../routes/telkkuhtml/HtmlTelkkuRoute';
import HtmlAmppariRoute from '../routes/ampparihtml/HtmlAmppariRoute';
// import { useMediaQuery } from 'react-responsive';
//import '../style'
//import './AppBackgroundBlack.css'

import makeMatcher from "wouter-preact/matcher";

const defaultMatcher = makeMatcher();

/*
 * A custom routing matcher function that supports multipath routes
 */
const multipathMatcher = (patterns, path) => {
  for (let pattern of [patterns].flat()) {
    const [match, params] = defaultMatcher(pattern, path);
    if (match) return [match, params];
  }

  return [false, null];
};

export default class App extends Component {

	unsubscribelistener = null;
	currentProgsourceCntrl = null;
	ctrlYleRef = null;
	ctrlTelkkuRef = null;
	ctrlHtmlTelkkuRef = null;
	ctrlAmppariRef = null;
	ctrlHtmlAmppariRef = null;
	headerRef = null;
	store = null;

	constructor(props)
	{
		super(props);
		this.state = {
			yleapiparams: '?app_id=' +Config.yleapi +"&app_key=" +Config.ylekey,
			currentUrl: '/amppari',
			currentProgsourceCntrl: null,
			themevalue: '--dark',
			componentDidMount: false
		}

		Config.bDebug = false;

		if (Config.bDebug)
		{
			console.log("app state");
			console.log(this.state);
		}

		console.log("Media.initializeScreenListeners()");
		Media.initializeScreenListeners();
		console.log("Media.screen");
		console.log(Media.screen.isRretinaOrBigger_2d);
		console.log("window.styleMedia.type");
		Config.setOwnserveraddress(location.hostname, location.host);
		IsBrowser.whichBrowser();
		this.store = store;
		store.setState({ isbrowser: IsBrowser, darkstyle: '' });

		if (Config.bDebug)
		{
			console.log("Isbrowser.---:");
			console.log(store.getState().isbrowser.isChrome);

			console.log("Isbrowser.isChrome:");
			console.log(IsBrowser.isChrome);
			console.log("Isbrowser.isFirefox:");
			console.log(IsBrowser.isFirefox);
			console.log("Isbrowser.isOpera:");
			console.log(IsBrowser.isOpera);
			console.log("Isbrowser.isBlink:");
			console.log(IsBrowser.isBlink);
		}
		
		console.log("Config");
		// console.log(Config);

		this.ctrlYleRef = createRef();
		console.log("after ctrlYleRef");
		this.ctrlTelkkuRef = createRef();
		console.log("after ctrlTelkkuRef");
		this.ctrlHtmlTelkkuRef = createRef();
		console.log("after ctrlHtmlTelkkuRef");
		this.ctrlAmppariRef = createRef();
		console.log("after ctrlAmppariRef");
		this.ctrlHtmlAmppariRef = createRef();
		console.log("after ctrlHtmlAmppariRef");
		this.headerRef = createRef();
		console.log("after headerRef");
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
	}

	listenerStoreChange2 = (storestate) =>
    {
		if (Config.bDebug)
		{
			console.log("app.js listenerStoreChange2");
			console.log(storestate);
		}
        if (storestate === undefined || storestate === null)
        {
            console.log("Amppari listenerStoreChange storestate");
            return;
        }

        const newlocation = storestate.newlocation;
		if (newlocation)
		{
			let data = {};
			data.url = newlocation;
			this.handleRoute(data);
			this.setState({ currentUrl: newlocation, 
			});	
		}
    }	

	removelisteners = () =>
	{
		if (this.unsubscribelistener != null)
		{
			this.unsubscribelistener();
			this.unsubscribelistener = null;
		}
	}
	componentWillUnmount()
	{
		this.removelisteners();
	//	this.setState({});
	//	this.store.setStateNoneCallListeners({fetchitems: [], channeltypeitems: [],
	//		programtypeitems: [], categories: [], schedules: [],
	//	     });
	}



	componentDidMount()
	{
		let keys = [];
		keys.push('newlocation');
		this.unsubscribelistener = 
			this.store.subscribeAttributeNameListener( keys, state => this.listenerStoreChange2(state) ); 

		this.state.componentDidMount = true;
		const uri = document.documentURI;
		const url = document.URL;
		if (uri !== undefined || uri !== null)
		{
			let modUri = url.replace(url);
			if (modUri == undefined || modUri === null || modUri == 'undefined')
				modUri = '/';
		//	this.state.currentUrl = modUri; 
			console.log("this.state.currentUrl");
			console.log(this.state.currentUrl);
		//	route(modUri);
		}
		this.themeChange('');
	//	this.state.currentProgsourceCntrl = this.ctrlYleRef;
		// this.state.currentUrl = '/';
	//	this.headerRef.toggleDarkTheme();

	}

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = async e => {

		console.log("app.js handleRoute");

		if (e == null || e == undefined /* || !this.state.componentDidMount */)
			return;

		if (e.url === undefined || e.url === null )
			return;

		switch(e.url)
		{
			case '/': this.state.currentProgsourceCntrl = this.ctrlYleRef; break;
			case '/telkku': this.state.currentProgsourceCntrl = this.ctrlTelkkuRef; break;
			case '/htmltelkku': this.state.currentProgsourceCntrl = this.ctrlHtmlTelkkuRef; break;
			case '/amppari': this.state.currentProgsourceCntrl = this.ctrlAmppariRef; break;
			case '/htmlamppari': this.state.currentProgsourceCntrl = this.ctrlHtmlAmppariRef; break;
			default: this.state.currentProgsourceCntrl = this.ctrlYleRef; break;
		}  

		/*
		this.setState({
			currentUrl: e.url
		});
		*/
		// route(e.url);
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

	themeChange = (themevalue) =>
	{
		/*
		if (themevalue != undefined)
		{
			*/
			if (Config.bDebug)
			{
				console.log("themevalue");
				console.log("'" +themevalue +"'");
			}
			if (themevalue.trim() == '')
			{
//				import('./App.css');
				import('./AppBackgroundWhite.css');
			//	document.body.style.display = "background-color: white; min-height: 100%;";
			    // document.html.style.display = "background-color: white;";
			}
			else			
			{
//				import('./App.css');
				import('./AppBackgroundBlack.css');
			//	document.body.style.display = "background-color: green; min-height: 100%;";
				// document.html.style.display = "background-color: black;";
			}
/*		}
		*/
		this.setState({ themevalue: themevalue });
	}

	render(props, state) {

		console.log("start App.js render");

		const darkstyle = state.themevalue;
		let divDialogStyle = (state.themevalue !== undefined && state.themevalue !== '' ? "color: #FFF; background-color: black; border-color: #FFF;" : '');

		// 			<Typography body1>

		console.log("start App.js render 2");

		return (			
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
		); // 				</Typography>

	}
}

/*
	<Header selectedRoute={state.currentUrl} store={store}
				  currentProgsourceCntrl={state.currentProgsourceCntrl}
				  themeChange={this.themeChange} />
			<Router onChange={this.handleRoute}>
				<Router onChange={this.handleRoute}>
			   	  <TelkkuRoute path="/telkku" store={store}
					   ref={this.ctrlTelkkuRef}
					   themevalue={state.themevalue} />
			      <YleRoute path="/" store={store} ref={this.ctrlYleRef} 
					 themevalue={state.themevalue} />
					<AmppariRoute path="/amppari" store={store}
					   ref={this.ctrlAmppariRef} 
					   themevalue={state.themevalue}/>
				  <HtmlTelkkuRoute path="/htmltelkku" store={store}
					   ref={this.ctrlHtmlAmppariRef}
					   themevalue={state.themevalue} />	
				  <HtmlAmppariRoute path="/htmlamppari" store={store}
					   ref={this.ctrlHtmlAmppariRef}
					   themevalue={state.themevalue} />

					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<NotFound default />
				</Router>	

*/