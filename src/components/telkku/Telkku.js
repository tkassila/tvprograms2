import { h, Component, createRef, Fragment } from 'preact';
//import Card from 'preact-material-components/Card';
//import 'preact-material-components/Card/style.css';
//import LayoutGrid from 'preact-material-components/LayoutGrid';
//import 'preact-material-components/LayoutGrid/style.css';
//import 'preact-material-components/Button/style.css';
//import Checkbox from 'preact-material-components/Checkbox';
// import Formfield from 'preact-material-components/FormField';
// import 'preact-material-components/Checkbox/style.css';
//import Select from 'preact-material-components/Select';
//import 'preact-material-components/List/style.css';
//import 'preact-material-components/Menu/style.css';
//import 'preact-material-components/Select/style.css';
//import TextField from 'preact-material-components/TextField';
//import 'preact-material-components/TextField/style.css';
//import 'preact-material-components/Theme/style.css';
//import Button from 'preact-material-components/Button';
//import 'preact-material-components/Button/style.css';
import Button from '../button/Button';
//import Dialog from 'preact-material-components/Dialog';
//import 'preact-material-components/Dialog/style.css';
//import 'preact-material-components/Theme/style.css';

import Dialog from '../dialog/Dialog'
import SwitchCheckbox from '../checkbox/CheckBox';

import AbortController from "abort-controller";
import style from './style';
import Config from '../../utils/Config';
// import fetchJsonp from 'fetch-jsonp';
import RssTelkkuChannel from './RssTelkkuChannel';

export default class Telkku extends Component {

	store = null;
	fetch_url_telkku = null;
	showAllDescrRef = null;
	showOneChannelRef = null;
	selectChannelRef = null;
	const_showChannelsAtSameTime = 10;
	_mounted = false;
	scrollingDlgRef = null;
	tablCntl = null;
	showTableBordersRef = null;
	sectionStyle = null;

	constructor(props)
	{
		super(props);
		if(Config.bDebug) 
		{
			console.log("Telkku.js");
			console.log("props");
			console.log(props);
		}

		this.store = props.store;
		let now = Date.now();
		this.state = {
			errmsg: null,
			channels: null,
			currentchannel: null,
			bUnderFetch: false,
			today: new Date(now),
			bDisplayAllDescriptions: false,
			showChannelsAtSameTime: this.const_showChannelsAtSameTime,
			selectedchannelindex: -1,
			bCheckShowChannelsAtSameTime: false,
			currentChannelSetIndex: 0,
			bUnderFetch: false,
			bAllChannelsLoaded: false,
			textSearch: null,
			bSearchButtonClicked: false,
			bShowTableBorder: false,
			bLoadAllChannels: false,
			bLoad10Channels: false,
			fetcheddata: null,
			fetcheditems: []
		}

		let themevalue = props.themevalue;
		this.sectionStyle = (themevalue !== undefined && themevalue !== '' ? 
		" border:1px solid pink; padding:15px;  margin:10px; background: black; color: white; " : 
		" border:1px solid black; padding:15px;  margin:10px; background: white; color: black;");

		// this.fetch_url_telkku = 'https://telkussa.fi/RSS/Channel/';
		this.fetch_url_telkku = Config.http_curlserver + '/telkku/';
		this.TelkkuException = this.TelkkuException.bind(this);
		this.removelisteners = this.removelisteners.bind(this);		 
		this.showAllDescrRef = createRef();
		this.showOneChannelRef = createRef();
		this.selectChannelRef = createRef();	
		this.scrollingDlgRef  = createRef();
		this.tablCntl	  = createRef();
		this.showTableBordersRef =  createRef();
	 }

	 componentWillReceiveProps(nextProps) 
	 {
	   if (Config.bDebug)
	   {
		 console.log("Telkku componentWillReceiveProps nextProps"); 
		 console.log(nextProps); 				
	   }
 
	   if (nextProps !== null && nextProps.themevalue != this.props.themevalue)
	   {
		   this.setState({ themevalue: nextProps.themevalue});		   
		   this.sectionStyle = (nextProps.themevalue !== undefined && nextProps.themevalue !== '' ? 
		   " border:1px solid pink; padding:15px;  margin:10px; background: black; color: white; " : 
		   " border:1px solid black; padding:15px;  margin:10px; background: white; color: black;");
			}
	 }

	componentDidMount()
	{
		if(Config.bDebug) 				
			console.log("componentDidMount 1");
		this.abortController = new AbortController(); // 1        
		this.abortSignal = this.abortController.signal; // 2
		this._mounted = true;	
		if (document.getElementById('programtable'))
		document.getElementById('programtable').onkeydown = this.altPlusKeyUp;

	//	this.fetchRssTelkkuPrograms();
	}

	removelisteners ()
	{
		if (this.abortSignal && !this.abortSignal.aborted)
			this.abortController.abort();	
	}

	componentWillUnmount()
	{
		this.removelisteners();
	//	this.setState({});
		// this.store.setStateNoneCallListeners({fetchitems: [], channeltypeitems: [],
			//programtypeitems: [], categories: [], schedules: [],
		   //  });
		this._mounted = false;
	}

