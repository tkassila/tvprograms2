import { h, Component, Fragment } from "preact";
import style from "./style";
import Config from "../../utils/Config";
// import moment from 'moment';
//import Button from 'preact-material-components/Button';
import Button from "../button/Button";
//import 'preact-material-components/Button/style.css';
//import TextField from 'preact-material-components/TextField';
//import 'preact-material-components/TextField/style.css';
//import 'preact-material-components/Theme/style.css';
//import Formfield from 'preact-material-components/FormField';
//import 'preact-material-components/Theme/style.css';

import dayjs from "dayjs";
import AmppariChannel from "./AmppariChannel";

export default class SearchPrograms extends Component {
  _mounted = false;
  store = null;
  unsubscribelistener = null;
  programtypeitems = [];
  textSearch = null;

  constructor(props) {
    super(props);
    if (Config.bDebug) {
      console.log("SearchPrograms.js");
      console.log("props");
      console.log(props);
    }

    this.store = props.store;
    let today = new Date(Date.now());
    this.state = {
      errmsg: null,
      programtypeitems: [],
      channeltypeitems: [],
      textSearch: null,
      bDisplayAllDescriptions: false,
      disabled: props.disabled,
    };
  }

  componentDidMount() {
    if (Config.bDebug) console.log("componentDidMount SearchPrograms");

    let keys = [];
    keys.push("programtypeitems");
    this.unsubscribelistener = this.store.subscribeAttributeNameListener(
      keys,
      (state) => this.listenerStoreChange2(state)
    );
    this.props.setRemoverFunction(this.removelisteners, "SearchPrograms");
    this._mounted = true;
  }

  componentWillUnmounted() {
    this.removelisteners();
  }

  componentWillReceiveProps(nextProps) {
    if (Config.bDebug) {
      console.log("SearchPrograms componentWillReceiveProps nextProps");
      console.log(nextProps);
    }
    if (!this._mounted) return;
    if (
      nextProps.disabled != undefined &&
      nextProps.disabled != null &&
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
      console.log("SearchPrograms listenerStoreChange2");
      console.log(storestate);
    }
    if (storestate === undefined || storestate === null) {
      console.log("SearchPrograms listenerStoreChange storestate");
      return;
    }
    if (!this._mounted) return;

    const programtypeitems = storestate.programtypeitems;
    if (programtypeitems == undefined || programtypeitems == null) return;
    if (programtypeitems == this.state.programtypeitems) return;

    /*
		if (Config.bDebug)
		{
			console.log("storestate change");
			console.log("storestate");
			console.log(storestate);
		}
		*/

    this.programtypeitems = programtypeitems;
    /*
		console.log("before programtypeitems");
		console.log(programtypeitems);
		*/
    const items = this.filterAfterSearch();
    this.setState({ programtypeitems: programtypeitems });
    let bSearchButtonClicked = false;
    let bDisplayAllDescriptions = false;
    if (items != this.programtypeitems) {
      bSearchButtonClicked = true;
      bDisplayAllDescriptions = true;
      this.props.setDisplayAllDescriptionsTrue(this.textSearch);
    }
    /*
		console.log("before store channels");
		console.log(items);
		*/
    this.store.setState({
      channels: items,
      bSearchButtonClicked: bSearchButtonClicked,
      textSearch: this.textSearch,
      bDisplayAllDescriptions: bDisplayAllDescriptions,
    });
  };

