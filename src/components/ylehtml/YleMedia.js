import { h, Component, createRef } from "preact";
// import Card from 'preact-material-components/Card';
// import 'preact-material-components/Card/style.css';
// import 'preact-material-components/Button/style.css';
// import Select from 'preact-material-components/Select';
// import 'preact-material-components/List/style.css';
// import 'preact-material-components/Menu/style.css';
// import 'preact-material-components/Select/style.css';
import Radio from "preact-material-components/Radio";
import FormField from "preact-material-components/FormField";
import "preact-material-components/FormField/style.css";
import "preact-material-components/List/style.css";
import LayoutGrid from "preact-material-components/LayoutGrid";
import "preact-material-components/LayoutGrid/style.css";
//import 'preact-material-components/List/style.css';
//import 'preact-material-components/Menu/style.css';
import "preact-material-components/Select/style.css";
import AbortController from "abort-controller";
import style from "./style";
import Config from "../../utils/Config";
// import 'whatwg-fetch';
import { fetchJsonp, generateCallbackFunction } from "fetch-jsonp";
import dayjs from "dayjs";

// import Category from './Category';
// import GridOrList from './GridOrList';
import DayServices from "./DayServices";
//import jsonp from '../../utils/jsonp';
import store from "../../utils/store";

// import StaticFunctions from '../../unpm install axios-jsonptils/StaticFunctions';

export default class YleMedia extends Component {
  categoryfieldRef = null;
  fetch_url_audio = null;
  fetch_url_tv = null;
  abortController = null;
  abortSignal = null;

  currentservice = null;
  services = null;
  indService = -1;
  callbackName = "jsonp_callback_schedules";
  _mounted = false;

  constructor(props) {
    super(props);
    if (Config.bDebug) {
      console.log("Yle.js");
      console.log("props");
      console.log(props);
    }

    const storestate = store.getState();
    if (Config.bDebug) {
      console.log("storestate");
      console.log(storestate);
    }

    let today = new Date(Date.now());
    this.state = {
      errmsg: null,
      chosenIndex: 0,
      progsource: props.progsource,
      bShowDesciption: true,
      progtable: "rday",
      programs: null,
      currentDate: Date.now(),
      services: [],
      selecteddate: null,
      bShowTableBorder: false,
      offset: 0,
      currentservice: null,
      indService: -1,
      bSchedulesQueryReady: false,
      schedules: {},
      bSvLang: false,
      bSchedulesRead: false,
    };

    this.radioProgTableChanged = this.radioProgTableChanged.bind(this);
    //	this.fetchProgServicesData = this.fetchProgServicesData.bind(this);
    //	this.fetchSchedulesData = this.fetchSchedulesData.bind(this);

    this.categoryfieldRef = createRef();

    store.setStateNoneCallListeners({
      schedules: {},
      shedulescount: 0,
      shedulescallcount: 0,
      indService: -1,
      selecteddate: null,
    });

    this.fetch_url_audio = Config.http_curlserver + "/yleradio_opas/:";
    this.fetch_url_tv = Config.http_curlserver + "/yletv_opas/:";
  }

  componentDidMount() {
    if (Config.bDebug) console.log("componentDidMount 1");
    this.abortController = new AbortController(); // 1
    this.abortSignal = this.abortController.signal; // 2
    //	this.fetchProgSchedules(this.state.progsource);
    this._mounted = true;
  }

  componentWillUnmount() {
    this.abortController.abort();
    this.setState({});
    store.setState({
      fetchitems: [],
      channeltypeitems: [],
      programtypeitems: [],
      categories: [],
    });
    this._mounted = false;
  }

