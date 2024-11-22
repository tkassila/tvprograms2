import { h, Component, createRef } from "preact";
//import Card from 'preact-material-components/Card';
//import 'preact-material-components/Card/style.css';
//import 'preact-material-components/Button/style.css';

import Config from "../../utils/Config";
import style from "./style";
// import Category from './Category';
// import GridOrList from './GridOrList';
import Amppari from "../../components/amppari/Amppari";

// import StaticFunctions from '../../utils/StaticFunctions';

export default class AmppariRoute extends Component {
  control = null;

  constructor(props) {
    super(props);
    if (Config.bDebug) {
      console.log("AmppariRoute.js");
      console.log("props");
      console.log(props);
    }

    this.state = {
      errmsg: null,
    };

    this.control = createRef();
  }

  componentDidMount() {
    if (Config.bDebug) console.log("AmppariRoute componentDidMount 1");
    const loadTime =
      window.performance.timing.domContentLoadedEventEnd -
      window.performance.timing.navigationStart;
    console.log("loadTime=" + loadTime);

    // this.fetchProgCategories();
  }

  removelisteners = () => {};

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

  // 	<div class={`${style.home} page`}>
  // 			</div>

  render(props, state) {
    return (
      <div class={`${style.home} page`}>
        <Amppari store={props.store} themevalue={props.themevalue} />
        <div style={{ "background-color": "red", color: "yellow" }}>
          {state.errmsg}
        </div>
      </div>
    );
  }
}