	fetchRssTelkkuPrograms = async (init_pagenumber, init_max) =>
	{
		if (!this._mounted)
			return;

		if(Config.bDebug) 
		{	
			console.log("fetchRssTelkkuPrograms");		
		}
		if (this.state.bAllChannelsLoaded)
			return;
		if (this.state.bUnderFetch)
			return;

		this.setState({ bUnderFetch: true});

		let channelnumber = 1;
		let max = 10;
		if (init_pagenumber !== undefined)
			channelnumber = init_pagenumber;
		if (init_max !== undefined)
			max = init_max;
			
		this.state.fetcheddata = null;
		this.state.fetcheditems = [];
		if (this.state.channels != null && this.state.channels.length > 0)
			this.state.fetcheditems = this.state.channels;

        //this.scrollingDlgRef.current.MDComponent.show();
		this.scrollingDlgRef.current.open();

		try {
			while(1)
			{
				this.fetcheddata = await this.fetchRssTelkkuChannel(channelnumber);
				if (this.fetcheddata !== null)
				{
					// Array.prototype.push.apply(fetcheditems, fetcheddata);
					this.state.fetcheditems.push(this.fetcheddata);
					if (channelnumber === max && max !== -1)
						break;
					channelnumber = channelnumber +1;
					if (this.state.bAllChannelsLoaded)
						break;
				}
				else
					break;
			}
		} catch (error) {
			if (error.message !== "Error: 500")
			{
				console.error("error");
				console.error(error);
				this.setState({ errmsg: error.message,
					bUnderFetch: false })
				//this.scrollingDlgRef.current.MDComponent.close();
				this.scrollingDlgRef.current.close();
				return;	
			}
			else
				this.setState({ bAllChannelsLoaded: true });
		}		
		if(Config.bDebug) 
		{	
			console.log("fetcheditems");		
			console.log(this.state.fetcheditems);		
		}

		//this.scrollingDlgRef.current.MDComponent.close();
		this.scrollingDlgRef.current.close();
		this.setState({channels: this.state.fetcheditems, errmsg: null,
			bUnderFetch: false, bLoadAllChannels: false,
			bLoad10Channels: false,
		   });
	}

	TelkkuException (message) {
		this.message = message;
		this.name = 'TelkkuException';
	}

	fetchRssTelkkuChannel = async (channelnumber) =>
	{
		let channelurl = this.fetch_url_telkku +channelnumber;
		if(Config.bDebug) 
		{
			console.log("fetchRssTelkkuChannel 1"); 
			console.log(channelurl); 
		}

		this.setState({ channels: null, errmsg: null});

		let fetched = null;
		// 	crossDomain:true,
		await fetch(channelurl, {
			method: 'GET',		
			timeout: 6000,			
			headers: { "Content-Type": "application/rss+xml; charset=UTF-8", 
			'Accept': '*/*', // application/rss+xml
			},
			mode: 'cors',
			signal: this.abortSignal,
		})
		.then(this.handleErrors)
		.then(response => { return response.text();})
//		.then(str => new window.DOMParser().parseFromString(str, "text/xml"))
		.then(data => { 
			/*
						mode: 'same-origin',

			if(Config.bDebug) 
				{
					console.log("fetchRssTelkkuChannel 1.5"); 
					console.log(data); 
				}
				*/
				let indCheck = data.indexOf('<rss version=');
				if (indCheck == -1)
				{
					fetched = null;
					this.setState({ bAllChannelsLoaded: true });
				}
				else
					fetched = this.getJsonDataFromTelkkuRssXml(data);
		}) 
		.catch((error) => {
			console.error("error");
			console.error(error);
			this.setState({ errmsg: error.toString() })
			throw new this.TelkkuException(error.toString());
		})
		;			
		return fetched;
	}

	getJsonDataFromTelkkuRssXml = (data) => {
		let xmlDoc = new window.DOMParser().parseFromString(data, "text/xml");
		let channeltitle = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
		if (Config.bDebug)
		{
			console.log("channeltitle");
			console.log(channeltitle);
		}
		let json = {};
		json.title = channeltitle; 
		const xmlitems = xmlDoc.querySelectorAll("item");
		if (Config.bDebug)
		{
			console.log("xmlitems");
			console.log(xmlitems);
		}
		if (xmlitems == null || xmlitems == undefined)
			return null;
		json.channelprograms = []; 
		xmlitems.forEach(item => {
			json.channelprograms.push(this.getChannelProgramFromXml(item));
		});
		
		if (Config.bDebug)
		{
			console.log("json");
			console.log(json);
		}

		return json;
	}

	getChannelProgramXmlValue = (item) =>
	{
		if (item === null || item === undefined || item === NaN)
		{
			console.log("json");
			console.log(json);
			return null;
		}
		let item1 = item[0];
		if (item1 === null || item1 === undefined || item1 === NaN)
		{
			console.log("item1");
			console.log(item1);
			return null;
		}
		let childNode1 = item1.childNodes[0];
		if (childNode1 === null || childNode1 === undefined 
			|| childNode1 === NaN)
		{
			if (Config.bDebug)
			{
				console.log("childNode1");
				console.log(childNode1);
			}
			return null;
		}
		let nodeValue1 = childNode1.nodeValue;
		if (nodeValue1 === null || nodeValue1 === undefined 
				|| nodeValue1 === NaN)
		{
			console.log("nodeValue1");
			console.log(nodeValue1);
			return null;
		}
		return nodeValue1;
	}

	getChannelProgramFromXml = (item) => 
	{
		if (Config.bDebug)
		{
			console.log("item");
			console.log(item);
		}
		let jsonitem = {};
		jsonitem.title = 
		   this.getChannelProgramXmlValue(item.getElementsByTagName("title"));
		jsonitem.description = 
		  this.getChannelProgramXmlValue(item.getElementsByTagName("description"));
		jsonitem.pubdate = 
		this.getChannelProgramXmlValue(item.getElementsByTagName("pubDate"));
		jsonitem.link = 
			this.getChannelProgramXmlValue(item.getElementsByTagName("link")); 
		// [0].childNodes[0].nodeValue;
		return jsonitem;
	}