  componentWillReceiveProps(nextProps) {
    if (Config.bDebug) {
      console.log("YleMedia componentWillReceiveProps nextProps");
      console.log(nextProps);
    }

    if (nextProps !== null && nextProps.themevalue != this.props.themevalue) {
      this.setState({ themevalue: nextProps.themevalue });
      this.divDialogStyle =
        themevalue !== undefined && themevalue !== ""
          ? "color: #FFF; background-color: black; border-color: #FFF;"
          : "";
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

  getTypeParamAndValue = (progsource) => {
    let ret = "";
    let storestate = store.getState();
    let selday = storestate.selecteddate;
    let month = "" + (selday.getMonth() + 1);
    if (month.trim().length === 1) month = "0" + month;
    let day = "" + selday.getDate();
    if (day.trim().length === 1) day = "0" + day;
    ret = selday.getFullYear() + "-" + month + "-" + day;
    // ret = "" + selecteddate.getYear() +"-" +(selecteddate.getMonth() +1) +"-" +selecteddate.getDate():
    // ret = ret + plusdate.format("YYYY-MM-DD");
    return ret;
  };

  fetchProgSchedules = (progsource) => {
    //		this.fetch_url_categories = "http://localhost:8080/tvprogram/categories";

    if (!this._mounted) return;

    let fetch_url = this.fetch_url_audio;
    if (progsource == "rtv") fetch_url = this.fetch_url_tv;

    if (Config.bDebug) {
      console.log("fetchProgSchedules");
      console.log(fetch_url + this.getTypeParamAndValue(progsource));
    }

    let url = fetch_url + this.getTypeParamAndValue(progsource);
    await fetch(url, {
      //			Host: 'localhost:9090',
      timeout: 6000,
      headers: {
        "Content-Type": "*/*",
        Accept: "*/*", // application/rss+xml
      },
      mode: "cors",
      method: "get",
      //    		url: `http://localhost:9090`,
      //	credentials: 'same-origin', // include, *same-origin, omit
    })
      .then(this.handleErrors)
      .then((response) => {
        return response.json();
      })
      //		.then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((data) => {
        if (Config.bDebug) {
          console.log("fetchProgSchedules 1.5");
          console.log(data);
        }
        this.setState({ schedules: data, bSchedulesQueryReady: true });
        store.setState({ schedules: data });
        let storestate = store.getState();
        console.log(storestate);
        console.log("storestate");
      })
      .catch((error) => {
        console.error("error");
        console.error(error);
        this.setState({ errmsg: error.toString() });
        // throw new this.TelkkuException(error.toString());
      });
  };

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

  radioProgTableChanged(event) {
    var currentCheckedRadio = event.target;
    var name = currentCheckedRadio.name;
    if (Config.bDebug) {
      console.log("radioProgTableChanged");
      console.log(name);
    }
    if (name !== "opttable") return;
    var id = currentCheckedRadio.id;
    if (Config.bDebug) {
      console.log("currentCheckedRadio");
      console.log(id);
    }
    this.setState({ progtable: id });
    this.createUiGrid();
  }

  getWeekGrid = () => {
    return (
      <div>
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
      </div>
    );
  };

  getListGrid = () => {
    return (
      <div>
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
      </div>
    );
  };

  getDayGrid = () => {
    return (
      <DayServices
        selecteddate={store.getState().selecteddate}
        data={this.state.schedules}
        progsource={this.state.progsource}
        selectedcategory={this.state.selectedcategory}
        bShowTableBorder={this.state.bShowTableBorder}
        bShowDesciption={this.state.bShowDesciption}
      />
    );
  };

  getFetchedDate = () => {
    if (Config.bDebug) {
      console.log("getFetchedDate");
      console.log("this.state.selecteddate");
      console.log(store.getState().selecteddate);
    }
    let today = store.getState().selecteddate;
    if (today == null || today == undefined) return "";

    if (typeof today === "string") today = Date.parse(today);
    let days = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    if (days < 10) days = "0" + days;
    if (month < 10) month = "0" + month;
    const ret = "" + days + "." + month + "." + year;
    return ret;
  };

  onClickSetDateStringYle = (event) => {
    event.preventDefault();
    let dayparameter = event.target.id;
    console.log("onClickSetDateString");
    console.log("dayparameter");
    console.log(dayparameter);
    const search = "dayname_";
    let ind = dayparameter.indexOf(search);
    if (ind > -1) dayparameter = dayparameter.substring(ind + search.length);
    const selDate = new Date(Date.parse(dayparameter));
    console.log("dayparameter");
    console.log(dayparameter);
    console.log("selDate");
    console.log(selDate);
    console.log("this.state.selecteddate");
    console.log(this.state.selecteddate);

    /*
		if (this.state.selecteddate.getFullYear() === selDate.getFullYear()
		    && this.state.selecteddate.getMonth() === selDate.getMonth()
			&& this.state.selecteddate.getDay() === selDate.getDay())
			return;
		*/
    const emptyservices = [];
    this.setState({
      selecteddate: selDate,
      services: emptyservices,
      schedules: [],
      currentservice: null,
    });
    // store.setStateNoneCallListeners({ selecteddate: selDate, schedules: [] });
    this.fetchProgSchedules(this.state.progsource);
  };

  createUiGrid = () => {
    let uigrid = null;
    if (
      this.state.bSchedulesQueryReady &&
      this.state.schedules != null &&
      this.state.schedules.length > 0
    ) {
      if (this.state.progtable == "rweek") uigrid = this.getWeekGrid();
      else if (this.state.progtable == "rday") uigrid = this.getDayGrid();
      else if (this.state.progtable == "rlist") uigrid = this.getListGrid();
    }
    // this.setState({uigrid: uigrid });
    return uigrid;
  };

