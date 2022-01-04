import { h, Component, createRef, Fragment } from 'preact';
// import Card from 'preact-material-components/Card'; 
// import 'preact-material-components/Card/style.css';
//import Button from 'preact-material-components/Button';
//import Formfield from 'preact-material-components/FormField';
// 	import Checkbox from 'preact-material-components/Checkbox';
//import 'preact-material-components/Button/style.css';
//import Select from 'preact-material-components/Select';
//import 'preact-material-components/List/style.css';
//import 'preact-material-components/Menu/style.css';
//import 'preact-material-components/Select/style.css';
//import Radio from 'preact-material-components/Radio';
//import FormField from 'preact-material-components/FormField';
//import 'preact-material-components/FormField/style.css';
//import 'preact-material-components/List/style.css';
//import LayoutGrid from 'preact-material-components/LayoutGrid';
//import 'preact-material-components/LayoutGrid/style.css';

//import 'preact-material-components/List/style.css';
//import 'preact-material-components/Menu/style.css';
//import 'preact-material-components/Select/style.css';
//import TextField from 'preact-material-components/TextField';
//import 'preact-material-components/TextField/style.css';
// import 'preact-material-components/Theme/style.css';

import Button from '../button/Button'
import SwitchCheckbox from '../checkbox/CheckBox';

import AbortController from "abort-controller";
import style from './style';
import Config from '../../utils/Config';
import IsBrowser from '../../utils/IsBrowser';
// import 'whatwg-fetch';
import { fetchJsonp, generateCallbackFunction } from 'fetch-jsonp';
import dayjs from 'dayjs';

// import Category from './Category';
// import GridOrList from './GridOrList';
// import DayServices from './DayServices';
import YleChannel from './YleChannel';
// import store from '../../utils/store';
//import jsonp from '../../utils/jsonp';

// import StaticFunctions from '../../unpm install axios-jsonptils/StaticFunctions';

const filtercalled = {
	SEARCHCHANE: 'searchchange',
	MAKESEARCH:  "makesearch",
}

export default class YleHtml extends Component {

	const_showChannelsAtSameTime = 10;
	store = null;
	categoryfieldRef = null;
	fetch_url_audio = null;
	fetch_url_tv = null;
	abortController = null;
    abortSignal = null;
	tablCntl = null;
	showOneChannelRef = null;

	currentservice = null;
	services = null;
	indService = -1;
	callbackName = 'jsonp_callback_schedules'; 
	_mounted = false;
	textSearch = null;
	schedules = null;
	selectChannelRef = null;
	checkBoxMovieRef =  null;
	textFieldSearchRef = null;
	checkshowdcurrentprogramsRef = null;
	showTableBordersRef = null;
	divDialogStyle = null;
	sectionStyle = null;

	constructor(props)
	{
		super(props);
		if(Config.bDebug) 
		{
			console.log("YleHtml.js");
			console.log("props");
			console.log(props);
		}

		this.store = props.store;
		const storestate = this.store.getState();
		const browser = storestate.isbrowser;

		let themevalue = storestate.darkstyle;
		if (Config.bDebug)
			console.log("YleHtml props.themevalue" +themevalue);
		this.divDialogStyle = (themevalue !== undefined && themevalue !== '' ? "color: #FFF; background-color: black; border-color: #FFF;" : '');
		this.sectionStyle = (themevalue !== undefined && themevalue !== '' ? 
		" border:1px solid pink; padding:15px;  margin:10px; background: black; color: white; " : 
		" border:1px solid black; padding:15px;  margin:10px; background: white; color: black;");

		if(Config.bDebug) 
		{
			console.log("storestate");
			console.log(storestate);
		}

		let today = new Date(Date.now());
		this.state = {
			errmsg: null,
			chosenIndex: 0,
			progsource: 'rtv',
			progtable: 'rday',
			programs: null,
			currentDate: Date.now(),
			services: [],
			selecteddate: null,
			bShowTableBorder: false,
			offset: 0,
			currentservice: null,
			indService: -1,
			bSchedulesQueryReady: false,
			schedules: null,
			bSvLang: false,
			bSchedulesRead: false,
			bDisplayAllDescriptions: false,
			bSearchButtonClicked: false,
			selectedchannelindex: 0,
			bCheckShowChannelsAtSameTime: false,
			showChannelsAtSameTime: this.const_showChannelsAtSameTime,
			bShowOnlyMovies: false,
			selectedchannelindex: 0,
			currentChannelSetIndex: 0,
			textSearch: null,
			isbrowser: browser,
			themevalue: themevalue,
			bshowdcurrentprograms: true,
		}

		this.schedules = null;

		this.radioProgTableChanged = this.radioProgTableChanged.bind(this);
	//	this.fetchProgServicesData = this.fetchProgServicesData.bind(this);
	//	this.fetchSchedulesData = this.fetchSchedulesData.bind(this);
				
		this.categoryfieldRef = createRef();
		this.showAllDescrRef = createRef();
		this.selectChannelRef = createRef();
		this.checkBoxMovieRef = createRef();
		this.tablCntl = createRef();
		this.textFieldSearchRef = createRef();
		this.checkshowdcurrentprogramsRef = createRef();
		this.showOneChannelRef = createRef();
		this.showTableBordersRef = createRef();

		this.store.setStateNoneCallListeners({ schedules: {}, shedulescount: 0, 
			shedulescallcount: 0, indService: -1,
			selecteddate: null });

		this.fetch_url_audio = Config.http_curlserver + '/yleradio_opas/:';
		this.fetch_url_tv = Config.http_curlserver + '/yletv_opas/:';

	 }	 

	 componentWillReceiveProps(nextProps) 
	 {
	   if (Config.bDebug)
	   {
		 console.log("YleHtml componentWillReceiveProps nextProps"); 
		 console.log(nextProps); 				
	   }
 
	   if (nextProps !== null && nextProps.themevalue != this.props.themevalue)
	   {
		   this.setState({ themevalue: nextProps.themevalue});
		   this.divDialogStyle = (nextProps.themevalue !== undefined && nextProps.themevalue !== '' ? 
		   "color: #FFF; background-color: black; border-color: #FFF;" : '');
		   
		   this.sectionStyle = (nextProps.themevalue !== undefined && nextProps.themevalue !== '' ? 
		   " border:1px solid pink; padding:15px;  margin:10px; background: black; color: white; " : 
		   " border:1px solid black; padding:15px;  margin:10px; background: white; color: black;");
			}
	   /*
	   if (this.state.progsource != nextProps.progsource)
	   {        
		   this.setState({ progsource: nextProps.progsource, schedules: {}, 
			 services: [], uigrid: null, bSchedulesQueryReady: false,
			 currentservice: null});
		 this.fetchProgSchedules(nextProps.progsource);		
		   // this.createUiGrid();
	   } 
	   */                   
		 /*	  
 //      this.setState({ categories: nextProps.categories,						
 //						progsource: nextProps.progsource,//
 //						selectedcategory: nextProps.selectedcategory
 //					});
 /*	  if (!nextProps.tabClassHide)
		 this.initializeState(nextProps);
			 //	this.forceUpdate();            
			 */
	 }
 
	 componentWillUnmount()
	 {
		 if (this.abortSignal && !this.abortSignal.aborted)
			 this.abortController.abort();
		 this.setState({});
		 this.store.setState({channeltypeitems: [],
			 programtypeitems: [], categories: [],
			  });
		 this._mounted = false;
	 }
 
