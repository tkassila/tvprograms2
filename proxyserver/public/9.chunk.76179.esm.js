(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"2fTU":function(e,t,l){"use strict";function n(e,t,l){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var l=e[Symbol.toPrimitive];if(void 0!==l){var n=l.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[t]=l,e}var a=l("hosL"),s=l("kSFl"),o=l.n(s),i="odialog__C8B3T",c=l("x2AU"),h=l("nclG"),r=l.n(h),d=l("c/K1"),u=l.n(d);l("aejN");t.a=class extends a.Component{constructor(e){super(e),n(this,"dialogRef",null),n(this,"closeButtonRef",null),n(this,"channelHeader",null),n(this,"dialogBttnPressed",(e=>{e.preventDefault(),this.dialogRef.MDComponent.show()})),n(this,"open",(()=>{this.dialogRef.current.MDComponent.show(),c.a.bDebug&&console.log("before closeButtonRef.current.focus"),this.closeButtonRef.current.focus(),c.a.bDebug&&console.log("dialog componentDidMount: dialogRef="+this.dialogRef)})),n(this,"close",(()=>{this.dialogRef.current.MDComponent.close()})),n(this,"cancelBttnPressed",(e=>{e.preventDefault(),this.dialogRef.current.MDComponent.close(),this.props.cancelButtonPressed(e)})),n(this,"okBttnPressed",(e=>{e.preventDefault(),c.a.bDebug&&console.log("dialog okBttnPressed: dialogRef="+this.dialogRef),this.dialogRef.current.MDComponent.close(),this.props.okButtonPressed(e)})),n(this,"changeThemeBttnPressed",(e=>{e.preventDefault();(0,Omiu.setTheme)("primary","green")})),n(this,"enterKeyDown",(e=>{e=e||window.event;c.a.bDebug&&console.log("Dialog pressed");if(13===e.keyCode)this.dialogRef.current.MDComponent.close(),this.props.okButtonPressed(e)})),this.state={dialogid:o()("dialog-")},this.closeButtonRef=Object(a.createRef)(),this.dialogRef=Object(a.createRef)()}componentDidMount(){}render(e,t){return c.a.bDebug&&(console.log("->"),console.log(e),console.log(t),console.log("<-")),Object(a.h)(a.Fragment,null,Object(a.h)(r.a,{ref:this.dialogRef,role:"dialog",id:"dialogtheme","aria-modal":"true",style:i},Object(a.h)(r.a.Header,{lang:"fi",tabIndex:"0"},e.title),Object(a.h)(r.a.Body,{scrollable:!0},Object(a.h)(u.a,null,Object(a.h)("div",{class:"card-header"},e.children?e.children:null),Object(a.h)(u.a.Media,{className:"card-media"}))),Object(a.h)(r.a.Footer,null,Object(a.h)("div",{onKeyDown:this.enterKeyDown},Object(a.h)("span",null),Object(a.h)("span",{slot:"footer",class:"dialog-footer"},void 0!==e.cancelButtonPressed?Object(a.h)("button",{style:" margin: 15px;  height: 30px; background: blue; color: white;",id:"cancelBtn",tabIndex:"0",type:"primary",onClick:this.cancelBttnPressed},void 0!==e.cancelText?e.cancelText:"Cancel"):null,void 0!==e.okButtonPressed?Object(a.h)("button",{id:"okBtn",tabIndex:"0",style:" margin: 15px;  height: 30px; background: blue; color: white;",onClick:this.okBttnPressed,type:"primary",autofocus:!0,ref:this.closeButtonRef},void 0!==e.okText?e.okText:"Ok"):null)))))}}},IKRQ:function(e,t,l){"use strict";var n=l("hosL");t.a=e=>{const t=Date.now();return Object(n.h)(n.Fragment,null,Object(n.h)("button",{type:"primary",onClick:e.onClick,tabIndex:"0",disabled:e.disabled,id:e.id?e.id:t,style:void 0!==e.style?e.style+" height: 30px; background: blue; ":" height: 30px; background: blue; ",class:void 0!==e.class?e.class:null},e.text))}},OXlV:function(e,t,l){"use strict";var n=l("hosL"),a=l("x2AU");t.a=class extends n.Component{constructor(e){super(e),a.a.bDebug&&(console.log("SwitchCheckBox.js"),console.log("props"),console.log(e)),this.state={errmsg:null},this.chechRef=Object(n.createRef)()}render(e,t){const l="float: none; display: inline-block; vertical-align: middle; ";return Object(n.h)(n.Fragment,null,Object(n.h)("input",{lang:"fi",tabIndex:"0",type:"checkbox",onChange:e.onChange,className:"form-check-input filled-in",ref:e.propref,style:l,id:void 0===e.inputid?"idcheckboxundef":e.inputid,checked:void 0!==e.checked&&e.checked}),Object(n.h)("label",{lang:"fi",style:"margin-left: 5px;",class:"container",style:l,for:void 0===e.inputid?"idcheckboxundef":e.inputid,id:void 0===e.inputid?"idcheckboxundef-label":e.inputid+"-label"},e.labeltext))}}},QJdj:function(e,t,l){"use strict";function n(){return n=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n])}return e},n.apply(this,arguments)}function a(e,t,l){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var l=e[Symbol.toPrimitive];if(void 0!==l){var n=l.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[t]=l,e}function s(e,t,l){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var l=e[Symbol.toPrimitive];if(void 0!==l){var n=l.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[t]=l,e}l.r(t),l.d(t,"default",(function(){return k}));var o=l("hosL"),i=l("x2AU"),c="home__PEN99",h=l("IKRQ"),r=l("2fTU"),d=l("OXlV"),u=l("vqXW"),g=l.n(u),b=l("rnI4"),p=l("XmHI"),m=function(e){let t=null;return null!==e.data.channelprograms&&(t=e.data.channelprograms.map(((t,l)=>Object(o.h)(p.a,{id:"telkkuchannel"+l,data:t,displayAllDescriptions:e.displayAllDescriptions,getPOfIndex:e.getPOfIndex,themevalue:e.themevalue,showSearch:null!=e.showSearch&&e.showSearch,channel:e.data.title})))),Object(o.h)("div",null,Object(o.h)("h3",{tabIndex:"0",lang:"fi","aria-label":e.data.title},e.showSearch&&null!=e.data.titleindex?e.getPOfIndex(e.data.titleindex,e.data.title,this.props.themevalue):e.data.title.toString().replace("Telkussa: ","")),Object(o.h)("div",null,t))};class f extends o.Component{constructor(e){var t;super(e),t=this,a(this,"store",null),a(this,"fetch_url_telkku",null),a(this,"showAllDescrRef",null),a(this,"showOneChannelRef",null),a(this,"selectChannelRef",null),a(this,"const_showChannelsAtSameTime",10),a(this,"_mounted",!1),a(this,"scrollingDlgRef",null),a(this,"tablCntl",null),a(this,"showTableBordersRef",null),a(this,"sectionStyle",null),a(this,"tablesectionStyle",null),a(this,"sectionRef",null),a(this,"section_width",null),a(this,"section_width_css",void 0),a(this,"getSectionWidthCss",(()=>"width: "+this.section_width+"px;")),a(this,"fetchRssTelkkuPrograms",(async function(e,l){if(!t._mounted)return;if(i.a.bDebug&&console.log("fetchRssTelkkuPrograms"),t.state.bAllChannelsLoaded)return;if(t.state.bUnderFetch)return;t.setState({bUnderFetch:!0});let n=1,a=10;void 0!==e&&(n=e),void 0!==l&&(a=l),t.state.fetcheddata=null,t.state.fetcheditems=[],null!=t.state.channels&&t.state.channels.length>0&&(t.state.fetcheditems=t.state.channels),t.scrollingDlgRef.current.open();try{for(;t.fetcheddata=await t.fetchRssTelkkuChannel(n),null!==t.fetcheddata&&(t.state.fetcheditems.push(t.fetcheddata),n!==a||-1===a)&&(n+=1,!t.state.bAllChannelsLoaded););}catch(e){if("Error: 500"!==e.message)return console.error("error"),console.error(e),t.setState({errmsg:e.message,bUnderFetch:!1}),void t.scrollingDlgRef.current.close();t.setState({bAllChannelsLoaded:!0})}i.a.bDebug&&(console.log("fetcheditems"),console.log(t.state.fetcheditems)),t.scrollingDlgRef.current.close(),t.setState({channels:t.state.fetcheditems,errmsg:null,bUnderFetch:!1,bLoadAllChannels:!1,bLoad10Channels:!1})})),a(this,"fetchRssTelkkuChannel",(async function(e){let l=t.fetch_url_telkku+e;i.a.bDebug&&(console.log("fetchRssTelkkuChannel 1"),console.log(l)),t.setState({channels:null,errmsg:null});let n=null;return await fetch(l,{method:"GET",timeout:6e3,headers:{"Content-Type":"application/rss+xml; charset=UTF-8",Accept:"*/*"},mode:"cors",signal:t.abortSignal}).then(t.handleErrors).then((e=>e.text())).then((e=>{-1==e.indexOf("<rss version=")?(n=null,t.setState({bAllChannelsLoaded:!0})):n=t.getJsonDataFromTelkkuRssXml(e)})).catch((e=>{throw console.error("error"),console.error(e),t.setState({errmsg:e.toString()}),new t.TelkkuException(e.toString())})),n})),a(this,"getJsonDataFromTelkkuRssXml",(e=>{let t=(new window.DOMParser).parseFromString(e,"text/xml"),l=t.getElementsByTagName("title")[0].childNodes[0].nodeValue;i.a.bDebug&&(console.log("channeltitle"),console.log(l));let n={};n.title=l;const a=t.querySelectorAll("item");return i.a.bDebug&&(console.log("xmlitems"),console.log(a)),null==a||null==a?null:(n.channelprograms=[],a.forEach((e=>{void 0!==e&&n.channelprograms.push(this.getChannelProgramFromXml(e))})),i.a.bDebug&&(console.log("json"),console.log(n)),n)})),a(this,"getChannelProgramXmlValue",(e=>{if(null==e||NaN===e)return console.log("json"),console.log(json),null;let t=e[0];if(null==t||NaN===t)return console.log("item1"),console.log(t),null;let l=t.childNodes[0];if(null==l||NaN===l)return i.a.bDebug&&(console.log("childNode1"),console.log(l)),null;let n=l.nodeValue;return null==n||NaN===n?(console.log("nodeValue1"),console.log(n),null):n})),a(this,"getChannelProgramFromXml",(e=>{i.a.bDebug&&(console.log("item"),console.log(e));let t={};return t.title=this.getChannelProgramXmlValue(e.getElementsByTagName("title")),t.description=this.getChannelProgramXmlValue(e.getElementsByTagName("description")),t.pubdate=this.getChannelProgramXmlValue(e.getElementsByTagName("pubDate")),t.link=this.getChannelProgramXmlValue(e.getElementsByTagName("link")),t})),a(this,"handleErrors",(e=>{if(!e.ok)throw console.log("response"),console.log(e),console.log(e.status),Error(e.status);return e})),a(this,"showOneChannel",(e=>{e.preventDefault(),this.setState(e.target.checked?{showChannelsAtSameTime:1,bCheckShowChannelsAtSameTime:!0,bSearchButtonClicked:!1}:{showChannelsAtSameTime:this.const_showChannelsAtSameTime,selectedchannelindex:-1,bCheckShowChannelsAtSameTime:!1})})),a(this,"showAllDescriptions",(e=>{e.preventDefault();let t=e.target.checked;i.a.bDebug&&console.log("showAllDescriptions");let l=t;i.a.bDebug&&console.log("bValue"),i.a.bDebug&&console.log(l),this.setState({bDisplayAllDescriptions:l})})),a(this,"getPOfIndex",((e,t,l)=>{i.a.bDebug&&console.log("getPOfIndex");let n=this.state.textSearch;if(i.a.bDebug&&(console.log("textSearch"),console.log(n)),null==t||null==t)return"";if(i.a.bDebug&&(console.log("txt"),console.log(t),console.log("index"),console.log(e)),null==e||null==e||e<0||t.length<=e)return t;if(null==n||null==n||0==n.toString().trim().length)return t;let a=t.substring(0,e),s=t.substring(e,e+n.length),c=t.substring(e+n.length);i.a.bDebug&&(console.log("first"),console.log(a),console.log("between"),console.log(s),console.log("last"),console.log(c));let h=null!=a&&null!=a&&0!=a.trim().length?Object(o.h)("span",{style:"margin-right: 0px; margin-left: 0px; padding: 0px;"},a):"",r="background-color: green; color: white; margin-right: 0px; margin-left: 0px; padding: 0px;";"--dark"===l&&(r="background-color: yellow; color: black; margin-right: 0px; margin-left: 0px; padding: 0px;");let d=Object(o.h)("span",{style:r},s),u=null!=c&&null!=c&&0!=c.trim().length?Object(o.h)("span",{style:"margin-right: 0px; margin-left: 0px; padding: 0px;"},c):"",g=Object(o.h)("div",null,h,d,u);return i.a.bDebug&&(console.log("newvalue_first"),console.log(h),console.log("newvalue_between"),console.log(d),console.log("newvalue_last"),console.log(u)),i.a.bDebug&&(console.log("newvalue"),console.log(g)),g})),a(this,"getTableHeadersAndTableRowsAfterChannels",(()=>{let e=null,t=null;i.a.bDebug&&(console.log("getTableHeadersAndTableRowsAfterChannels"),console.log("this.state.bCheckShowChannelsAtSameTime"),console.log(this.state.bCheckShowChannelsAtSameTime),console.log("this.state.selectedchannelindex"),console.log(this.state.selectedchannelindex),console.log(this.state));if(this.state.bSearchButtonClicked){if(null==this.state.channels){e=[],t=[];let l={};return l.headers=e,l.channels=t,l}const l=this.state.textSearch;if(null!=l&&l.toString().trim().length>0){let a=-1,s=[],c=[],h=!1,r=!1,d=l.toUpperCase(),u={},g=this.state.channels;if(console.log("before filter search"),console.log("this.state.bCheckShowChannelsAtSameTime"),console.log(this.state.bCheckShowChannelsAtSameTime),console.log("this.state.selectedchannelindex"),console.log(this.state.selectedchannelindex),this.state.bCheckShowChannelsAtSameTime&&-1!=this.state.selectedchannelindex){console.log("filter search bCheckShowChannelsAtSameTime");let e=g[this.state.selectedchannelindex].title,t=g.filter((t=>t.title===e));g=t}Array.from(g).forEach((e=>{u={},a=-1,h=!1,void 0!==e&&(n(u,e),i.a.bDebug&&(console.log("chcoopy"),console.log(u),console.log("chcoopy.channelprograms"),console.log(u.channelprograms)),u.title&&(u.title=u.title.toString().replace("Telkussa: ","")),a=u.title?u.title.toUpperCase().indexOf(d):-1,-1!=a&&(u.titleindex=a,h=!0),c=[],Array.from(u.channelprograms).forEach((e=>{r=!1,void 0!==e&&(a=e.title?e.title.toUpperCase().indexOf(d):-1,-1!=a&&(e.titleindex=a,h=!0,r=!0),a=e.description?e.description.toUpperCase().indexOf(d):-1,-1!=a&&(e.descriptionindex=a,h=!0,r=!0),r&&c.push(e))})),h&&(u.channelprograms=null!=c&&0!=c.length?c:e.channelprograms,s.push(u)))})),null==s&&0==s.length?(e=[],t=[]):(e=s.map((e=>e.title.replace("Telkussa: ",""))),t=s.map(((e,t)=>Object(o.h)(m,{id:"telkkuchannel"+t,data:e,showSearch:!0,getPOfIndex:this.getPOfIndex,themevalue:this.props.themevalue,displayAllDescriptions:this.state.bDisplayAllDescriptions}))))}else e=this.state.channels.map((e=>e.title.replace("Telkussa: ",""))),t=this.state.channels.map(((e,t)=>Object(o.h)(m,{id:t,data:e,themevalue:this.props.themevalue,displayAllDescriptions:this.state.bDisplayAllDescriptions})))}else if(this.state.bCheckShowChannelsAtSameTime&&-1!=this.state.selectedchannelindex){console.log("filter");let l=this.state.channels[this.state.selectedchannelindex].title,n=this.state.channels.filter((e=>e.title===l));e=n.map((e=>e.title.replace("Telkussa: ",""))),t=n.map(((e,t)=>Object(o.h)(m,{id:t,data:e,themevalue:this.props.themevalue,displayAllDescriptions:this.state.bDisplayAllDescriptions})))}else if(this.state.showChannelsAtSameTime==this.state.channels.length||this.state.showChannelsAtSameTime>this.state.channels.length)e=this.state.channels.map((e=>e.title.replace("Telkussa: ",""))),t=this.state.channels.map(((e,t)=>Object(o.h)(m,{id:t,data:e,themevalue:this.props.themevalue,displayAllDescriptions:this.state.bDisplayAllDescriptions})));else{let l=!1;if(this.state.showChannelsAtSameTime<this.state.channels.length){let n=Math.floor(this.state.currentChannelSetIndex*this.state.showChannelsAtSameTime),a=0==this.state.currentChannelSetIndex?this.state.showChannelsAtSameTime:Math.floor(this.state.currentChannelSetIndex*this.state.showChannelsAtSameTime+this.state.showChannelsAtSameTime);if(i.a.bDebug&&(console.log("min"),console.log(n),console.log("max"),console.log(a)),n<0?n=0:n>this.state.channels.length&&(n=this.state.channels.length,l=!0),a>this.state.channels.length&&(a=this.state.channels.length),!l){let l,s=[];for(l=n;l<a;l++)s.push(this.state.channels[l]);e=s.map((e=>e.title.replace("Telkussa: ",""))),t=s.map(((e,t)=>Object(o.h)(m,{id:t,data:e,themevalue:this.props.themevalue,displayAllDescriptions:this.state.bDisplayAllDescriptions})))}}else l=!0;l&&(e=this.state.channels.map((e=>e.title.replace("Telkussa: ",""))),t=this.state.channels.map(((e,t)=>Object(o.h)(m,{id:t,data:e,themevalue:this.props.themevalue,displayAllDescriptions:this.state.bDisplayAllDescriptions}))))}let l={};return l.headers=e,l.channels=t,l})),a(this,"textFieldChannelsAtSameTimeChanged",(e=>{e.preventDefault();let t=e.target.value;i.a.bDebug&&(console.log("textFieldChannelsAtSameTimeChanged"),console.log(t));let l=parseInt(t);i.a.bDebug&&(console.log("validNumber"),console.log(l)),NaN!=l&&null!=l?parseInt(l)<1?e.target.value=1:parseInt(l)>this.const_showChannelsAtSameTime?e.target.value=this.const_showChannelsAtSameTime:this.setState({showChannelsAtSameTime:l,currentChannelSetIndex:0}):e.target.value=this.const_showChannelsAtSameTime})),a(this,"calculateMaxChannelSetIndex",(()=>{if(i.a.bDebug&&console.log("calculateMaxChannelSetIndex"),null==this.state.channels)return 0;if(0===this.state.channels.length)return 0;if(this.state.bCheckShowChannelsAtSameTime)return 0;if(this.state.showChannelsAtSameTime>=this.state.channels.length)return 0;const e=this.state.channels.length/this.state.showChannelsAtSameTime;return i.a.bDebug&&(console.log("channelSets"),console.log(e)),0==e?0:e-1})),a(this,"nextChannelSetClicked",(e=>{e.preventDefault(),null!=this.state.channels&&0!=this.state.channels.length&&(this.state.currentChannelSetIndex>this.calculateMaxChannelSetIndex()?this.setState({currentChannelSetIndex:this.calculateMaxChannelSetIndex(),bSearchButtonClicked:!1}):this.state.currentChannelSetIndex!==this.calculateMaxChannelSetIndex()&&this.setState({currentChannelSetIndex:this.state.currentChannelSetIndex+1}))})),a(this,"prevChannelSetClicked",(e=>{e.preventDefault(),null!=this.state.channels&&0!=this.state.channels.length&&(this.state.currentChannelSetIndex<0?this.setState({currentChannelSetIndex:0}):0!==this.state.currentChannelSetIndex&&this.setState({currentChannelSetIndex:this.state.currentChannelSetIndex-1}))})),a(this,"loadMoreChannelClicked",(()=>{this.state.bAllChannelsHasLoaded||this.fetchRssTelkkuPrograms(null==this.state.channels||0==this.state.channels.length?1:this.state.channels.length+1,null==this.state.channels||0==this.state.channels.length?10:this.state.channels.length+10)})),a(this,"loadAllChannelClicked",(()=>{this.state.bAllChannelsHasLoaded||this.fetchRssTelkkuPrograms(null==this.state.channels?1:this.state.channels.length+1,-1)})),a(this,"searchTextFromChannelsClicked",(()=>{event.preventDefault(),i.a.bDebug&&console.log("searchTextFromChannelsClicked");const e=this.state.textSearch;if(i.a.bDebug&&(console.log("searchText 2 "),console.log(e)),null==e||null==e||0==e.trim().length)return;i.a.bDebug&&console.log("searchTextFromChannelsClicked 2 "),this.showAllDescrRef.current.checked||(this.showAllDescrRef.current.checked=!0),this.setState({bSearchButtonClicked:!0,bDisplayAllDescriptions:!0}),this.forceUpdate()})),a(this,"textFieldSearchChanged",(e=>{e.preventDefault();const t=e.target.value;i.a.bDebug&&(console.log("textFieldSearchChanged"),console.log(t)),this.setState({textSearch:t,bSearchButtonClicked:!1})})),a(this,"abortFetchClicked",(e=>{e.preventDefault(),this.state.bUnderFetch&&(i.a.bDebug&&console.log("abortFetchClicked.abort()"),this.abortSignal.aborted||(this.abortController.abort(),this.setState({bUnderFetch:!1})))})),a(this,"getFetchedDate",(()=>{const e=this.state.today;if(null==e||null==e)return"";let t=e.getDate(),l=e.getMonth()+1;t<10&&(t="0"+t),l<10&&(l="0"+l);return t+"."+l+"."+e.getFullYear()})),a(this,"showTableBorders",(e=>{e.preventDefault();let t=e.target.checked;i.a.bDebug&&console.log("showTableBorders");let l=t;i.a.bDebug&&(console.log("bValue"),console.log(l)),this.setState({bShowTableBorder:l})})),a(this,"onClickDisplayDialog",(()=>{this.scrollingDlgRef.current.close()})),a(this,"getNextColumn",((e,t)=>{let l=null;return e&&null!=t&&e[t+1]&&(l=e[t+1]),l})),a(this,"getPrevColumn",((e,t)=>{let l=null;return e&&t&&e[t-1]&&(l=e[t-1]),l})),a(this,"getCurrentColumnIndex",(e=>{if(null==e||0===e.length)return null;i.a.bDebug&&(console.log("path"),console.log(e));let t,l,n=-1,a=0,s=e.length;const o="tablecol";for(a=0;a<s;a++)if(t=e[a],l=t.id.toString(),l&&l.includes(o)){let e=l.indexOf(o),t=l.substring(e+8);n=parseInt(t);break}return n})),a(this,"getH3OfCurrentColumn",(e=>{if(null==e||0===e.length)return null;i.a.bDebug&&(console.log("path"),console.log(e));let t,l,n=-1,a=0,s=e.length;const o="tablecol";for(a=0;a<s;a++)if(t=e[a],l=t.id.toString(),l&&l.includes(o)){let e=l.indexOf(o),a=l.substring(e+8);parseInt(a);if(n=t.childNodes[0],n){let e=n.childNodes[0];e&&(n=e)}break}return n})),a(this,"altPlusKeyUp",(e=>{let t=(e=e||window.event).keyCode||e.which;if(i.a.bDebug&&console.log("pressed"),e.altKey){i.a.bDebug&&(console.log("control key"),console.log("e.altKey"),console.log(e.altKey),console.log("keyCode"),console.log(t),console.log("e.keyCode"),console.log(e.keyCode),console.log("e"),console.log(e));let l=this.tablCntl.current.rows[1];const n=l.cells,a=l.colIndex,s=n.length,o=l.closest("td");i.a.bDebug&&(console.log("--- row"),console.log(l),console.log("--- cols"),console.log(n),console.log("--- lenCols"),console.log(s),console.log("--- currColInd"),console.log(a),console.log("--- currentCol"),console.log(o),console.log("--- this.tablCntl.current"),console.log(this.tablCntl.current));let c=null,h=null;switch(e.key){case"r":case"R":e.preventDefault(),h=document.activeElement,h&&h.innerHTML&&this.speakScreenReader(h.innerHTML.toString());break;case"c":case"C":if(e.preventDefault(),h=e.composedPath(),t=this.getH3OfCurrentColumn(h),t){const e=t.innerHTML.toString();e&&this.speakScreenReader(e)}break;case"o":case"O":e.preventDefault(),h=e.composedPath();let t=this.getH3OfCurrentColumn(h);t&&t.focus();break;case"k":case"K":if(e.preventDefault(),h=e.composedPath(),c=this.getCurrentColumnIndex(h),-1!==c&&c>0){const e=this.getPrevColumn(n,c);e&&e.focus()}break;case"a":case"A":if(e.preventDefault(),h=e.composedPath(),c=this.getCurrentColumnIndex(h),-1!==c&&c<s-1){const e=this.getNextColumn(n,c);e&&(i.a.bDebug&&(console.log("nextcol"),console.log(e)),e.focus())}}}})),a(this,"altPlusKeyUpProgramHeader",(e=>{let t=(e=e||window.event).keyCode||e.which;if(console.log("pressed"),e.altKey)switch(i.a.bDebug&&(console.log("control key"),console.log("e.altKey"),console.log(e.altKey),console.log("keyCode"),console.log(t),console.log("e.keyCode"),console.log(e.keyCode),console.log("e"),console.log(e)),e.key){case"m":case"M":if(document.getElementById("idprogramtableh3")){let e=document.getElementById("idprogramtableh3");e&&e.focus()}break;case"n":case"N":if(document.getElementById("divControl")){let e=document.getElementById("divControl");e&&e.focus()}break;case"j":case"J":this.nextChannelSetClicked(e);break;case"g":case"G":this.prevChannelSetClicked(e);break;default:return this.altPlusKeyUp(e)}})),a(this,"buttonHidePressed",(()=>{let e=!this.state.hideButton;var t=document.getElementById("hideDiv");t.style.display="none"===t.style.display?"block":"none",this.setState({hideButton:e,hideButtonText:e?"Näytä ohje":"Piilota ohje"})})),i.a.bDebug&&(console.log("Telkku.js"),console.log("props"),console.log(e)),this.store=e.store;let l=Date.now();this.state={errmsg:null,channels:null,currentchannel:null,bUnderFetch:!1,today:new Date(l),bDisplayAllDescriptions:!1,showChannelsAtSameTime:this.const_showChannelsAtSameTime,selectedchannelindex:-1,bCheckShowChannelsAtSameTime:!1,currentChannelSetIndex:0,bUnderFetch:!1,bAllChannelsLoaded:!1,textSearch:null,bSearchButtonClicked:!1,bShowTableBorder:!1,bLoadAllChannels:!1,bLoad10Channels:!1,fetcheddata:null,fetcheditems:[],sectionwidth:0,screenreaderdiv:"",hideButton:!1,hideButtonText:"Piilota ohje"};let s=e.themevalue;this.sectionStyle=void 0!==s&&""!==s?" border:1px solid pink; padding:15px;  margin:10px; background: black; color: white; "+(null==this.section_width_css?"":this.section_width_css):" border:1px solid black; padding:15px;  margin:10px; background: white; color: black;"+(null==this.section_width_css?"":this.section_width_css),this.tablesectionStyle=void 0!==s&&""!==s?" border:1px solid pink; padding:15px;  margin:10px; background: black; color: white; ":" border:1px solid black; padding:15px;  margin:10px; background: white; color: black;",this.fetch_url_telkku=i.a.http_curlserver+"/telkku/",this.TelkkuException=this.TelkkuException.bind(this),this.removelisteners=this.removelisteners.bind(this),this.showAllDescrRef=Object(o.createRef)(),this.showOneChannelRef=Object(o.createRef)(),this.selectChannelRef=Object(o.createRef)(),this.scrollingDlgRef=Object(o.createRef)(),this.tablCntl=Object(o.createRef)(),this.showTableBordersRef=Object(o.createRef)(),this.sectionRef=Object(o.createRef)()}componentWillReceiveProps(e){i.a.bDebug&&(console.log("Telkku componentWillReceiveProps nextProps"),console.log(e)),null!==e&&e.themevalue!=this.props.themevalue&&(this.setState({themevalue:e.themevalue}),this.sectionStyle=void 0!==e.themevalue&&""!==e.themevalue?" border:1px solid pink; padding:15px;  margin:10px; background: black; color: white; "+(null==this.state.sectionwidth?"":this.state.sectionwidth):" border:1px solid black; padding:15px;  margin:10px; background: white; color: black;"+(null==this.state.sectionwidth?"":this.state.sectionwidth))}componentDidMount(){i.a.bDebug&&console.log("componentDidMount 1"),this.abortController=new g.a,this.abortSignal=this.abortController.signal,this._mounted=!0,this.section_width=this.sectionRef.current.offsetWidth,i.a.bDebug&&console.log("kissa")}removelisteners(){this.abortSignal&&!this.abortSignal.aborted&&this.abortController.abort()}componentWillUnmount(){this.removelisteners(),this._mounted=!1}TelkkuException(e){this.message=e,this.name="TelkkuException"}speakScreenReader(e){document.getElementById("screenreaderdiv").innerHTML=e,this.setState({screenreaderdiv:e})}render(e,t){i.a.bDebug&&(console.log("state"),console.log(t));let l="";null!=t.fetcheditems&&t.fetcheditems.length>0&&(l=this.getSectionWidthCss(),this.section_width_css=l);let n=void 0!==e.themevalue&&""!==e.themevalue?"color: #FFF; background-color: black; border-color: #FFF;":"";const a="float: none; display: inline-block; vertical-align: middle; ",s="float: none; display: inline-block; vertical-align: middle; "+(void 0!==e.themevalue&&""!==e.themevalue?"":" color: white; ");i.a.bDebug&&(console.log("divDialogStyle"),console.log(n));let c="",u="black";t.bShowTableBorder&&("--dark"===e.themevalue&&(u="white"),c=" border: 1px solid "+u+";");let g=null,p=null,m=null,f=null;if(null!==t.channels){p=t.channels.map(((e,t)=>Object(o.h)("option",{value:e.title,id:t,selected:t===this.state.selectedchannelindex},e.title)));let e=this.getTableHeadersAndTableRowsAfterChannels();f=e.headers,g=e.channels,m=g,null!=g&&(m=g.map(((e,t)=>Object(o.h)("td",{id:"telkkutablecol"+t,lang:"fi",tabIndex:"0",style:"vertical-align: top; padding-left: 5px; padding-right: 5px; "+c},e))))}return Object(o.h)(o.Fragment,null,Object(o.h)("div",{id:"telkku_main_div",style:n,onKeyUp:this.altPlusKeyUpProgramHeader},Object(o.h)("div",{class:b.a.cardHeader},Object(o.h)("h1",{tabIndex:"0",lang:"fi",id:"focus_1_element"},"Telkku ",this.getFetchedDate()),Object(o.h)("section",{ref:this.sectionRef,style:""===this.state.themevalue?l:this.sectionStyle},Object(o.h)("div",{class:b.a.cardBody},Object(o.h)("div",{lang:"fi",tabIndex:"0","aria-labelled":"Miten ohjelmatiedot näytetään"},Object(o.h)("div",{style:{"background-color":"red",color:"yellow"},tabIndex:"0"},t.errmsg),Object(o.h)("div",{class:" mdc-typography--caption",tabIndex:"0",id:"divControl"},"Miten ohjelmatiedot näytetään:")),Object(o.h)("div",{class:b.a.cardBody},Object(o.h)("div",null,Object(o.h)("span",null,Object(o.h)(h.a,{tabIndex:"0",ripple:!0,raised:!0,disabled:null==t.channels||1==t.showChannelsAtSameTime&&t.bCheckShowChannelsAtSameTime||t.showChannelsAtSameTime>=t.channels.length,onClick:this.prevChannelSetClicked,style:s,"aria-label":"Aikaisemmat kanavat",text:"<"})),Object(o.h)("span",null,Object(o.h)("space",null," "),Object(o.h)(h.a,{tabIndex:"0",ripple:!0,raised:!0,disabled:null==t.channels||1==t.showChannelsAtSameTime&&t.bCheckShowChannelsAtSameTime||t.showChannelsAtSameTime>=t.channels.length,onClick:this.nextChannelSetClicked,style:s,"aria-label":"Seuraavat kanavat",text:">"})),Object(o.h)("span",null,Object(o.h)(d.a,{onChange:this.showAllDescriptions,propref:this.showAllDescrRef,inputid:"checkshowdescribtions",style:a,labeltext:"Näytä selitykset",checked:t.bDisplayAllDescriptions})),Object(o.h)("span",null,Object(o.h)(d.a,{onChange:this.showOneChannel,propref:this.showOneChannelRef,inputid:"checkshowonechannel",style:a,labeltext:"Näytä yksi kanava:",checked:t.bCheckShowChannelsAtSameTime}),Object(o.h)("select",{tabIndex:"0",selectedIndex:this.state.selectedchannelindex,disabled:1!==t.showChannelsAtSameTime,preselected:!0,outlined:!0,style:a,ref:this.selectChannelRef,onChange:e=>{this.setState({selectedchannelindex:e.target.selectedIndex,bSearchButtonClicked:!1})}},p)),Object(o.h)("space",null," "),Object(o.h)("span",null,Object(o.h)("label",{for:"input_number_columss",style:a},"Näytettävien kanavien lkm:"," "),Object(o.h)("input",{id:"input_number_columss",name:"input_number_columns",style:a,disabled:this.state.bCheckShowChannelsAtSameTime,type:"number",min:"1",max:"10",value:-1===this.state.showChannelsAtSameTime?"":this.state.showChannelsAtSameTime,onKeyUp:this.textFieldChannelsAtSameTimeChanged})),Object(o.h)("span",null,Object(o.h)("label",{for:"idsearchvalue"},"Etsi tekstiä ohjelmista:"),Object(o.h)("input",{id:"idsearchvalue",type:"text",tabIndex:"0",outlined:!0,disabled:null==t.channels||t.bUnderFetch,onKeyUp:this.textFieldSearchChanged,style:" width: 30%;"})),Object(o.h)("span",null,Object(o.h)(h.a,{tabIndex:"0",ripple:!0,raised:!0,style:a,disabled:null==t.channels||t.bUnderFetch,onClick:this.searchTextFromChannelsClicked,style:s,"aria-label":"Hae",text:"Hae"})),Object(o.h)("span",null,Object(o.h)(h.a,{tabIndex:"0",ripple:!0,raised:!0,disabled:t.bUnderFetch||t.bAllChannelsLoaded,onClick:this.loadMoreChannelClicked,style:s,text:"Lataa +10 kanavaa"})),Object(o.h)("span",null,Object(o.h)(h.a,{tabIndex:"0",ripple:!0,raised:!0,disabled:t.bUnderFetch||t.bAllChannelsLoaded,onClick:this.loadAllChannelClicked,style:s,text:"Lataa kaikki kanavat"})),Object(o.h)("space",null," "),Object(o.h)("span",null,Object(o.h)(d.a,{onChange:this.showTableBorders,style:a,propref:this.showTableBordersRef,inputid:"checkTableBorders",labeltext:"Näytä taulun raamit",checked:t.bShowTableBorder})),Object(o.h)("space",null," "),Object(o.h)("span",null,Object(o.h)(h.a,{tabIndex:"0",ripple:!0,raised:!0,disabled:!t.bUnderFetch,style:s,onClick:this.abortFetchClicked,text:"Keskeytä lataus"})))))),Object(o.h)("br",null),Object(o.h)("br",null),Object(o.h)("section",{style:""===this.state.themevalue?"":this.tablesectionStyle},Object(o.h)("div",{style:{"background-color":"red",color:"yellow"}},t.errmsg),Object(o.h)("div",{class:" mdc-typography--caption"},Object(o.h)("h3",{id:"idprogramtableh3",tabIndex:"0"},"Ohjelmataulukko ",Object(o.h)(h.a,{lang:"fi",ripple:!0,raised:!0,style:s,text:t.hideButtonText,id:"buttonHide",onClick:this.buttonHidePressed,"aria-label":"Näytä/Piilota teksi"})),Object(o.h)("div",{class:b.a.cardHeader,id:"hideDiv"},Object(o.h)("h3",{lang:"fi",tabIndex:"0"},'-- Ohjelmataulukko, liikutaan hiirellä tai taulukon sisällä seuraavilla näppäimillä: alt+a = seuraava kanava, alt+k = edellinen kanava sekä alt+o = liikutaan kanavan otsakkeeseen. Myös ensimmäisen kerran/sama kanava on mahdollista painaa alt+c:ää, jolloin ruudunlukuohjelma sanoo kanavan nimen, mutta selauskohta ei muutu. Samoin atl+r:lla toistetaan kerran/ohjelmatieto sen teksti. Ohjelman kuvailun saa näkymään tab näppäimellä ja enterillä tai hiirenklikkauksella. Taulukon sisällä toimivat myös tab sekä shift-tab näppäimet. Taulukon yläpuolelle tekstin "Ohjelmataulukko" kohdalle pääsee komennolla alt+a. Myös seuraavat näppäimet toimivat, kun kanavia enemmän kuin taulukossa näytetään: edelliset kanavat: alt+g ja seuraavat kanavat: alt+j. Alt+n vie suoraan miten taulukon ohjelmatiedot näytetään yläpuolelle.')),t.bSearchButtonClicked&&null!=t.textSearch?" (haun tulokset)":""),Object(o.h)("table",{id:"programtable",style:"width:100%",ref:this.tablCntl},Object(o.h)("tbody",null,Object(o.h)("tr",null,null),Object(o.h)("tr",null,m))))),Object(o.h)(r.a,{role:"dialog",id:"dialogloading","aria-labelledby":"h1loading","aria-modal":"false",lang:"fi",ref:this.scrollingDlgRef,title:"Odota!",themevalue:e.themevalue,okButtonPressed:this.onClickDisplayDialog,okText:"Sulje",scrollable:!0},Object(o.h)("div",{style:n},Object(o.h)("div",{class:"card-header"},Object(o.h)("h3",{lang:"fi",id:"h1loading",default:!0,tabIndex:"0",class:" mdc-typography--title"},"Hetkinen tietoja haetaan par'aikaa...")))),Object(o.h)("div",{id:"screenreaderdiv",tabindex:"0","aria-live":"priority || polite",class:"visually-hidden","aria-label":this.state.screenreaderdiv})))}}class k extends o.Component{constructor(e){super(e),s(this,"control",null),s(this,"removelisteners",(()=>{this.control.removelisteners()})),i.a.bDebug&&(console.log("YleRoute.js"),console.log("props"),console.log(e)),this.state={errmsg:null},this.control=Object(o.createRef)()}componentDidMount(){i.a.bDebug&&console.log("componentDidMount 1")}render(e,t){return Object(o.h)("div",{class:`${c} page`},Object(o.h)(f,{store:e.store,ref:this.control,themevalue:e.themevalue}),Object(o.h)("div",{style:{"background-color":"red",color:"yellow"}},t.errmsg))}}},XmHI:function(e,t,l){"use strict";var n=l("hosL"),a=l("QRet"),s=l("2fTU");l("x2AU");t.a=function(e){const[t,l]=Object(a.d)(!1),o=Object(a.c)(null),i=l=>{l.preventDefault(),e.displayAllDescriptions||(t||o.current.open(),c())},c=()=>h(!t),h=e=>{l(e)},r=e=>{e.preventDefault(),o.current.close(),c()};return Object(n.h)("div",null,Object(n.h)("div",null,Object(n.h)("div",{onClick:i,onKeyDown:e=>{e=e||window.event;console.log("pressed");if(13===e.keyCode)i(e)}},Object(n.h)("p",{lang:"fi",tabIndex:"0"},Object(n.h)("b",null,e.showSearch&&null!=e.data.titleindex?e.getPOfIndex(e.data.titleindex,e.data.title):e.data.title)),e.displayAllDescriptions?Object(n.h)(n.Fragment,null,Object(n.h)("p",{lang:"fi",tabIndex:"0"},e.showSearch&&null!=e.data.descriptionindex?e.getPOfIndex(e.data.descriptionindex,e.data.description,e.themevalue):e.data.description),null!=e.data.link||null!=e.data.link?Object(n.h)("p",null,Object(n.h)("a",{lang:"fi",href:e.data.link,onClick:e=>{console.log("openHtmlPage"),e.preventDefault();let t=e.target.href;return console.log("blankurl"),console.log(t),window.open(t,"_blank","Telkussa"),!1}},"ohjelmalinkki")):null):null),Object(n.h)(s.a,{role:"dialog",id:"telkkudialogshowporg","aria-labelledby":"h1loading","aria-modal":"false",lang:"fi",ref:o,title:e.channel?e.channel.replace("Telkussa: ",""):"",okButtonPressed:r,okText:"Sulje",scrollable:!0,themevalue:e.themevalue},Object(n.h)("div",{class:"card-header",style:"color: #FFF; background-color: black; border-color: #FFF;"},Object(n.h)("h3",{lang:"fi",id:"h3program",tabIndex:"0",class:" mdc-typography--title"},e.data.title),Object(n.h)("h3",{lang:"fi",tabIndex:"0",class:" mdc-typography--title"},e.data.description),Object(n.h)("br",null)))))}},rnI4:function(e,t){"use strict";t.a={home:"home__wog+i",cardHeader:"cardHeader__dyMRZ",cardBody:"cardBody__M1xly"}}}]);
//# sourceMappingURL=9.chunk.76179.esm.js.map