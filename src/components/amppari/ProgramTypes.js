import { h, Component, Fragment } from "preact";
import style from "./style";
import Config from "../../utils/Config";
// import moment from 'moment';
//import Select from 'preact-material-components/Select';
//import 'preact-material-components/List/style.css';
//import 'preact-material-components/Menu/style.css';
//import 'preact-material-components/Select/style.css';
//import Formfield from 'preact-material-components/FormField';
//import 'preact-material-components/Theme/style.css';

import dayjs from "dayjs";
//import AmppariChannel from './AmppariChannel';

//if (!season) {
//	throw new Error("Season is not defined")
//}

export default class ProgramTypes extends Component {
  _mounted = false;
  store = null;
  unsubscribelistener = null;
  arr_selecttyyppi_items = ["kaikki", "elokuvat", "urheilu"];
  channeltypeitems = [];
  programtypeitems = [];

  constructor(props) {
    super(props);
    if (Config.bDebug) {
      console.log("ProgramTypes.js");
      console.log("props");
      console.log(props);
    }

    this.store = props.store;
    let today = new Date(Date.now());
    this.state = {
      errmsg: null,
      selectedTyyppiinindex: 0,

      disabled: props.disabled,
    };
  }

  componentDidMount() {
    if (Config.bDebug) console.log("componentDidMount ProgramTypes");
    //  this.unsubscribelistener = this.store.subscribe( state => this.listenerStoreChange2(state) );
    let keys = [];
    keys.push("channeltypeitems");
    this.unsubscribelistener = this.store.subscribeAttributeNameListener(
      keys,
      (state) => this.listenerStoreChange2(state)
    );
    this.props.setRemoverFunction(this.removelisteners, "ProgramTypes");
    this._mounted = true;
  }

  componentWillReceiveProps(nextProps) {
    if (Config.bDebug) {
      console.log("ProgramTypes componentWillReceiveProps nextProps");
      console.log(nextProps);
    }
    if (!this._mounted) return;
    if (
      nextProps.disabled != undefined &&
      nextProps.disabled != this.props.disabled
    )
      this.setState({ disabled: nextProps.disabled });
  }

  removelisteners = () => {
    if (this.unsubscribelistener != null) {
      this.unsubscribelistener();
      this.unsubscribelistener = null;
    }
  };

  listenerStoreChange2 = (storestate) => {
    if (Config.bDebug) {
      console.log("ProgramTypes listenerStoreChange2");
      console.log(storestate);
    }
    if (storestate === undefined || storestate === null) {
      if (Config.bDebug)
        console.log("ChannnelTypes listenerStoreChange storestate");
      return;
    }
    if (!this._mounted) return;

    const fetchitems = storestate.channeltypeitems;
    if (fetchitems == this.state.channeltypeitems) return;

    if (Config.bDebug) {
      console.log("storestate.channeltypeitems change");
      console.log("storestate");
      console.log(storestate);
    }

    this.channeltypeitems = fetchitems;
    this.setState({ channeltypeitems: fetchitems });
    const items = this.filterAfterProgramType();
    this.store.setState({ programtypeitems: items });
  };

  componentWillUnmounted() {
    this.removelisteners();
  }

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
    return items;
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

  render(props, state) {
    if (Config.bDebug) {
      console.log("state");
      console.log(state);
    }

    // 			return <Select.Item id={i}>{child}</Select.Item>
    let selecttyyppi_items = this.arr_selecttyyppi_items.map((child, i) => {
      return (
        <option id={i} value={child}>
          {child}
        </option>
      );
    });

    return (
      <Fragment>
        <span>
          <label for="idprogramtype">Ohjelmatyyppi:</label>
          <select
            tabIndex="0"
            id="idprogramtype"
            disabled={state.disabled}
            selectedIndex={this.state.selectedTyyppiinindex}
            preselected
            outlined
            onChange={(e) => {
              console.log("e.target.target");
              console.log(e.target.text);
              const ind = e.target.selectedIndex;
              const selected = this.arr_selecttyyppi_items[ind];
              let changed = {};
              changed.ind = ind;
              changed.selected = selected;
              const items = this.filterAfterProgramType(changed);
              this.setState({
                selectedTyyppiinindex: ind,
                selectedtyyppi: selected,
                channels: items,
              });
              this.store.setState({
                programtypeitems: items,
                selectedtyyppi: selected,
              });
            }}
          >
            {selecttyyppi_items}
          </select>
        </span>
      </Fragment>
    );
  }
}