	componentDidMount()
	{
		if(Config.bDebug) 				
			console.log("componentDidMount 1");
		this.abortController = new AbortController(); // 1        
		this.abortSignal = this.abortController.signal; // 2
	//	this.fetchProgSchedules(this.state.progsource);		
		this._mounted = true;
		// this.tablCntl.current.onkeydown = this.cntlPlusKeyUp;		
		if (document.getElementById('programtable'))
		document.getElementById('programtable').onkeydown = this.altPlusKeyUp;
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

	altPlusKeyUp = (e) => 
	{ 
		e = e || window.event;
		let keyCode = e.keyCode || e.which,
			arrow = { left: 37, up: 38, right: 39, down: 40 };
			if (Config.bDebug)
				console.log("pressed");

		let firefox = navigator.userAgent.search("Firefox");
		let isFirefox = this.state.isbrowser.isFirefox;
		if (Config.bDebug)
		{
			console.log("firefox");
			console.log(isFirefox);
		}
		if (Config.bDebug)
		{
			console.log("control key");
			console.log("e.altKey");
			console.log(e.altKey);
			console.log("e.altLeft");
			console.log(e.altLeft);			
			console.log("e.ctrlKey");
			console.log(e.ctrlKey);				
			console.log("e.shiftKey");
			console.log(e.shiftKey);
			console.log("keyCode");
			console.log(keyCode);
			console.log("e.keyCode");
			console.log(e.keyCode);
			console.log("e.originalEvent");
			console.log(e.originalEvent);
			console.log("e");
			console.log(e);
		}

		if (/* isFirefox && (e.keyCode == 18
		    /* && e.ctrlKey || */ e.altKey) {
		//	e.preventDefault();

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
				if (currentColInd > 0)
				{
					const prevcol = this.getPrevColumn(cols, currentColInd);
					if (prevcol)
					{
						prevcol.focus();
					}
				}
				break;

			case "s":
					//... handle alt+s
				currentColInd = this.getCurrentColumnIndex(e.path);
				if (currentColInd !== -1 && currentColInd < (lenCols -1))
				{
					const nextcol = this.getNextColumn(cols, currentColInd);
					// const nextcol = getH3OfCurrentColumn(e.path);
					// document.getElementById("tablecol" +(currentColInd+1)).focus(); 				
					if (nextcol)
					{
						if (Config.bDebug)
						{
							console.log("nextcol");
							console.log(nextcol);
						}
					    nextcol.focus();
						// this.simulateTabKey(nextcol);
						// document.getElementById("tablecol" +(currentColInd+1)).focus(); 
						// route("#"+nextcol.id);
						// Config.callFocusOfId(nextcol.id);
					}				
				}				
				/* test code for firefox browser:

				divInsideOfCol = this.getH3OfCurrentColumn(e.path);
				if (divInsideOfCol)
				{
					 divInsideOfCol.setAttribute('tabindex', '0');					
					 divInsideOfCol.focus();
					 window.setTimeout(function ()
    				{
        				document.getElementById(divInsideOfCol.id).focus();
    				}, 100);
					// document.getElementById(divInsideOfCol.id).focus(); 
					// aField = document.getElementById('entryField');
					// Config.callFocusOfId(divInsideOfCol.id);
					// document.getElementById(divInsideOfCol.id).click();
				}
				*/
				break;
		  }
		}
	}

	/*
	simulateTabKey = (cntl) =>
	{
	
  // enter is pressed 

    setTimeout(function() {
      //  event.keyCode = 13;  event.target.value += 'b';  

      let theKey = 'Tab';
      let e = new window.KeyboardEvent('focus', {
        bubbles: true,
        key: theKey,
        keyCode: 9,
        charCode: 0,
      });
      cntl.activeElement.dispatchEvent(e);
      e = new window.KeyboardEvent('keydown', {
        bubbles: true,
        key: theKey,
        keyCode: 9,
        charCode: 0,
      });
      cntl.activeElement.dispatchEvent(e);
      e = new window.KeyboardEvent('beforeinput', {
        bubbles: true,
        key: theKey,
        keyCode: 9,
        charCode: 0,
      });
      cntl.activeElement.dispatchEvent(e);
      e = new window.KeyboardEvent('keypress', {
        bubbles: true,
        key: theKey,
        keyCode: 9,
        charCode: 0,
      });
      cntl.activeElement.dispatchEvent(e);
      e = new window.KeyboardEvent('input', {
        bubbles: true,
        key: theKey,
        keyCode: 9,
        charCode: 0,
      });
      cntl.activeElement.dispatchEvent(e);
      e = new window.KeyboardEvent('change', {
        bubbles: true,
        key: theKey,
        keyCode: 9,
        charCode: 0,
      });
      cntl.activeElement.dispatchEvent(e);
      e = new window.KeyboardEvent('keyup', {
        bubbles: true,
        key: theKey,
        keyCode: 9,
        charCode: 0,
      });
      cntl.activeElement.dispatchEvent(e);
    }, 4);

    setTimeout(function() {
      theKey = 'Tab';
      let e = new window.KeyboardEvent('focus', {
        bubbles: true,
        key: theKey,
        keyCode: 9,
        charCode: 0,
      });
      cntl.dispatchEvent(e);
      e = new window.KeyboardEvent('keydown', {
        bubbles: true,
        key: theKey,
        keyCode: 9,
        charCode: 0,
      });
      cntl.dispatchEvent(e);
      e = new window.KeyboardEvent('beforeinput', {
        bubbles: true,
        key: theKey,
        keyCode: 9,
        charCode: 0,
      });
      cntl.dispatchEvent(e);
      e = new window.KeyboardEvent('keypress', {
        bubbles: true,
        key: theKey,
        keyCode: 9,
        charCode: 0,
      });
      cntl.dispatchEvent(e);
      e = new window.KeyboardEvent('input', {
        bubbles: true,
        key: theKey,
        keyCode: 9,
        charCode: 0,
      });
      cntl.dispatchEvent(e);
      e = new window.KeyboardEvent('change', {
        bubbles: true,
        key: theKey,
        keyCode: 9,
        charCode: 0,
      });
      cntl.dispatchEvent(e);
      e = new window.KeyboardEvent('keyup', {
        bubbles: true,
        key: theKey,
        keyCode: 9,
        charCode: 0,
      });
      cntl.dispatchEvent(e);
    }, 100);

	}
	*/

	removelisteners = () =>
	{		
	}

	getTypeParamAndValue = (progsource, selecteddate) =>
	{
		let ret = "";
		let storestate = this.store.getState();
		let selday = selecteddate;
		let month  = "" +(selday.getMonth() +1);
        if (month.trim().length === 1)
            month = "0" +month;
        let day = "" +selday.getDate();
        if (day.trim().length === 1)
            day = "0" +day;
        ret = selday.getFullYear() +"-" +month +"-" +day;
		// ret = "" + selecteddate.getYear() +"-" +(selecteddate.getMonth() +1) +"-" +selecteddate.getDate():
        // ret = ret + plusdate.format("YYYY-MM-DD");
		return ret;
	}

	getImageUrl = (style) =>
	{
		if (!style)
			return undefined;
		let searchStart = "url('";
		let searchEnd = "')";
		const strStyle = style.backgroundImage;
		let ind = strStyle.indexOf(searchStart);
		if (ind == -1) 
		{
			searchStart = 'url("';
			searchEnd = '")';
			ind = strStyle.indexOf(searchStart);
		}
		if (ind > -1)
		{
			let ind2 = strStyle.indexOf(searchEnd);
			if (ind2 > -1)
			{
				let value = strStyle.substring(ind +searchStart.length, ind2);
				if (value)
					return value;
			}	
		}
		return undefined;
	}

	getJsonProgram(nodeProgram)
	{
		if (!nodeProgram)
			return null;
		const HeaderClassValue = 'schedule-card--';
		let jsonProgram = {};
		jsonProgram.movie = false;
		jsonProgram.upcoming = false;
		jsonProgram.expired = false;
		jsonProgram.current = false;
		jsonProgram.aftercard = undefined;
		jsonProgram.description = undefined;
		jsonProgram.createdtime = new Date().toTimeString();
		jsonProgram.accessibilityfeature = false;
		jsonProgram.metaitems = [];
		jsonProgram.links = [];

		let nodesMeta = nodeProgram.querySelectorAll('meta');
		let nodeMeta, jsonMeta;
		if (nodesMeta)
		for (var i=0; i < nodesMeta.length; i++ ) {
			nodeMeta = nodesMeta[i];
			if (nodeMeta)
			{
				jsonMeta = {};
				if (nodeMeta.getAttribute('itemprop') === "duration")
					jsonProgram.duration = nodeMeta.getAttribute('content');
				if (nodeMeta.getAttribute('itemprop') == 'accessibilityFeature' 
					&& nodeMeta.getAttribute('content') == 'captions')
					jsonProgram.accessibilityfeature = true;
				jsonMeta.itemprop = nodeMeta.getAttribute('itemprop');
				jsonMeta.content = nodeMeta.getAttribute('content');
				jsonProgram.metaitems.push(jsonProgram);
			}
		}

		let itemTypeStr = nodeProgram.getAttribute("itemtype");
		jsonProgram.movie = ( itemTypeStr && 
			( itemTypeStr.includes("Movie") ? true : false));
	
		jsonProgram.status = nodeProgram.className
		let nodeHeader = nodeProgram.querySelector('div[class="schedule-card__header"]');
		if (nodeHeader)
		{
			let nodeSpan = nodeProgram.querySelector('span');
			if (nodeSpan)
			{
				let nodePubl = nodeSpan.querySelector('span[class="schedule-card__publication"]');
				if (nodePubl)
				{
					jsonProgram.startTime = nodePubl.textContent.toString().replaceAll('\n','').trim();
					// <time itemprop="startDate"
					let nodeStartDate = nodePubl.querySelector('time[itemprop="startDate"]');
					if (nodeStartDate)
						jsonProgram.startDate = nodeStartDate.getAttribute('datetime');
					let nodeEndDate = nodePubl.querySelector('time[itemprop="endDate"]');
					if (nodeEndDate)
						jsonProgram.endDate = nodeEndDate.getAttribute('datetime');
				}
				let nodeTitle = nodeSpan.querySelector('span[class="schedule-card__title"]');
				if (nodeTitle)
				{
					jsonProgram.name = nodeTitle.textContent.toString().replaceAll('\n','').trim();
					if (jsonProgram.name && !jsonProgram.movie)
					{
						jsonProgram.movie = jsonProgram.name.includes("Elokuva");						
					}					
				}
			}
		}

		let nodeFooter = nodeProgram.querySelector('div[class="schedule-card__footer"]');
		if (nodeFooter)
		{
			let nodesLink = nodeFooter.querySelectorAll('a');
			let nodeLink, jsonLink;
			if (nodesLink)
			for (var i=0; i < nodesLink.length; i++ ) {
				nodeLink = nodesLink[i];
				if (nodeLink)
				{
					jsonLink = {};
					if (nodeLink.href)
					{
						jsonLink.href = nodeLink.href;
						jsonLink.text = nodeLink.textContent.toString().replaceAll('\n','').trim();
						jsonProgram.links.push(jsonLink);
					}
				}
			}

			let nodeDuration = nodeFooter.querySelector('span[class="schedule-card__duration"]');			
			if (nodeDuration)
				jsonProgram.durationtext = nodeDuration.textContent.toString().replaceAll('\n','').trim();
			let nodeDescription = nodeFooter.querySelector('span[itemprop="description"]');			
			if (nodeDescription)
			{
				jsonProgram.description = nodeDescription.textContent.toString().replaceAll('\n','').trim();			
			}
			let nodeName = nodeFooter.querySelector('span[itemprop="name"]');			
			if (nodeName)
				jsonProgram.captiontext = nodeName.textContent.toString().replaceAll('\n','').trim();
	
		}
		return jsonProgram;
	}