	handleErrors = (response) => {
        if (!response.ok) {
			// throw Error(response.statusText);
			console.log("response");
			console.log(response);
			console.log(response.status);
			throw Error(response.status);
        }
        return response;
	}

	showOneChannel = (event) => {
		event.preventDefault();
	//	console.log("showOneChannel");
		let value = event.target.checked;
		let bValue = value; // this.showOneChannelRef.current.;

		if (bValue)
			this.setState({showChannelsAtSameTime: 1,
				bCheckShowChannelsAtSameTime: true,
				bSearchButtonClicked: false});
		else
			this.setState({showChannelsAtSameTime: 
				this.const_showChannelsAtSameTime,
				selectedchannelindex: -1,
				bCheckShowChannelsAtSameTime: false,
				/* bSearchButtonClicked: false */ });
	}

	showAllDescriptions = (event) => {
		event.preventDefault();
		let value = event.target.checked;
		if (Config.bDebug)
			console.log("showAllDescriptions");
		let bValue = value; // this.state.bDisplayAllDescriptions;
		if (Config.bDebug)
			console.log("bValue");
		if (Config.bDebug)
			console.log(bValue);
		/*
		if (value === 'on')
			bValue = true;
		console.log(value);
		*/
		this.setState({bDisplayAllDescriptions: bValue,
			/* bSearchButtonClicked: false */});
	}

	getPOfIndex = (index, txt, themevalue) => 
    {
		if (Config.bDebug)
		{
			console.log("getPOfIndex");
		}
		let textSearch = this.state.textSearch;
		if (Config.bDebug)
		{
			console.log("textSearch");
			console.log(textSearch);
		}
		if (txt == undefined || txt == null)
			return "";
		if (Config.bDebug)
		{
			console.log("txt");
			console.log(txt);
			console.log("index");
			console.log(index);
		}
		let txtlen = txt.length;
		if (index == undefined || index == null || index < 0 
			|| txtlen <= index )
            return txt;
		if (textSearch == undefined || textSearch == null
			|| textSearch.toString().trim().length == 0)
            return txt;
		 
        let first = txt.substring(0, index);
        let between = txt.substring(index, index +textSearch.length);
        let last = txt.substring(index +textSearch.length);

		if (Config.bDebug)
		{
			console.log("first");
			console.log(first);
			console.log("between");
			console.log(between);
			console.log("last");
			console.log(last);
		}

        let newvalue_first = (first != undefined && first != null && first.trim().length != 0 
			? <span>{first}</span> : '');
		let foundedthtml = 'background-color: green; color: white;';
		if (themevalue === '--dark')
			foundedthtml = 'background-color: yellow; color: black;';
		let newvalue_between = <span style={ foundedthtml }>{between}</span>;
		let newvalue_last = (last != undefined && last != null && last.trim().length != 0 
			? <span>{last}</span> : '');
		let newvalue = <div>{newvalue_first}{newvalue_between}{newvalue_last}</div>; 
		if (Config.bDebug)
		{
			console.log("newvalue_first");
			console.log(newvalue_first);
			console.log("newvalue_between");
			console.log(newvalue_between);
			console.log("newvalue_last");
			console.log(newvalue_last);
		}
		if (Config.bDebug)
		{
			console.log("newvalue");
			console.log(newvalue);
		}
        return newvalue;
    }

