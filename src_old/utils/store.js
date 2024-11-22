
import createStore from '../unistore';

let bSSEeventsExistsInBrowser = false;

if(typeof(EventSource) !== "undefined") {
    // Yes! Server-sent events support!
    // Some code.....1
    console.info("typeof(EventSource) supported!");
    bSSEeventsExistsInBrowser = true;
  } else {
    // Sorry! No server-sent events support..
    bSSEeventsExistsInBrowser = false;
  }

const initialStore = { tabIndex: 0, 
    fetchitems: [], channeltypeitems: [], programtypeitems: [], 
    channels: [], bDisplayAllDescriptions: false, categories: [],
    bSearchButtonClicked: false, textSearch: null, screen: null,
 };

const store = createStore(initialStore);
// const store = process.env.NODE_ENV === 'production' ?  createStore(initialState) : devtools(createStore(initialState));
// store.subscribe( state => console.log("subscribe: " +state) );
// store.setState({ c: 'd' }); 

export default store;