  searchTextFromChannelsClicked = (event) => {
    event.preventDefault();
    if (Config.bDebug) {
      console.log("searchTextFromChannelsClicked");
    }

    const searchText = this.textSearch;
    if (Config.bDebug) {
      console.log("searchText 2 ");
      console.log(searchText);
    }
    if (
      searchText == undefined ||
      searchText == null ||
      searchText.trim().length == 0
    )
      return;
    // to start make indirect the search:
    if (Config.bDebug) {
      console.log("searchTextFromChannelsClicked 2 ");
    }

    console.log("before programtypeitems filter");
    console.log(this.programtypeitems);
    this.programtypeitems = this.state.programtypeitems;
    this.setState({ bSearchButtonClicked: true });
    const items = this.filterAfterSearch(true);
    let bSearchButtonClicked = false;
    let bDisplayAllDescriptions = false;
    if (items != this.programtypeitems) {
      bSearchButtonClicked = true;
      bDisplayAllDescriptions = true;
      this.props.setDisplayAllDescriptionsTrue(this.textSearch);
    }
    this.setState({
      bSearchButtonClicked: true,
      bDisplayAllDescriptions: true,
    });
    console.log("before store channels");
    console.log(items);
    this.store.setState({
      channels: items,
      bSearchButtonClicked: bSearchButtonClicked,
      textSearch: this.textSearch,
      bDisplayAllDescriptions: true,
    });
    console.log("after store");
    console.log(this.store.getState());
    // this.forceUpdate();
  };

  makeSearchChange = (change) => {
    const bSearch = this.state.bSearchButtonClicked;
    if (
      /* bSearch && */ change === undefined ||
      change === null ||
      change.toString().trim().length == 0
    ) {
      this.textSearch = null;
      this.setState({ textSearch: null, bSearchButtonClicked: false });
      this.store.setState({
        channels: this.programtypeitems,
        bSearchButtonClicked: false,
        textSearch: null,
        bDisplayAllDescriptions: false,
      });
    } else this.textSearch = change;
  };

  textFieldSearchChanged = (event) => {
    event.preventDefault();
    const value = event.target.value;
    if (Config.bDebug) {
      console.log("textFieldSearchChanged");
      console.log(value);
    }
    this.makeSearchChange(value);
  };

