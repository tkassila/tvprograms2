import { h, Component, createRef, Fragment } from "preact";
//import Card from 'preact-material-components/Card';
//import 'preact-material-components/Card/style.css';
//import 'preact-material-components/Button/style.css';
import AbortController from "abort-controller";
import style from "./style";
import Config from "../../utils/Config";
// import fetchJsonp from 'fetch-jsonp';
// import moment from 'moment';
//import Select from 'preact-material-components/Select';
//import 'preact-material-components/List/style.css';
//import 'preact-material-components/Menu/style.css';
//import 'preact-material-components/Select/style.css';
// import Checkbox from 'preact-material-components/Checkbox';
//import Formfield from 'preact-material-components/FormField';
//import Button from 'preact-material-components/Button';
//import 'preact-material-components/Button/style.css';
//import TextField from 'preact-material-components/TextField';
//import 'preact-material-components/TextField/style.css';
//import 'preact-material-components/Theme/style.css';

import Button from "../button/Button";

import dayjs from "dayjs";
import AmppariChannel from "./AmppariChannel";
import ChannelTypes from "./ChannelTypes";
import ProgramTypes from "./ProgramTypes";
import SearchPrograms from "./SearchPrograms";
import SwitchCheckbox from "../checkbox/CheckBox";

// import store from '../../utils/store';

String.prototype.indexOfRegex = function (regex, fromIndex) {
  var str = fromIndex ? this.substring(fromIndex) : this;
  var match = str.match(regex);
  return match ? str.indexOf(match[0]) + fromIndex : -1;
};

String.prototype.lastIndexOfRegex = function (regex, fromIndex) {
  var str = fromIndex ? this.substring(0, fromIndex) : this;
  var match = str.match(regex);
  return match ? str.lastIndexOf(match[match.length - 1]) : -1;
};

const filtercalled = {
  PROGRAMTYPE: "programtype",
  CHANNELTYPE: "channeltype",
  SEARCHCHANE: "searchchange",
  MAKESEARCH: "makesearch",
};

//let season = seasons.SPRING
//if (!season) {
//	throw new Error("Season is not defined")
//}

