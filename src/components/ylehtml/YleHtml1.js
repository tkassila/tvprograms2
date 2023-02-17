import { h, Component, createRef } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Select from 'preact-material-components/Select';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Menu/style.css';
import 'preact-material-components/Select/style.css';
import Radio from 'preact-material-components/Radio';
import FormField from 'preact-material-components/FormField';
import 'preact-material-components/FormField/style.css';
import 'preact-material-components/List/style.css';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';
//import 'preact-material-components/List/style.css';
//import 'preact-material-components/Menu/style.css';
import 'preact-material-components/Select/style.css';
import AbortController from "abort-controller";
import style from './style';
import Config from '../../utils/Config';
// import 'whatwg-fetch';
import { fetchJsonp, generateCallbackFunction } from 'fetch-jsonp';
import dayjs from 'dayjs';

// import Category from './Category';
// import GridOrList from './GridOrList';
//import jsonp from '../../utils/jsonp';

// import StaticFunctions from '../../unpm install axios-jsonptils/StaticFunctions';

export default class YleHtml1 extends Component {

	store = null;
	categoryfieldRef = null;
	fetch_url_audio = null;
	fetch_url_tv = null;
	abortController = null;
    abortSignal = null;

	currentservice = null;
	services = null;
	indService = -1;
	callbackName = 'jsonp_callback_schedules'; 
	_mounted = false;

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
		if(Config.bDebug) 
		{
			console.log("storestate");
			console.log(storestate);
		}

		let today = new Date(Date.now());
		this.state = {
			errmsg: null,
			chosenIndex: 0,
			progsource: props.progsource,
			bShowDesciption: true,
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
			schedules: {},
			bSvLang: false,
			bSchedulesRead: false,
		}
	 }

	componentDidMount()
	{
	}

	componentWillUnmount()
	{
	}

	componentWillReceiveProps(nextProps) 
	{
	}

	render(props, state) {

		return (			
			<div >
						<h1 tabIndex="0" >Yle</h1>
						<div class={style.cardHeader}>
						<div class=" mdc-typography--caption">Mistä ohjelmia</div>

    					<div class={style.cardBody}>

						<div style={{ "background-color": 'red', color: "yellow" } }>{state.errmsg}</div>
						<div class=" mdc-typography--caption">Ohjelmat</div>						
    					</div>
					</div>
			</div>
		);
	}
}
