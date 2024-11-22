import { h, Component, createRef } from 'preact';
//import Card from 'preact-material-components/Card';
//import 'preact-material-components/Card/style.css';
//import 'preact-material-components/Button/style.css';
//import Typography from 'preact-material-components/Typography';
// import 'preact-material-components/Typography/style.css';

import AbortController from "abort-controller";
import style from './style';
import Config from '../../utils/Config';
// import fetchJsonp from 'fetch-jsonp';
// import moment from 'moment';
import dayjs from 'dayjs';

export default class HtmlTelkku extends Component {

	fetch_url_telkku = null;
	fetch_url_telkussa = null;

	constructor(props)
	{
		super(props);
		if(Config.bDebug) 
		{
			console.log("HtmlTelkku.js");
			console.log("props");
			console.log(props);
		}

        let today = new Date(Date.now());
		this.state = {
			errmsg: null,
			html: null,
            selecteddate: null,
            fetcheditems: [],
            selectedpage: 1,
			today: new Date(Date.now),
		}
		
		// https://telkussa.fi/sivu/1/20210215
		this.fetch_url_telkku = '/telkkussa/';
		this.fetch_url_telkussa = 'https://telkussa.fi/';
		this.TelkkuException = this.TelkkuException.bind(this);
	 }

	componentDidMount()
	{
		if(Config.bDebug) 				
			console.log("componentDidMount 1");
		this.abortController = new AbortController(); // 1        
		this.abortSignal = this.abortController.signal; // 2	

		// this.openHtmlTelkkuPage(this.state.selectedpage);
	}

	componentWillReceiveProps(nextProps) 
	{
	  if (Config.bDebug)
	  {
		console.log("HtmlTelkku componentWillReceiveProps nextProps"); 
		console.log(nextProps); 				
	  }

	  if (nextProps !== null && nextProps.themevalue != this.props.themevalue)
	  {
		  this.setState({ themevalue: nextProps.themevalue});		   
	   }
	}


	componentWillUnmount()
	{
		if (this.abortSignal && !this.abortSignal.aborted)
			this.abortController.abort();
	}

	removelisteners = () =>
	{
		
	}

	fetchHtmlTelkkuPrograms = async () =>
	{
		if(Config.bDebug) 
		{	
			console.log("fetchHtmlTelkkuPrograms");		
		}
		let pagenumber = 1;
		let fetcheddata = null;
		let fetcheditems = [];
		try {
			while(1)
			{
				fetcheddata = await this.fetchHtmlTelkkuChannels(pagenumber);
				if (fetcheddata !== null)
				{
					// Array.prototype.push.apply(fetcheditems, fetcheddata);
					fetcheditems.push(fetcheddata);
                    if (pagenumber === 1)
                        break;
					pagenumber = pagenumber +1;
				}
				else
					break;
			}
		} catch (error) {
			if (error.message !== "Error: 500")
			{
				console.error("error");
				console.error(error);
				this.setState({ errmsg: error.toString() })
				return;	
			}
		}		
		if(Config.bDebug) 
		{	
			console.log("fetcheditems");		
			console.log(fetcheditems);		
		}

		this.setState({fetcheditems: fetcheditems, errmsg: null });
	}

	TelkkuException (message) {
		this.message = message;
		this.name = 'TelkkuException';
	}

    getSelectedDateParam = () => {
        let selday = this.state.selecteddate;
        let month  = "" +(selday.getMonth() +1);
        if (month.trim().length === 1)
            month = "0" +month;
        let day = "" +selday.getDate();
        if (day.trim().length === 1)
            day = "0" +day;
        return "" +selday.getFullYear() +month +day;
    }

    openHtmlTelkkuPage = (pagenumber) => {
        let blankurl = this.fetch_url_telkussa +"sivu/" +pagenumber +"/" +this.getSelectedDateParam();
        // window.open(blankurl, '_blank', "Telkussa", "location=no");
		window.open(blankurl, '_blank', "Telkussa");
    }