	getTableHeadersAndTableRowsAfterChannels = () =>
	{
		let headers = null;
		let channels = null;
		if (Config.bDebug)
		{
			console.log("getTableHeadersAndTableRowsAfterChannels");
			console.log("this.state.bCheckShowChannelsAtSameTime");
			console.log(this.state.bCheckShowChannelsAtSameTime);
			console.log("this.state.selectedchannelindex");
			console.log(this.state.selectedchannelindex);
			console.log(this.state);
		}

		let bAllChannels = false;
		if (this.state.bSearchButtonClicked)
		{
			if (this.state.channels == null)
			{
				headers = [];
				channels = [];	
				let ret = {};
				ret.headers = headers;
				ret.channels = channels;
				return ret;		
			}
			const searchText = this.state.textSearch;
			if (searchText != null && searchText.toString().trim().length > 0)
			{
				let foundedChannelsTitle = null;
				let index = -1;
				let foundedChannels = [];
				let foundedPrograms = [];
				let founded = false;				
				let progfounded = false;
				let uppersearchText = searchText.toUpperCase();
				let chcoopy = {};

				let search_channels = this.state.channels;
				console.log("before filter search");
				console.log("this.state.bCheckShowChannelsAtSameTime");
				console.log(this.state.bCheckShowChannelsAtSameTime);
				console.log("this.state.selectedchannelindex");
				console.log(this.state.selectedchannelindex);

				if (this.state.bCheckShowChannelsAtSameTime
					&& this.state.selectedchannelindex != -1)
				{			
					console.log("filter search bCheckShowChannelsAtSameTime");
					let selectedTitle = search_channels[this.state.selectedchannelindex].title;
					let filteredchannels = search_channels.filter( (s, i) =>
					{ 
					//	console.log("i");
					//	console.log(i);
						return s.title === selectedTitle 
					} );
					search_channels = filteredchannels;
				}
				
				Array.from(search_channels).forEach(cha => {
					chcoopy = {};
					index = -1;
					founded = false;
				// this.state.channels.forEach(cha, i => {
					Object.assign(chcoopy, cha);
					if (Config.bDebug)
					{
						console.log("chcoopy");
						console.log(chcoopy);
						console.log("chcoopy.channelprograms");
						console.log(chcoopy.channelprograms);
					}

					if (chcoopy.title)
						chcoopy.title = chcoopy.title.toString().replace("Telkussa: ", "");
					index = (chcoopy.title ? chcoopy.title.toUpperCase().indexOf(uppersearchText) : -1);
					if (index != -1)
					{
						chcoopy.titleindex = index;
						founded = true;
					}
					foundedPrograms = [];

					Array.from(chcoopy.channelprograms).forEach(pr => {
					// cha.channelprograms.forEach(pr, i => {
						progfounded = false;
						index = (pr.title ? pr.title.toUpperCase().indexOf(uppersearchText) : -1);
						if (index != -1)
						{
							pr.titleindex = index;
							founded = true;
							progfounded = true;
						}
						index = (pr.description ? pr.description.toUpperCase().indexOf(uppersearchText) : -1);
						if (index != -1)
						{
							pr.descriptionindex = index;
							founded = true;
							progfounded = true;
						}
						if (progfounded)
							foundedPrograms.push(pr);
					});	

					if (founded)
					{	
						if (foundedPrograms != null && foundedPrograms.length != 0)
							chcoopy.channelprograms = foundedPrograms;
						else
							chcoopy.channelprograms = cha.channelprograms;
						foundedChannels.push(chcoopy);
					}
				});

				if (foundedChannels == null && foundedChannels.length == 0)
				{
					headers = [];
					channels = [];	
				}
				else
				{

					headers = foundedChannels.map((jsonchannel, i) => {
						return jsonchannel.title.replace("Telkussa: ", "")
					});
					channels = foundedChannels.map((jsonchannel, i) => {
						return <RssTelkkuChannel id={'telkkuchannel'+i} data={jsonchannel}
								showSearch={true}
								getPOfIndex={this.getPOfIndex}
								themevalue={this.props.themevalue}
								displayAllDescriptions=
								      {this.state.bDisplayAllDescriptions} 
								/>;
					});		
				}
			}
			else
			{
				headers = this.state.channels.map((jsonchannel, i) => {
					return jsonchannel.title.replace("Telkussa: ", "")
				});
				channels = this.state.channels.map((jsonchannel, i) => {
					return <RssTelkkuChannel id={i} data={jsonchannel}
							themevalue={this.props.themevalue}
							displayAllDescriptions={this.state.bDisplayAllDescriptions} />;
				});	
			}
		}
		else
		if (this.state.bCheckShowChannelsAtSameTime
			&& this.state.selectedchannelindex != -1)
		{			
			console.log("filter");
			let selectedTitle = this.state.channels[this.state.selectedchannelindex].title;
			let filteredchannels = this.state.channels.filter( (s, i) =>
			{ 
			//	console.log("i");
			//	console.log(i);
				return s.title === selectedTitle 
			} );
//				console.log("filteredchannels");
//				console.log(filteredchannels);
				headers = filteredchannels.map((jsonchannel, i) => {
					return jsonchannel.title.replace("Telkussa: ", "")
				});
			channels = filteredchannels.map((jsonchannel, i) => {
				return <RssTelkkuChannel id={i} data={jsonchannel}
						themevalue={this.props.themevalue}
						displayAllDescriptions={this.state.bDisplayAllDescriptions} />;
			});
		}
		else
		{
			if (this.state.showChannelsAtSameTime == this.state.channels.length
			   || this.state.showChannelsAtSameTime > this.state.channels.length)
			{
				headers = this.state.channels.map((jsonchannel, i) => {
					return jsonchannel.title.replace("Telkussa: ", "")
				});
				channels = this.state.channels.map((jsonchannel, i) => {
					return <RssTelkkuChannel id={i} data={jsonchannel}
							themevalue={this.props.themevalue}
							displayAllDescriptions={this.state.bDisplayAllDescriptions} />;
				});
			}
			else
			{
				let bAllChannels = false;
				if (this.state.showChannelsAtSameTime < this.state.channels.length)
				{
					let min = Math.floor(this.state.currentChannelSetIndex * this.state.showChannelsAtSameTime);
					let max = (this.state.currentChannelSetIndex == 0 
						? this.state.showChannelsAtSameTime : 
						Math.floor((this.state.currentChannelSetIndex * this.state.showChannelsAtSameTime) 
							+this.state.showChannelsAtSameTime));
					if (Config.bDebug)
					{
						console.log("min");
						console.log(min);
						console.log("max");
						console.log(max);
					}
					if (min < 0)
						min = 0;
					else
					if (min > this.state.channels.length)
					{
						min = this.state.channels.length;
						bAllChannels = true;
					}

					if (max > this.state.channels.length)
						max = this.state.channels.length;

					if (!bAllChannels)
					{
						let i;
						let newChannelSet = []
						for (i = min; i < max; i++) {
							newChannelSet.push(this.state.channels[i]);
						}

						headers = newChannelSet.map((jsonchannel, i) => {
							return jsonchannel.title.replace("Telkussa: ", "")
						});
						channels = newChannelSet.map((jsonchannel, i) => {
							return <RssTelkkuChannel id={i} data={jsonchannel}
									themevalue={this.props.themevalue}
									displayAllDescriptions={this.state.bDisplayAllDescriptions} />;
						});
					}
				}
				else
				{
					bAllChannels = true;
				}
				
				/*
				let divided = this.state.channels.size() % this.state.showChannelsAtSameTime:						
				if (Config.bDebug)
				{
					console.log("divided");
					console.log(divided);
				}
				*/
				if (bAllChannels)
				{
					headers = this.state.channels.map((jsonchannel, i) => {
						return jsonchannel.title.replace("Telkussa: ", "")
					});
					channels = this.state.channels.map((jsonchannel, i) => {
						return <RssTelkkuChannel id={i} data={jsonchannel}
								themevalue={this.props.themevalue}
								displayAllDescriptions={this.state.bDisplayAllDescriptions} />;
					});
				}

			}
		}

		let ret = {};
		ret.headers = headers;
		ret.channels = channels;
		return ret;
	}

