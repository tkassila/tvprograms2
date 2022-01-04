import { h, Component, createRef } from 'preact';
//import Card from 'preact-material-components/Card';
//import 'preact-material-components/Card/style.css';
//import 'preact-material-components/Button/style.css';
//import Select from 'preact-material-components/Select';
//import 'preact-material-components/List/style.css';
//import 'preact-material-components/Menu/style.css';
//import 'preact-material-components/Select/style.css';
//import Radio from 'preact-material-components/Radio';
//import FormField from 'preact-material-components/FormField';
//import 'preact-material-components/FormField/style.css';
import style from './style';
import Config from '../../utils/Config';
// import 'whatwg-fetch';
import { fetchJsonp } from 'fetch-jsonp';
import DayGrid from './DayServices';


// import StaticFunctions from '../../utils/StaticFunctions';

export default class YleProgram extends Component {

	constructor(props)
	{
		super(props);
		if(Config.bDebug) 
		{
			console.log("YleProgram.js");
			console.log("props");
			console.log(props);
		}

		let today = new Date(Date.now());
		this.state = {
			errmsg: null,
		}

	 }

	componentDidMount()
	{
		if(Config.bDebug) 				
			console.log("componentDidMount 1");
		//this.abortController = new AbortController(); // 1        
		// this.abortSignal = this.abortController.signal; // 2
		// this.fetchProgSchedules();		
	}

	componentWillReceiveProps(nextProps) 
	{
	  if (Config.bDebug)
	  {
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

    render(props, state) {
		console.log("yleprogram render");
		console.log("state");
		console.log(state);
		console.log("props");
		console.log(props);
		console.log("before render");

		return (			
			<div >
				<h4>{props.data.content.title.fi ? props.data.content.title.fi : props.data.content.title.sv}</h4>
				{props.bShowDesciption && <p>{props.data.content.description.fi ? props.data.content.description.fi : props.data.content.description.sv}</p> }
			</div>
		);
	}
}
