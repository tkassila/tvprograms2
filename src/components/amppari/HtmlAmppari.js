import { h, Component } from 'preact';
//import Card from 'preact-material-components/Card';
//import 'preact-material-components/Card/style.css';
//import 'preact-material-components/Button/style.css';
import AbortController from "abort-controller";
import style from './style';
import Config from '../../utils/Config';
// import fetchJsonp from 'fetch-jsonp';
// import moment from 'moment';
//import Select from 'preact-material-components/Select';
//import 'preact-material-components/List/style.css';
//import 'preact-material-components/Menu/style.css';
//import 'preact-material-components/Select/style.css';
//import Formfield from 'preact-material-components/FormField';
import dayjs from 'dayjs';

export default class HtmlAmppari extends Component {

	store = null;
	fetch_url_ampparissa = null;
	arr_selecttyyppi_items = ['kaikki','elokuvat','urheilu'];
	arr_selectchanneltypes = ['kaikki','ilmaiset','maksulliset']

	constructor(props)
	{
		super(props);
		if(Config.bDebug) 
		{
			console.log("HtmlAmppari.js");
			console.log("props");
			console.log(props);
		}

		this.store = props.store;
        let today = new Date(Date.now());
		this.state = {
			errmsg: null,
		    selecteddate: null,
			selectedaika: 'paiva',
			selectedsuodattimet: 'kaikki',
			selectedtyyppi: 'kaikki',
			selectedTyyppiinindex: 0,
			selectedsuodatinindex: 0,
			searchsanat: '',
		}
		
		// tyyppi=kaikki,urheilu,elokuvat
		// aika=paiva,tulevat,nyt,ilta,yo
		// pvm=2021-02-22
		// suodatus=ilmaiset,maksulliset,kaikki
		// https://www.ampparit.com/tv?aika=paiva&pvm=2021-02-22&sanat=&suodatus=ilmaiset&tyyppi=elokuvat
		this.fetch_url_ampparissa = 'https://www.ampparit.com/tv';
		
	 }

	componentDidMount()
	{
		if(Config.bDebug) 				
			console.log("componentDidMount 1");
	}