	textFieldChannelsAtSameTimeChanged = (event) => {
		event.preventDefault();
		let value = event.target.value;
		if (Config.bDebug)
		{
			console.log("textFieldChannelsAtSameTimeChanged");
			console.log(value);
		}
		let validNumber = parseInt(value);
		if (Config.bDebug)
		{
			console.log("validNumber");
			console.log(validNumber);
		}
		if (validNumber == NaN ||validNumber == undefined)
		{
			event.target.value = this.const_showChannelsAtSameTime;
			return;
		}
		else
		if (parseInt(validNumber) < 1)
		{
			event.target.value = 1;
			return;
		}
		else
		if (parseInt(validNumber) > this.const_showChannelsAtSameTime)
		{
			event.target.value = this.const_showChannelsAtSameTime;
			return;
		}
		this.setState({showChannelsAtSameTime: validNumber,
			currentChannelSetIndex: 0,
			/* bSearchButtonClicked: false */ });
	}

	calculateMaxChannelSetIndex = () =>
	{
		if (Config.bDebug)
		{
			console.log("calculateMaxChannelSetIndex");
			/*
			console.log(channelSets);
			console.log("calculateMaxChannelSetIndex");
			console.log(channelSets);
			console.log("calculateMaxChannelSetIndex");
			console.log(channelSets);
			*/
		}
		if (this.state.channels == null)
			return 0;
		const channelssize = this.state.channels.length;
		if (channelssize === 0)
			return 0;
		if(this.state.bCheckShowChannelsAtSameTime)
			return 0;
		if (this.state.showChannelsAtSameTime >= this.state.channels.length)
			return 0;
		const channelSets = this.state.channels.length / this.state.showChannelsAtSameTime;
		if (Config.bDebug)
		{
			console.log("channelSets");
			console.log(channelSets);
		}
		if (channelSets == 0)
			return 0;
		return channelSets -1;
	}

	nextChannelSetClicked = (event) =>
	{
		event.preventDefault();
		if (this.state.channels == null || this.state.channels.length == 0)
			return;
		if (this.state.currentChannelSetIndex > this.calculateMaxChannelSetIndex())
		{
			this.setState({ currentChannelSetIndex: this.calculateMaxChannelSetIndex(),
				bSearchButtonClicked: false});
			return;
		}
		else
		if (this.state.currentChannelSetIndex === this.calculateMaxChannelSetIndex())
		{
			return;
		}
		this.setState({ currentChannelSetIndex: this.state.currentChannelSetIndex +1,
			/* bSearchButtonClicked: false */ });
	}

	prevChannelSetClicked = (event) =>
	{
		event.preventDefault();
		if (this.state.channels == null || this.state.channels.length == 0)
			return;
		if (this.state.currentChannelSetIndex < 0)
		{
			this.setState({ currentChannelSetIndex: 0,
				/* bSearchButtonClicked: false */});
			return;
		}
		if (this.state.currentChannelSetIndex === 0)
		{
			return;
		}
		this.setState({ currentChannelSetIndex: this.state.currentChannelSetIndex -1,
			/* bSearchButtonClicked: false */ });
	}

	loadMoreChannelClicked = () =>
	{
		if (this.state.bAllChannelsHasLoaded)
			return;
		this.fetchRssTelkkuPrograms((this.state.channels == null 
			|| this.state.channels.length == 0 ? 1 : 
			this.state.channels.length +1), 
			(this.state.channels == null 
				|| this.state.channels.length == 0 ? 10 : 
				this.state.channels.length +10));
	}

	loadAllChannelClicked = () =>
	{
		if (this.state.bAllChannelsHasLoaded)
			return;
		this.fetchRssTelkkuPrograms((this.state.channels == null ? 1 : 
			this.state.channels.length +1), -1);
	}

	searchTextFromChannelsClicked = () => 
	{
		event.preventDefault();
		if (Config.bDebug)
		{
			console.log("searchTextFromChannelsClicked");
		}
		const searchText = this.state.textSearch;
		if (Config.bDebug)
		{
			console.log("searchText 2 ");
			console.log(searchText);
		}
		if (searchText == undefined || searchText == null || searchText.trim().length == 0)
			return;
		// to start make indirect the search:
		if (Config.bDebug)
		{
			console.log("searchTextFromChannelsClicked 2 ");
		}
		let value = this.showAllDescrRef.current.checked;
		if (!value)
			this.showAllDescrRef.current.checked = true;
		this.setState({ bSearchButtonClicked: true,
			bDisplayAllDescriptions: true});
		this.forceUpdate();
	}

	textFieldSearchChanged = (event) =>
	{
		event.preventDefault();
		const value = event.target.value;
		if (Config.bDebug)
		{
			console.log("textFieldSearchChanged");
			console.log(value);
		}
		this.setState({ textSearch: value,
		   bSearchButtonClicked: false})
	}

	abortFetchClicked = (event) =>
	{
		event.preventDefault();
		if (!this.state.bUnderFetch)
			return;
		if (Config.bDebug)
			console.log("abortFetchClicked.abort()");
		if (!this.abortSignal.aborted)
		{
			this.abortController.abort();
			this.setState({ bUnderFetch: false});
		}
	}