	getJsonChannel = (xmlchannels) =>
	{
		let ret = null;
		if (!xmlchannels)
			return null;
		let jsonChannel = {};
		jsonChannel.name = undefined;
		jsonChannel.nomoreprogramstoday = false;
		let nodeH2 = xmlchannels.getElementsByTagName("h2")[0];
		if (nodeH2 === null || nodeH2 === undefined)
		{
			nodeH2 = xmlchannels.querySelector('h2[class="channel-header"]');
		}
		if (nodeH2 === null || nodeH2 === undefined)
		{
			let nodeH2a = xmlchannels.getElementsByTagName("H2");
			console.log("nodeH2a");
			console.log(nodeH2a);
			nodeH2 = nodeH2a;
			const serializer = new XMLSerializer();
			const xmlStr = serializer.serializeToString(xmlchannels);
			console.log("kissa");
		}
		if (nodeH2)
		{
			let nodeA = nodeH2.querySelector('a');
			if (nodeA)
			{
				jsonChannel.href = nodeA.href;
				let nodeDiv = nodeA.querySelector('div');
				if (nodeDiv)
				{
					let image =  this.getImageUrl(nodeDiv.style);
					if (image)
						jsonChannel.image = image;
					jsonChannel.name = nodeDiv.getAttribute("aria-label");
				}
				else
				{
					const serializer = new XMLSerializer();
					let xmlStr1 = serializer.serializeToString(nodeA);
					if (!xmlStr1)
						xmlStr1 = nodeA.outHTML;
					if (xmlStr1)
						jsonChannel.name = nodeA.textContent;
					else
					{
						if (Config.bDebug)									
							console.log("kissa");
						;
					}
				}				
			}
			else					
			{
				if (Config.bDebug)
					console.log("kissa2");
					;
			}
		}

		if (!jsonChannel.name)
		{
			let nomoreprogs = xmlchannels.querySelector('*[class="schedule-card__no-more-programs-today"]');
			if (nomoreprogs)
			{
				jsonChannel.description = nomoreprogs.textContent;
				jsonChannel.nomoreprogramstoday = true;
				nodeH2 = xmlchannels.querySelector('h2[class="channel-header"]');
				if (nodeH2)
				{
					let nodeA = nodeH2.querySelector('a');
					if (nodeA)
					{
						jsonChannel.href = nodeA.href;
						let nodeDiv = nodeA.querySelector('div');
						if (nodeDiv)
						{
							let image =  this.getImageUrl(nodeDiv.style);
							if (image)
								jsonChannel.image = image;
							jsonChannel.name = nodeDiv.getAttribute("aria-label");
						}
					}
					else
					{
						if (nodeH2.textContent)
							jsonChannel.name = nodeH2.textContent.replaceAll('\n','').trim();
					}					
					if (!jsonChannel.name)
					{
						let nodeH2Div = nodeH2.querySelector('div');
						if (nodeH2Div)
							jsonChannel.name = nodeH2Div.getAttribute('aria-label');
					}
				}
			}
			else
			{
				if (Config.bDebug)
				{
					const serializer = new XMLSerializer();
					const xmlStr2 = serializer.serializeToString(xmlchannels);	
					console.log("kissa22");
				}
				;
			}
		}

//		if (jsonChannel.nomoreprogramstoday)
//			return jsonChannel;

		let nodeLU = xmlchannels.getElementsByTagName("ul")[0];
		let nodePrograms = nodeLU.querySelectorAll("li");
		let arrayPrograms = [];
		let jsonProg = null;
		for (var i=0; i < nodePrograms.length; i++ ) {
			jsonProg = this.getJsonProgram(nodePrograms[i]);
			if (jsonProg)
				arrayPrograms.push(jsonProg);
		}

		jsonChannel.channelprograms = arrayPrograms;
		return jsonChannel;
	}

	getJsonDataFromYleXml = (data) =>
	{
		let ret = null;
		let xmlDoc = new window.DOMParser().parseFromString(data, "text/html");
		//let channeltitle = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
		let nodeMainContent = null;
		//nodeMainContent = xmlDoc.evaluate('div[class="main-content"]', xmlDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		let nodeBody = xmlDoc.querySelector("body");
		nodeMainContent = nodeBody.querySelector('div[class="main-content"]');
		//let nodeChannels = nodeMainContent.evaluate('//*/attribute::*[class="guide-channels guide-channels--today"]', nodeMainContent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		let nodeLu = nodeMainContent.querySelector("ul");
		let xmlchannels = nodeLu.querySelectorAll('li[class="guide-channels__channel"]');
		let arrayChannels = [];
		let jsonChannel = null;
		if (xmlchannels)
		for (var i=0; i < xmlchannels.length; i++ ) {
			jsonChannel = this.getJsonChannel(xmlchannels[i]);
			if (jsonChannel)
				arrayChannels.push(jsonChannel);
		}
			/*
			var attr;
			for (var i=0; i < nodesSnapshot.snapshotLength; i++ ) {
			attr = nodesSnapshot.snapshotItem(i);
			console.log(attr, attr.ownerElement) 
			});
			*/

		return arrayChannels;
	}

	fetchProgSchedules = (progsource, selecteddate) =>
	{
//		this.fetch_url_categories = "http://localhost:8080/tvprogram/categories";

		if (!this._mounted)
			return;

		let fetch_url = this.fetch_url_audio;
		if (progsource == 'rtv')
			fetch_url = this.fetch_url_tv;

        if(Config.bDebug) 
		{	
			console.log("fetchProgSchedules");
			console.log(fetch_url +this.getTypeParamAndValue(progsource, selecteddate));
		}

		let url = fetch_url +this.getTypeParamAndValue(progsource, selecteddate);
		this.setState({ errmsg: '' });
		fetch(url,
		 {
//			Host: 'localhost:9090',
			timeout: 6000,
			headers: { "Content-Type": "*/*", 
			'Accept': '*/*', // application/rss+xml
		 	},
			mode: 'cors',
		    method: 'get',
//    		url: `http://localhost:9090`,
		//	credentials: 'same-origin', // include, *same-origin, omit
		 })
		.then(this.handleErrors)
		.then(response => { return response.text();})
//		.then(str => new window.DOMParser().parseFromString(str, "text/xml"))
		.then(data => { 
			/*
			if(Config.bDebug) 
				{
					console.log("fetchProgSchedules 1.5"); 
					console.log(data); 
				}
				*/			
				let jsondata = this.getJsonDataFromYleXml(data);					
				this.setState({schedules: jsondata, bSchedulesQueryReady: true});				
				this.store.setState({ schedules: jsondata });
		}) 
		.catch((error) => {
			console.error("error");
			console.error(error);
			this.setState({ errmsg: error.toString() })
			// throw new this.TelkkuException(error.toString());
		})
		;
	}
   
	handleErrors(response) {
        if (!response.ok) {
			// throw Error(response.statusText);
			throw Error(response.status);
        }
        return response;
	}