	fetchHtmlTelkkuChannels = async (pagenumber) =>
	{
		let channelurl = this.fetch_url_telkku +"sivu/" +pagenumber +"/" +this.getSelectedDateParam();
		if(Config.bDebug) 
		{
			console.log("fetchRssTelkkuChannel 1"); 
			console.log(channelurl); 
		}

		let fetched = null;
		// 	crossDomain:true,
		await fetch(channelurl, {
			method: 'GET',		
			timeout: 6000,			
			headers: { "Content-Type": "text/html; charset=UTF-8", 
			'Accept': '*/*', // application/rss+xml
			},
			mode: 'same-origin',
			signal: this.abortSignal,
		})
		.then(this.handleErrors)
		.then(response => { return response.text();})
//		.then(str => new window.DOMParser().parseFromString(str, "text/xml"))
		.then(data => { 
			/*
			if(Config.bDebug) 
				{
					console.log("fetchRssTelkkuChannel 1.5"); 
					console.log(data); 
				}
				*/
				this.setState({ errmsg: null,});
				fetched = data; // this.getJsonDataFromTelkkuRssXml(data);
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
		const items = data.querySelectorAll("item");
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

	openHtmlTelkkuElokuvat = () => {
        let blankurl = this.fetch_url_telkussa +"elokuva/lista";
       // window.open(blankurl, '_blank', "Telkussa", "location=no");
	   window.open(blankurl, '_blank', "Telkussa");
	}

	openHtmlTelkkuNyt = () => {
        let blankurl = this.fetch_url_telkussa +"nyt";
       // window.open(blankurl, '_blank', "Telkussa", "location=no");
	   window.open(blankurl, '_blank', "Telkussa");
	}

    onClickLink = (event) => {
        event.preventDefault();
        let value = event.target.text;        
        console.log("onClicked");
        console.log(value);
       // if (value !== this.state.selectedpage)
       // {
			if (value === 'elokuva')
				this.openHtmlTelkkuElokuvat();
			else
			if (value === 'nyt')
				this.openHtmlTelkkuNyt();
			else
            	this.openHtmlTelkkuPage(value);
            this.setState({selectedpage: value});
      //  }
		// else
			// this.setState({selectedpage: value});
    }

	getPlus1DayId = (plusdaynumber) =>
	{
		const today = dayjs();
		let plusdate = today;
		if (plusdaynumber > 0)
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

	onClickSetDateString = (event) =>
	{
		event.preventDefault();
		let dayparameter = event.target.id;
		console.log("onClickSetDateString");
		console.log("dayparameter");
		console.log(dayparameter);
		const search = 'dayname_';
		let ind = dayparameter.indexOf(search);
		if (ind > -1)
			dayparameter = dayparameter.substring(ind +search.length);
		console.log("dayparameter");
		console.log(dayparameter);
		console.log("onClickSetDateString");
		console.log(dayparameter);
		this.setState({selecteddate: new Date(Date.parse(dayparameter))});	
	}

	onClickSetDateStringold = (event) =>
	{
		event.preventDefault();
		const dayparameter = event.target.text;
		/*
		const momentselectedday = moment(dayparameter, 'DD.MM.YYYY');
		const selectedday = new Date(momentselectedday.format("YYYYY/MM/DD"));
		*/
		let usastrdate = dayparameter.replace(".", "-").replace(".", "-");
		const indDay = usastrdate.indexOf("-");
			if (indDay > -1)
		{
			const indMonth = usastrdate.indexOf("-", indDay+1);
			if (indMonth > -1)
			{		
					const day = usastrdate.substring(0, indDay);
					const month = usastrdate.substring(indDay+1, indMonth);
					const year = usastrdate.substring(indMonth+1);
					usastrdate = year +"/" +month +"/" +day;					
			}
		}

		//const momentselectedday = dayjs(usastrdate);
		const strmomentselectedday = usastrdate; // momentselectedday.format("YYYYY/MM/DD")
		const selectedday = new Date(strmomentselectedday);
		/*
		console.log("strmomentselectedday");
		console.log(strmomentselectedday);		
		console.log("dayparameter");
		console.log(dayparameter);
		console.log("momentselectedday");
		console.log(momentselectedday);
		console.log(typeof momentselectedday);
		console.log("selectedday");
		console.log(selectedday);
		console.log(typeof selectedday);
		console.log("selectedday");
		console.log(selectedday);
		*/
		this.setState({selecteddate: selectedday});	
	}

	getFetchedDate = () =>
	{
		if (Config.bDebug)
		{
			console.log("getFetchedDate");
			console.log("this.state.selecteddate");
			console.log(this.state.selecteddate);
		}
		let today = this.state.selecteddate;
		if (today == null || today == undefined)
			return "";

		if (typeof today === 'string')
			today = Date.parse(this.state.selecteddate);
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

	render(props, state) {

		const darkstyle = props.themevalue;
		let divDialogStyle = (props.themevalue !== undefined && props.themevalue !== '' ? "color: #FFF; background-color: black; border-color: #FFF;" : '');

		if (Config.bDebug)
		{
			console.log("state");
			console.log(state);
			console.log("darkstyle");
			console.log(darkstyle);			
		}

		// +"mdc-theme" +darkstyle
		return (
			<div id="htmltelkku_main_div" style={divDialogStyle}>
			<div class={style.cardHeader}>
				<h1 tabIndex="0" lang="fi">Telkussa.fi {this.getFetchedDate()}</h1>
				
				<div tabIndex="0" lang="fi" >
						Aseta avattavan html sivun päivämääräksi jokin seuraavista:
                    </div>
					<div class={style.cardHeader}>
						<a tabIndex="0" href="." lang="fi" id={'dayname_'+this.getPlus1DayId(0)} 
						           onClick={this.onClickSetDateString}>{this.getPlus1Day(0)}</a><space> </space>
						<a tabIndex="0" href="." lang="fi" id={'dayname_'+this.getPlus1DayId(1)} 
						           onClick={this.onClickSetDateString}>{this.getPlus1Day(1)}</a><space> </space>
						<a tabIndex="0" href="." lang="fi" id={'dayname_'+this.getPlus1DayId(2)} 
						           onClick={this.onClickSetDateString}>{this.getPlus1Day(2)}</a><space> </space>
						<a tabIndex="0" href="." lang="fi" id={'dayname_'+this.getPlus1DayId(3)} 
						           onClick={this.onClickSetDateString}>{this.getPlus1Day(3)}</a><space> </space>
						<a tabIndex="0" href="." lang="fi" id={'dayname_'+this.getPlus1DayId(4)} 
						          onClick={this.onClickSetDateString}>{this.getPlus1Day(4)}</a><space> </space>
						<a tabIndex="0" href="." lang="fi" id={'dayname_'+this.getPlus1DayId(5)} 
						          onClick={this.onClickSetDateString}>{this.getPlus1Day(5)}</a><space> </space>
						<a tabIndex="0" href="." lang="fi" id={'dayname_'+this.getPlus1DayId(6)} 
						          onClick={this.onClickSetDateString}>{this.getPlus1Day(6)}</a><space> </space>
						<a tabIndex="0" href="." lang="fi" id={'dayname_'+this.getPlus1DayId(7)} 
						            onClick={this.onClickSetDateString}>{this.getPlus1Day(7)}</a><space> </space>
						<a tabIndex="0" href="." lang="fi" id={'dayname_'+this.getPlus1DayId(8)} 
						            onClick={this.onClickSetDateString}>{this.getPlus1Day(8)}</a><space> </space>
						<a tabIndex="0" href="." lang="fi" id={'dayname_'+this.getPlus1DayId(9)} 
						            onClick={this.onClickSetDateString}>{this.getPlus1Day(9)}</a><space> </space>
						<a tabIndex="0" href="." lang="fi" id={'dayname_'+this.getPlus1DayId(10)} 
						            onClick={this.onClickSetDateString}>{this.getPlus1Day(10)}</a><space> </space>
						<a tabIndex="0" href="." lang="fi" id={'dayname_'+this.getPlus1DayId(11)} 
						            onClick={this.onClickSetDateString}>{this.getPlus1Day(11)}</a><space> </space>
						<a tabIndex="0" href="." lang="fi" id={'dayname_'+this.getPlus1DayId(12)} 
						            onClick={this.onClickSetDateString}>{this.getPlus1Day(12)}</a><space> </space>
						<a tabIndex="0" href="." lang="fi" id={'dayname_'+this.getPlus1DayId(13)} 
						            onClick={this.onClickSetDateString}>{this.getPlus1Day(13)}</a><space> </space>
						<a tabIndex="0" href="." lang="fi" id={'dayname_'+this.getPlus1DayId(14)} 
						            onClick={this.onClickSetDateString}>{this.getPlus1Day(14)}</a><br/>
						</div>
                    <div tabIndex="0" lang="fi" class={style.cardHeader}>
						Avaa uusi selain sivu klikkaamalla linkkejä:
                    </div>
					<div class={style.cardHeader}>
						<a tabIndex="0" href="." lang="fi" onClick={this.onClickLink}>1</a><space> </space>
						<a tabIndex="0" href="." lang="fi" onClick={this.onClickLink}>2</a><space>   </space>
						<a tabIndex="0" href="." lang="fi" onClick={this.onClickLink}>3</a><space>   </space>
						<a tabIndex="0" href="." lang="fi" onClick={this.onClickLink}>4</a><space>   </space>
						<a tabIndex="0" href="." lang="fi" onClick={this.onClickLink}>5</a><space>   </space>
						<a tabIndex="0" href="." lang="fi" onClick={this.onClickLink}>6</a><space>   </space>
						<a tabIndex="0" href="." lang="fi" onClick={this.onClickLink}>nyt</a><space>   </space>
						<a tabIndex="0" href="." lang="fi" onClick={this.onClickLink}>elokuva</a>
					</div>
				
			</div>
			</div>
		);
	}
}
