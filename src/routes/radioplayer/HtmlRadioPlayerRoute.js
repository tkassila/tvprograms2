import { h, Component, createRef, Fragment } from 'preact';
//import Card from 'preact-material-components/Card';
//import 'preact-material-components/Card/style.css';
//import 'preact-material-components/Button/style.css';

import Config from '../../utils/Config';
import style from './style';


export default class HtmlRadioPlayerRoute extends Component {

    control = null;
	store = null;

	constructor(props)
	{
		super(props);
		if(Config.bDebug) 
		{
			console.log("HtmlRadioPlayerRoute.js");
			console.log("props");
			console.log(props);
		}

		this.state = {
			errmsg: null,
			bUnderFetch: false,
			store: props.store,
		}
	//	this.store = props.store;
    //    this.control = createRef();

		/*
		let blankurl = 'href="https:/www.radioplayer.fi/kanava';
		   // window.open(blankurl, '_blank', "Telkurpurlrpurlssa", "location=no");
			window.open(blankurl, '', "RadioPlayer");
		*/
		
		  
	 }

	 fetchHtmlRadioPlayerChannels = async () => {

		//let channelurl = 'https://www.radioplayer.fi/kanavat';
		let channelurl = '/radioplayer';

		if (this.state.bUnderFetch) return;
		if (Config.bDebug) {
		  console.log("fetchHtmlRadioPlayerChannels 1");
		  console.log(channelurl);
		}

		this.fetcheditems = [];
		this.store.setState({ fetchitems: [] });
	
		this.setState({
		  bUnderFetch: true,
		  channels: [],
		  selectedchannelindex: 0,
		  currentChannelSetIndex: 0,
		  errmsg: null,
		  fetcheditems: null,
		});
	
		this.bUnderFetch = true;
		let fetched = null;
		// 	crossDomain:true,
		await fetch(channelurl, {
		  method: "GET",
		  headers: {
			"Content-Type": "text/html; charset=UTF-8",
			Accept: "*/*", // application/rss+xml
		  },
		  mode: "cors",
		  signal: this.abortSignal,
		})
		  .then(this.handleErrors)
		  .then((response) => {
			return response.text();
		  })
		  //		.then(str => new window.DOMParser().parseFromString(str, "text/xml"))
		  .then((data) => {
			let data2 = data;
			if (Config.bDebug) {
			  console.log("fetchHtmlRadioPlayerChannels 1.5");
			  //console.log("data");
			  // console.log(data);
			}

			let xmlDoc = new window.DOMParser().parseFromString(data, "text/xml");
			let main =
			  xmlDoc.getElementsByTagName("body"); // [0].childNodes[0].nodeValue;
			let main_div = main.querySelector("div");
			data2 = main_div;
			this.fetcheditems = data2;
			this.channeltypeitems = data2;
			// this.programtypeitems = data2;
			// this.channels = data2;
			this.setState({
				  fetcheditems: this.fetcheditems,
				  channels: [],
				  bUnderFetch: false,
				  selectedsuodattimet: "kaikki",
				  channeltypeitems: null,
				  programtypeitems: null,
				  selectedtyyppi: "kaikki",
				  selectedTyyppiinindex: 0,
				  selectedsuodatinindex: 0,
				  bSearchButtonClicked: false,
				  selectedchannelindex: 0,
				  fetcheditems: data2,
			});
			this.store.setState({ fetchitems: data2 });
				// this.filterWhenUIControlsHasBeenChanged(filtercalled.CHANNELTYPE);
				// this.channels = data2;
				// this.setState({ channels: data2, });
				/*
							this.setState({ fetcheditems: data2, channels: null,
								bUnderFetch: false, selectedsuodattimet: 'kaikki',
									selectedtyyppi: 'kaikki', selectedTyyppiinindex: 0,
									selectedsuodatinindex: 0 });
							console.log("-- 2");
							//this.filterWhenUIControlsHasBeenChanged(filtercalled.CHANNELTYPE);
							*/
			this.setState({
				  /* fetcheditems: this.fetcheditems, */ channels: this.channels,
				  bUnderFetch: false,
				  selectedsuodattimet: "kaikki",
				  selectedtyyppi: "kaikki",
				  selectedTyyppiinindex: 0,
				  selectedsuodatinindex: 0,
				  bSearchButtonClicked: false,
				  selectedchannelindex: 0,
				});
				this.bUnderFetch = false;
				fetched = data2;
			  }
		  )
	
		//	fetched = data; // this.getJsonDataFromTelkkuRssXml(data);
		  .catch((error) => {
			console.error("error");
			console.error(error);
			this.setState({ errmsg: error.toString(), bUnderFetch: false });
			this.bUnderFetch = false;
			throw new thisException(error.toString());
		  });
		return fetched;
	  };
	
	componentDidMount()
	{
		if(Config.bDebug) 				
			console.log("componentDidMount 1");
			 
		// this.fetchProgCategories();		
	//	this.fetchHtmlRadioPlayerChannels();
	}


	/*
		'Origin': 'localhost:8080',
			'User-Agent': 'curl/7.55.1',
			'Host': 'external.api.yle.fi',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true,
			'Cross-Origin-Resource-Policy': 'cross-origin',
			'Access-Control-Allow-Methods': 'GET,OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type'
*/	

/*
<div class={`${style.home} page`}>
                	<HtmlTelkku store={props.store} ref={this.control}
					themevalue={props.themevalue} /> 
					<div style={{ "background-color": 'red', color: "yellow" } }>{state.errmsg}</div>				
				</div>
	*/			

	
	render(props, state) {
				
		return ( 
			<div class={style.cardHeader}>
			<h1 tabIndex="0" >Avaa alla oelvasta linkistä radioplay viereiseen välilehteen:</h1>

			<div  tabIndex="0" class={style.cardBody}><div><a target="_blank" href='https://www.radioplayer.fi' >Avaa radioplay</a></div>

			<div style={{ "background-color": 'red', color: "yellow" } }>{state.errmsg}</div>		
		</div>
</div>
			
		);
	}
}