	/*
				result2 = regex.exec(after);
			if (result2)
			{
				foundedRegex = true;
				let tmp_next_matchStart = result[ind].index;
				let tmp_next_matchEnd = result[ind].length;	
				next_matchStart = tmp_next_matchStart +matchEnd;
				next_matchEnd = tmp_next_matchEnd +matchEnd;
			}
			else
			{
				foundedRegex = false;
				next_matchStart = -1;
				next_matchEnd = textHtml.length;
			}
	*/

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

	radioProgTableChanged(event){
		var currentCheckedRadio = event.target;
        var name = currentCheckedRadio.name;
		if (Config.bDebug)
		{				
			console.log("radioProgTableChanged");
			console.log(name);
		}
        if (name !== 'opttable') return;
        var id = currentCheckedRadio.id;
		if (Config.bDebug)
		{				
			console.log("currentCheckedRadio");
			console.log(id);
		}
		this.setState({ progtable: id });
        this.createUiGrid();
	}

	/*
	getWeekGrid = () =>
    {
        return <div>
        <LayoutGrid>
            <LayoutGrid.Inner>
            <LayoutGrid.Cell cols="1">Maanantai</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">Tiistai</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">Keskiviikko</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">Torstai</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">Perjantai</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">Lauantai</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">Sunnuntai</LayoutGrid.Cell>
            </LayoutGrid.Inner>
            <LayoutGrid.Inner>
            <LayoutGrid.Cell cols="1">1 cell</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">2 cell</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">3 cell</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">4 cell</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">5 cell</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">6 cell</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">7 cell</LayoutGrid.Cell>
            </LayoutGrid.Inner>
        </LayoutGrid>
        </div>;

    }
	*/

	/*
	getListGrid = () =>
    {
        return <div>
        <LayoutGrid>
            <LayoutGrid.Inner>
            <LayoutGrid.Cell cols="1">L Maanantai</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">L Tiistai</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">Keskiviikko</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">Torstai</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">Perjantai</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">Lauantai</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">Sunnuntai</LayoutGrid.Cell>
            </LayoutGrid.Inner>
            <LayoutGrid.Inner>
            <LayoutGrid.Cell cols="1">1 cell</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">2 cell</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">3 cell</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">4 cell</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">5 cell</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">6 cell</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="1">7 cell</LayoutGrid.Cell>
            </LayoutGrid.Inner>
        </LayoutGrid>
        </div>;

    }
	*/

    getDayGrid = () =>
    {
        return <DayServices selecteddate={this.store.getState().selecteddate} data={this.state.schedules}
					progsource={this.state.progsource} 
					selectedcategory={this.state.selectedcategory}
					bShowTableBorder={this.state.bShowTableBorder} 
					bShowDesciption={this.state.bDisplayAllDescriptions}
				/>;
    }

