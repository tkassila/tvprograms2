import { h, Component, createRef } from "preact";
//import Card from 'preact-material-components/Card';
// import 'preact-material-components/Card/style.css';
// import 'preact-material-components/Button/style.css';
//import Select from 'preact-material-components/Select';
//import 'preact-material-components/List/style.css';
//import 'preact-material-components/Menu/style.css';
//import 'preact-material-components/Select/style.css';
//import Radio from 'preact-material-components/Radio';
//import FormField from 'preact-material-components/FormField';
//import 'preact-material-components/FormField/style.css';
// import 'preact-material-components/List/style.css';
//import LayoutGrid from 'preact-material-components/LayoutGrid';
//import 'preact-material-components/LayoutGrid/style.css';
//import 'preact-material-components/List/style.css';
//import 'preact-material-components/Menu/style.css';
//import 'preact-material-components/Select/style.css';

import AbortController from "abort-controller";
import style from "./style";
import Config from "../../utils/Config";
// import 'whatwg-fetch';
import { fetchJsonp } from "fetch-jsonp";
//import dayjs from 'dayjs';

// import Category from './Category';
// import GridOrList from './GridOrList';
import YleProgram from "./YleProgram";

// import StaticFunctions from '../../utils/StaticFunctions';

export default class YleChannel extends Component {
  fetch_url_progschedules = null;
  // abortController = null;
  abortSignal = null;
  // formatForServiceTime = "yyyy-MM-dd'T'HH:mm:ss.SSSZZ";
  formatForServiceTime = "yyyy-MM-dd'T'HH:mm:ss";
  offset = null;

  constructor(props) {
    super(props);
    if (Config.bDebug) {
      console.log("YleChannel.js");
      console.log("props");
      console.log(props);
    }

    let today = new Date(Date.now());
    this.state = {
      errmsg: null,
      selectedcategory: props.selectedcategory,
      yleapiparams: props.yleapiparams,
      schedules: props.schedules,
      progsource: props.progsource,
      currentDate: Date.now(),
      selecteddate: props.selecteddate,
      selectedenddate: props.selectedenddate,
    };

    this.fetch_url_progschedules =
      Config.yleserverurl + "programs/schedules.json" + this.state.yleapiparams;
    this.offset = 0;
    this.fetchProgSchedulesData = this.fetchProgSchedulesData.bind(this);
  }

  componentDidMount() {
    if (Config.bDebug) console.log("componentDidMount 1");
    //this.abortController = new AbortController(); // 1
    // this.abortSignal = this.abortController.signal; // 2
    // this.fetchProgSchedules();
  }

  componentWillReceiveProps(nextProps) {
    if (Config.bDebug) {
      console.log("YleChannel componentWillReceiveProps nextProps");
      console.log(nextProps);
    }

    /*
      this.setState({ categories: nextProps.categories, 
						services: nextProps.services,
						progsource: nextProps.progsource,
						selectedcategory: nextProps.selectedcategory
					});
					*/
    /*	  if (!nextProps.tabClassHide)
		this.initializeState(nextProps);
			//	this.forceUpdate();            
			*/
  }

  fetchProgSchedulesData(data) {
    if (Config.bDebug) {
      console.log("fetchProgSchedulesData");
      console.log("data");
      console.log(data);
    }
    const schedules = data.data;
    if (Config.bDebug) {
      console.log("schedules 2");
      console.log(schedules);
      console.log(typeof schedules);
    }
    this.setState({ schedules: schedules, errmsg: null });
  }

  getStartTime = (date) => {
    let modTimeDate = date;
    if (Config.bDebug) {
      console.log("getStartTime");
      console.log("date");
      console.log(date);
      console.log("typeof date");
      console.log(typeof date);
    }
    // Object.assign(modTimeDate, date);
    modTimeDate.setHours(0);
    modTimeDate.setMinutes(0);
    modTimeDate.setSeconds(1);
    var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = new Date(modTimeDate - tzoffset)
      .toISOString()
      .slice(0, -1);
    const ret = localISOTime; // dateFormat(modTimeDate, this.formatForServiceTime);
    console.log("getStartTime");
    console.log(ret);
    return ret;
  };

  getEndTime = (date) => {
    let modTimeDate = date;
    //	Object.assign(modTimeDate, date);
    modTimeDate.setHours(23);
    modTimeDate.setMinutes(59);
    modTimeDate.setSeconds(59);
    var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = new Date(modTimeDate - tzoffset)
      .toISOString()
      .slice(0, -1);
    const ret = localISOTime; // dateFormat(modTimeDate, this.formatForServiceTime);
    if (Config.bDebug) console.log("getEndTime");
    console.log(ret);
    return ret;
  };

  getParams = () => {
    let ret = "&service=" + this.props.data.id;
    if (
      this.state.selectedcategory != null &&
      this.state.selectedcategory.title.fi != "Kaikki"
    )
      ret = ret + "&category=" + this.state.selectedcategory.id;
    if (
      this.state.selecteddate != undefined &&
      this.state.selecteddate != null
    ) {
      ret = ret + "&starttime=" + this.getStartTime(this.state.selecteddate);
      if (
        this.state.selectedenddate != undefined &&
        this.state.selectedenddate != null
      )
        ret = ret + "&endtime=" + this.getEndTime(this.state.selectedenddate);
      else ret = ret + "&endtime=" + this.getEndTime(this.state.selecteddate);
    }
    return ret;
  };

  componentWillUnmount() {
    this.abortController.abort();
  }

  fetchProgSchedules = () => {
    if (Config.bDebug) {
      console.log("fetchProgSchedules");
      console.log(this.fetch_url_progschedules + this.getParams());
    }

    fetchJsonp(this.fetch_url_progschedules + this.getParams(), {
      method: "GET",
      timeout: 12000,
      //			jsonpCallbackFunction: 'fetchProgSchedulesData',
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "*/*",
        SameSite: "Lax",
      },
      signal: this.abortSignal,
    })
      .then(this.handleErrors)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let series = data.data;
        if (Config.bDebug) {
          console.log("fetchProgseries 1.5");
          console.log(data);
          console.log("series 2");
          console.log(series);
          console.log(typeof series);
        }
        this.setState({ services: series, errmsg: null });
      })
      .catch((error) => {
        console.error("error");
        console.error(error);
        this.setState({ errmsg: error.toString() });
        return;
      });
  };

  handleErrors(response) {
    if (!response.ok) {
      // throw Error(response.statusText);
      throw Error(response.status);
    }
    return response;
  }

  render(props, state) {
    console.log("yleservice render");
    console.log("state");
    console.log(state);
    let programs = null;
    if (state.schedules != null)
      programs = this.props.schedules.map((s, k) => {
        return (
          <YleProgram
            id={k}
            data={s}
            selectedcategory={this.props.selectedcategory}
            bSvLang={this.props.bSvLang}
            themevalue={props.themevalue}
            bShowDesciption={state.bShowDesciption}
          />
        );
      });

    return (
      <div>
        {props.data.title.fi ? props.data.title.fi : props.data.title.sv}
        <div>{programs}</div>
      </div>
    );
  }
}