  filterAfterSearch = (change) => {
    // if change parameter is undefined, then take value from state!
    // filterAfterSearch takes items from programtypeitems and populates: channels if there is a
    // ongoing search.
    let mychange = null;
    if (change == undefined) mychange = this.state.bSearchButtonClicked;
    else {
      mychange = change;
    }

    let bAllChannels = false;
    let foundedChannels = [];
    let foundedPrograms = [];

    if (Config.bDebug) {
      console.log("filterAfterSearch mychange");
      console.log(mychange);
    }

    this.channels = this.programtypeitems;
    if (mychange !== undefined && mychange !== null && mychange) {
      let all_channels = this.channels;
      //let all_channels = this.channels;
      if (Config.bDebug) {
        console.log("all_channels");
        console.log(all_channels);
        console.log("all_channels.length");
        console.log(all_channels.length);
      }

      if (all_channels == null) {
        return null; // this.setState({ bSearchButtonClicked: false, channels: null});
      } else {
        // const searchText = this.state.textSearch;
        const searchText = this.textSearch;
        if (Config.bDebug) {
          console.log("searchText");
          console.log(searchText);
        }
        if (searchText == null || searchText.toString().trim().length == 0) {
          //					this.setState({ bSearchButtonClicked: false,
          //						channels: all_channels});
        } else {
          let foundedChannelsTitle = null;
          let index = -1;
          let founded = false;
          let progfounded = false;
          let uppersearchText = searchText.toUpperCase();
          let chcoopy = {};

          let search_channels = all_channels;
          if (
            this.state.bCheckShowChannelsAtSameTime &&
            this.state.selectedchannelindex != -1
          ) {
            console.log("filter search bCheckShowChannelsAtSameTime");
            let selectedTitle =
              search_channels[this.state.selectedchannelindex].title;
            let filteredchannels = search_channels.filter((s, i) => {
              //	console.log("i");
              //	console.log(i);
              return s.title === selectedTitle;
            });
            search_channels = filteredchannels;
          }

          if (Config.bDebug) {
            console.log("search_channels");
            console.log(search_channels);
          }

          Array.from(search_channels).forEach((cha) => {
            chcoopy = {};
            index = -1;
            founded = false;
            if (cha === undefined) return;
            // this.state.channels.forEach(cha, i => {
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
            index = chcoopy.title
              ? chcoopy.title.toUpperCase().indexOf(uppersearchText)
              : -1;
            if (index != -1) {
              chcoopy.titleindex = index;
              founded = true;
              if (Config.bDebug) {
                console.log("founded channel title chcoopy");
                console.log(chcoopy);
              }
            }
            foundedPrograms = [];

            let prcopy = null;
            Array.from(chcoopy.channelprograms).forEach((pr) => {
              // cha.channelprograms.forEach(pr, i => {
              progfounded = false;
              prcopy = null;
              index = pr.title
                ? pr.title.toString().toUpperCase().indexOf(uppersearchText)
                : -1;
              if (index != -1) {
                if (prcopy == null) {
                  prcopy = {};
                  Object.assign(prcopy, pr);
                }
                prcopy.titleindex = index;
                /*
								prcopy.title = pr.title;
								prcopy.description = pr.description;
								prcopy.channel  = pr.channel;
								prcopy.id  = pr.id;
								prcopy.movie  = pr.movie;
								prcopy.sport  = pr.sport;
								prcopy.timestamp  = pr.timestamp;	
								*/

                founded = true;
                progfounded = true;
                if (Config.bDebug) {
                  console.log("founded program title");
                  console.log(prcopy);
                }
              }
              index = pr.description
                ? pr.description
                    .toString()
                    .toUpperCase()
                    .indexOf(uppersearchText)
                : -1;
              if (index != -1) {
                if (prcopy == null) {
                  prcopy = {};
                  Object.assign(prcopy, pr);
                }
                prcopy.descriptionindex = index;
                founded = true;
                /*
								prcopy.title = pr.title;
								prcopy.description = pr.description;
								prcopy.channel  = pr.channel;
								prcopy.id  = pr.id;
								prcopy.movie  = pr.movie;
								prcopy.sport  = pr.sport;
								prcopy.timestamp  = pr.timestamp;
								*/

                progfounded = true;
                if (Config.bDebug) {
                  console.log("founded program description");
                  console.log(prcopy);
                }
              }
              if (progfounded) foundedPrograms.push(prcopy);
            });

            if (founded) {
              if (foundedPrograms != null && foundedPrograms.length != 0)
                chcoopy.channelprograms = foundedPrograms;
              else chcoopy.channelprograms = cha.channelprograms;
              foundedChannels.push(chcoopy);
            }
          });

          if (foundedChannels == null || foundedChannels.length == 0) {
            // if (change == undefined)
            // this.setState({ bSearchButtonClicked: false,
            //	channels: null});
            this.channels = null;
          } else {
            if (Config.bDebug) {
              console.log("foundedChannels");
              console.log(this.foundedChannels);
              console.log("foundedChannels.length");
              console.log(foundedChannels.length);
            }
            /*
						this.setState({ bSearchButtonClicked: true, 
							channels: foundedChannels});
							*/
            this.channels = foundedChannels;
            return foundedChannels;
          }
        }
      }
    } else {
      //			this.setState({ bSearchButtonClicked: false,
      //				channels: this.state.programtypeitems });
    }
    return this.channels;
  };

  render(props, state) {
    if (Config.bDebug) {
      console.log("state");
      console.log(state);
    }

    const inputw =
      "float: none; display: inline-block; vertical-align: middle; ";
    const buttoninputw =
      "float: none; display: inline-block; vertical-align: middle; " +
      (props.themevalue !== undefined && props.themevalue !== ""
        ? ""
        : " color: white; ");

    return (
      <Fragment>
        <span>
          <label for="idsearchvalue" style={inputw}>
            Etsi tekstiä ohjelmista:
          </label>
          <input
            type="text"
            tabIndex="0"
            id="idsearchvalue"
            disabled={state.disabled}
            onKeyUp={this.textFieldSearchChanged}
            style={" width: 30%;" + inputw}
          />
          <space> </space>
          <Button
            tabIndex="0"
            ripple
            raised
            tabIndex="0"
            disabled={state.disabled}
            style={buttoninputw}
            onClick={this.searchTextFromChannelsClicked}
            aria-label="Hae"
            text="Hae"
          ></Button>
        </span>
      </Fragment>
    );
  }
}