  getPlus1DayId = (plusdaynumber) => {
    const today = dayjs();
    let plusdate = today;
    if (plusdaynumber > 0) plusdate = today.add(plusdaynumber, "days");
    const ret = plusdate.format("YYYY-MM-DD"); // pvm=2021-02-22
    return ret;
  };

  getPlus1Day = (plusdaynumber) => {
    const today = dayjs();
    let plusdate = today;
    if (plusdaynumber > 0) plusdate = today.add(plusdaynumber, "days");
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

  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  isEmptyHash = (abc) => {
    for (var prop in abc) {
      if (abc.hasOwnProperty(prop)) return false;
    }
    return true;
  };

  typeOf = (obj) => {
    return {}.toString.call(obj).split(" ")[1].slice(0, -1).toLowerCase();
  };

  render(props, state) {
    let uigrid = this.createUiGrid();

    return (
      <div>
        <div class={style.cardHeader}>
          <h1>Yle {this.getFetchedDate()}</h1>
          <div>
            Hae ohjelmatiedot alimpaan taulukkoon yllä olevan päivän ajankohta
            linkin ja alla olevan päivämäärän mukaan:
          </div>
          <div class={style.cardHeader}>
            <a
              href="."
              id={"dayname_" + this.getPlus1DayId(0)}
              onClick={this.onClickSetDateStringYle}
            >
              {this.getPlus1Day(0)}
            </a>
            <space> </space>
            <a
              href="."
              id={"dayname_" + this.getPlus1DayId(1)}
              onClick={this.onClickSetDateStringYle}
            >
              {this.getPlus1Day(1)}
            </a>
            <space> </space>
            <a
              href="."
              id={"dayname_" + this.getPlus1DayId(2)}
              nClick={this.onClickSetDateStringYle}
            >
              {this.getPlus1Day(2)}
            </a>
            <space> </space>
            <a
              href="."
              id={"dayname_" + this.getPlus1DayId(3)}
              onClick={this.onClickSetDateStringYle}
            >
              {this.getPlus1Day(3)}
            </a>
            <space> </space>
            <a
              href="."
              id={"dayname_" + this.getPlus1DayId(4)}
              onClick={this.onClickSetDateStringYle}
            >
              {this.getPlus1Day(4)}
            </a>
            <space> </space>
            <a
              href="."
              id={"dayname_" + this.getPlus1DayId(5)}
              onClick={this.onClickSetDateStringYle}
            >
              {this.getPlus1Day(5)}
            </a>
            <space> </space>
            <a
              href="."
              id={"dayname_" + this.getPlus1DayId(6)}
              onClick={this.onClickSetDateStringYle}
            >
              {this.getPlus1Day(6)}
            </a>
            <space> </space>
            <a
              href="."
              id={"dayname_" + this.getPlus1DayId(7)}
              onClick={this.onClickSetDateStringYle}
            >
              {this.getPlus1Day(7)}
            </a>
            <space> </space>
            <a
              href="."
              id={"dayname_" + this.getPlus1DayId(8)}
              onClick={this.onClickSetDateStringYle}
            >
              {this.getPlus1Day(8)}
            </a>
            <space> </space>
            <a
              href="."
              id={"dayname_" + this.getPlus1DayId(9)}
              onClick={this.onClickSetDateStringYle}
            >
              {this.getPlus1Day(9)}
            </a>
            <space> </space>
            <a
              href="."
              id={"dayname_" + this.getPlus1DayId(10)}
              onClick={this.onClickSetDateStringYle}
            >
              {this.getPlus1Day(10)}
            </a>
            <space> </space>
            <a
              href="."
              id={"dayname_" + this.getPlus1DayId(11)}
              onClick={this.onClickSetDateStringYle}
            >
              {this.getPlus1Day(11)}
            </a>
            <space> </space>
            <a
              href="."
              id={"dayname_" + this.getPlus1DayId(12)}
              onClick={this.onClickSetDateStringYle}
            >
              {this.getPlus1Day(12)}
            </a>
            <space> </space>
            <a
              href="."
              id={"dayname_" + this.getPlus1DayId(13)}
              onClick={this.onClickSetDateStringYle}
            >
              {this.getPlus1Day(13)}
            </a>
            <space> </space>
            <a
              href="."
              id={"dayname_" + this.getPlus1DayId(14)}
              onClick={this.onClickSetDateStringYle}
            >
              {this.getPlus1Day(14)}
            </a>
            <br />
          </div>
        </div>
        <div class={style.cardBody}>
          <div style={{ "background-color": "red", color: "yellow" }}>
            {state.errmsg}
          </div>
          <div class=" mdc-typography--caption">Ohjelmat</div>
        </div>
        {uigrid}
      </div>
    );
  }
}