	openHtmlAmppari = (dayparameter) => {
		// aika=paiva,tulevat,nyt,ilta,yo
		// pvm=2021-02-22
		// suodatus=ilmaiset,maksulliset,kaikki
		// https://www.ampparit.com/tv?aika=paiva&pvm=2021-02-22&sanat=&suodatus=ilmaiset&tyyppi=elokuvat

        let blankurl = this.fetch_url_ampparissa 
		    +"?aika=" +this.state.selectedaika
			+"&pvm=" +dayparameter
			+"&sanat=" +this.state.searchsanat
			+"&suodatus=" +this.state.selectedsuodattimet
			+"&tyyppi=" +this.state.selectedtyyppi;
        // window.open(blankurl, '_blank', "Ampparissa", "location=no");
		window.open(blankurl, '_blank', "Ampparissa");
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
	
	onClickSetDateStringAHtml = (event) =>
	{
		event.preventDefault();
		let dayparameter = event.target.id;
		console.log("onClickSetDateStringAHtml");
		console.log("dayparameter");
		console.log(dayparameter);
		const search = 'dayname_';
		let ind = dayparameter.indexOf(search);
		if (ind > -1)
			dayparameter = dayparameter.substring(ind +search.length).trim();
		console.log("dayparameter");
		console.log(dayparameter);
		console.log("onClickSetDateStringAHtml");
		console.log(dayparameter);
		this.setState({selecteddate: new Date(Date.parse(dayparameter))});	
		this.openHtmlAmppari(dayparameter);
	}

	onClickSetDateStringold = (event) =>
	{
		event.preventDefault();
		const dayparameter = event.target.text;
		this.setState({selecteddate: dayparameter});	
		this.openHtmlAmppari(dayparameter);
	}

	onClickSelectedAika = (event) =>
	{
		event.preventDefault();
		const timeparameter = event.target.id; // event.target.text;
		const ind = timeparameter.indexOf("_");
		if (ind > -1)
		{
			const idends = timeparameter.substring(ind+1);
			/*
			console.log("idends");
			console.log(idends);
			*/
			this.setState({selectedaika: idends});	
		}
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

	render(props, state) {
		if (Config.bDebug)
		{
			console.log("state");
			console.log(state);
		}

		let divDialogStyle = (props.themevalue !== undefined && props.themevalue !== '' ? "color: #FFF; background-color: black; border-color: #FFF;" : '');
		const inputw = "float: none; display: inline-block; vertical-align: middle; ";

		// suodatus=ilmaiset,maksulliset,kaikki
		// 			return <Select.Item id={i}>{child}</Select.Item>
		let selectchanneltypes = this.arr_selectchanneltypes.map((child, i) => {
			return <option value={child} id={i} >{child}</option>
			});

		// tyyppi=kaikki,urheilu,elokuvat
		// 			return <Select.Item id={i}>{child}</Select.Item>
		let selecttyyppi_items = this.arr_selecttyyppi_items.map((child, i) => {
			return <option value={child} id={i} >{child}</option>
			});

			console.log("before HtmlAmppari render return");

		return (			
			<div id="htmlamppari_main_div" style={divDialogStyle}>
			<div class={style.cardHeader}>
			<br></br>
				<br></br>

				<h1 tabIndex="0" lang="fi" id="focus_1_element">Amppari.fi</h1>
				<br></br>
				<div class={style.cardHeader} tabIndex="0" lang="fi">
						Valitse seuraavista:
                    </div>
					<div class={style.cardHeader}>
						<a id="aikalink_nyt" lang="fi" href="." onClick={this.onClickSelectedAika}>Nyt ja seuraavaksi</a><space> </space>
						<a id="aikalink_tulevat" lang="fi" href="." onClick={this.onClickSelectedAika}>Tulevat</a><space> </space>
						<a id="aikalink_paiva" lang="fi" href="." onClick={this.onClickSelectedAika}>Koko päivä</a><space> </space>
						<a id="aikalink_ilta" lang="fi" href="." onClick={this.onClickSelectedAika}>Ilta (17-22)</a><space> </space>
						<a id="aikalink_yo" lang="fi" href="." onClick={this.onClickSelectedAika}>Yö (22-01)</a><space> </space>
						<br/>
                    </div>
					<div>
						<span>
							<div class={style.cardHeader} lang="fi" >
							<label for="idchannels">Kanavat:</label><space>     </space>
							  <select tabIndex="0"
									selectedIndex={this.state.selectedsuodatinindex}
									preselected outlined id="idchannels"
									onChange={(e)=>{
										console.log("e.target.target");
										console.log(e.target.text);
										this.setState({
											selectedsuodatinindex: e.target.selectedIndex,	
											selectedsuodattimet: this.arr_selectchanneltypes[e.target.selectedIndex]							
										});
									}}>
									{selectchanneltypes}
							</select>
						    </div>
						</span>

						<span>
							<div class={style.cardHeader} lang="fi">
							<label for="idchanneltype">Ohjelmatyyppi:</label><space>     </space><space>     </space>
							  <select tabIndex="0"
									selectedIndex={this.state.selectedTyyppiinindex}
									preselected outlined id="idchanneltype"
									onChange={(e)=>{
										console.log("e.target.target");
										console.log(e.target.text);
										this.setState({
											selectedTyyppiinindex: e.target.selectedIndex,	
											selectedtyyppi: this.arr_selecttyyppi_items[e.target.selectedIndex]
										});
									}}>
									{selecttyyppi_items}
							</select>
						    </div>
						</span>

					</div>

				<div class={style.cardHeader} lang="fi" tabIndex="0">
						Avaa html sivu päivämäärän mukaan:
                    </div>
					<div class={style.cardHeader}>
						<a  lang="fi" href="." id={'dayname_'+this.getPlus1DayId(0)} 
						       onClick={this.onClickSetDateStringAHtml}>{this.getPlus1Day(0)}</a><space> </space>
						<a  lang="fi" href="." id={'dayname_'+this.getPlus1DayId(1)} 
						            onClick={this.onClickSetDateStringAHtml}>{this.getPlus1Day(1)}</a><space> </space>
						<a  lang="fi" href="." id={'dayname_'+this.getPlus1DayId(2)} 
						           onClick={this.onClickSetDateStringAHtml}>{this.getPlus1Day(2)}</a><space> </space>
						<a  lang="fi" href="." id={'dayname_'+this.getPlus1DayId(3)} 
						           onClick={this.onClickSetDateStringAHtml}>{this.getPlus1Day(3)}</a><space> </space>
						<a  lang="fi" href="." id={'dayname_'+this.getPlus1DayId(4)} 
						           onClick={this.onClickSetDateStringAHtml}>{this.getPlus1Day(4)}</a><space> </space>
						<a  lang="fi" href="." id={'dayname_'+this.getPlus1DayId(5)} 
						          onClick={this.onClickSetDateStringAHtml}>{this.getPlus1Day(5)}</a><space> </space>
						<a  lang="fi" href="." id={'dayname_'+this.getPlus1DayId(6)} 
							      onClick={this.onClickSetDateStringAHtml}>{this.getPlus1Day(6)}</a><space> </space>
						<a  lang="fi" href="." id={'dayname_'+this.getPlus1DayId(7)} 
						             onClick={this.onClickSetDateStringAHtml}>{this.getPlus1Day(7)}</a><space> </space>
						<a  lang="fi" href="." id={'dayname_'+this.getPlus1DayId(8)} 
						             onClick={this.onClickSetDateStringAHtml}>{this.getPlus1Day(8)}</a><space> </space>
						<a  lang="fi" href="." id={'dayname_'+this.getPlus1DayId(9)} 
						           onClick={this.onClickSetDateStringAHtml}>{this.getPlus1Day(9)}</a><space> </space>
						<a  lang="fi" href="." id={'dayname_'+this.getPlus1DayId(10)} 
							        onClick={this.onClickSetDateStringAHtml}>{this.getPlus1Day(10)}</a><space> </space>
						<a  lang="fi" href="." id={'dayname_'+this.getPlus1DayId(11)} 
									onClick={this.onClickSetDateStringAHtml}>{this.getPlus1Day(11)}</a><space> </space>
						<a  lang="fi" href="." id={'dayname_'+this.getPlus1DayId(12)} 
									onClick={this.onClickSetDateStringAHtml}>{this.getPlus1Day(12)}</a><space> </space>
						<a  lang="fi" href="." id={'dayname_'+this.getPlus1DayId(13)} 
									onClick={this.onClickSetDateStringAHtml}>{this.getPlus1Day(13)}</a><space> </space>
						<a  lang="fi" href="." id={'dayname_'+this.getPlus1DayId(14)} 
									onClick={this.onClickSetDateStringAHtml}>{this.getPlus1Day(14)}</a><br/>
						</div>
			</div>
			</div>
		);
	}
}
