import { h, Component, createRef } from "preact";
//import Card from 'preact-material-components/Card';
//import 'preact-material-components/Card/style.css';
//import 'preact-material-components/Button/style.css';

import Config from "../../utils/Config";
import style from "./style";
// import Category from './Category';
// import GridOrList from './GridOrList';
import YleHtml from "../../components/ylehtml/YleHtml";

// import StaticFunctions from '../../utils/StaticFunctions';

export default class YleRoute extends Component {
  constructor(props) {
    super(props);
    if (Config.bDebug) {
      console.log("TelkkuRoute.js");
      console.log("props");
      console.log(props);
    }

    this.state = {
      errmsg: null,
    };
    this.control = createRef();
  }

  componentDidMount() {
    if (Config.bDebug) console.log("componentDidMount 1");
    // this.fetchProgCategories();
  }

  removelisteners = () => {
    this.control.removelisteners();
  };

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
      <div class={`${style.home} page`}>
        <YleHtml store={props.store} themevalue={props.themevalue} />
        <div style={{ "background-color": "red", color: "yellow" }}>
          {state.errmsg}
        </div>
      </div>
    );
  }
}

/*
						<FormField>
							<Radio id="radio_yle" name='optsource' 
							    checked={state.progsource == 'radio_yle'}
								onChange={this.radioProgSourceChanged} ></Radio>
							<label for="radio_yle">Yle</label>
						</FormField>
*/
