import { h, Component, createRef, Fragment } from 'preact';
//import Card from 'preact-material-components/Card';
//import 'preact-material-components/Card/style.css';
//import 'preact-material-components/Button/style.css';

import Config from '../../utils/Config';
import style from './style';
import HtmlAmppari from '../../components/amppari/HtmlAmppari';

export default class HtmlAmppariRoute extends Component {

    control = null;
    
	constructor(props)
	{
		super(props);
		if(Config.bDebug) 
		{
			console.log("HtmlAmppariRoute.js");
			console.log("props");
			console.log(props);
		}

		this.state = {
			errmsg: null,
		}
		this.control = createRef();
	 }

	componentDidMount()
	{
		if(Config.bDebug) 				
			console.log("componentDidMount 1");
		// this.fetchProgCategories();		
	}

    removelisteners = () =>
    {
        this.control.removelisteners();
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
	
	
	render(props, state) {
				
		return (
				<Fragment>
                	<HtmlAmppari store={props.store} ref={this.control}
					themevalue={props.themevalue} /> 
					<div style={{ "background-color": 'red', color: "yellow" } }>{state.errmsg}</div>				
				</Fragment> 
		);
	}
}