	getFetchedDate = () =>
	{
		const today = this.state.today;
		if (today == null || today == undefined)
			return "";

		let days  = today.getDate();
		let month  = today.getMonth()+1;
		let year  = today.getFullYear();
		if (days < 10)
			days = "0" +days;
		if (month < 10)
			month = "0" +month;
		const ret = "" +days +"." +month +"." +year;
		return ret;
	}

	showTableBorders = (event) => {
		event.preventDefault();
		let value = event.target.checked;
		if (Config.bDebug)
			console.log("showTableBorders");
		let bValue = value; 
		if (Config.bDebug)
		{				
			console.log("bValue");
			console.log(bValue);
		}
		this.setState({bShowTableBorder: bValue });
	}

	onClickDisplayDialog = (event) =>
	{
		// this.scrollingDlgRef.current.MDComponent.close();
		this.scrollingDlgRef.current.close();
	}


	getNextColumn = (cols, currentColInd) =>
	{
		let ret = null;
		if (cols && currentColInd !== undefined && currentColInd !== null)
		{			
			if (cols[currentColInd +1])
				ret = cols[currentColInd +1];
		}
		return ret;
	}

	getPrevColumn = (cols, currentColInd) =>
	{
		let ret = null;
		if (cols && currentColInd)
		{			
			if (cols[currentColInd -1])
				ret = cols[currentColInd -1];
		}
		return ret;
	}

	getCurrentColumnIndex = (path) =>
	{
		if (path === undefined || path === null || path.length === 0)
			return null;

		if (Config.bDebug)
		{
			console.log("path");
			console.log(path);
		}
		let ret = -1;
		let i = 0, max = path.length;
		let value, str;
		const search = 'tablecol';
		for(i = 0; i < max; i++)
		{
			// value = path[i].localName;
			value = path[i];
			str = value.id.toString();

			if (str && str.includes(search))
			{
				let ind = str.indexOf(search);
				let strNum = str.substring(ind +search.length);
				ret = parseInt(strNum);
				break;
			}
		}
		return ret;
	}

	getH3OfCurrentColumn = (path) =>
	{
		if (path === undefined || path === null || path.length === 0)
			return null;

		if (Config.bDebug)
		{
			console.log("path");
			console.log(path);
		}

		let ret = -1;
		let i = 0, max = path.length;
		let value, str;
		const search = 'tablecol';
		for(i = 0; i < max; i++)
		{
			// value = path[i].localName;
			value = path[i];
			str = value.id.toString();
			if (str && str.includes(search))
			{
				let ind = str.indexOf(search);
				let strNum = str.substring(ind +search.length);
				let ind2 = parseInt(strNum);
				ret = value.childNodes[0];
				if (ret)
				{ 
					let ret2 = ret.childNodes[0];
					if (ret2)
						ret = ret2;
				}
				break;
			}
		}
		return ret;
	}

	altPlusKeyUp = (e) => 
	{ 
		e = e || window.event;
		let keyCode = e.keyCode || e.which,
			arrow = { left: 37, up: 38, right: 39, down: 40 };
			if (Config.bDebug)
				console.log("pressed");
		if (e.altKey) {
			if (Config.bDebug)
			{
				console.log("control key");
				console.log("e.altKey");
				console.log(e.altKey);
				console.log("keyCode");
				console.log(keyCode);
				console.log("e.keyCode");
				console.log(e.keyCode);
				console.log("e");
				console.log(e);
			}

			let row = this.tablCntl.current.rows[1];
			const cols = row.cells;
			const currColInd = row.colIndex;
			const lenCols = cols.length;
			const currentCol = row.closest('td');

			if (Config.bDebug)
			{
				console.log("--- row");
				console.log(row);
				console.log("--- cols");
				console.log(cols);
				console.log("--- lenCols");
				console.log(lenCols);
				console.log("--- currColInd");
				console.log(currColInd);
				console.log("--- currentCol");
				console.log(currentCol);
				
				console.log("--- this.tablCntl.current");
				console.log(this.tablCntl.current);
			}			
			let currentColInd = null;

			// .item(0).innerHTML
		  switch (e.key) {
			case "o":
					//... handle alt+o
				let divInsideOfCol = this.getH3OfCurrentColumn(e.path);
				if (divInsideOfCol)
				{
					divInsideOfCol.focus();					
				}
				break;

			case "k":
					//... handle alt+k
				currentColInd = this.getCurrentColumnIndex(e.path);
				if (currentColInd !== -1 && currentColInd > 0)
				{
					const prevcol = this.getPrevColumn(cols, currentColInd);
					if (prevcol)
					{
						prevcol.focus();
					}
				}
				break;

			case "s":
			case "S":
					//... handle alt+s
				currentColInd = this.getCurrentColumnIndex(e.path);
				if (currentColInd !== -1 && currentColInd < (lenCols -1))
				{
					const nextcol = this.getNextColumn(cols, currentColInd);
					// document.getElementById("tablecol" +(currentColInd+1)).focus(); 					
					if (nextcol)
					{
						if (Config.bDebug)
						{
							console.log("nextcol");
							console.log(nextcol);
						}
						nextcol.focus();
						// document.getElementById("tablecol" +currentColInd).focus(); 
					}					
				}
				break;
		  }
		}
	}