export default class Amppari extends Component {
  store = null;
  unsubscribelistener = null;
  fetch_url_telkku = null;
  fetch_url_ampparissa = null;
  arr_selecttyyppi_items = ["kaikki", "elokuvat", "urheilu"];
  arr_selectchanneltypes = ["kaikki", "ilmaiset", "maksulliset"];
  ilmaisetchannelnames = [
    "Yle TV1",
    "Yle TV2",
    "MTV3",
    "Nelonen",
    "Yle Teema Fem",
    "Sub",
    "TV Viisi",
    "Liv",
    "Jim",
    "Kutonen",
    "TLC",
    "Fox",
    "Ava",
    "Hero",
    "alfatv",
    "frii",
    "National Geoprafic",
  ];
  search_start_program = '["^2",';
  search_end_program = /\]\](,*)/gi;
  showAllDescrRef = null;
  showOneChannelRef = null;
  selectChannelRef = null;
  const_showChannelsAtSameTime = 10;
  showTableBordersRef = null;
  channelTypeRef = null;
  searchProgramRef = null;
  programTypeRef = null;
  tablCntl = null;

  fetcheditems = [];
  channeltypeitems = [];
  programtypeitems = [];
  channels = [];
  textSearch = null;
  _mounted = false;

  removerfunctionProgramType = null;
  removerfunctionSearchProgram = null;
  removerfunctionChannelType = null;
  checkshowdcurrentprogramsRef = null;
  bUnderFetch = false;
  sectionStyle = null;
  tablesectionStyle = null;
  sectionRef = null;
  section_width = null;

  constructor(props) {
    super(props);
    if (Config.bDebug) {
      console.log("Amppari.js");
      console.log("props");
      console.log(props);
    }

    this.store = props.store;
    let today = new Date(Date.now());
    this.state = {
      errmsg: null,
      html: null,
      selecteddate: null,
      selectedaika: "paiva",
      selectedsuodattimet: "kaikki",
      selectedtyyppi: "kaikki",
      selectedTyyppiinindex: 0,
      selectedsuodatinindex: 0,
      searchsanat: "",
      fetcheditems: [],
      channeltypeitems: [],
      programtypeitems: [],
      channels: [],
      selectedpage: 1,
      today: new Date(Date.now),

      currentchannel: null,
      bDisplayAllDescriptions: false,
      showChannelsAtSameTime: this.const_showChannelsAtSameTime,
      selectedchannelindex: 0,
      bCheckShowChannelsAtSameTime: false,
      currentChannelSetIndex: 0,
      bUnderFetch: false,
      bAllChannelsLoaded: false,
      textSearch: null,
      bSearchButtonClicked: false,
      bShowTableBorder: false,
      bshowdcurrentprograms: true,
      themevalue: props.themevalue,
    };

    // https://telkussa.fi/sivu/1/20210215
    this.fetch_url_telkku = "/telkkussa/";
    // tyyppi=kaikki,urheilu,elokuvat
    // aika=paiva,tulevat,nyt,ilta,yo
    // pvm=2021-02-22
    // suodatus=ilmaiset,maksulliset,kaikki
    // https://www.ampparit.com/tv?aika=paiva&pvm=2021-02-22&sanat=&suodatus=ilmaiset&tyyppi=elokuvat
    this.fetch_url_ampparissa = Config.http_curlserver + "/ampparissa/tv";
    this.AmppariException = this.AmppariException.bind(this);
    // location.host
    this.showAllDescrRef = createRef();
    this.showOneChannelRef = createRef();
    this.selectChannelRef = createRef();
    this.showTableBordersRef = createRef();
    this.channelTypeRef = createRef();
    this.searchProgramRef = createRef();
    this.programTypeRef = createRef();
    this.tablCntl = createRef();
    this.checkshowdcurrentprogramsRef = createRef();
    this.sectionRef = createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (Config.bDebug) {
      console.log("Amppari componentWillReceiveProps nextProps");
      console.log(nextProps);
    }

    if (nextProps !== null && nextProps.themevalue != this.props.themevalue) {
      this.setState({ themevalue: nextProps.themevalue });
      this.sectionStyle =
        nextProps.themevalue !== undefined && nextProps.themevalue !== ""
          ? " border:1px solid pink; padding:15px;  margin:10px; background: black; color: white; " +
            (this.state.sectionwidth == undefined
              ? ""
              : this.state.sectionwidth)
          : " border:1px solid black; padding:15px;  margin:10px; background: white; color: black;" +
            (this.state.sectionwidth == undefined
              ? ""
              : this.state.sectionwidth);
      this.tablesectionStyle =
        nextProps.themevalue !== undefined && nextProps.themevalue !== ""
          ? " border:1px solid pink; padding:15px;  margin:10px; background: black; color: white; "
          : " border:1px solid black; padding:15px;  margin:10px; background: white; color: black;";
    }
  }

  componentDidMount() {
    if (Config.bDebug) console.log("componentDidMount 1");
    this.abortController = new AbortController(); // 1
    this.abortSignal = this.abortController.signal; // 2
    //	this.unsubscribelistener = this.store.subscribe( state => this.listenerStoreChange2(state) );
    let keys = [];
    keys.push("channels");
    this.unsubscribelistener = this.store.subscribeAttributeNameListener(
      keys,
      (state) => this.listenerStoreChange2(state)
    );
    // this.openHtmlTelkkuPage(this.state.selectedpage);
    this._mounted = true;
    const store_fetcheditems = this.store.getState().fetcheditems;
    if (store_fetcheditems) {
      this.setState({ fetcheditems: store_fetcheditems });
      this.store.setState({ fetcheditems: store_fetcheditems });
    }
    document.getElementById("programtable").onkeydown = this.altPlusKeyUp;
    this.section_width = this.sectionRef.current.offsetWidth;
  }

  removelisteners = () => {
    if (this.unsubscribelistener != null) {
      this.unsubscribelistener();
      this.unsubscribelistener = null;
    }
    if (this.removerfunctionProgramType) this.removerfunctionProgramType();
    if (this.removerfunctionSearchProgram) this.removerfunctionSearchProgram();
    if (this.removerfunctionChannelType) this.removerfunctionChannelType();
  };

  setRemoverFunction = (func, fname) => {
    if (fname === "ProgramTypes") this.removerfunctionProgramType = func;
    else if (fname === "SearchPrograms")
      this.removerfunctionSearchProgram = func;
    else if (fname === "ChannelTypes") this.removerfunctionChannelType = func;
  };

  componentWillUnmount() {
    if (this.abortSignal && !this.abortSignal.aborted)
      this.abortController.abort();
    this.removelisteners();
    this.setState({});
    this.store.setStateNoneCallListeners({
      fetchitems: [],
      channeltypeitems: [],
      programtypeitems: [],
      categories: [],
      schedules: [],
    });
    this._mounted = false;
  }

  listenerStoreChange2 = (storestate) => {
    if (Config.bDebug) {
      console.log("Amppari listenerStoreChange2");
      console.log(storestate);
    }
    if (storestate === undefined || storestate === null) {
      console.log("Amppari listenerStoreChange storestate");
      return;
    }

    const channels = storestate.channels;
    const bSearchButtonClicked = storestate.bSearchButtonClicked;
    const bDisplayAllDescriptions = storestate.bDisplayAllDescriptions;
    const textSearch = storestate.textSearch;
    const selectedTyyppiinindex = storestate.selectedTyyppiinindex;
    this.channels = channels;
    this.textSearch = textSearch;
    let store_selectedtyyppi = storestate.selectedtyyppi;
    if (
      store_selectedtyyppi &&
      store_selectedtyyppi != this.state.selectedtyyppi
    ) {
      this.setState({ selectedtyyppi: store_selectedtyyppi });
    }
    /*
		if (this.state.bDisplayAllDescriptions !== bDisplayAllDescriptions )
		{
			let value = this.showAllDescrRef.current.checked;
			if (!value && bDisplayAllDescriptions)
				this.showAllDescrRef.current.checked = true;
			else
			if (value && !bDisplayAllDescriptions)
				this.showAllDescrRef.current.checked = false;
			this.setState({ bDisplayAllDescriptions: bDisplayAllDescriptions,
			});		
		}
		*/
    if (bSearchButtonClicked && textSearch) {
      this.setState({ bDisplayAllDescriptions: true });
    }
    this.setState({
      channels: channels,
      textSearch: textSearch,
      bSearchButtonClicked: bSearchButtonClicked,
      selectedTyyppiinindex: 0,
    });

    if (Config.bDebug) {
      console.log("-- 3 bSearchButtonClicked");
      console.log(bSearchButtonClicked);
      console.log("-- 3 bDisplayAllDescriptions");
      console.log(bDisplayAllDescriptions);
      console.log("-- 3 textSearch");
      console.log(textSearch);
      console.log("-- 3 channels");
      console.log(channels);
      console.log("-- 3");
      console.log(this.state);
    }
  };

  componentWillUnmounted() {
    if (this.unsubscribelistener != null) this.unsubscribelistener();
  }

  AmppariException(message) {
    this.message = message;
    this.name = "AmppariException";
  }

  getSelectedDateParam = () => {
    let selday = this.state.selecteddate;
    let month = "" + (selday.getMonth() + 1);
    if (month.trim().length === 1) month = "0" + month;
    let day = "" + selday.getDate();
    if (day.trim().length === 1) day = "0" + day;
    return "" + selday.getFullYear() + month + day;
  };

  getNextJsonArrayAfterLabel(json, labelitem) {
    let ret = null;
    /*
		if(Config.bDebug) 
		{
			console.log("getNextJsonArrayAfterLabel"); 
			console.log("json"); 
			console.log(json); 
			console.log("labelitem"); 
			console.log(labelitem); 
		}
		*/
    if (labelitem == undefined || labelitem == null) return null;
    if (json == undefined || json == null || json.length == 0) return null;
    let iCount = 0;
    let found = false,
      founded = false;
    let foundedItem = null;

    let i = 0;
    let item = null;
    let max = json.length;

    for (
      i = 0;
      i < max;
      i++ //Array.from(json).forEach(item =>
    ) {
      item = json[i];
      iCount = iCount + 1;
      if (!founded) {
        if (
          !found &&
          typeof item === "string" &&
          item.toString() === labelitem
        ) {
          found = true;
          /*
					if (Config.bDebug)
					{			
						console.log("iCount " +iCount);
						console.log("found = true");
					}
					*/
        } else {
          if (found) {
            /*
						if (Config.bDebug)
						{				
							console.log("iCount " +iCount);
							console.log("return item");
							console.log(item);
						}
						*/
            foundedItem = item;
            founded = true;
            return item;
          }
        }
      }
    }
    // });

    if (foundedItem == null) console.log("return null");

    return foundedItem;
  }

  getChannelsAndPrograms = (tvchannels) => {
    let ret = null;
    if (tvchannels == undefined || tvchannels == null || tvchannels.length == 0)
      return null;
    let jsonch;
    let channels = [];

    Array.from(tvchannels).forEach((item) => {
      if (item === undefined) return;
      jsonch = this.getJsonChannel(item);
      if (jsonch !== null) channels.push(jsonch);
    });
    return channels;
  };

  getArrayIntoChannel = (channel) => {
    let ret = null;
    if (Config.bDebug) {
      console.log("getArrayIntoChannel");
      console.log(channel);
    }
    if (channel == null) return null;
    ret = {};
    let name = this.getNextJsonArrayAfterLabel(channel, "name");
    let slug = this.getNextJsonArrayAfterLabel(channel, "slug");
    let pay = this.getNextJsonArrayAfterLabel(channel, "pay");
    ret.title = name;
    ret.slug = slug;
    ret.pay = pay;
    return ret;
  };

  getJsonProgram = (pr) => {
    let ret = null;
    if (Config.bDebug) {
      console.log("getJsonProgram");
      console.log(pr);
    }
    if (pr == null) return null;
    let pr2 = pr[1]; // this.getNextJsonArrayAfterLabel(pr, '^2');
    ret = {};
    let id = this.getNextJsonArrayAfterLabel(pr2, "id");
    let timestamp = this.getNextJsonArrayAfterLabel(pr2, "timestamp");
    let title = this.getNextJsonArrayAfterLabel(pr2, "title");
    let description = this.getNextJsonArrayAfterLabel(pr2, "description");
    let channel = this.getNextJsonArrayAfterLabel(pr2, "channel");
    let movie = this.getNextJsonArrayAfterLabel(pr2, "movie");
    let sport = this.getNextJsonArrayAfterLabel(pr2, "sport");
    ret.id = id;
    ret.title = title;
    ret.timestamp = timestamp;
    ret.description = description;
    ret.channel = channel;
    ret.movie = movie;
    ret.sport = sport;
    return ret;
  };

  getJsonChannel = (ch) => {
    // , tvchannels3, tvprograms,
    let ch2 = ch[1]; // this.getNextJsonArrayAfterLabel(ch, '^2');
    let tvchannel = ch2[1]; // this.getNextJsonArrayAfterLabel(ch2, 'channel');
    if (Config.bDebug) {
      console.log("tvchannel");
      console.log(tvchannel);
    }
    let channel = tvchannel[1]; // this.getNextJsonArrayAfterLabel(tvchannel, '^2');
    let tvprograms = this.getNextJsonArrayAfterLabel(ch2, "programs");
    let programs = tvprograms[1]; // this.getNextJsonArrayAfterLabel(tvprograms, '^F');
    if (Config.bDebug) {
      console.log("programs");
      console.log(programs);
    }

    let jsonprograms = [];
    let jsonpr = null;
    let jsonchannel = this.getArrayIntoChannel(channel);
    if (jsonchannel == null) return null;

    Array.from(programs).forEach((pr) => {
      if (pr === undefined) return;
      jsonpr = this.getJsonProgram(pr);
      if (jsonpr !== null) jsonprograms.push(jsonpr);
    });

    jsonchannel.channels = jsonprograms;
    return jsonchannel;
  };

  getChannelsAndProgramsFromJsonArray = (json) => {
    let tv = null,
      programming = null,
      f = null,
      channel = null,
      programs = null;
    let i,
      j,
      max = json.length,
      maxj,
      data = null;
    let searchtext = "tv",
      foundSearchText = false;

    for (i = 0; i < max; i++) {
      if (
        !foundSearchText &&
        typeof json[i] === "string" &&
        json[i] === searchtext
      )
        foundSearchText = true;
      else if (foundSearchText) {
        if (searchtext === "tv") {
          tv = json[i][1];
          searchtext = "programming";
          foundSearchText = false;
          programming = tv[1][1];
          maxj = programming.length;
          let channels = [];
          let jsonchannel = {};
          let programchannels = [];

          for (j = 0; j < maxj; j++) {
            /*
						if(Config.bDebug) 
						{
							console.log("programming " +j); 
							console.log(programming[j]	); 
						}
						*/
            channel = programming[j][1][1][1];
            programs = programming[j][1][3][1];
            /*
						if(Config.bDebug) 
						{
							console.log("channel"); 
							console.log(channel); 
							console.log("programs"); 
							console.log(programs); 
						}
						*/
            jsonchannel = {};
            jsonchannel.id = channel[1];
            jsonchannel.title = channel[3];
            jsonchannel.slug = channel[5];
            jsonchannel.pay = channel[7];
            let k = 0,
              maxk = programs.length,
              jsonprogram,
              progdata,
              jsonprograms = [];
            for (k = 0; k < maxk; k++) {
              jsonprogram = {};
              progdata = programs[k][1];
              // sometimes data values are in different order!:
              jsonprogram.id = this.getNextJsonArrayAfterLabel(progdata, "id");
              jsonprogram.timestamp = this.getNextJsonArrayAfterLabel(
                progdata,
                "timestamp"
              );
              jsonprogram.title = this.getNextJsonArrayAfterLabel(
                progdata,
                "title"
              );
              jsonprogram.description = this.getNextJsonArrayAfterLabel(
                progdata,
                "description"
              );
              jsonprogram.channel = this.getNextJsonArrayAfterLabel(
                progdata,
                "channel"
              );
              jsonprogram.movie = this.getNextJsonArrayAfterLabel(
                progdata,
                "movie"
              );
              jsonprogram.sport = this.getNextJsonArrayAfterLabel(
                progdata,
                "sport"
              );
              jsonprograms.push(jsonprogram);
            }
            jsonchannel.channelprograms = jsonprograms;
            /*
						if(Config.bDebug) 
						{
							console.log("jsonchannel"); 
							console.log(jsonchannel); 
						}
						*/
            programchannels.push(jsonchannel);
          }
          return programchannels;
        }
      }
    }

    return null;
    /*
		let tvchannels1 = this.getNextJsonArrayAfterLabel(json2, 'tv');
		let tvchannels2 = tvchannels1[1];
		if(Config.bDebug) 
		{
			console.log("tvchannels2"); 
			console.log(tvchannels2); 
		}
		
		let tvchannels3 = this.getNextJsonArrayAfterLabel(tvchannels2, 'programming');
		let tvchannels = this.getNextJsonArrayAfterLabel(tvchannels3, '^F');
		let data = this.getChannelsAndPrograms(tvchannels);
		return data;
		*/
  };

  fetchHtmlAmppariChannels = async (dayparameter) => {
    if (this.state.bUnderFetch) return;
    let channelurl = this.getUrlQueryForAmppari(dayparameter);
    if (Config.bDebug) {
      console.log("fetchHtmlAmppariChannels 1");
      console.log(channelurl);
    }

    this.fetcheditems = [];
    this.channeltypeitems = [];
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
          console.log("fetchHtmlAmppariChannels 1.5");
          //console.log("data");
          // console.log(data);
        }
        const INITIAL_STATE = "window.__INITIAL_STATE__=";
        let index = data.indexOf(INITIAL_STATE);
        if (Config.bDebug) {
          console.log("index");
          console.log(index);
        }
        if (index > -1) {
          if (Config.bDebug) console.log("index > -1");
          let indexEnd = data.indexOf("</script>", index);
          if (Config.bDebug) {
            console.log("indexEnd");
            console.log(indexEnd);
          }
          if (indexEnd > -1) {
            if (Config.bDebug) console.log("indexEnd > -1");
            data2 = data.substring(index + INITIAL_STATE.length, indexEnd);
            /*
						if (Config.bDebug)
						{				
							console.log("data2");
							console.log(data2);
						}
						*/
            let json = JSON.parse(data2);
            /*
						if (Config.bDebug)
						{				
							console.log("json");
							console.log(json);
						}
						*/
            let strstate = json.state;
            /*
						if (Config.bDebug)
						{				
							console.log("strstate");
							console.log(strstate);
						}
						*/
            let json2 = JSON.parse(strstate);
            if (Config.bDebug) {
              console.log("json2");
              console.log(json2);
            }
            data2 = this.getChannelsAndProgramsFromJsonArray(json2);
            if (Config.bDebug) {
              console.log("-- 1");
              // console.log(data2);
            }
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
          }
        }

        fetched = data2; // this.getJsonDataFromTelkkuRssXml(data);
      })
      .catch((error) => {
        console.error("error");
        console.error(error);
        this.setState({ errmsg: error.toString(), bUnderFetch: false });
        this.bUnderFetch = false;
        throw new this.AmppariException(error.toString());
      });
    return fetched;
  };

  getChannelsAndSortProgramsAfterChannels = (data, channels) => {
    /*
    		const map1 = new Map([
			['foo', 'bar'],
			['baz', 42]
		  ]);

		  const obj = Object.fromEntries(map1);
		  // { foo: 'bar', baz: 42 }
		  
		  For converting object back to map:
		  
		  const map2 = new Map(Object.entries(obj));
		  // Map(2) { 'foo' => 'bar', 'baz' => 42 }
		  */

    let ret = null;
    let map = new Map();
    let channel = {};

    if (Config.bDebug) console.log("chcoopy.channelprograms");
    Array.from(data).forEach((pr) => {
      if (pr === undefined) return;
      channel = map.get(pr.channel);
      if (channel == undefined || channel == null) {
        console.log("channel == undefined");
        channel = {};
        Object.assign(channel, {});
        channel.title = pr.channel;
        console.log("new channel");
        console.log(channel.title);

        map.set(channel.title, channel);
      }
      if (channel !== null) {
        if (channel.channelprograms == undefined) channel.channelprograms = [];
        channel.channelprograms.push(pr);
        map.set(channel.title, channel);
      }
    });

    if (map.size > 0) return Object.fromEntries(map);
    return null;
  };

  getJsonChannels = (strprorams) => {
    let ret = null;
    if (strprorams === null || strprorams === undefined) return null;
    let indStart = 0;
    let searchResultChannel = this.getJsonLabel(
      "channel",
      strprograms,
      indStart
    );
    let channeldata = null;
    let firstIndex = -1;
    let arrprogs = null;
    let search_end_program = "]]";
    let firstIndexEnd = -1;
    let strprogram = null;
    let jsonprog = null;
    let iCount = 1;
    let channels = [];
    let searchSecondChannel = '"channel"';
    let indSecondChannel = -1;

    while (searchResultChannel !== null) {
      indSecondChannel = strprogram.indexOf(
        searchSecondChannel,
        searchResultChanne.indEnd + 1
      );
      indStart = searchResult.indEnd;
      searchResult = this.getJsonLabel(
        "id",
        strprograms,
        indStart,
        indSecondChannel
      );
      if (searchResult !== null) {
        indStart = searchResult.indEnd;
        searchresult = this.getJsonNextValue(
          strprograms,
          indStart,
          indSecondChannel
        );
        if (searchResult !== null) {
          let channelid = searchResult.value;
          indStart = searchResult.indEnd;
          searchResult = this.getJsonLabel(
            "name",
            strprograms,
            indStart,
            indSecondChannel
          );
          if (searchResult !== null) {
            indStart = searchResult.indEnd;
            searchresult = this.getJsonNextValue(
              strprograms,
              indStart,
              indSecondChannel
            );
            let channelname = searchResult.value;
            console.log("channelname");
            console.log(channelname);

            searchResult = this.getJsonLabel(
              "slug",
              strprograms,
              indStart,
              indSecondChannel
            );
            if (searchResult !== null) {
              indStart = searchResult.indEnd;
              searchresult = this.getJsonNextValue(
                strprograms,
                indStart,
                indSecondChannel
              );
              let channelslug = searchResult.value;
              console.log("channelslug");
              console.log(channelslug);

              searchResult = this.getJsonLabel(
                "pay",
                strprograms,
                indStart,
                indSecondChannel
              );
              if (searchResult !== null) {
                indStart = searchResult.indEnd;
                searchresult = this.getJsonNextValue(
                  strprograms,
                  indStart,
                  indSecondChannel
                );
                let channelpay = searchResult.value;
                channeldata = {};
                Object.assign(channeldata, {});
                channeldata.title = channelname;
                channeldata.slug = channelslug;
                channeldata.pay = channelpay;

                arrprogs = new Array();

                firstIndex = strprorams.indexOf(
                  this.search_start_program,
                  indStart
                );
                firstIndexEnd = strprorams.indexOf(search_end_program);
                strprogram = null;
                jsonprog = null;
                iCount = 1;

                while (
                  firstIndex !== -1 &&
                  firstIndexEnd !== -1 &&
                  (indSecondChannel == -1 ||
                    (indSecondChannel != -1 &&
                      firstIndexEnd < indSecondChannel))
                ) {
                  strprogram = strprorams.substring(
                    firstIndex + 1,
                    firstIndexEnd
                  );
                  jsonprog = this.getJsonProg(strprogram, indSecondChannel);
                  if (jsonprog != null) {
                    console.log("jsonprog");
                    console.log(jsonprog);
                    arrprogs.push(jsonprog);
                    iCount = iCount + 1;
                  } else break;
                  firstIndex = strprorams.indexOf(
                    this.search_start_program,
                    firstIndexEnd
                  );
                  firstIndexEnd = strprorams.indexOf(
                    search_end_program,
                    firstIndex
                  );
                }
                console.log("tv programs size");
                console.log(iCount);

                channeldata.channelprograms = [];
                Array.from(arrprogs).forEach((pr) => {
                  if (pr === undefined) return;
                  channeldata.channelprograms.push(pr);
                });
                if (channeldata != null) channels.push(channeldata);
              }
            }
          }
        }
      }
      searchResultChannel = this.getJsonLabel("channel", strprograms, indStart);
    }

    return channels;
  };

  getJsonProg = (strprogram, indSecondChannel) => {
    if (strprogram === null || strprogram === undefined) return null;
    console.log("strprogram");
    console.log(strprogram);
    let ind = strprogram.indexOf('"channel"');
    if (ind > -1) return null;

    let ret = null;
    let searchstart = '"^2",[';
    let indId = strprogram.indexOf(searchstart);
    let searchresult = null;
    if (indId > -1) {
      let indStart = 0;
      let strjson = "";
      strprogram = strprogram.substring(indId + searchstart.length);
      console.log("strprogram 2");
      console.log(strprogram);

      searchresult = this.getJsonLabelAndValue(
        "id",
        strprogram,
        indStart,
        indSecondChannel
      );
      if (searchresult != null) {
        strjson = '{"' + searchresult.name + '":' + searchresult.value;
        console.log("1 strjson");
        console.log(strjson);

        indStart = searchresult.indEnd;
        searchresult = this.getJsonLabelAndValue(
          "timestamp",
          strprogram,
          indStart,
          indSecondChannel
        );
        if (searchresult != null) {
          strjson =
            strjson + ',"' + searchresult.name + '":' + searchresult.value;
          console.log("2 strjson");
          console.log(strjson);
          indStart = searchresult.indEnd;
          searchresult = this.getJsonLabelAndValue(
            "title",
            strprogram,
            indStart,
            indSecondChannel
          );
          if (searchresult != null) {
            strjson =
              strjson + ',"' + searchresult.name + '":' + searchresult.value;
            console.log("3 strjson");
            console.log(strjson);
            indStart = searchresult.indEnd;
            searchresult = this.getJsonLabelAndValue(
              "description",
              strprogram,
              indStart,
              indSecondChannel
            );
            if (searchresult != null) {
              strjson =
                strjson + ',"' + searchresult.name + '":' + searchresult.value;
              indStart = searchresult.indEnd;
              console.log("4 strjson");
              console.log(strjson);
              searchresult = this.getJsonLabelAndValue(
                "channel",
                strprogram,
                indStart,
                indSecondChannel
              );
              if (searchresult != null) {
                strjson =
                  strjson +
                  ',"' +
                  searchresult.name +
                  '":' +
                  searchresult.value;
                console.log("5 strjson");
                console.log(strjson);
                indStart = searchresult.indEnd;
                searchresult = this.getJsonLabelAndValue(
                  "movie",
                  strprogram,
                  indStart,
                  indSecondChannel
                );
                if (searchresult != null) {
                  strjson =
                    strjson +
                    ',"' +
                    searchresult.name +
                    '":' +
                    searchresult.value;
                  console.log("6 strjson");
                  console.log(strjson);
                  indStart = searchresult.indEnd;
                  searchresult = this.getJsonLabelAndValue(
                    "sport",
                    strprogram,
                    indStart,
                    indSecondChannel
                  );
                  if (searchresult != null) {
                    strjson =
                      strjson +
                      ',"' +
                      searchresult.name +
                      '":' +
                      searchresult.value;
                    strjson = strjson + " }";
                    console.log("7 strjson");
                    console.log(strjson);
                    ret = JSON.parse(strjson);
                    console.log("ret");
                    console.log(ret);
                  }
                }
              }
            }
          }
        }
      }
    }

    return ret;
  };

  getJsonLabelAndValue = (name, strprogram, indStart, indSecondChannel) => {
    // let searchresult = this.getJsonLabel(name, strprogram, indStart);
    let searchresult = this.getJsonNextLabel(
      strprogram,
      indStart,
      indSecondChannel
    );
    if (searchresult != null) {
      let indStart2 = searchresult.indEnd;
      let name2 = searchresult.name;
      searchresult = this.getJsonNextValue(
        strprogram,
        indStart2,
        indSecondChannel
      );
      if (searchresult != null) {
        searchresult.name = name2;
        return searchresult;
      }
    }
    return null;
  };

  getJsonNextLabel = (strprogram, indStart, indSecondChannel) => {
    let search = '"';
    let ind = strprogram.indexOf(search, indStart);
    console.log("getJsonNextLabel ind");
    console.log(ind);

    if (ind > -1) {
      let ind2 = strprogram.indexOf(search, ind + 1);
      if (ind2 > -1) {
        console.log("getJsonNextLabel ind2");
        console.log(ind2);
        let searchresult = {};
        searchresult.name = strprogram.substring(ind + 1, ind2);
        searchresult.indStart = ind + 1;
        searchresult.indEnd = ind2;
        console.log("getJsonLabel searchresult");
        console.log(searchresult);
        return searchresult;
      }
    }
    return null;
  };

  getJsonLabel = (name, strprogram, indStart, indSecondChannel) => {
    let search = '"' + name + '"';
    let ind = strprogram.indexOf(search, indStart);
    console.log("getJsonLabel ind");
    console.log(ind);

    if (ind > -1) {
      let searchresult = {};
      searchresult.name = name;
      searchresult.indStart = ind + 1;
      searchresult.indEnd = ind + search.length;
      searchresult.name = name;
      console.log("getJsonLabel searchresult");
      console.log(searchresult);

      return searchresult;
    }
    return null;
  };

  getJsonNextValue = (strprogram, indStart, indSecondChannel) => {
    let search = ",";
    let ind = strprogram.indexOf(search, indStart);
    console.log("getJsonNextValue ind");
    console.log(ind);

    if (ind > -1) {
      let searchresult = {};
      let bStartWithStrike = strprogram.substring(ind + 1, ind + 2) == '"';
      console.log("getJsonNextValue indEnd bStartWithStrike");
      console.log(bStartWithStrike);

      searchresult.indStart = ind;
      let iAdd = 1;
      if (bStartWithStrike) iAdd = 2;
      let indEnd = -1;
      if (bStartWithStrike) indEnd = strprogram.indexOf('"', ind + iAdd);
      else indEnd = strprogram.indexOf(search, ind + iAdd);
      console.log("getJsonNextValue indEnd");
      console.log(indEnd);

      if (indEnd == -1) {
        searchresult.indEnd = strprogram.length;
        searchresult.value = strprogram.substring(ind + iAdd);
        console.log("getJsonNextValue searchresult.value indEnd==-1");
        console.log(searchresult.value);
        return searchresult;
      } else {
        if (bStartWithStrike) searchresult.indEnd = indEnd + 1;
        else searchresult.indEnd = indEnd;
        if (bStartWithStrike)
          searchresult.value = strprogram.substring(ind + 1, indEnd + 1);
        else searchresult.value = strprogram.substring(ind + 1, indEnd);
        console.log("getJsonNextValue searchresult.value");
        console.log(searchresult.value);
        return searchresult;
      }
    }
    return null;
  };

  getJsonDataFromTelkkuRssXml = (data) => {
    const items = data.querySelectorAll("item");
  };

  handleErrors = (response) => {
    if (!response.ok) {
      // throw Error(response.statusText);
      console.log("response");
      console.log(response);
      console.log(response.status);
      throw Error(response.status);
    }
    return response;
  };

  getUrlQueryForAmppari = (dayparameter) => {
    let blankurl =
      this.fetch_url_ampparissa +
      "?aika=" +
      this.state.selectedaika +
      "&pvm=" +
      dayparameter +
      "&sanat=" +
      this.state.searchsanat +
      "&suodatus=" +
      this.state.selectedsuodattimet +
      "&tyyppi=" +
      this.state.selectedtyyppi;

    return blankurl;
  };

  /*
	openHtmlAmppari = (dayparameter) => {
		// aika=paiva,tulevat,nyt,ilta,yo
		// pvm=2021-02-22
		// suodatus=ilmaiset,maksulliset,kaikki
		// https://www.ampparit.com/tv?aika=paiva&pvm=2021-02-22&sanat=&suodatus=ilmaiset&tyyppi=elokuvat

        let blankurl = this.getUrlQueryForAmppari();
        window.open(blankurl, '_blank', "Ampparissa", "location=no");
	}
	*/

  onClickSetDateString = (event) => {
    event.preventDefault();
    let dayparameter = event.target.id;
    let target = event.target;
    const search = "dayname_";
    let ind = dayparameter.indexOf(search);
    if (ind > -1)
      dayparameter = dayparameter.substring(ind + search.length).trim();
    const parseddate = Date.parse(dayparameter);
    const day = new Date(parseddate);
    const today = new Date(Date.now());
    if (day.getDate() !== today.getDate()) {
      if (this.checkshowdcurrentprogramsRef.current.value) {
        this.checkshowdcurrentprogramsRef.current.value = false;
        this.setState({ bshowdcurrentprograms: false });
      }
      this.checkshowdcurrentprogramsRef.current.disabled = true;
    } else if (this.checkshowdcurrentprogramsRef.current.disabled == true)
      this.checkshowdcurrentprogramsRef.current.disabled = false;
    this.setState({ selecteddate: day });
    this.fetchHtmlAmppariChannels(dayparameter);
  };

  getPlus1DayId = (plusdaynumber) => {
    const today = dayjs();
    let plusdate = today;
    if (plusdaynumber > 0) plusdate = today.add(plusdaynumber, "days");
    else if (plusdaynumber < 0) plusdate = today.add(plusdaynumber, "days");
    const ret = plusdate.format("YYYY-MM-DD"); // pvm=2021-02-22
    return ret;
  };

  getPlus1Day = (plusdaynumber) => {
    const today = dayjs();
    let plusdate = today;
    if (plusdaynumber > 0) plusdate = today.add(plusdaynumber, "days");
    else if (plusdaynumber < 0) plusdate = today.add(plusdaynumber, "days");

    const weekday = new Date(plusdate).getDay();
    let weekdayname = "";
    switch (weekday) {
      case 1:
        weekdayname = "Ma";
        break;
      case 2:
        weekdayname = "Ti";
        break;
      case 3:
        weekdayname = "Ke";
        break;
      case 4:
        weekdayname = "To";
        break;
      case 5:
        weekdayname = "Pe";
        break;
      case 6:
        weekdayname = "La";
        break;
      case 0:
        weekdayname = "Su";
        break;
    }
    const ret = weekdayname + " " + plusdate.format("DD.MM.YYYY"); // pvm=2021-02-22
    return ret;
  };

  onClickSelectedAika = (event) => {
    event.preventDefault();
    const timeparameter = event.target.id; // event.target.text;
    const ind = timeparameter.indexOf("_");
    if (ind > -1) {
      const idends = timeparameter.substring(ind + 1);
      /*
			console.log("idends");
			console.log(idends);
			*/
      this.setState({ selectedaika: idends });
    }
  };

  getTableHeaders = () => {
    let ret = null;
    return ret;
  };

  getTableRows = () => {
    let ret = null;
    return ret;
  };

  getFetchedDate = () => {
    if (Config.bDebug) {
      console.log("getFetchedDate");
      console.log("this.state.selecteddate");
      console.log(this.state.selecteddate);
    }
    let today = this.state.selecteddate;
    if (today == null || today == undefined) return "";

    if (typeof today === "string") today = Date.parse(this.state.selecteddate);
    let days = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    if (days < 10) days = "0" + days;
    if (month < 10) month = "0" + month;
    const ret = "" + days + "." + month + "." + year;
    return ret;
  };

  calculateMaxChannelSetIndex = () => {
    if (Config.bDebug) {
      console.log("calculateMaxChannelSetIndex");
      /*
			console.log(channelSets);
			console.log("calculateMaxChannelSetIndex");
			console.log(channelSets);
			console.log("calculateMaxChannelSetIndex");
			console.log(channelSets);
			*/
    }
    if (this.state.channels == null) return 0;
    const channelssize = this.state.channels.length;
    if (channelssize === 0) return 0;
    if (this.state.bCheckShowChannelsAtSameTime) return 0;
    if (this.state.showChannelsAtSameTime >= this.state.channels.length)
      return 0;
    const channelSets =
      this.state.channels.length / this.state.showChannelsAtSameTime;
    if (Config.bDebug) {
      console.log("channelSets");
      console.log(channelSets);
    }
    if (channelSets == 0) return 0;
    return channelSets - 1;
  };

  nextChannelSetClicked = (event) => {
    event.preventDefault();
    if (this.state.channels == null || this.state.channels.length == 0) return;
    if (
      this.state.currentChannelSetIndex > this.calculateMaxChannelSetIndex()
    ) {
      this.setState({
        currentChannelSetIndex: this.calculateMaxChannelSetIndex(),
        /* bSearchButtonClicked: false */
      });
      return;
    }
    if (
      this.state.currentChannelSetIndex === this.calculateMaxChannelSetIndex()
    ) {
      return;
    }
    this.setState({
      currentChannelSetIndex: this.state.currentChannelSetIndex + 1,
    });
  };

  prevChannelSetClicked = (event) => {
    event.preventDefault();
    if (this.state.channels == null || this.state.channels.length == 0) return;
    if (this.state.currentChannelSetIndex < 0) {
      this.setState({
        currentChannelSetIndex: 0,
        /* bSearchButtonClicked: false */
      });
      return;
    }
    if (this.state.currentChannelSetIndex === 0) {
      return;
    }
    this.setState({
      currentChannelSetIndex: this.state.currentChannelSetIndex - 1,
    });
  };

  showAllDescriptions = (event) => {
    event.preventDefault();
    let value = event.target.checked;
    if (Config.bDebug) console.log("showAllDescriptions");
    let bValue = value; // this.state.bDisplayAllDescriptions;
    if (Config.bDebug) console.log("bValue");
    if (Config.bDebug) console.log(bValue);
    /*
		if (value === 'on')
			bValue = true;
		console.log(value);
		*/
    this.setState({
      bDisplayAllDescriptions: bValue,
      /* bSearchButtonClicked: false */
    });
  };

  showTableBorders = (event) => {
    event.preventDefault();
    let value = event.target.checked;
    console.log("showTableBorders");
    let bValue = value;
    console.log("bValue");
    console.log(bValue);
    this.setState({ bShowTableBorder: bValue });
  };

  showOneChannel = (event) => {
    event.preventDefault();
    //	console.log("showOneChannel");
    let value = event.target.checked;
    let bValue = value; // this.showOneChannelRef.current.;

    if (bValue) {
      const st = this.store;
      const storestate = st.getState();
      // this.selectChannelRef.current.selectedIndex = 0;
      this.setState({
        showChannelsAtSameTime: 1,
        bCheckShowChannelsAtSameTime: true,
        /* bSearchButtonClicked: false, */
        selectedchannelindex: 0,
        currentChannelSetIndex: 0,
        channels: storestate.channels,
      });
    } else {
      const st = this.store;
      const storestate = st.getState();
      this.channels = storestate.channels;
      -1;
      this.setState({
        showChannelsAtSameTime: this.const_showChannelsAtSameTime,
        selectedchannelindex: -1,
        bCheckShowChannelsAtSameTime: false,
        /* bSearchButtonClicked: false, */
        channels: storestate.channels,
      });
      // this.filterWhenUIControlsHasBeenChanged(filtercalled.SEARCHCHANE, null);
    }
  };

  getPOfIndex = (index, txt, themevalue) => {
    if (Config.bDebug) {
      console.log("getPOfIndex");
    }
    let textSearch = this.textSearch;
    if (Config.bDebug) {
      console.log("textSearch");
      console.log(textSearch);
    }
    if (txt == undefined || txt == null || txt.toString().trim().length == 0)
      return "";
    if (Config.bDebug) {
      console.log("txt");
      console.log(txt);
      console.log("index");
      console.log(index);
      console.log("textSearch");
      console.log(textSearch);
    }

    let txt1 = txt.toString();
    let txtlen = txt1.length;
    if (
      txtlen == undefined ||
      index == undefined ||
      index == null ||
      index < 0 ||
      txtlen <= index
    )
      return txt1.toString();
    if (
      textSearch == undefined ||
      textSearch == null ||
      textSearch.toString().trim().length == 0
    )
      return txt1.toString();

    let first = txt1.substring(0, index);
    let between = txt1.substring(index, index + textSearch.length);
    let last = txt1.substring(index + textSearch.length, txt1.length);

    if (Config.bDebug) {
      console.log("first");
      console.log(first);
      console.log("between");
      console.log(between);
      console.log("last");
      console.log(last);
    }

    let newvalue_first =
      first != undefined && first != null && first.trim().length != 0 ? (
        <span style={"margin-right: 0px; margin-left: 0px; padding: 0px;"}>
          {first}
        </span>
      ) : (
        ""
      );
    let foundedthtml =
      "background-color: green; color: white; margin-right: 0px; margin-left: 0px; padding: 0px;";
    if (themevalue === "--dark")
      foundedthtml =
        "background-color: yellow; color: black; margin-right: 0px; margin-left: 0px; padding: 0px;";
    let newvalue_between = <span style={foundedthtml}>{between}</span>;
    let newvalue_last =
      last != undefined && last != null && last.trim().length != 0 ? (
        <span style={"margin-right: 0px; margin-left: 0px; padding: 0px;"}>
          {last}
        </span>
      ) : (
        ""
      );
    let newvalue = (
      <div>
        {newvalue_first}
        {newvalue_between}
        {newvalue_last}
      </div>
    );
    if (Config.bDebug) {
      console.log("newvalue_first");
      console.log(newvalue_first);
      console.log("newvalue_between");
      console.log(newvalue_between);
      console.log("newvalue_last");
      console.log(newvalue_last);
    }
    if (Config.bDebug) {
      console.log("newvalue");
      console.log(newvalue);
    }
    return newvalue;
  };

  /*
	getIsMaksullinenChannel = (title) =>
	{
		let ret = false;
		if (title == undefined || title == null || title.trim().length == 0)
			return false;
		if (!ilmaisetchannelnames.includes(title))
			return true;
		return false;
	}

	getIsIlmainenChannel = (title) =>
	{
		let ret = false;
		if (title == undefined || title == null || title.trim().length == 0)
			return false;
		if (ilmaisetchannelnames.includes(title))
			return true;
		return false;
	}
	*/

  oldProgram = (currProg, currtime, nextProg) => {
    const selectedtyyppi = this.state.selectedtyyppi;
    if (selectedtyyppi != "kaikki") {
      nextProg = this.getNextProgOf(currProg);
    }
    return this.oldProgramWithNextProg(currProg, currtime, nextProg);
  };

  getNextProgOf = (currProg) => {
    if (currProg === null || currProg === undefined) return null;
    let ret = null;
    const fetchitems = this.state.fetcheditems;
    if (fetchitems === null || fetchitems === undefined) return null;
    let foundedChannel = null;
    let max = fetchitems.length;
    let ch = null,
      i = 0;

    ch = fetchitems[i];
    if (ch == undefined || ch === null) return null;
    if (ch.title !== currProg.channel) return null;
    foundedChannel = ch;

    if (foundedChannel) {
      let nextPropgram = null;
      let foundedProg = null;
      let max = foundedChannel.channelprograms.length;
      const progs = foundedChannel.channelprograms;
      let prog = null;
      for (i = 0; i < max; i++) {
        prog = progs[i];
        if (prog == undefined || prog === null) continue;
        if (foundedProg) {
          nextPropgram = prog;
          break;
        }
        if (prog.id !== currProg.id) continue;
        foundedProg = prog;
      }
      return nextPropgram;
    }
    return ret;
  };

  oldProgramWithNextProg = (program, currenttime, nextprogram) => {
    const startTime = new Date(program.timestamp * 1000);
    let endtTime = null;
    let endtTimeHours = null;
    if (!nextprogram) return false;
    if (nextprogram) {
      endtTime = new Date(nextprogram.timestamp * 1000);
      endtTimeHours = endtTime.getHours();
    }

    if (endtTime > currenttime) {
      // console.log("kkk");
      return false;
    }
    if (endtTime < currenttime) {
      // console.log("kkk");
      return true;
    }

    const currentHours = currenttime.getHours();
    if (endtTimeHours && endtTimeHours < currentHours) {
      console.log("kkk");
      return true;
    }
    if (endtTimeHours && endtTime.getHours() === currenttime.getHours()) {
      const endtTimeMinutes = endtTime.getMinutes();
      const currentMinutes = currenttime.getMinutes();
      if (endtTimeMinutes < currentMinutes) {
        console.log("kkk");
        return true;
      }
    }
    return false;
  };

  getTableHeadersAndTableRowsAfterChannels = () => {
    let headers = null;
    let channels = null;
    if (Config.bDebug) {
      console.log("getTableHeadersAndTableRowsAfterChannels");
      console.log("this.state.bCheckShowChannelsAtSameTime");
      console.log(this.state.bCheckShowChannelsAtSameTime);
      console.log("this.state.selectedchannelindex");
      console.log(this.state.selectedchannelindex);
      console.log(this.state);
    }

    const currenttime = new Date();

    let all_channels = this.channels;
    if (all_channels == null) {
      headers = [];
      channels = [];
      let ret = {};
      ret.headers = headers;
      ret.channels = channels;
      return ret;
    } else if (
      this.state.bCheckShowChannelsAtSameTime &&
      this.state.selectedchannelindex != -1
    ) {
      console.log("filter");
      let selectedTitle = null;
      if (all_channels[this.state.selectedchannelindex])
        selectedTitle = all_channels[this.state.selectedchannelindex].title;
      else {
        //console.log("kissa");
      }
      let filteredchannels = all_channels.filter((s, i) => {
        //	console.log("i");
        //	console.log(i);
        return s.title === selectedTitle;
      });
      //				console.log("filteredchannels");
      //				console.log(filteredchannels);
      headers = filteredchannels.map((jsonchannel, i) => {
        return jsonchannel.title;
      });
      channels = filteredchannels.map((jsonchannel, i) => {
        return (
          <AmppariChannel
            id={i}
            data={jsonchannel}
            selectedtyyppi={this.state.selectedtyyppi}
            showSearch={
              this.state.bSearchButtonClicked && this.state.textSearch != null
            }
            getPOfIndex={this.getPOfIndex}
            oldProgram={this.oldProgram}
            currenttime={currenttime}
            themevalue={this.state.themevalue}
            bshowdcurrentprograms={this.state.bshowdcurrentprograms}
            displayAllDescriptions={this.state.bDisplayAllDescriptions}
          />
        );
      });
    } else {
      if (
        this.state.showChannelsAtSameTime == all_channels.length ||
        this.state.showChannelsAtSameTime > all_channels.length
      ) {
        headers = all_channels.map((jsonchannel, i) => {
          return jsonchannel.title;
        });
        channels = all_channels.map((jsonchannel, i) => {
          return (
            <AmppariChannel
              id={i}
              data={jsonchannel}
              showSearch={
                this.state.bSearchButtonClicked && this.state.textSearch != null
              }
              selectedtyyppi={this.state.selectedtyyppi}
              getPOfIndex={this.getPOfIndex}
              oldProgram={this.oldProgram}
              currenttime={currenttime}
              bshowdcurrentprograms={this.state.bshowdcurrentprograms}
              themevalue={this.state.themevalue}
              displayAllDescriptions={this.state.bDisplayAllDescriptions}
            />
          );
        });
      } else {
        let bAllChannels = false;
        if (this.state.showChannelsAtSameTime < all_channels.length) {
          let min = Math.floor(
            this.state.currentChannelSetIndex *
              this.state.showChannelsAtSameTime
          );
          let max =
            this.state.currentChannelSetIndex == 0
              ? this.state.showChannelsAtSameTime
              : Math.floor(
                  this.state.currentChannelSetIndex *
                    this.state.showChannelsAtSameTime +
                    this.state.showChannelsAtSameTime
                );
          if (Config.bDebug) {
            console.log("min");
            console.log(min);
            console.log("max");
            console.log(max);
          }
          if (min < 0) min = 0;
          else if (min > all_channels.length) {
            min = all_channels.length;
            bAllChannels = true;
          }

          if (max > all_channels.length) max = all_channels.length;

          if (!bAllChannels) {
            let i;
            let newChannelSet = [];
            for (i = min; i < max; i++) {
              newChannelSet.push(all_channels[i]);
            }

            headers = newChannelSet.map((jsonchannel, i) => {
              return jsonchannel.title;
            });
            channels = newChannelSet.map((jsonchannel, i) => {
              return (
                <AmppariChannel
                  id={i}
                  data={jsonchannel}
                  showSearch={
                    this.state.bSearchButtonClicked &&
                    this.state.textSearch != null
                  }
                  selectedtyyppi={this.state.selectedtyyppi}
                  getPOfIndex={this.getPOfIndex}
                  oldProgram={this.oldProgram}
                  currenttime={currenttime}
                  bshowdcurrentprograms={this.state.bshowdcurrentprograms}
                  themevalue={this.state.themevalue}
                  displayAllDescriptions={this.state.bDisplayAllDescriptions}
                />
              );
            });
          }
        } else {
          bAllChannels = true;
        }

        if (bAllChannels) {
          headers = all_channels.map((jsonchannel, i) => {
            return jsonchannel.title;
          });
          channels = all_channels.map((jsonchannel, i) => {
            return (
              <AmppariChannel
                id={i}
                data={jsonchannel}
                showSearch={
                  this.state.bSearchButtonClicked &&
                  this.state.textSearch != null
                }
                selectedtyyppi={this.state.selectedtyyppi}
                getPOfIndex={this.getPOfIndex}
                oldProgram={this.oldProgram}
                currenttime={currenttime}
                themevalue={
                  props.themevalue ? props.themevalue : this.state.themevalue
                }
                bshowdcurrentprograms={this.state.bshowdcurrentprograms}
                displayAllDescriptions={this.state.bDisplayAllDescriptions}
              />
            );
          });
        }
      }
    }

    /*
		if (this.state.selectedsuodattimet != 'kaikki')
		{
			if (this.state.selectedsuodattimet === 'ilmaiset')
			{
				let chs = all_channels.filter( (s, i) =>
				{ 
				//	console.log("i");
				//	console.log(i);
					return this.getIsIlmainenChannel(s.title) 
				} );
				all_channels = chs;
			}
			else
			if (this.state.selectedsuodattimet === 'ilmaiset')
			{
				let chs = all_channels.filter( (s, i) =>
				{ 
				//	console.log("i");
				//	console.log(i);
					return this.getIsMaksullinenChannel(s.title) 
				} );
				all_channels = chs;
			}			
		}
		*/

    /*
		let bAllChannels = false;
		if (this.state.bSearchButtonClicked)
		{
			if (all_channels == null)
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

				let search_channels = all_channels;
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
					index = chcoopy.title.toUpperCase().indexOf(uppersearchText);
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
						prcopy = null;
						index = pr.title.toString().toUpperCase().indexOf(uppersearchText);
						if (index != -1)
						{
							if (prcopy == null)
							{
								prcopy = {};
								Object.assign(prcopy, pr);
							}
							prcopy.titleindex = index;

							founded = true;
							progfounded = true;
							if (Config.bDebug)
							{
								console.log("founded program title");
								console.log(prcopy);
							}		
						}
						index = pr.description.toString().toUpperCase().indexOf(uppersearchText);
						if (index != -1)
						{
							if (prcopy == null)
							{
								prcopy = {};
								Object.assign(prcopy, pr);
							}
							prcopy.descriptionindex = index;
							founded = true;

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

				if (foundedChannels == null && foundedChannels.length == 0)
				{
					headers = [];
					channels = [];	
				}
				else
				{

					headers = foundedChannels.map((jsonchannel, i) => {
						return jsonchannel.title
					});
					channels = foundedChannels.map((jsonchannel, i) => {
						return <AmppariChannel id={i} data={jsonchannel}
								showSearch={true}
								getPOfIndex={this.getPOfIndex}
								selectedtyyppi={this.state.selectedtyyppi}
								displayAllDescriptions=
								      {this.state.bDisplayAllDescriptions} 
								/>;
					});		
				}
			}
			else
			{
				headers = all_channels.map((jsonchannel, i) => {
					return jsonchannel.title
				});
				channels = all_channels.map((jsonchannel, i) => {
					return <AmppariChannel id={i} data={jsonchannel}
							showSearch={false}
							selectedtyyppi={this.state.selectedtyyppi}
							displayAllDescriptions={this.state.bDisplayAllDescriptions} />;
				});	
			}
		}
		else
		if (this.state.bCheckShowChannelsAtSameTime
			&& this.state.selectedchannelindex != -1)
		{			
			console.log("filter");
			let selectedTitle = all_channels[this.state.selectedchannelindex].title;
			let filteredchannels = all_channels.filter( (s, i) =>
			{ 
			//	console.log("i");
			//	console.log(i);
				return s.title === selectedTitle 
			} );
//				console.log("filteredchannels");
//				console.log(filteredchannels);
			headers = filteredchannels.map((jsonchannel, i) => {
				return jsonchannel.title
				});
			channels = filteredchannels.map((jsonchannel, i) => {
				return <AmppariChannel id={i} data={jsonchannel}
						showSearch={false}
						selectedtyyppi={this.state.selectedtyyppi}
						displayAllDescriptions={this.state.bDisplayAllDescriptions} />;
			});
		}
		else
		{
			if (this.state.showChannelsAtSameTime == all_channels.length
			   || this.state.showChannelsAtSameTime > all_channels.length)
			{
				headers = all_channels.map((jsonchannel, i) => {
					return jsonchannel.title
				});
				channels = all_channels.map((jsonchannel, i) => {
					return <AmppariChannel id={i} data={jsonchannel}
							showSearch={false}
							selectedtyyppi={this.state.selectedtyyppi}
							displayAllDescriptions={this.state.bDisplayAllDescriptions} />;
				});
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
							return jsonchannel.title
						});
						channels = newChannelSet.map((jsonchannel, i) => {
							return <AmppariChannel id={i} data={jsonchannel}
									showSearch={false}
									selectedtyyppi={this.state.selectedtyyppi}
									displayAllDescriptions={this.state.bDisplayAllDescriptions} />;
						});
					}
				}
				else
				{
					bAllChannels = true;
				}
				
				if (bAllChannels)
				{
					headers = all_channels.map((jsonchannel, i) => {
						return jsonchannel.title
					});
					channels = all_channels.map((jsonchannel, i) => {
						return <AmppariChannel id={i} data={jsonchannel}
								showSearch={false}
								selectedtyyppi={this.state.selectedtyyppi}
								displayAllDescriptions={this.state.bDisplayAllDescriptions} />;
					});
				}

			}
		}
		*/

    /*
				let divided = this.state.channels.size() % this.state.showChannelsAtSameTime:						
				if (Config.bDebug)
				{
					console.log("divided");
					console.log(divided);
				}
				*/

    let ret = {};
    ret.headers = headers;
    ret.channels = channels;
    return ret;
  };

  textFieldChannelsAtSameTimeChanged = (event) => {
    event.preventDefault();
    let value = event.target.value;
    if (Config.bDebug) {
      console.log("textFieldChannelsAtSameTimeChanged");
      console.log(value);
    }
    let validNumber = parseInt(value);
    if (Config.bDebug) {
      console.log("validNumber");
      console.log(validNumber);
    }
    if (validNumber == NaN || validNumber == undefined) {
      event.target.value = this.const_showChannelsAtSameTime;
      return;
    } else if (parseInt(validNumber) < 1) {
      event.target.value = 1;
      return;
    } else if (parseInt(validNumber) > this.const_showChannelsAtSameTime) {
      event.target.value = this.const_showChannelsAtSameTime;
      return;
    }
    this.setState({
      showChannelsAtSameTime: validNumber,
      currentChannelSetIndex: 0,
    });
  };

  textFieldSearchChanged = (event) => {
    event.preventDefault();
    const value = event.target.value;
    if (Config.bDebug) {
      console.log("textFieldSearchChanged");
      console.log(value);
    }
    this.filterWhenUIControlsHasBeenChanged(filtercalled.SEARCHCHANE, value);
  };

  searchTextFromChannelsClicked = () => {
    event.preventDefault();
    if (Config.bDebug) {
      console.log("searchTextFromChannelsClicked");
    }
    const searchText = this.textSearch;
    if (Config.bDebug) {
      console.log("searchText 2 ");
      console.log(searchText);
    }
    if (
      searchText == undefined ||
      searchText == null ||
      searchText.trim().length == 0
    )
      return;
    // to start make indirect the search:
    if (Config.bDebug) {
      console.log("searchTextFromChannelsClicked 2 ");
    }
    let value = this.showAllDescrRef.current.value;
    if (!value) this.showAllDescrRef.current.value = true;

    this.filterWhenUIControlsHasBeenChanged(filtercalled.MAKESEARCH, true);
    this.setState({
      bSearchButtonClicked: true,
      bDisplayAllDescriptions: true,
      channels: this.channels,
    });
    this.forceUpdate();
  };

  getMovieOrSportChannels = (selected) => {
    const fitems = this.channeltypeitems;
    if (fitems == null) return null;
    if (selected == undefined || selected == null) return null;
    let ret = null;
    let foundmovies = selected === "elokuvat";
    let foundsport = selected === "urheilu";
    let chcoopy, foundedPrograms, progfounded;
    let foundedChannels = [];

    Array.from(fitems).forEach((cha) => {
      if (cha === undefined) return;
      chcoopy = {};
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
      foundedPrograms = [];
      progfounded = false;

      let prcopy = null;
      Array.from(chcoopy.channelprograms).forEach((pr) => {
        // cha.channelprograms.forEach(pr, i => {
        if (foundmovies && pr.movie) {
          progfounded = true;
          foundedPrograms.push(pr);
        } else if (foundsport && pr.sport) {
          progfounded = true;
          foundedPrograms.push(pr);
        }
      });

      if (progfounded) {
        if (foundedPrograms != null && foundedPrograms.length != 0) {
          chcoopy.channelprograms = foundedPrograms;
          foundedChannels.push(chcoopy);
        }
      }
    });

    return foundedChannels;
  };

  filterFetchedItemsIntoChannelsAfterTyyppi = (selected) => {
    const fitems = this.state.fetcheditems;
    if (fitems == null) return null;
    if (selected == undefined || selected == null) return null;
    let ret = null;
    if (selected == "kaikki") ret = fitems;
    else if (selected === "elokuvat") {
      ret = this.getMovieOrSportChannels(selected);
    } else if (selected === "urheile") {
      ret = this.getMovieOrSportChannels(selected);
    }
    return ret;
  };

  filterFetchedItemsIntoChannelsAfterSuodin = (selected) => {
    const fitems = this.state.fetcheditems;
    if (fitems == null) return null;
    if (selected == undefined || selected == null) return null;
    let ret = null;
    if (selected == "kaikki") ret = fitems;
    else if (selected === "ilmaiset") {
      ret = fitems.filter((s, i) => {
        //	console.log("i");
        //	console.log(i);
        return s.pay === false;
      });
    } else if (selected === "maksulliset") {
      ret = fitems.filter((s, i) => {
        //	console.log("i");
        //	console.log(i);
        return s.pay === true;
      });
    }
    return ret;
  };

  filterChannesAfterChannelPay = (channeltype) => {
    //  filterChannesAfterChannelPay takes items from fetcheditems and populates: channeltypeitems,
    let ind = null;
    let selected = null;
    let chtype = null;

    // const fitems = this.state.fetcheditems;
    const fitems = this.fetcheditems;

    if (Config.bDebug) {
      console.log("filterChannesAfterChannelPay");
      console.log("channeltype");
      console.log(channeltype);
      console.log("channeltype");
      console.log(channeltype);
      console.log("fitems");
      console.log(fitems);
      console.log("fitems.size");
      console.log(fitems.length);
    }
    if (channeltype !== undefined) {
      ind = channeltype.ind;
      selected = channeltype.selected;
      chtype = channeltype.channeltype;
    } else {
      selected = this.state.selectedsuodattimet;
      ind = this.state.selectedsuodatinindex;
    }

    if (Config.bDebug) {
      console.log("filterChannesAfterChannelPay 2");
      console.log("ind");
      console.log(ind);
      console.log("selected");
      console.log(selected);
    }

    let chls = null;
    if (fitems == null) chls = null;
    else if (selected == undefined || selected == null) chls = fitems;
    else {
      if (selected == "kaikki") chls = fitems;
      else {
        let ret = null;
        if (selected === "ilmaiset") {
          ret = fitems.filter((s, i) => {
            //	console.log("i");
            //	console.log(i);
            return s.pay === false;
          });
        } else if (selected === "maksulliset") {
          ret = fitems.filter((s, i) => {
            //	console.log("i");
            //	console.log(i);
            return s.pay === true;
          });
        }
        chls = ret;
      }
    }

    if (Config.bDebug) {
      console.log("chls 2");
      console.log(chls);
    }

    let bChange = false;
    let value = this.showOneChannelRef.current.checked;
    if (value) {
      this.showOneChannelRef.current.checked = false;
      bChange = true;
    }

    if (Config.bDebug) {
      console.log("bChange 2");
      console.log(bChange);
      console.log("chls - channeltypeitems");
      console.log(chls);
      console.log("channeltypeitems.size");
      console.log(chls.length);
    }

    this.channeltypeitems = chls;

    // let chls = this.filterFetchedItemsIntoChannelsAfterSuodin(chtype);
    /*
		if (!bChange)
		this.setState({
			selectedsuodatinindex: ind,	
			selectedsuodattimet: selected,
			channeltypeitems: chls
		});
		else
		this.setState({
			selectedsuodatinindex: ind,	
			selectedsuodattimet: selected,
			channeltypeitems: chls,
			bCheckShowChannelsAtSameTime: true
		});
		*/

    if (Config.bDebug) {
      console.log("filterChannesAfterChannelPay 3");
      console.log(this.state);
    }
  };

  filterAfterProgramType = (change) => {
    // if change parameter is undefined, then take value from state!
    // filterAfterProgramType takes items from channeltypeitems and populates: programtypeitems
    //         and/or channels if there is no search,

    let ind = null;
    let mychange = null;
    if (change == undefined) mychange = this.state.selectedtyyppi;
    else {
      ind = change.ind;
      mychange = change.selected;
    }

    // const fitems = this.state.channeltypeitems;
    const fitems = this.channeltypeitems;
    if (Config.bDebug) {
      console.log("filterAfterProgramType channeltypeitems");
      console.log(this.channeltypeitems);
      console.log("channeltypeitems.length");
      console.log(fitems.length);
    }

    let items = fitems;
    if (mychange == "kaikki") items = fitems;
    else if (mychange === "elokuvat") {
      items = this.getMovieOrSportChannels(mychange);
    } else if (mychange === "urheilu") {
      items = this.getMovieOrSportChannels(mychange);
    }

    this.programtypeitems = items;
    this.channels = items;
    if (Config.bDebug) {
      console.log("programtypeitems");
      console.log(this.programtypeitems);
      console.log("programtypeitems.length");
      console.log(this.programtypeitems.length);
    }
    /*		
		if (change !== undefined)
			this.setState({ programtypeitems: items,
				selectedTyyppiinindex: ind,
				selectedtyyppi: selected
				});
		else
			this.setState({ programtypeitems: items	});
			*/

    // { fetcheditems: data, channels: data,
    //	bUnderFetch: false, selectedsuodattimet: 'kaikki',
    //		selectedtyyppi: 'kaikki', selectedTyyppiinindex: 0,
    //		selectedsuodatinindex: 0 }
  };

  makeSearchChange = (change) => {
    const bSearch = this.state.bSearchButtonClicked;
    if (
      /* bSearch && */ change === undefined ||
      change === null ||
      change.toString().trim().length == 0
    ) {
      this.textSearch = null;
      this.channels = this.programtypeitems;
      this.setState({ textSearch: null, bSearchButtonClicked: false });
      // this.filterAfterSearch();
      /*
			this.setState({ textSearch: change, 
				bSearchButtonClicked: false});
			*/
    } else this.textSearch = change;
    //			this.setState({ textSearch: change});
    // this.setState({ textSearch: change,
    //	bSearchButtonClicked: false})
  };

  filterAfterSearch = (change) => {
    // if change parameter is undefined, then take value from state!
    // filterAfterSearch takes items from programtypeitems and populates: channels if there is a
    // ongoing search.
    let mychange = null;
    if (change == undefined) mychange = this.state.bSearchButtonClicked;
    else {
      mychange = change;
    }

    let bAllChannels = false;
    let foundedChannels = [];
    let foundedPrograms = [];

    if (Config.bDebug) {
      console.log("filterAfterSearch mychange");
      console.log(mychange);
    }

    this.channels = this.state.programtypeitems;
    if (mychange !== undefined || mychange !== null || mychange) {
      let all_channels = this.channels;
      //let all_channels = this.channels;
      if (Config.bDebug) {
        console.log("all_channels");
        console.log(all_channels);
        console.log("all_channels.length");
        console.log(all_channels.length);
      }

      if (all_channels == null) {
        // this.setState({ bSearchButtonClicked: false, channels: null});
      } else {
        // const searchText = this.state.textSearch;
        const searchText = this.textSearch;
        if (Config.bDebug) {
          console.log("searchText");
          console.log(searchText);
        }
        if (searchText == null || searchText.toString().trim().length == 0) {
          //					this.setState({ bSearchButtonClicked: false,
          //						channels: all_channels});
        } else {
          let foundedChannelsTitle = null;
          let index = -1;
          let founded = false;
          let progfounded = false;
          let uppersearchText = searchText.toUpperCase();
          let chcoopy = {};

          let selectedchannelindex = this.state.selectedchannelindex;
          if (
            this.state.bCheckShowChannelsAtSameTime &&
            selectedchannelindex > -1
          ) {
            const onech = all_channels[selectedchannelindex];
            if (onech) {
              all_channels = [];
              all_channels.push(onech);
              this.setState({
                /* this makes a smaill bug: selectedchannelindex: 0, */
                currentChannelSetIndex: 0,
              });
              selectedchannelindex = 0;
            }
          }

          let search_channels = all_channels;
          if (
            this.state.bCheckShowChannelsAtSameTime &&
            selectedchannelindex != -1
          ) {
            console.log("filter search bCheckShowChannelsAtSameTime");
            let selectedTitle = search_channels[selectedchannelindex].title;
            let filteredchannels = search_channels.filter((s, i) => {
              //	console.log("i");
              //	console.log(i);
              return s.title === selectedTitle;
            });
            search_channels = filteredchannels;
          }

          if (Config.bDebug) {
            console.log("search_channels");
            console.log(search_channels);
          }

          Array.from(search_channels).forEach((cha) => {
            if (cha === undefined) return;
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
            index = chcoopy.title.toUpperCase().indexOf(uppersearchText);
            if (index != -1) {
              chcoopy.titleindex = index;
              founded = true;
              if (Config.bDebug) {
                console.log("founded channel title chcoopy");
                console.log(chcoopy);
              }
            }
            foundedPrograms = [];

            let prcopy = null;
            Array.from(chcoopy.channelprograms).forEach((pr) => {
              if (pr === undefined) return;
              // cha.channelprograms.forEach(pr, i => {
              progfounded = false;
              prcopy = {};
              Object.assign(prcopy, pr);
              index = prcopy.title
                ? prcopy.title.toString().toUpperCase().indexOf(uppersearchText)
                : -1;
              if (index != -1) {
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
                if (Config.bDebug) {
                  console.log("founded program title");
                  console.log(prcopy);
                }
              }
              index = prcopy.description
                ? prcopy.description
                    .toString()
                    .toUpperCase()
                    .indexOf(uppersearchText)
                : -1;
              if (index != -1) {
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
                if (Config.bDebug) {
                  console.log("founded program description");
                  console.log(prcopy);
                }
              }
              if (progfounded) foundedPrograms.push(prcopy);
            });

            if (founded) {
              if (foundedPrograms != null && foundedPrograms.length != 0)
                chcoopy.channelprograms = foundedPrograms;
              else chcoopy.channelprograms = cha.channelprograms;
              foundedChannels.push(chcoopy);
            }
          });

          if (foundedChannels == null || foundedChannels.length == 0) {
            // if (change == undefined)
            // this.setState({ bSearchButtonClicked: false,
            //	channels: null});
            this.channels = null;
          } else {
            if (Config.bDebug) {
              console.log("foundedChannels");
              console.log(this.programtypeitems);
              console.log("foundedChannels.length");
              console.log(foundedChannels.length);
            }
            /*
						this.setState({ bSearchButtonClicked: true, 
							channels: foundedChannels});
							*/
            this.channels = foundedChannels;
          }
        }
      }
    } else {
      //			this.setState({ bSearchButtonClicked: false,
      //				channels: this.state.programtypeitems });
    }
  };

  filterWhenUIControlsHasBeenChanged = (calledfrom, change) => {
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
      case filtercalled.CHANNELTYPE:
        console.log("calledfrom.CHANNELTYPE");
        this.filterChannesAfterChannelPay(change);
        this.filterAfterProgramType();
        //	this.filterAfterSearch(); // possible a search call
        break;
      case filtercalled.PROGRAMTYPE:
        this.filterAfterProgramType(change);
        //	this.filterAfterSearch(); // possible a search call
        break;
      case filtercalled.SEARCHCHANE:
        // only a search data change or if null or empty set 'bSearch' false:
        this.makeSearchChange(change);
        break;
      case filtercalled.MAKESEARCH:
        this.filterAfterSearch(change); // search button pressed!
        break;
    }
    //	this.setState({ channels: this.channels });
  };

  setDisplayAllDescriptionsTrue = (textSearch) => {
    let value = this.showAllDescrRef.current.checked;
    if (!value) this.showAllDescrRef.current.checked = true;
    /*
		this.setState({ bDisplayAllDescriptions: true, 
			bSearchButtonClicked: textSearch !== undefined || textSearch !== null 
			|| textSearch.trim().length !== 0 ? true : false,
			textSearch: textSearch !== undefined || textSearch !== null 
			|| textSearch.trim().length !== 0 ? textSearch : null });
		console.log("setDisplayAllDescriptionsTrue");
		console.log(this.state);
		*/
  };

  getCurrentColumnIndex = (path) => {
    if (path === undefined || path === null || path.length === 0) return null;

    if (Config.bDebug) {
      console.log("path");
      console.log(path);
    }

    let ret = -1;
    let i = 0,
      max = path.length;
    let value, str;
    const search = "tablecol";
    for (i = 0; i < max; i++) {
      // value = path[i].localName;
      value = path[i];
      str = value.id.toString();

      if (str && str.includes(search)) {
        let ind = str.indexOf(search);
        let strNum = str.substring(ind + search.length);
        ret = parseInt(strNum);
        break;
      }
    }
    return ret;
  };

  getH3OfCurrentColumn = (path) => {
    if (path === undefined || path === null || path.length === 0) return null;
    if (Config.bDebug) {
      console.log("path");
      console.log(path);
    }

    let ret = -1;
    let i = 0,
      max = path.length;
    let value, str;
    const search = "tablecol";
    for (i = 0; i < max; i++) {
      // value = path[i].localName;
      value = path[i];
      str = value.id.toString();
      if (str && str.includes(search)) {
        let ind = str.indexOf(search);
        let strNum = str.substring(ind + search.length);
        let ind2 = parseInt(strNum);
        ret = value.childNodes[0];
        if (ret) {
          let ret2 = ret.childNodes[0];
          if (ret2) ret = ret2;
        }
        break;
      }
    }
    return ret;
  };

  getNextColumn = (cols, currentColInd) => {
    let ret = null;
    if (cols && currentColInd !== undefined && currentColInd !== null) {
      if (cols[currentColInd + 1]) ret = cols[currentColInd + 1];
    }
    return ret;
  };

  getPrevColumn = (cols, currentColInd) => {
    let ret = null;
    if (cols && currentColInd) {
      if (cols[currentColInd - 1]) ret = cols[currentColInd - 1];
    }
    return ret;
  };

  altPlusKeyUp = (e) => {
    e = e || window.event;
    let keyCode = e.keyCode || e.which,
      arrow = { left: 37, up: 38, right: 39, down: 40 };
    if (Config.bDebug) console.log("pressed");
    if (e.shiftKey || e.altKey) {
      if (Config.bDebug) {
        console.log("control key");
        console.log("e.altKey");
        console.log(e.altKey);
        console.log("e.shiftKey");
        console.log(e.shiftKey);
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
      const currentCol = row.closest("td");
      if (Config.bDebug) {
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
          if (divInsideOfCol) {
            divInsideOfCol.focus();
          }
          break;

        case "k":
          //... handle alt+k
          currentColInd = this.getCurrentColumnIndex(e.path);
          if (currentColInd > 0) {
            const prevcol = this.getPrevColumn(cols, currentColInd);
            if (prevcol) {
              prevcol.focus();
            }
          }
          break;

        case "s":
          //... handle alt+s
          currentColInd = this.getCurrentColumnIndex(e.path);
          if (currentColInd !== -1 && currentColInd < lenCols - 1) {
            const nextcol = this.getNextColumn(cols, currentColInd);
            // const nextcol = getH3OfCurrentColumn(e.path);
            // document.getElementById("tablecol" +(currentColInd+1)).focus();
            if (nextcol) {
              if (Config.bDebug) {
                console.log("nextcol");
                console.log(nextcol);
              }
              nextcol.focus();
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
  };

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
    this.setState({
      bshowdcurrentprograms: bValue,
      /* bSearchButtonClicked: false */
    });
  };

  altPlusKeyUpProgramHeader = (e) => {
    e = e || window.event;
    let keyCode = e.keyCode || e.which,
      arrow = { left: 37, up: 38, right: 39, down: 40 };
    if (Config.bDebug) console.log("pressed");
    if (e.altKey) {
      if (Config.bDebug) {
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
          if (document.getElementById("idprogramtableh3")) {
            let divh3 = document.getElementById("idprogramtableh3");
            if (divh3) divh3.focus();
          }
          break;
      }
    }
  };

  getSectionWidthCss = () => {
    return "width: " + this.section_width + "px;";
  };

  render(props, state) {
    if (Config.bDebug) {
      console.log("state");
      console.log(state);
    }

    let sectionwidth = "";
    if (state.fetcheditems != null && state.fetcheditems.length > 0) {
      sectionwidth = this.getSectionWidthCss();
    }

    const buttonFocusStyle =
      props.themevalue !== undefined && props.themevalue !== ""
        ? " outline: 15px solid white;"
        : " outline: 15px solid black;";

    const inputw =
      "float: none; display: inline-block; vertical-align: middle; ";
    const buttoninputw =
      "float: none; display: inline-block; vertical-align: middle; " +
      (props.themevalue !== undefined && props.themevalue !== ""
        ? ""
        : " color: white; ");

    let divDialogStyle =
      props.themevalue !== undefined && props.themevalue !== ""
        ? "color: #FFF; background-color: black; border-color: #FFF;"
        : "";
    const storestate = this.store.getState();
    let tableBorderStyle = "";
    let table_border_color = "black";
    if (state.bShowTableBorder) {
      tableBorderStyle = " border: 1px solid " + table_border_color + ";";

      if (props.themevalue === "--dark") {
        table_border_color = "white";
        tableBorderStyle = " border: 1px solid " + table_border_color + ";";
      }
    }
    // suodatus=ilmaiset,maksulliset,kaikki
    // 	return <Select.Item id={i} >{child}</Select.Item>
    let selectchanneltypes = this.arr_selectchanneltypes.map((child, i) => {
      return (
        <option value={child} id={i}>
          {child}
        </option>
      );
    });

    // tyyppi=kaikki,urheilu,elokuvat
    // 	return <Select.Item id={i}>{child}</Select.Item>
    let selecttyyppi_items = this.arr_selecttyyppi_items.map((child, i) => {
      return (
        <option value={child} id={i}>
          {child}
        </option>
      );
    });

    let headers = null;
    let channels = null;
    /*
		if (state.fetcheditems != null)
		{
			headers = this.getTableHeaders();
			channels = this.getTableRows();	
		}
		*/

    let selectchannels = null;
    let selectedchannelindex = state.selectedchannelindex;
    if (selectedchannelindex < 0) selectedchannelindex = 0;
    else if (state.ddd) selectedchannelindex = 0;

    let tableheaders = null;
    let tabletds = null;
    if (state.channels !== null) {
      // selected={child.title.fi===state.selectedcategory.title.fi}
      // 	return <Select.Item id={i} selected={i===selectedchannelindex}
      //	>{child.title}</Select.Item>
      selectchannels = state.channels.map((child, i) => {
        return (
          <option
            selected={i === selectedchannelindex}
            value={child.title}
            id={i}
          >
            {child.title}
          </option>
        );
      });
      let tableheaders_and_rows =
        this.getTableHeadersAndTableRowsAfterChannels();
      headers = tableheaders_and_rows.headers;
      /*
			if (headers != null)
				tableheaders = headers.map((child, i) => {
					return <th style={'vertical-align: top; padding-left: 5px; padding-right: 5px; ' +tableBorderStyle}>{child}</th> 				
				});
				*/
      channels = tableheaders_and_rows.channels;
      if (channels != null && channels.length > 0)
        tabletds = channels.map((child, i) => {
          return (
            <td
              tabIndex="0"
              id={"tablecol" + i}
              lang="fi"
              style={
                "vertical-align: top; padding-left: 5px; padding-right: 5px;" +
                tableBorderStyle
              }
            >
              {child}
            </td>
          );
        });
    }

    if (channels != null) {
      if (tableheaders != null) console.log(tableheaders.length);
      if (tabletds != null) console.log(tabletds.length);
    }
    /*
		if (state.channels != null)
		{
			headers = this.state.channels.map((jsonchannel, i) => {
				return <th>{jsonchannel.title}</th>
			});
			channels = this.state.channels.map((jsonchannel, i) => {
				return <AmppariChannel id={i} data={jsonchannel}
					displayAllDescriptions={this.state.bDisplayAllDescriptions} />;
			});
		}
		*/

    /*
		  let msgdiv = null;
		  if ((state.errmsg != null))
	          msgdiv = <p className={"p" +cssDark} tabIndex="0" style={style.political_p} aria-label={state.errmsg}></p>;
		*/

    return (
      <Fragment>
        <div
          id="amppari_main_div"
          style={
            " min-height: 100%; margin: 0px; height: 100%: " + divDialogStyle
          }
        >
          <div
            class={style.cardHeader + divDialogStyle}
            onKeyUp={this.altPlusKeyUpProgramHeader}
          >
            <h1 tabIndex="0" lang="fi">
              Amppari {this.getFetchedDate()}
            </h1>
            <section
              ref={this.sectionRef}
              style={
                this.state.themevalue === "" ? sectionwidth : this.sectionStyle
              }
            >
              <div class={style.cardHeader}>
                <div lang="fi" tabIndex="0">
                  Hae tv-ohjelmatiedot alimpaan taulukkoon alla olevan
                  päivämäärän mukaan:
                </div>
                <div class={style.cardHeader}>
                  <a
                    lang="fi"
                    href="."
                    id={"dayname_" + this.getPlus1DayId(0)}
                    onClick={this.onClickSetDateString}
                  >
                    {this.getPlus1Day(0)}
                  </a>
                  <space> </space>
                  <a
                    lang="fi"
                    href="."
                    id={"dayname_" + this.getPlus1DayId(1)}
                    onClick={this.onClickSetDateString}
                  >
                    {this.getPlus1Day(1)}
                  </a>
                  <space> </space>
                  <a
                    lang="fi"
                    href="."
                    id={"dayname_" + this.getPlus1DayId(2)}
                    onClick={this.onClickSetDateString}
                  >
                    {this.getPlus1Day(2)}
                  </a>
                  <space> </space>
                  <a
                    lang="fi"
                    href="."
                    id={"dayname_" + this.getPlus1DayId(3)}
                    onClick={this.onClickSetDateString}
                  >
                    {this.getPlus1Day(3)}
                  </a>
                  <space> </space>
                  <a
                    lang="fi"
                    href="."
                    id={"dayname_" + this.getPlus1DayId(4)}
                    onClick={this.onClickSetDateString}
                  >
                    {this.getPlus1Day(4)}
                  </a>
                  <space> </space>
                  <a
                    lang="fi"
                    href="."
                    id={"dayname_" + this.getPlus1DayId(5)}
                    onClick={this.onClickSetDateString}
                  >
                    {this.getPlus1Day(5)}
                  </a>
                  <space> </space>
                  <a
                    lang="fi"
                    href="."
                    id={"dayname_" + this.getPlus1DayId(6)}
                    onClick={this.onClickSetDateString}
                  >
                    {this.getPlus1Day(6)}
                  </a>
                  <space> </space>
                  <a
                    lang="fi"
                    href="."
                    id={"dayname_" + this.getPlus1DayId(7)}
                    onClick={this.onClickSetDateString}
                  >
                    {this.getPlus1Day(7)}
                  </a>
                  <space> </space>
                  <a
                    lang="fi"
                    href="."
                    id={"dayname_" + this.getPlus1DayId(8)}
                    onClick={this.onClickSetDateString}
                  >
                    {this.getPlus1Day(8)}
                  </a>
                  <space> </space>
                  <a
                    lang="fi"
                    href="."
                    id={"dayname_" + this.getPlus1DayId(9)}
                    onClick={this.onClickSetDateString}
                  >
                    {this.getPlus1Day(9)}
                  </a>
                </div>
              </div>
            </section>

            <section
              ref={this.sectionRef}
              style={
                this.state.themevalue === "" ? sectionwidth : this.sectionStyle
              }
            >
              <div>
                <div
                  lang="fi"
                  tabIndex="0"
                  aria-labelled="Miten ohjelmatiedot näytetään"
                >
                  <div style={{ "background-color": "red", color: "yellow" }}>
                    {state.errmsg}
                  </div>
                  <div class=" mdc-typography--caption">
                    Miten ohjelmatiedot näytetään:
                  </div>
                </div>
                <br />
                <span>
                  <Button
                    lang="fi"
                    ripple
                    raised
                    disabled={
                      state.channels == null ||
                      (state.showChannelsAtSameTime == 1 &&
                        state.bCheckShowChannelsAtSameTime) ||
                      state.showChannelsAtSameTime >= state.channels.length
                    }
                    style={buttoninputw}
                    text="&lt;"
                    onClick={this.prevChannelSetClicked}
                    aria-label="Aikaisemmat kanavat"
                  ></Button>
                </span>
                <space> </space>
                <span>
                  <Button
                    lang="fi"
                    ripple
                    raised
                    aria-label="Seuraavat kanavat"
                    disabled={
                      state.channels == null ||
                      (state.showChannelsAtSameTime == 1 &&
                        state.bCheckShowChannelsAtSameTime) ||
                      state.showChannelsAtSameTime >= state.channels.length
                    }
                    style={buttoninputw}
                    text="&gt;"
                    onClick={this.nextChannelSetClicked}
                  ></Button>
                </span>

                <span>
                  <SwitchCheckbox
                    lang="fi"
                    inputid="checkshowdcurrentprograms"
                    labeltext="Näytä par'aikaa ja myöhemmät esitettävät"
                    checked={state.bshowdcurrentprograms}
                    onChange={this.showdcurrentprograms}
                    style={inputw}
                    propref={this.checkshowdcurrentprogramsRef}
                  />
                </span>
                <span>
                  <SwitchCheckbox
                    onChange={this.showAllDescriptions}
                    propref={this.showAllDescrRef}
                    inputid="checkshowdescribtions"
                    style={inputw}
                    labeltext="Näytä selitykset"
                    checked={state.bDisplayAllDescriptions}
                  />
                </span>
                <span>
                  <SwitchCheckbox
                    onChange={this.showOneChannel}
                    propref={this.showOneChannelRef}
                    inputid="checkshowonechannel"
                    style={inputw}
                    labeltext="Näytä yksi kanava:"
                    checked={state.bCheckShowChannelsAtSameTime}
                  />
                  <select
                    tabIndex="0"
                    lang="fi"
                    selectedIndex={selectedchannelindex}
                    disabled={!state.bCheckShowChannelsAtSameTime}
                    preselected
                    outlined
                    ref={this.selectChannelRef}
                    style={inputw}
                    onChange={(e) => {
                      this.setState({
                        selectedchannelindex: e.target.selectedIndex,
                        bSearchButtonClicked: false,
                      });
                    }}
                  >
                    {selectchannels}
                  </select>
                </span>
                <space> </space>
                <span>
                  <label for="input_number_columss" lang="fi" style={inputw}>
                    Näytettävien kanavien lkm:{" "}
                  </label>
                  <input
                    id="input_number_columss"
                    lang="fi"
                    name="input_number_columns"
                    disabled={this.state.bCheckShowChannelsAtSameTime}
                    type="number"
                    min="1"
                    max="10"
                    style={inputw}
                    value={
                      this.state.showChannelsAtSameTime === -1
                        ? ""
                        : this.state.showChannelsAtSameTime
                    }
                    onKeyUp={this.textFieldChannelsAtSameTimeChanged}
                  />
                </span>
                <space> </space>
                <SearchPrograms
                  disabled={
                    state.fetcheditems == null || state.fetcheditems.length == 0
                  }
                  setDisplayAllDescriptionsTrue={
                    this.setDisplayAllDescriptionsTrue
                  }
                  store={this.store}
                  setRemoverFunction={this.setRemoverFunction}
                  ref={this.searchProgramRef}
                />
                <space> </space>
                <span>
                  <SwitchCheckbox
                    onChange={this.showTableBorders}
                    propref={this.showTableBordersRef}
                    lang="fi"
                    inputid="checkTableBorders"
                    style={inputw}
                    labeltext="Näytä taulun raamit"
                    checked={state.bShowTableBorder}
                  />
                </span>
                <ProgramTypes
                  disabled={
                    state.fetcheditems == null || state.fetcheditems.length == 0
                  }
                  store={this.store}
                  ref={this.programTypeRef}
                  setRemoverFunction={this.setRemoverFunction}
                  bshowdcurrentprograms={props.bshowdcurrentprograms}
                />
                <ChannelTypes
                  disabled={
                    state.fetcheditems == null || state.fetcheditems.length == 0
                  }
                  store={this.store}
                  ref={this.channelTypeRef}
                  setRemoverFunction={this.setRemoverFunction}
                />
              </div>
            </section>
            <section
              ref={this.sectionRef}
              style={
                this.state.themevalue === "" ? sectionwidth : this.sectionStyle
              }
            >
              {" "}
              <div>
                <div style={{ "background-color": "red", color: "yellow" }}>
                  {state.errmsg}
                </div>
                <div class=" mdc-typography--caption">
                  <h3 id="idprogramtableh3" lang="fi" tabIndex="0">
                    Ohjelmataulukko
                  </h3>
                  <div class={style.cardHeader}>
                    <h3 lang="fi" tabIndex="0">
                      -- Ohjelmataulukko, liikutaan hiirellä tai taulukon
                      sisällä seuraavilla näppäimillä: alt+s = seuraava kanava,
                      alt+k = edellinen kanava sekä alt+o = kanavan ohjelmiin,
                      otsakkeeseen. Ohjelman kuvailun saa näkymään tab
                      näppäimellä ja enterillä tai hiirenklikkauksella. Taulukon
                      sisällä toimivat myös tab sekä shift-tab näppäimet.
                      Taulukon yläpuolelle tekstin "Ohjelmataulukko" kohdalle
                      pääsee komennolla alt+t.
                    </h3>
                  </div>
                  {state.bSearchButtonClicked && state.textSearch != null
                    ? " (haun tulokset)"
                    : ""}
                </div>
                {tabletds === null && (
                  <div
                    tabIndex="0"
                    lang="fi"
                    aria-label="Ei ohjelmatietoja haettu"
                  >
                    <br></br>
                    Ei ohjelmatietoja haettu tai tekstihakutulosta (tyhjää
                    hakutekstikenttä)
                  </div>
                )}
              </div>
            </section>
            <section
              style={this.state.themevalue === "" ? "" : this.tablesectionStyle}
            >
              <table
                id="programtable"
                style={
                  "width:100%; " +
                  tableBorderStyle +
                  (this.state.themevalue === ""
                    ? this.sectionStyle
                    : this.state.themevalue)
                }
                ref={this.tablCntl}
              >
                <tbody>
                  <tr>{tableheaders}</tr>
                  <tr>{tabletds}</tr>
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </Fragment>
    );
  }
}

/*
					<Formfield>
							<div class={style.cardHeader}>Ohjelmatyyppi<space>     </space>
							  <Select tabIndex="0" 
									selectedIndex={this.state.selectedTyyppiinindex}
									preselected outlined 
									onChange={(e)=>{
										console.log("e.target.target");
										console.log(e.target.text);
										const ind = e.target.selectedIndex;
										const selected = this.arr_selecttyyppi_items[e.target.selectedIndex];
										let changed ={};
										changed.ind = ind;
										changed.selected = selected;
										this.filterWhenUIControlsHasBeenChanged(filtercalled.PROGRAMTYPE, changed);
										this.setState({ selectedTyyppiinindex: ind,
											selectedtyyppi: selected,
											 channels: this.channels,
											 selectedchannelindex: 0
											});					

									}}>
									{selecttyyppi_items}
							</Select>
						    </div>
						</Formfield>
*/