	getFetchedDate = () =>
	{
		if (Config.bDebug)
		{
			console.log("getFetchedDate");
			console.log("this.state.selecteddate");
			console.log(this.store.getState().selecteddate);
		}
		let today = this.store.getState().selecteddate;
		if (today == null || today == undefined)
			return "";
			
		if (typeof today === 'string')
			today = Date.parse(today);
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

	onClickSetDateStringYle = (event) =>
	{
		event.preventDefault();
		let dayparameter = event.target.id;
		if (Config.bDebug)
		{
			console.log("onClickSetDateString");
			console.log("dayparameter");
			console.log(dayparameter);
		}
		const search = 'dayname_';
		let ind = dayparameter.indexOf(search);
		if (ind > -1)
			dayparameter = dayparameter.substring(ind +search.length);
		const selDate = new Date(Date.parse(dayparameter));
		if (Config.bDebug)
		{
			console.log("dayparameter");
			console.log(dayparameter);
			console.log("selDate");
			console.log(selDate);
			console.log("this.state.selecteddate");
			console.log(this.state.selecteddate);
		}
		/*
		if (this.state.selecteddate.getFullYear() === selDate.getFullYear()
		    && this.state.selecteddate.getMonth() === selDate.getMonth()
			&& this.state.selecteddate.getDay() === selDate.getDay())
			return;
		*/
		const day = selDate;
		const today = new Date(Date.now())
		if (day.getDate() !== today.getDate())
		{
			if (this.checkshowdcurrentprogramsRef.current.value)
			{
				this.checkshowdcurrentprogramsRef.current.value = false;
				this.setState({ bshowdcurrentprograms: false});
			}			
			this.checkshowdcurrentprogramsRef.current.disabled = true;
		}
		else
		if (this.checkshowdcurrentprogramsRef.current.disabled)
			this.checkshowdcurrentprogramsRef.current.disabled = false;

        const emptyservices = [];
		this.store.setState({ selecteddate: selDate });
		this.setState({ selecteddate: selDate, selectedchannelindex: 0,
			currentChannelSetIndex: 0,
            services: emptyservices, schedules: [], currentservice: null 
        });
		// this.store.setStateNoneCallListeners({ selecteddate: selDate, schedules: [] });
		this.fetchProgSchedules(this.state.progsource, selDate);
	}

    createUiGrid = () =>
    {
        let uigrid = null;	
        if (this.state.bSchedulesQueryReady 
			&& this.state.schedules != null && this.state.schedules.length > 0)
        {
			/*
            if (this.state.progtable == 'rweek')
                uigrid = this.getWeekGrid();
            else
            if (this.state.progtable == 'rday')
                uigrid = this.getDayGrid();
            else
            if (this.state.progtable == 'rlist')
                uigrid = this.getListGrid();
				*/
				let tmp_channels = state.services.map((s2, k) => {
					return <YleChannel id={"ylechannel" +k} data={s2.name} 
							schedules={s2.channelprograms}
							selectedcategory={this.props.selectedcategory} 
							yleapiparams={this.props.yleapiparams} progsource={state.progsource} 
							selecteddate={this.props.selecteddate} bSvLang={state.bSvLang}
							bShowDesciption={state.bDisplayAllDescriptions}
							showSearch={this.state.bSearchButtonClicked && this.state.textSearch != null}
							getPOfIndex={this.getPOfIndex}
							currenttime = {currenttime}
							bshowdcurrentprograms={this.state.bshowdcurrentprograms}
							themevalue={this.props.themevalue} />;
				  }); 

				  /*
				  if (headers != null)
					tableheaders = headers.map((child, i) => {
					  return <th style={'vertical-align: top; padding-left: 5px; padding-right: 5px;' +tableBorderStyle}>{child}</th>
				  });
				  */
				  if (tmp_channels != null)
					tabletds = tmp_channels.map((child, k) => {
					  return <td tabIndex="0" id={'tablecol' +k} style={'vertical-align: top; padding-left: 5px; padding-right: 5px; ' +tableBorderStyle}>{child}</td> 
					});
        }
        // this.setState({uigrid: uigrid });
		return uigrid;
    }

	getPlus1DayId = (plusdaynumber) =>
	{
		const today = dayjs();
		let plusdate = today;
		if (plusdaynumber > 0)
			plusdate = today.add(plusdaynumber, 'days');
		else
		if (plusdaynumber < 0)
			plusdate = today.add(plusdaynumber, 'days');

		const ret = plusdate.format("YYYY-MM-DD"); // pvm=2021-02-22
		return ret;
	}

	getPlus1Day = (plusdaynumber) =>
	{
		const today = dayjs();
		let plusdate = today;
		if (plusdaynumber > 0)
			plusdate = today.add(plusdaynumber, 'days');
		else
		if (plusdaynumber < 0)
			plusdate = today.add(plusdaynumber, 'days');
		const weekday = new Date(plusdate).getDay();
		let weekdayname = "";
		switch(weekday)
		{
			case 1: weekdayname = 'Ma'; break;
			case 2: weekdayname = 'Ti'; break;
			case 3: weekdayname = 'Ke'; break;
			case 4: weekdayname = 'To'; break;
			case 5: weekdayname = 'Pe'; break;
			case 6: weekdayname = 'La'; break;
			case 0: weekdayname = 'Su'; break;
		}  
		const ret = weekdayname +" " +plusdate.format("DD.MM.YYYY"); // pvm=2021-02-22
		return ret;
	}

	/*
	getStartTime = (date) =>
	{
		let modTimeDate = date;
		console.log("getStartTime");
		console.log("date");
		console.log(date);
		console.log("typeof date");
		console.log(typeof date);
		// Object.assign(modTimeDate, date);
		modTimeDate.setHours(0);
		modTimeDate.setMinutes(0);
		modTimeDate.setSeconds(1);
		//const ret = new Date(modTimeDate.getTime() - modTimeDate.getTimezoneOffset() * 60000).toISOString());
		// const ret = this.converDateToLocalTime(modTimeDate);
		*/
		/*
		var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
		var localISOTime = (new Date(modTimeDate - tzoffset)).toISOString().slice(0, -1); 
		const ret = localISOTime; // dateFormat(modTimeDate, this.formatForServiceTime);
		*/
		/*
		const ret = new Date(modTimeDate.toString().split('GMT')[0]+' UTC').toISOString();
		console.log("getStartTime");
		console.log(ret);
		return ret;
	}
	*/

	/*
	converToLocalTime = (serverDate) => 
	{

		var dt = new Date(Date.parse(serverDate));
		var localDate = dt;
		
		var gmt = localDate;
			var min = gmt.getTime() / 1000 / 60; // convert gmt date to minutes
			var localNow = new Date().getTimezoneOffset(); // get the timezone
			// offset in minutes
			var localTime = min - localNow; // get the local time
	
		var dateStr = new Date(localTime * 1000 * 60);
		// dateStr = dateStr.toISOString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"); // this will return as just the server date format i.e., yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
		dateStr = dateStr.toString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		return dateStr;
	}

	converDateToLocalTime = (serverDate) => 
	{

		var dt = serverDate;
		var localDate = dt;
		
		var gmt = localDate;
			var min = gmt.getTime() / 1000 / 60; // convert gmt date to minutes
			var localNow = new Date().getTimezoneOffset(); // get the timezone
			// offset in minutes
			var localTime = min - localNow; // get the local time
	
		var dateStr = new Date(localTime * 1000 * 60);
		// dateStr = dateStr.toISOString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"); // this will return as just the server date format i.e., yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
		dateStr = dateStr.toString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		return dateStr;
	}
	*/

	/*
	getEndTime = (date) =>
	{
		let modTimeDate = date;
	//	Object.assign(modTimeDate, date);
		modTimeDate.setHours(23);
		modTimeDate.setMinutes(59);
		modTimeDate.setSeconds(59);
		*/
		/*
		var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
		var localISOTime = (new Date(modTimeDate - tzoffset)).toISOString().slice(0, -1); 
		const ret = localISOTime; // dateFormat(modTimeDate, this.formatForServiceTime);
		*/		
		// const ret = new Date(modTimeDate.getTime() - modTimeDate.getTimezoneOffset() * 60000).toISOString());
		// const ret = this.converDateToLocalTime(modTimeDate);
		/*
		const ret = new Date(modTimeDate.toString().split('GMT')[0]+' UTC').toISOString();
		console.log("getEndTime");
		console.log(ret);
		return ret;
	}
	*/

	sleep = (ms) =>
	{
		return new Promise(resolve => setTimeout(resolve, ms));
	}

    isEmptyHash = (abc) => {
		for(var prop in abc) {
			if(abc.hasOwnProperty(prop))
				return false;
		}
		return true;
	}

	typeOf = (obj) => {
		return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
	}

	
	radioProgSourceChanged = (event) =>
	{
        event.preventDefault();
		var currentCheckedRadio = event.target;
        var name = currentCheckedRadio.name;
		if (Config.bDebug)
		{	
			console.log("currentCheckedRadio");
			console.log(name);
		}
        if (name !== 'opttv') return;
        var id = currentCheckedRadio.id;
		if (Config.bDebug)
		{	
			console.log("currentCheckedRadio");
			console.log(id);
		}
		this.store.setState({schedules: null});
		if (this.checkBoxMovieRef.current)
		{
			if (id != 'rtv')
			{
				this.checkBoxMovieRef.current.disabled = true;
				if (this.checkBoxMovieRef.current.checked)
					this.checkBoxMovieRef.current.checked = false;
			}
			else
				this.checkBoxMovieRef.current.disabled = false;
		}

		this.setState({ progsource: id, bShowOnlyMovies: false, schedules: null});
		this.checkBoxMovieRef.current.checked = false;
	}

	showdcurrentprograms = (event) => {
		event.preventDefault();
		let value = event.target.checked;
		console.log("showdcurrentprograms");
		let bValue = value; // this.state.bDisplayAllDescriptions;
		console.log("bValue");
		console.log(bValue);
		/*
		if (value === 'on')
			bValue = true;
		console.log(value);
		*/
		this.setState({bshowdcurrentprograms: bValue,
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
			/* bSearchButtonClicked: false */ });
	}

	showOneChannel = (event) => {
		event.preventDefault();
	//	console.log("showOneChannel");
		let value = event.target.checked;
		let bValue = value; // this.showOneChannelRef.current.;

		if (bValue)
		{
			const st = this.store;
			const storestate = st.getState();
			// this.selectChannelRef.current.selectedIndex = 0;
			this.selectChannelRef.current.selectedIndex = 0;
			this.setState({showChannelsAtSameTime: 1,
				bCheckShowChannelsAtSameTime: true,
				bSchedulesQueryReady: true,
				/* bSearchButtonClicked: false, */
			    selectedchannelindex: 0,
				currentChannelSetIndex: 0,
				schedules: storestate.schedules });
		}	
		else
		{
			const st = this.store;
			const storestate = st.getState();
			this.selectChannelRef.current.selectedIndex = 0;
			this.setState({showChannelsAtSameTime: 
				this.const_showChannelsAtSameTime,
				selectedchannelindex: 0,
				bCheckShowChannelsAtSameTime: false,
				/* bSearchButtonClicked: false, */
				bSchedulesQueryReady: true,
				currentChannelSetIndex: 0,
				schedules: storestate.schedules});
			// this.filterWhenUIControlsHasBeenChanged(filtercalled.SEARCHCHANE, null);
		}
	}

	showOnlyMovies = (event) => {
		event.preventDefault();
		let value = event.target.checked;
		if (Config.bDebug)
			console.log("showOnlyMovies");
		let bValue = value; 
		if (Config.bDebug)
		{				
			console.log("bValue");
			console.log(bValue);
		}
		this.setState({bShowOnlyMovies: bValue });
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

	prevChannelSetClicked = (event) =>
	{
		event.preventDefault();
		if (this.state.schedules == null || this.state.schedules.length == 0)
			return;
		if (this.state.currentChannelSetIndex < 0)
		{
			this.setState({ currentChannelSetIndex: 0,
				/* bSearchButtonClicked: false */ });
			return;
		}
		if (this.state.currentChannelSetIndex === 0)
		{
			return;
		}
		this.setState({ currentChannelSetIndex: this.state.currentChannelSetIndex -1, });
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

		let all_channels = this.state.schedules;
		if (all_channels == null)
		{
			headers = [];
			channels = [];	
			let ret = {};
			ret.headers = headers;
			ret.channels = channels;
			return ret;		
		}
		else
		if (this.state.bCheckShowChannelsAtSameTime
			&& this.state.selectedchannelindex != -1)
		{			
			console.log("filter");
			let selchanenl = all_channels[this.state.selectedchannelindex];
			if (!selchanenl)
			{
				console.log("stop");
			}
			else
			if (!selchanenl.name)
			{
				console.log("stop2");
			}
			let selectedTitle = (selchanenl && selchanenl.name ? selchanenl.name : null);
			let filteredchannels = all_channels.filter( (s, i) =>
			{ 
			//	console.log("i");
			//	console.log(i);
				return s.name === selectedTitle 
			} );
//				console.log("filteredchannels");
//				console.log(filteredchannels);
			headers = filteredchannels.map((jsonchannel, i) => {
				return jsonchannel.name
				});
			channels = filteredchannels;
		}
		else
		{
			if (this.state.showChannelsAtSameTime == all_channels.length
			   || this.state.showChannelsAtSameTime > all_channels.length)
			{
				headers = all_channels.map((jsonchannel, i) => {
					return jsonchannel.name
				});
				channels = all_channels;
			}
			else
			{
				let bAllChannels = false;
				if (this.state.showChannelsAtSameTime < all_channels.length)
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
					if (min > all_channels.length)
					{
						min = all_channels.length;
						bAllChannels = true;
					}

					if (max > all_channels.length)
						max = all_channels.length;

					if (!bAllChannels)
					{
						let i;
						let newChannelSet = []
						for (i = min; i < max; i++) {
							newChannelSet.push(all_channels[i]);
						}

						headers = newChannelSet.map((jsonchannel, i) => {
							return jsonchannel.name
						});
						channels = newChannelSet;
					}
				}
				else
				{
					bAllChannels = true;
				}
				
				if (bAllChannels)
				{
					headers = all_channels.map((jsonchannel, i) => {
						return jsonchannel.name
					});
					channels = all_channels;
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
			currentChannelSetIndex: 0, });
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
		if (this.state.schedules == null)
			return 0;
		const channelssize = this.state.schedules.length;
		if (channelssize === 0)
			return 0;
		if(this.state.bCheckShowChannelsAtSameTime)
			return 0;
		if (this.state.showChannelsAtSameTime >= this.state.schedules.length)
			return 0;
		const channelSets = this.state.schedules.length / this.state.showChannelsAtSameTime;
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
		if (this.state.schedules == null || this.state.schedules.length == 0)
			return;
		if (this.state.currentChannelSetIndex > this.calculateMaxChannelSetIndex())
		{
			this.setState({ currentChannelSetIndex: this.calculateMaxChannelSetIndex(),
				/* bSearchButtonClicked: false */});
			return;
		}
		if (this.state.currentChannelSetIndex === this.calculateMaxChannelSetIndex())
		{
			return;
		}
		this.setState({ currentChannelSetIndex: this.state.currentChannelSetIndex +1,});
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
		this.filterWhenUIControlsHasBeenChanged(filtercalled.SEARCHCHANE, value);		
	}

	filterWhenUIControlsHasBeenChanged = (calledfrom, change) =>
	{
		//  filterChannesAfterChannelPay takes items from fetcheditems and populates: channeltypeitems,
		// filterAfterProgramType takes items from channeltypeitems and populates: programtypeitems 
		//         and/or channels if there is no search, 
		// filterAfterSearch takes items from programtypeitems and populates: channels if there is a 
		// ongoing search.
		// if there is no 'previos' stage change, then take previous items and only filter 'own' items and
		// put those on 'next' item state state variable. See above! (this method is called in all 
		// possible change place, ie from ui controll change methods).
		console.log("filterWhenUIControlsHasBeenChanged");
		console.log("calledfrom");
		console.log(calledfrom);
		console.log("change");
		console.log(change);
	
	//	this.setState({ channels: null });

		switch (calledfrom) {
			case filtercalled.SEARCHCHANE:
				 // only a search data change or if null or empty set 'bSearch' false:
				this.makeSearchChange(change);
				break;
			case filtercalled.MAKESEARCH:
				this.filterAfterSearch(change); // search button pressed!
				break;
			}
		//	this.setState({ channels: this.channels });
	}

	makeSearchChange = (change) =>
	{
		const bSearch = this.state.bSearchButtonClicked;
		if (/* bSearch && */ (change === undefined || change === null || change.toString().trim().length == 0 ))
		{
			const storestate = this.store.getState();
			this.textSearch = null;
			this.schedules = null;
			this.setState({ textSearch: null, bSearchButtonClicked: false,
				schedules: storestate.schedules,
			});
		}
		else
			this.textSearch = change;
	}

	filterAfterSearch = (change) =>
	{
		// if change parameter is undefined, then take value from state!
		// filterAfterSearch takes items from programtypeitems and populates: channels if there is a 
		// ongoing search.
		let mychange = null;
		if (change == undefined)
			mychange = this.state.bSearchButtonClicked;
		else
		{
			mychange = change;
		}

		let bAllChannels = false;
		let foundedChannels = [];
		let foundedPrograms = [];
		let selectedchannelindex = this.state.selectedchannelindex;

		if (Config.bDebug)
		{
			console.log("filterAfterSearch mychange");
			console.log(mychange);
		}

		const storestate = this.store.getState();
		this.schedules = storestate.schedules;
		if (mychange !== undefined || mychange !== null || mychange)
		{
			let all_channels = storestate.schedules;

			if (this.state.bCheckShowChannelsAtSameTime &&
				this.state.selectedchannelindex > -1)
			{
				const onech = all_channels[this.state.selectedchannelindex];
				if (onech)
				{
					all_channels = [];
					all_channels.push(onech);
					this.setState({ /* this makes a smaill bug: selectedchannelindex: 0, */
						currentChannelSetIndex: 0,
					 });
					selectedchannelindex = 0;
				}
			}
			//let all_channels = this.channels;
			if (Config.bDebug)
			{
				console.log("all_channels");
				console.log(all_channels);
				console.log("all_channels.length");
				console.log(all_channels.length);
			}

			if (all_channels == null)
			{
				; // this.setState({ bSearchButtonClicked: false, channels: null});		
			}
			else
			{
				// const searchText = this.state.textSearch;
				const searchText = this.textSearch;
				if (Config.bDebug)
				{
					console.log("searchText");
					console.log(searchText);
				}
				if (searchText == null || searchText.toString().trim().length == 0)
				{
//					this.setState({ bSearchButtonClicked: false, 
//						channels: all_channels});
					;
				}
				else
				{
					let foundedChannelsTitle = null;
					let index = -1;
					let founded = false;				
					let progfounded = false;
					let uppersearchText = searchText.toUpperCase();
					let chcoopy = {};
	
					let search_channels = all_channels;
					if (this.state.bCheckShowChannelsAtSameTime
						&& this.state.selectedchannelindex != -1)
					{			
						console.log("filter search bCheckShowChannelsAtSameTime");
						const onech = search_channels[selectedchannelindex];
						let selectedTitle = (onech && onech.name ? onech.name : null);
						if (!selectedTitle)
						{
							console.log("stop3");
						}
						let filteredchannels = search_channels.filter( (s, i) =>
						{ 
						//	console.log("i");
						//	console.log(i);
							return s.name === selectedTitle 
						} );
						search_channels = filteredchannels;
					}

					if (Config.bDebug)
					{
						console.log("search_channels");
						console.log(search_channels);
					}

					Array.from(search_channels).forEach(cha => {
						chcoopy = {};
						index = -1;
						founded = false;
					// this.state.channels.forEach(cha, i => {
						Object.assign(chcoopy, cha);
						/*
						if (Config.bDebug)
						{
							console.log("chcoopy");
							console.log(chcoopy);
							console.log("chcoopy.channelprograms");
							console.log(chcoopy.channelprograms);
						}
						*/
						index = (chcoopy.name ? chcoopy.name.toUpperCase().indexOf(uppersearchText) : -1);
						if (index != -1)
						{
							chcoopy.titleindex = index;
							founded = true;
							if (Config.bDebug)
							{
								console.log("founded channel title chcoopy");
								console.log(chcoopy);
							}
						}
						foundedPrograms = [];
	
						let prcopy = null;
						Array.from(chcoopy.channelprograms).forEach(pr => {
						// cha.channelprograms.forEach(pr, i => {
							progfounded = false;
							prcopy = {};
							Object.assign(prcopy, pr);
							index = (prcopy.name ? prcopy.name.toString().toUpperCase().indexOf(uppersearchText) : -1);
							if (index != -1)
							{
								prcopy.titleindex = index;
								/*
								prcopy.title = pr.title;
								prcopy.description = pr.description;
								prcopy.channel  = pr.channel;
								prcopy.id  = pr.id;
								prcopy.movie  = pr.movie;
								prcopy.sport  = pr.sport;
								prcopy.timestamp  = pr.timestamp;	
								*/						
	
								founded = true;
								progfounded = true;
								if (Config.bDebug)
								{
									console.log("founded program title");
									console.log(prcopy);
								}		
							}
							index = (prcopy.description ? prcopy.description.toString().toUpperCase().indexOf(uppersearchText) : -1);
							if (index != -1)
							{
								prcopy.descriptionindex = index;
								founded = true;
								/*
								prcopy.title = pr.title;
								prcopy.description = pr.description;
								prcopy.channel  = pr.channel;
								prcopy.id  = pr.id;
								prcopy.movie  = pr.movie;
								prcopy.sport  = pr.sport;
								prcopy.timestamp  = pr.timestamp;
								*/
	
								progfounded = true;
								if (Config.bDebug)
								{
									console.log("founded program description");
									console.log(prcopy);
								}		
							}
							if (progfounded)
								foundedPrograms.push(prcopy);
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
	
					if (foundedChannels == null || foundedChannels.length == 0)
					{
						// if (change == undefined)
						// this.setState({ bSearchButtonClicked: false, 
						//	channels: null});
						this.schedules = null;
					}
					else
					{
						if (Config.bDebug)
						{
							console.log("foundedChannels");
							console.log(this.programtypeitems);
							console.log("foundedChannels.length");
							console.log(foundedChannels.length);
						}
						/*
						this.setState({ bSearchButtonClicked: true, 
							channels: foundedChannels});
							*/
						this.schedules = foundedChannels;		
					}
				}
			}
		}
		else
		{
//			this.setState({ bSearchButtonClicked: false,
//				channels: this.state.programtypeitems });
			;
		}

		return this.schedules;
	}

	searchTextFromChannelsClicked = (event) => 
	{
		event.preventDefault();
		if (Config.bDebug)
		{
			console.log("searchTextFromChannelsClicked");
		}
		const searchText = this.textSearch;
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
		let currcntl = this.showAllDescrRef.current;
		let value = currcntl.checked;
		if (!value)
			currcntl.checked = true;
				
		// this.filterWhenUIControlsHasBeenChanged(filtercalled.MAKESEARCH, true);
		let foundedschedules = this.filterAfterSearch(true);
		this.setState({ bSearchButtonClicked: true, bDisplayAllDescriptions: true,
			schedules: foundedschedules, textSearch: searchText });
		this.forceUpdate();
	}

	getPOfIndex = (index, txt, themevalue) => 
    {
		if (Config.bDebug)
		{
			console.log("getPOfIndex");
		}
		let textSearch = this.textSearch;
		if (Config.bDebug)
		{
			console.log("textSearch");
			console.log(textSearch);
		}
		if (txt == undefined || txt == null || txt.toString().trim().length == 0)
			return "";
		if (Config.bDebug)
		{
			console.log("txt");
			console.log(txt);
			console.log("index");
			console.log(index);
			console.log("textSearch");
			console.log(textSearch);			
		}
		
		let txt1 = txt.toString();
		let txtlen = txt1.length;
		if (txtlen  == undefined || index == undefined || index == null || index < 0 
			|| txtlen <= index )
            return txt1.toString();
		if (textSearch == undefined || textSearch == null
			|| textSearch.toString().trim().length == 0)
            return txt1.toString();
		 
        let first = txt1.substring(0, index);
        let between = txt1.substring(index, index +textSearch.length);
        let last = txt1.substring(index +textSearch.length, txt1.length);

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

	onFocusTextField = (event) =>
	{
		/*
		let strcss = Config.textFieldFocus;
		if (this.state.themevalue === '--dark')
			strcss = Config.textFieldFocusWhite;

		textFieldSearchRef.current.style = strcss;
		*/
	}

	onBlurTextField = (event) =>
	{
		/*
		let strcss = Config.textFieldStype;
		if (this.state.themevalue === '--dark')
			strcss = Config.textFieldStypeWhite;

		textFieldSearchRef.current.style = strcss;
		*/
	}

	altPlusKeyUpProgramHeader = (e) =>
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

		const buttoninputw = "float: none; display: inline-block; vertical-align: middle; "
				+(props.themevalue !== undefined && props.themevalue !== '' ? "" : " color: white; ");

		const inputw = "float: none; display: inline-block; vertical-align: middle; ";
		// let uigrid = this.createUiGrid();
		let tableheaders = null;
		let tabletds = null;
		let headers = null;
		let currenttime = new Date();

		let tableBorderStyle = '';
		let table_border_color = 'black';
		if (props.themevalue === '--dark')
			table_border_color = 'white';
		if (state.bShowTableBorder)
		{
			tableBorderStyle = ' border: 1px solid ' + table_border_color + ';';
		}

		if (this.state.bSchedulesQueryReady 
			&& state.schedules != null && state.schedules.length > 0)
        {
			/*
            if (this.state.progtable == 'rweek')
                uigrid = this.getWeekGrid();
            else
            if (this.state.progtable == 'rday')
                uigrid = this.getDayGrid();
            else
            if (this.state.progtable == 'rlist')
                uigrid = this.getListGrid();
				*/

				let tableheaders_and_rows = this.getTableHeadersAndTableRowsAfterChannels();				
				headers = tableheaders_and_rows.headers;
				/*
				headers = state.schedules.map((s, i) => { 
					return s.name; 
				  });
				*/
				let tmp_channels = null;
				let channels = tableheaders_and_rows.channels;
				if (channels)
					tmp_channels = channels.map((s2, k) => {
					return <YleChannel id={'ylechannel' +k} data={s2} 
							schedules={s2.channelprograms}
							selectedcategory={state.selectedcategory} 
							yleapiparams={state.yleapiparams} 
							progsource={state.progsource} 
							selecteddate={state.selecteddate} 
							bSvLang={state.bSvLang}
							bShowOnlyMovies={state.bShowOnlyMovies}
							bShowDesciption={state.bDisplayAllDescriptions}
							getPOfIndex={this.getPOfIndex}
							currenttime = {currenttime}
							bshowdcurrentprograms={this.state.bshowdcurrentprograms}
							themevalue={props.themevalue}
							bshowdcurrentprograms={this.state.bshowdcurrentprograms}
							showSearch={state.bSearchButtonClicked && state.textSearch != null}
							/>;
				  }); 
				  /*
				  if (headers != null)
					tableheaders = headers.map((child, i) => {
					  return <th tabIndex="0" style={'vertical-align: top; padding-left: 5px; padding-right: 5px;' +tableBorderStyle}>{child}</th>
				  });
				  */
				  if (tmp_channels != null)
					tabletds = tmp_channels.map((child, k) => {
					  return <td id={'tablecol' +k} tabIndex="-1"
					  style={'vertical-align: top; padding-left: 5px; padding-right: 5px; ' +tableBorderStyle}>{child}</td> 
					});
        }

		let selectchannels = null;	

		let selectedchannelindex = state.selectedchannelindex;
		if (selectedchannelindex < 0)
			selectedchannelindex = 0;
		else
		if (!state.bCheckShowChannelsAtSameTime)
		{
			selectedchannelindex = 0;
			if (this.selectChannelRef && this.selectChannelRef.current)
				this.selectChannelRef.current.selectedIndex = 0;
		}

		const storestate = this.store.getState();
		if (storestate.schedules != undefined && storestate.schedules !== null 
			&& storestate.schedules.length > 0)
		{  // selected={child.title.fi===state.selectedcategory.title.fi} 
			const all_channels = storestate.schedules;
			selectchannels = all_channels.map((child, i) => {
				return <option value={child.name} 
					selected={i===selectedchannelindex} >{child.name}</option>
				});
		}

		let textFieldStype = Config.textFieldStype;
		if (table_border_color === 'white')
			textFieldStype = Config.textFieldStypeWhite;
			
		const darkstyle = props.themevalue;

		let isFirefox = state.isbrowser.isFirefox;
        // class="mdc-card"
		// class={"mdc-theme" +darkstyle}

		// 			style = { textFieldStype }  />

		/*
									<Radio tabIndex="0" id="rtv" name='opttv' checked={state.progsource === 'rtv'}
								onChange={this.radioProgSourceChanged} ></Radio>
		*/

		return (	
			<Fragment>
				<div id="idylehtml" style={this.divDialogStyle}>
				<div class={style.cardHeader} onKeyUp={this.altPlusKeyUpProgramHeader}>
						<h1 tabIndex="0" lang="fi" title={"Yle " +this.getFetchedDate()}>Yle {this.getFetchedDate()}</h1>`
						<div role="radiogroup" aria-labelledby="idyleprogramdatasource">
							<label id="idyleprogramdatasource" lang="fi" >Tv tai radio-ohjelmat</label>							

							<input type="radio" tabIndex="0" id="rtv" name='opttv' role="radio"
							style={inputw}
							checked={state.progsource === 'rtv'} aria-checked={state.progsource === 'rtv'}
							 value="rtv" 	onChange={this.radioProgSourceChanged}/>
							<label for="rtv" style={inputw}>TV</label>
							
							<input type="radio" tabIndex="0" id="rradio" name='opttv' role="radio"
							style={inputw}
							checked={state.progsource === 'rradio'} aria-checked={state.progsource === 'rradio'}
							 value="rradio" 
							 onChange={this.radioProgSourceChanged}><label for="rradio">Radio</label></input>
							<label for="rradio" style={inputw}>Radio</label>
						</div>
						
						<section style={this.state.themevalue === '' ? '' : this.sectionStyle}>
					<div class={style.cardHeader}>
						<p lang="fi" tabIndex="0" >
							Hae tv-ohjelmatiedot alimpaan taulukkoon alla olevan päivämäärän mukaan:
						</p>						
						<div class={style.cardHeader}>							
							<a href="." id={'dayname_'+this.getPlus1DayId(0)} 
							     lang="fi" aria-labelledby={this.getPlus1Day(0)}
							     onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(0)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(1)} 
								 lang="fi"  aria-labelledby={this.getPlus1Day(1)}
							     onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(1)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(2)} 
								 lang="fi"  aria-labelledby={this.getPlus1Day(2)}
							     onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(2)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(3)} 
								 lang="fi"  aria-labelledby={this.getPlus1Day(3)}
							     onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(3)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(4)} 
								lang="fi"  aria-labelledby={this.getPlus1Day(4)}
							     onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(4)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(5)} 
								lang="fi"  aria-labelledby={this.getPlus1Day(5)}
							     onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(5)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(6)} 
								lang="fi"  aria-labelledby={this.getPlus1Day(6)}
							   onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(6)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(7)} 
								 lang="fi"  aria-labelledby={this.getPlus1Day(7)}
							      onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(7)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(8)} 
								lang="fi"  aria-labelledby={this.getPlus1Day(8)}
							    onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(8)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(9)} 
								  lang="fi"  aria-labelledby={this.getPlus1Day(9)}
							      onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(9)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(10)} 
								lang="fi"  aria-labelledby={this.getPlus1Day(10)}
							     onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(10)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(11)} 
								  lang="fi"  aria-labelledby={this.getPlus1Day(11)}
							      onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(11)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(12)} 
								   lang="fi"  aria-labelledby={this.getPlus1Day(12)}
							       onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(12)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(13)} 
									  lang="fi"  aria-labelledby={this.getPlus1Day(13)}
							          onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(13)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(14)} 
									lang="fi"  aria-labelledby={this.getPlus1Day(14)}
							       onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(14)}</a><br/>						
						</div>

						<p>Aikaisemmat päivät:</p>
						<div class={style.cardHeader}>							
							<a href="." id={'dayname_'+this.getPlus1DayId(-1)} 
							     lang="fi" aria-labelledby={this.getPlus1Day(-1)}
							     onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(-1)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(-2)} 
								 lang="fi"  aria-labelledby={this.getPlus1Day(-2)}
							     onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(-2)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(-3)} 
								 lang="fi"  aria-labelledby={this.getPlus1Day(-3)}
							     onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(-3)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(-4)} 
								 lang="fi"  aria-labelledby={this.getPlus1Day(-4)}
							     onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(-4)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(-5)} 
								lang="fi"  aria-labelledby={this.getPlus1Day(-5)}
							     onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(-5)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(-6)} 
								lang="fi"  aria-labelledby={this.getPlus1Day(-6)}
							     onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(-6)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(-7)} 
								lang="fi"  aria-labelledby={this.getPlus1Day(-7)}
							   onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(-7)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(-8)} 
								 lang="fi"  aria-labelledby={this.getPlus1Day(-8)}
							      onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(-8)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(-9)} 
								lang="fi"  aria-labelledby={this.getPlus1Day(-9)}
							    onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(-9)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(-10)} 
								  lang="fi"  aria-labelledby={this.getPlus1Day(-10)}
							      onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(-10)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(-11)} 
								lang="fi"  aria-labelledby={this.getPlus1Day(-11)}
							     onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(-11)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(-12)} 
								  lang="fi"  aria-labelledby={this.getPlus1Day(-12)}
							      onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(-12)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(-13)} 
								   lang="fi"  aria-labelledby={this.getPlus1Day(-13)}
							       onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(-13)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(-14)} 
									  lang="fi"  aria-labelledby={this.getPlus1Day(-14)}
							          onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(-14)}</a><space> </space>
							<a href="." id={'dayname_'+this.getPlus1DayId(-15)} 
									lang="fi"  aria-labelledby={this.getPlus1Day(-15)}
							       onClick={this.onClickSetDateStringYle}>{this.getPlus1Day(-15)}</a><br/>						
						</div>
					</div>
					</section>
					<section style={this.state.themevalue === '' ? '' : this.sectionStyle}>
						
					<div  lang="fi" tabIndex="0" aria-labelled="Miten ohjelmatiedot näytetään">

						<div style={{ "background-color": 'red', color: "yellow" } }>{state.errmsg}</div>					
						<div class=" mdc-typography--caption">Miten ohjelmatiedot näytetään:</div>						
					</div>
					<div class={style.cardBody} >
					<div>
					<span>						
					<Button ripple raised style={inputw} disabled={state.schedules == null
								|| (state.showChannelsAtSameTime == 1 
									&& state.bCheckShowChannelsAtSameTime) 
								|| state.showChannelsAtSameTime >= state.schedules.length }
								lang="fi" tabIndex="0" aria-label="Aikaisemmat kanavat"
								style={buttoninputw}
							onClick={this.prevChannelSetClicked} text="&lt;">					
					</Button>
					<space>          </space>
					<Button ripple raised style={inputw}
						disabled={state.schedules == null
							|| (state.showChannelsAtSameTime == 1
								&& state.bCheckShowChannelsAtSameTime)
							|| state.showChannelsAtSameTime >= state.schedules.length }
							lang="fi" aria-label="Seuraavat kanavat"
							style={buttoninputw}
							onClick={this.nextChannelSetClicked} text="&gt;">					
					</Button>
					</span>

					<span>						
						<SwitchCheckbox inputid="checkshowdcurrentprograms" 
						    labeltext="Näytä par'aikaa ja myöhemmät esitettävät" checked={state.bshowdcurrentprograms}
							onChange={this.showdcurrentprograms} 
							propref={this.checkshowdcurrentprogramsRef}
							 />
					</span>						
					<span>
						<SwitchCheckbox  inputid="checkshowdescribtions" 
						    labeltext="Näytä selitykset" checked={state.bDisplayAllDescriptions}
							onChange={this.showAllDescriptions} 
							propref={this.showAllDescrRef} />
					</span>						
					<span>						
						<SwitchCheckbox onChange={this.showOneChannel}
							inputid="checkshowonechannel"
							labeltext="Näytä yksi kanava:" checked={state.bCheckShowChannelsAtSameTime}
							propref={this.showOneChannelRef} />
						<select tabIndex="0"
							selectedIndex={selectedchannelindex}
                            disabled={!state.bCheckShowChannelsAtSameTime}
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
						<span>						
					<space>          </space>

						<label for="input_number_columss" style={inputw} >
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
					<space>          </space>

						<label for="idsearchvalue" style={inputw} >Etsi tekstiä ohjelmista:</label>
						<input type="text" tabIndex="0" id="idsearchvalue" 
						disabled={this.store.getState().schedules == null || state.bUnderFetch}
						onKeyUp={this.textFieldSearchChanged}
						onFocus={this.onFocusTextField}
						onBlur={this.onBlurTextField} style={inputw +' width: 30%;'} 
						ref={this.textFieldSearchRef} />
					<space>          </space>
						<Button tabIndex="0" lang="fi" ripple raised style={inputw} 
							disabled={state.schedules == null || state.bUnderFetch}
								onClick={this.searchTextFromChannelsClicked}
								style={buttoninputw}
								aria-label="Hae" text="Hae">						
						</Button>
						</span>						
						<span>						
					<space>          </space>
	
						<SwitchCheckbox inputid="idcheckTableBorders"
						labeltext="Näytä taulun raamit" checked={state.bShowTableBorder}
							onChange={this.showTableBorders}
							propref={this.showTableBordersRef} />
						</span>						
						<span>						
					<space>          </space>
	
						<SwitchCheckbox inputid="checkshowonlymovies"
						labeltext="Näytä elokuvat" 
							disabled={state.progsource != 'rtv'}
							onChange={this.showOnlyMovies}
							propref={this.checkBoxMovieRef}
							checked={state.progsource != 'rtv' && state.bShowOnlyMovies 
							  || state.progsource == 'rtv' && state.bShowOnlyMovies}
							 />	
					</span>						
					<span>						
					<space>          </space>
					<Button tabIndex="0" ripple raised disabled={!state.bUnderFetch }
						 onClick={this.abortFetchClicked}
						 style={buttoninputw}
						 aria-label="Keskeytä lataus" text="Keskeytä lataus">					
					</Button>
					</span>
					</div>
				</div>
				</section>
				<br></br>
				<section style={this.state.themevalue === '' ? '' : this.sectionStyle}>
				<div>
					<div class=" mdc-typography--caption"><h3 id="idprogramtableh3" tabIndex="0">Ohjelmataulukko</h3></div>					
					{isFirefox ? <div class=" mdc-typography--caption" lang="fi" tabIndex="0" >
			        Jos käytät firefox selainta (ja ruudunlukuohjelmaa), taulukon kanava alt -näppäinkomennot eivät toimi. 
					Käytä jotain toista selainta. Kiitos.</div> :  <div class=" mdc-typography--caption"><h3 lang="fi" tabIndex="0" >
					-- Ohjelmataulukko, liikutaan hiirellä tai taulukon sisällä seuraavilla näppäimillä
					 alt+s = seuraava kanava, alt+k = edellinen kanava sekä alt+o = kanavan ohjelmiin, otsakkeeseen. 
					 Ohjelman kuvailun saa näkymään tab näppäimellä ja enterillä tai hiirenklikkauksella. Taulukon sisällä toimivat myös 
					 tab sekä shift-tab näppäimet. Taulukon yläpuolelle tekstin "Ohjelmataulukko" kohdalle pääsee komennolla alt+t.</h3></div> }
					{ !tabletds && <div tabIndex="0" lang="fi" 
					aria-label="Ei ohjelmatietoja haettu"><br></br>
					Ei ohjelmatietoja haettu tai tekstihakutulosta (tyhjää hakutekstikenttä)</div> }
					<br></br>
					<table id="programtable" style="width:100%" ref={this.tablCntl}>
					<tbody>
					<tr>{tableheaders}</tr>
					<tr >{tabletds}</tr> 		
					</tbody>
					</table>
				</div>
				</section>
				</div>
			</div>
			</Fragment>
		);

		/*
		className={"mdc-text-field"+props.themevalue}
		*/
	}
}
