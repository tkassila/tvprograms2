import { Component, Fragment } from "preact";
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
import AmppariChannel from "./AmppariChannel";

//if (!season) {
//	throw new Error("Season is not defined")
//}

export default class ChannelTypes extends Component {
  _mounted = false;
  store = null;
  unsubscribelistener = null;
  arr_selectchanneltypes = ["kaikki", "ilmaiset", "maksulliset"];
  fetcheditems = [];
  channeltypeitems = [];

  constructor(props) {
    super(props);
    if (Config.bDebug) {
      console.log("ChannnelTypes.js");
      console.log("props");
      console.log(props);
    }

    this.store = props.store;
    let today = new Date(Date.now());
    this.state = {
      errmsg: null,
      selectedsuodattimet: "kaikki",
      selectedsuodatinindex: 0,
      fetcheditems: [],
      channeltypeitems: [],
      disabled: props.disabled,
    };
  }

  componentDidMount() {
    if (Config.bDebug) console.log("componentDidMount ChannnelTypes");

    let keys = [];
    keys.push("fetchitems");
    this.unsubscribelistener = this.store.subscribeAttributeNameListener(
      keys,
      (state) => this.listenerStoreChange2(state)
    );
    this.props.setRemoverFunction(this.removelisteners, "ChannelTypes");
    this._mounted = true;
  }

  componentWillUnmounted() {
    this.removelisteners();
  }

  componentWillReceiveProps(nextProps) {
    if (Config.bDebug) {
      console.log("ChannnelTypes componentWillReceiveProps nextProps");
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
    if (storestate === undefined || storestate === null) {
      console.log("ChannnelTypes listenerStoreChange storestate");
      return;
    }
    if (!this._mounted) return;

    const fetchitems = storestate.fetchitems;
    if (fetchitems == this.state.fetchitems) return;

    if (Config.bDebug) {
      console.log("storestate.fetchitems change");
      console.log("storestate");
      console.log(storestate);
    }

    this.fetchitems = fetchitems;
    const items = this.filterChannesAfterChannelPay();
    this.channeltypeitems = items;
    this.setState({ fetchitems: fetchitems });
    this.store.setState({ channeltypeitems: items });
  };

  filterChannesAfterChannelPay = (channeltype) => {
    //  filterChannesAfterChannelPay takes items from fetcheditems and populates: channeltypeitems,
    let ind = null;
    let selected = null;
    let chtype = null;

    // const fitems = this.state.fetcheditems;
    const fitems = this.fetchitems;

    if (Config.bDebug) {
      console.log("filterChannesAfterChannelPay");
      console.log("channeltype");
      console.log(channeltype);
      console.log("fitems");
      console.log(fitems);
      console.log("fitems.size");
      console.log(fitems.length);
    }
    if (channeltype !== undefined) {
      ind = channeltype.ind;
      selected = channeltype.selected;
      chtype = channeltype.channeltype;
    } else {
      selected = this.state.selectedsuodattimet;
      ind = this.state.selectedsuodatinindex;
    }

    if (Config.bDebug) {
      console.log("filterChannesAfterChannelPay 2");
      console.log("ind");
      console.log(ind);
      console.log("selected");
      console.log(selected);
    }

    let chls = null;
    if (fitems == null) chls = null;
    else if (selected == undefined || selected == null) chls = fitems;
    else {
      if (selected == "kaikki") chls = fitems;
      else {
        let ret = null;
        if (selected === "ilmaiset") {
          ret = fitems.filter((s, i) => {
            //	console.log("i");
            //	console.log(i);
            return s.pay === false;
          });
        } else if (selected === "maksulliset") {
          ret = fitems.filter((s, i) => {
            //	console.log("i");
            //	console.log(i);
            return s.pay === true;
          });
        }
        chls = ret;
      }
    }

    if (Config.bDebug) {
      console.log("chls 2");
      console.log(chls);
    }

    if (Config.bDebug) {
      console.log("chls - channeltypeitems");
      console.log(chls);
      console.log("channeltypeitems.size");
      console.log(chls.length);
    }

    this.channeltypeitems = chls;

    // let chls = this.filterFetchedItemsIntoChannelsAfterSuodin(chtype);
    /*
		if (!bChange)
		this.setState({
			selectedsuodatinindex: ind,	
			selectedsuodattimet: selected,
			channeltypeitems: chls
		});
		else
		this.setState({
			selectedsuodatinindex: ind,	
			selectedsuodattimet: selected,
			channeltypeitems: chls,
			bCheckShowChannelsAtSameTime: true
		});
		*/

    if (Config.bDebug) {
      console.log("filterChannesAfterChannelPay 3");
      console.log(this.state);
    }
    return chls;
  };

  render(props, state) {
    if (Config.bDebug) {
      console.log("state");
      console.log(state);
    }

    // suodatus=ilmaiset,maksulliset,kaikki
    //return <Select.Item id={i}>{child}</Select.Item>
    let selectchanneltypes = this.arr_selectchanneltypes.map((child, i) => {
      return (
        <option value={child} id={i}>
          {child}
        </option>
      );
    });

    return (
      <Fragment>
        <span>
          <label for="idchanneltype">Kanavatyyppi:</label>
          <select
            tabIndex="0"
            disabled={state.disabled}
            id="idchanneltype"
            selectedIndex={this.state.selectedsuodatinindex}
            preselected
            outlined
            onChange={(e) => {
              console.log("e.target.target");
              console.log(e.target.text);
              const ind = e.target.selectedIndex;
              const selected =
                this.arr_selectchanneltypes[e.target.selectedIndex];
              let changed = {};
              changed.ind = ind;
              changed.selected = selected;
              let items = this.filterChannesAfterChannelPay(changed);
              this.setState({
                selectedsuodatinindex: ind,
                selectedsuodattimet: selected,
                channeltypeitems: items,
              });
              this.store.setState({ channeltypeitems: items });
            }}
          >
            {selectchanneltypes}
          </select>
        </span>
      </Fragment>
    );
  }
}