	altPlusKeyUpProgramHeader = (e) =>
	{
		e = e || window.event;
		let keyCode = e.keyCode || e.which,
			arrow = { left: 37, up: 38, right: 39, down: 40 };

			console.log("pressed");
		if (e.altKey) {
			if (Config.bDebug)
			{
				console.log("control key");
				console.log("e.altKey");
				console.log(e.altKey);
				console.log("keyCode");
				console.log(keyCode);
				console.log("e.keyCode");
				console.log(e.keyCode);
				console.log("e");
				console.log(e);
			}

			// .item(0).innerHTML
		  switch (e.key) {
			case "t":
					//... handle alt+t
				if (document.getElementById('idprogramtableh3'))
				{
					let divh3 = document.getElementById('idprogramtableh3');
					if (divh3)
						divh3.focus();					
				}
				break;
		  }
		}
	}


	render(props, state) {
		if (Config.bDebug)
		{
			console.log("state");
			console.log(state);
		}

		let divDialogStyle = (props.themevalue !== undefined && props.themevalue !== '' ? "color: #FFF; background-color: black; border-color: #FFF;" : '');
		const inputw = "float: none; display: inline-block; vertical-align: middle; ";
		const buttoninputw = "float: none; display: inline-block; vertical-align: middle; "
				+(props.themevalue !== undefined && props.themevalue !== '' ? "" : " color: white; ");

		if (Config.bDebug)
		{
			console.log("divDialogStyle");
			console.log(divDialogStyle);
		}

		let tableBorderStyle = '';
		let table_border_color = 'black';
		if (state.bShowTableBorder)
		{
			if (props.themevalue === '--dark')
				table_border_color = 'white';
			tableBorderStyle = ' border: 1px solid ' + table_border_color + ';';
		}

		let channels = null;
		let tableheaders = null;	
		let selectchannels = null;	
		let tabletds = null;
		let headers = null;
		if (state.channels !== null)
		{  // selected={child.title.fi===state.selectedcategory.title.fi} 
			/*
							return <Select.Item id={i} 				
				>{child.title}</Select.Item>
				});
				*/
			selectchannels = state.channels.map((child, i) => {
				return <option value={child.title} id={i} 
				selected={i===this.state.selectedchannelindex} >{child.title}</option>
			});
			let tableheaders_and_rows = this.getTableHeadersAndTableRowsAfterChannels();
			headers = tableheaders_and_rows.headers; 
			/*
			if (headers != null)
				tableheaders = headers.map((child, i) => {
					return <th lang="fi" tabIndex="0" style={'vertical-align: top; padding-left: 5px; padding-right: 5px;' +tableBorderStyle}>{child}</th> 				
				});
				*/
			channels = tableheaders_and_rows.channels;
			tabletds = channels;
			if (channels != null)
				tabletds = channels.map((child, i) => {
					return <td id={'telkkutablecol' +i} lang="fi" tabIndex="0" style={'vertical-align: top; padding-left: 5px; padding-right: 5px; ' +tableBorderStyle}>{child}</td> 				
				});

		}

		return (
			<Fragment>
			<div id="telkku_main_div" style={divDialogStyle}>
			<div class={style.cardHeader}  
			  onKeyUp={this.altPlusKeyUpProgramHeader}>

				<h1 tabIndex="0" lang="fi" >Telkku {this.getFetchedDate()}</h1>

				<section style={this.sectionStyle}>
				<div class={style.cardBody}>
					
					<div  lang="fi" tabIndex="0" aria-labelled="Miten ohjelmatiedot näytetään">
						
						<div style={{ "background-color": 'red', color: "yellow" } }>{state.errmsg}</div>					
						<div class=" mdc-typography--caption">Miten ohjelmatiedot näytetään:</div>	
					</div>
					<div class={style.cardBody} >
					<div>
					<span>	
					<Button tabIndex="0" ripple raised disabled={state.channels == null
								|| (state.showChannelsAtSameTime == 1 
									&& state.bCheckShowChannelsAtSameTime) 
								|| state.showChannelsAtSameTime >= state.channels.length }
							onClick={this.prevChannelSetClicked} style={buttoninputw}
							aria-label="Aikaisemmat kanavat" text="&lt;">					
					</Button>
					</span>	
					<span>	
					<space>          </space>

					<Button tabIndex="0" ripple raised 
						disabled={state.channels == null
							|| (state.showChannelsAtSameTime == 1
								&& state.bCheckShowChannelsAtSameTime)
							|| state.showChannelsAtSameTime >= state.channels.length }
							onClick={this.nextChannelSetClicked} style={buttoninputw}
							aria-label="Seuraavat kanavat" text="&gt;">					
					</Button>					
					
					</span>

					<span>
						<SwitchCheckbox onChange={this.showAllDescriptions}
							propref={this.showAllDescrRef}
							inputid="checkshowdescribtions" style={inputw}
						    labeltext="Näytä selitykset" checked={state.bDisplayAllDescriptions} />
					</span>
					<span>
						<SwitchCheckbox onChange={this.showOneChannel}
							propref={this.showOneChannelRef}
							inputid="checkshowonechannel" style={inputw}
						    labeltext="Näytä yksi kanava:" checked={state.bCheckShowChannelsAtSameTime} />
		
						<select tabIndex="0"
							selectedIndex={this.state.selectedchannelindex}
                            disabled={state.showChannelsAtSameTime !== 1}
                            preselected outlined style={inputw}
                            ref={this.selectChannelRef} 
                            onChange={(e)=>{
                                this.setState({
									selectedchannelindex: e.target.selectedIndex,	
									bSearchButtonClicked: false							
                                });
                            }}>
                            {selectchannels}
                        </select>
					</span>
					<space>          </space>
					<span>
						<label for="input_number_columss" style={inputw}>
						Näytettävien kanavien lkm: </label>
						<input id="input_number_columss" 
							name="input_number_columns" style={inputw}
							disabled={this.state.bCheckShowChannelsAtSameTime}
							type="number" min="1" max="10"
						    value={
							   this.state.showChannelsAtSameTime === -1 ? '' : 
							   this.state.showChannelsAtSameTime}						
							onKeyUp={this.textFieldChannelsAtSameTimeChanged}
						 />
					</span>
					<span>
					<label for="idsearchvalue"  >Etsi tekstiä ohjelmista:</label>
						<input id="idsearchvalue" type="text" tabIndex="0" outlined 
						disabled={state.channels == null || state.bUnderFetch}
						onKeyUp={this.textFieldSearchChanged}
						style = { ' width: 30%;' }  />
						</span>	
						<span>	
						<Button tabIndex="0" ripple raised style={inputw} 
							disabled={state.channels == null || state.bUnderFetch}
								onClick={this.searchTextFromChannelsClicked}
								style={buttoninputw}
								aria-label="Hae" text="Hae"></Button>
					</span>
					<span>
					<Button tabIndex="0" ripple raised disabled={state.bUnderFetch 
						     || state.bAllChannelsLoaded }
							onClick={this.loadMoreChannelClicked} style={buttoninputw} 
							text="Lataa +10 kanavaa" >					
					</Button>
					</span>	
					<span>	
					<Button tabIndex="0" ripple raised disabled={state.bUnderFetch || state.bAllChannelsLoaded }
							onClick={this.loadAllChannelClicked} style={buttoninputw}
							text="Lataa kaikki kanavat" >					
					</Button>
					</span>
					<space>          </space>
					<span>
						<SwitchCheckbox onChange={this.showTableBorders} style={inputw}
							propref={this.showTableBordersRef}
							inputid="checkTableBorders"
						    labeltext="Näytä taulun raamit" checked={state.bShowTableBorder} />
					</span>
					<space>          </space>
					<span>
					<Button tabIndex="0" ripple raised disabled={!state.bUnderFetch } 
						 style={buttoninputw}
						 onClick={this.abortFetchClicked} text="Keskeytä lataus">					
					</Button>
					</span>
					</div>
					</div>
				</div>
				</section>
				
				<br/><br/>
				<section style={this.state.themevalue === '' ? '' : this.sectionStyle}>
				<div style={{ "background-color": 'red', color: "yellow" } }>{state.errmsg}</div>
				<div class=" mdc-typography--caption"><h3 id="idprogramtableh3" tabIndex="0">Ohjelmataulukko</h3>
							<div class={style.cardHeader}><h3 lang="fi" tabIndex="0" >
						-- Ohjelmataulukko, liikutaan hiirellä tai taulukon 
						sisällä seuraavilla näppäimillä: 
					alt+e = seuraava kanava, alt+k = edellinen kanava sekä 
					alt+o = kanavan ohjelmiin, otsakkeeseen. Ohjelman kuvailun saa näkymään tab näppäimellä ja enterillä tai 
					hiirenklikkauksella. Taulukon sisällä toimivat myös tab sekä shift-tab näppäimet. Taulukon yläpuolelle 
					tekstin "Ohjelmataulukko" kohdalle pääsee komennolla alt+t.</h3></div>
							{state.bSearchButtonClicked && state.textSearch != null ? ' (haun tulokset)' : ''}</div>
						<table id="programtable" style="width:100%"
						ref={this.tablCntl}>
						<tbody>
						<tr>{tableheaders}</tr>
						<tr>{tabletds}</tr> 		
						</tbody>
						</table>
					</section>
				</div>
				<Dialog role="dialog" id="dialogloading" aria-labelledby="h1loading"
     			 aria-modal="false" lang="fi" ref={this.scrollingDlgRef} 
                 title="Odota!" 
				 themevalue={props.themevalue}
			     okButtonPressed={this.onClickDisplayDialog}
			     okText="Sulje" scrollable={true}
                 >
					<div style={divDialogStyle}>
					<div class="card-header">
					  <h3 lang="fi" id="h1loading" default tabIndex="0" class=" mdc-typography--title">
					  Hetkinen tietoja haetaan par'aikaa...
					  </h3>
					  </div>
					  </div>
				</Dialog>
				</div>
				</Fragment>				
		);
	}
}

/*

				<Dialog role="dialog" id="dialogloading" aria-labelledby="h1loading"
     			 aria-modal="false"
				ref={this.scrollingDlgRef}>
				 <Dialog.Header lang="fi" tabIndex="0" >Odota!</Dialog.Header>
				 <Dialog.Body scrollable={false}>
				   <div class="card-header">
					  <h3 lang="fi" id="h1loading" default tabIndex="0" class=" mdc-typography--title">
					  Hetkinen tietoja haetaan par'aikaa...
					  </h3>
					  </div>
				 </Dialog.Body>
				 <Dialog.Footer>
					 <Dialog.FooterButton lang="fi" tabIndex="0" role="button" 
					 onCancel={this.onClickDisplayDialog} cancel={true} >Sulje</Dialog.FooterButton>
				 </Dialog.Footer>
			 </Dialog>


					<Chips>
						<Chips.Chip style={(state.channels == null
						    || state.showChannelsAtSameTime >= state.channels.length 
						    ? 'display: none' :'' }>
							<Chips.Text>&lt;</Chips.Text>
						</Chips.Chip>
						<Chips.Chip disabled={state.channels == null
						    || state.showChannelsAtSameTime >= state.channels.length }>
							<Chips.Text>&gt;</Chips.Text>
						</Chips.Chip>
					</Chips>

<LayoutGrid>
							<LayoutGrid.Inner>
								{channels}
							</LayoutGrid.Inner>
        				</LayoutGrid>
						*/
