(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{i3vL:function(t,e,n){"use strict";function i(t,e,n){return(e=function(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,e||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==typeof e?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e,n){return(e=function(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,e||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==typeof e?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.r(e),n.d(e,"default",(function(){return h}));var s=n("hosL"),r=n("x2AU"),l=(n("vqXW"),n("meR3")),o=n("jTUD"),c=n.n(o);class u extends s.Component{constructor(t){super(t),i(this,"store",null),i(this,"fetch_url_ampparissa",null),i(this,"arr_selecttyyppi_items",["kaikki","elokuvat","urheilu"]),i(this,"arr_selectchanneltypes",["kaikki","ilmaiset","maksulliset"]),i(this,"openHtmlAmppari",(t=>{window.open(this.fetch_url_ampparissa+"?aika="+this.state.selectedaika+"&pvm="+t+"&sanat="+this.state.searchsanat+"&suodatus="+this.state.selectedsuodattimet+"&tyyppi="+this.state.selectedtyyppi,"_blank","Ampparissa")})),i(this,"getPlus1Day",(t=>{const e=c()();let n=e;t>0&&(n=e.add(t,"days"));let i="";switch(new Date(n).getDay()){case 1:i="Ma";break;case 2:i="Ti";break;case 3:i="Ke";break;case 4:i="To";break;case 5:i="Pe";break;case 6:i="La";break;case 0:i="Su"}return i+" "+n.format("DD.MM.YYYY")})),i(this,"onClickSetDateStringAHtml",(t=>{t.preventDefault();let e=t.target.id;console.log("onClickSetDateStringAHtml"),console.log("dayparameter"),console.log(e);const n="dayname_";let i=e.indexOf(n);i>-1&&(e=e.substring(i+8).trim()),console.log("dayparameter"),console.log(e),console.log("onClickSetDateStringAHtml"),console.log(e),this.setState({selecteddate:new Date(Date.parse(e))}),this.openHtmlAmppari(e)})),i(this,"onClickSetDateStringold",(t=>{t.preventDefault();const e=t.target.text;this.setState({selecteddate:e}),this.openHtmlAmppari(e)})),i(this,"onClickSelectedAika",(t=>{t.preventDefault();const e=t.target.id,n=e.indexOf("_");if(n>-1){const t=e.substring(n+1);this.setState({selectedaika:t})}})),i(this,"getPlus1DayId",(t=>{const e=c()();let n=e;t>0&&(n=e.add(t,"days"));return n.format("YYYY-MM-DD")})),r.a.bDebug&&(console.log("HtmlAmppari.js"),console.log("props"),console.log(t)),this.store=t.store;new Date(Date.now());this.state={errmsg:null,selecteddate:null,selectedaika:"paiva",selectedsuodattimet:"kaikki",selectedtyyppi:"kaikki",selectedTyyppiinindex:0,selectedsuodatinindex:0,searchsanat:""},this.fetch_url_ampparissa="https://www.ampparit.com/tv"}componentDidMount(){r.a.bDebug&&console.log("componentDidMount 1")}render(t,e){r.a.bDebug&&(console.log("state"),console.log(e));let n=void 0!==t.themevalue&&""!==t.themevalue?"color: #FFF; background-color: black; border-color: #FFF;":"";let i=this.arr_selectchanneltypes.map(((t,e)=>Object(s.h)("option",{value:t,id:e},t))),a=this.arr_selecttyyppi_items.map(((t,e)=>Object(s.h)("option",{value:t,id:e},t)));return console.log("before HtmlAmppari render return"),Object(s.h)("div",{id:"htmlamppari_main_div",style:n},Object(s.h)("div",{class:l.a.cardHeader},Object(s.h)("br",null),Object(s.h)("br",null),Object(s.h)("h1",{tabIndex:"0",lang:"fi",id:"focus_1_element"},"Amppari.fi"),Object(s.h)("br",null),Object(s.h)("div",{class:l.a.cardHeader,tabIndex:"0",lang:"fi"},"Valitse seuraavista:"),Object(s.h)("div",{class:l.a.cardHeader},Object(s.h)("a",{id:"aikalink_nyt",lang:"fi",href:".",onClick:this.onClickSelectedAika},"Nyt ja seuraavaksi"),Object(s.h)("space",null," "),Object(s.h)("a",{id:"aikalink_tulevat",lang:"fi",href:".",onClick:this.onClickSelectedAika},"Tulevat"),Object(s.h)("space",null," "),Object(s.h)("a",{id:"aikalink_paiva",lang:"fi",href:".",onClick:this.onClickSelectedAika},"Koko päivä"),Object(s.h)("space",null," "),Object(s.h)("a",{id:"aikalink_ilta",lang:"fi",href:".",onClick:this.onClickSelectedAika},"Ilta (17-22)"),Object(s.h)("space",null," "),Object(s.h)("a",{id:"aikalink_yo",lang:"fi",href:".",onClick:this.onClickSelectedAika},"Yö (22-01)"),Object(s.h)("space",null," "),Object(s.h)("br",null)),Object(s.h)("div",null,Object(s.h)("span",null,Object(s.h)("div",{class:l.a.cardHeader,lang:"fi"},Object(s.h)("label",{for:"idchannels"},"Kanavat:"),Object(s.h)("space",null,"     "),Object(s.h)("select",{tabIndex:"0",selectedIndex:this.state.selectedsuodatinindex,preselected:!0,outlined:!0,id:"idchannels",onChange:t=>{console.log("e.target.target"),console.log(t.target.text),this.setState({selectedsuodatinindex:t.target.selectedIndex,selectedsuodattimet:this.arr_selectchanneltypes[t.target.selectedIndex]})}},i))),Object(s.h)("span",null,Object(s.h)("div",{class:l.a.cardHeader,lang:"fi"},Object(s.h)("label",{for:"idchanneltype"},"Ohjelmatyyppi:"),Object(s.h)("space",null,"     "),Object(s.h)("space",null,"     "),Object(s.h)("select",{tabIndex:"0",selectedIndex:this.state.selectedTyyppiinindex,preselected:!0,outlined:!0,id:"idchanneltype",onChange:t=>{console.log("e.target.target"),console.log(t.target.text),this.setState({selectedTyyppiinindex:t.target.selectedIndex,selectedtyyppi:this.arr_selecttyyppi_items[t.target.selectedIndex]})}},a)))),Object(s.h)("div",{class:l.a.cardHeader,lang:"fi",tabIndex:"0"},"Avaa html sivu päivämäärän mukaan:"),Object(s.h)("div",{class:l.a.cardHeader},Object(s.h)("a",{lang:"fi",href:".",id:"dayname_"+this.getPlus1DayId(0),onClick:this.onClickSetDateStringAHtml},this.getPlus1Day(0)),Object(s.h)("space",null," "),Object(s.h)("a",{lang:"fi",href:".",id:"dayname_"+this.getPlus1DayId(1),onClick:this.onClickSetDateStringAHtml},this.getPlus1Day(1)),Object(s.h)("space",null," "),Object(s.h)("a",{lang:"fi",href:".",id:"dayname_"+this.getPlus1DayId(2),onClick:this.onClickSetDateStringAHtml},this.getPlus1Day(2)),Object(s.h)("space",null," "),Object(s.h)("a",{lang:"fi",href:".",id:"dayname_"+this.getPlus1DayId(3),onClick:this.onClickSetDateStringAHtml},this.getPlus1Day(3)),Object(s.h)("space",null," "),Object(s.h)("a",{lang:"fi",href:".",id:"dayname_"+this.getPlus1DayId(4),onClick:this.onClickSetDateStringAHtml},this.getPlus1Day(4)),Object(s.h)("space",null," "),Object(s.h)("a",{lang:"fi",href:".",id:"dayname_"+this.getPlus1DayId(5),onClick:this.onClickSetDateStringAHtml},this.getPlus1Day(5)),Object(s.h)("space",null," "),Object(s.h)("a",{lang:"fi",href:".",id:"dayname_"+this.getPlus1DayId(6),onClick:this.onClickSetDateStringAHtml},this.getPlus1Day(6)),Object(s.h)("space",null," "),Object(s.h)("a",{lang:"fi",href:".",id:"dayname_"+this.getPlus1DayId(7),onClick:this.onClickSetDateStringAHtml},this.getPlus1Day(7)),Object(s.h)("space",null," "),Object(s.h)("a",{lang:"fi",href:".",id:"dayname_"+this.getPlus1DayId(8),onClick:this.onClickSetDateStringAHtml},this.getPlus1Day(8)),Object(s.h)("space",null," "),Object(s.h)("a",{lang:"fi",href:".",id:"dayname_"+this.getPlus1DayId(9),onClick:this.onClickSetDateStringAHtml},this.getPlus1Day(9)),Object(s.h)("space",null," "),Object(s.h)("a",{lang:"fi",href:".",id:"dayname_"+this.getPlus1DayId(10),onClick:this.onClickSetDateStringAHtml},this.getPlus1Day(10)),Object(s.h)("space",null," "),Object(s.h)("a",{lang:"fi",href:".",id:"dayname_"+this.getPlus1DayId(11),onClick:this.onClickSetDateStringAHtml},this.getPlus1Day(11)),Object(s.h)("space",null," "),Object(s.h)("a",{lang:"fi",href:".",id:"dayname_"+this.getPlus1DayId(12),onClick:this.onClickSetDateStringAHtml},this.getPlus1Day(12)),Object(s.h)("space",null," "),Object(s.h)("a",{lang:"fi",href:".",id:"dayname_"+this.getPlus1DayId(13),onClick:this.onClickSetDateStringAHtml},this.getPlus1Day(13)),Object(s.h)("space",null," "),Object(s.h)("a",{lang:"fi",href:".",id:"dayname_"+this.getPlus1DayId(14),onClick:this.onClickSetDateStringAHtml},this.getPlus1Day(14)),Object(s.h)("br",null))))}}class h extends s.Component{constructor(t){super(t),a(this,"control",null),a(this,"removelisteners",(()=>{this.control.removelisteners()})),r.a.bDebug&&(console.log("HtmlAmppariRoute.js"),console.log("props"),console.log(t)),this.state={errmsg:null},this.control=Object(s.createRef)()}componentDidMount(){r.a.bDebug&&console.log("componentDidMount 1")}render(t,e){return Object(s.h)(s.Fragment,null,Object(s.h)(u,{store:t.store,ref:this.control,themevalue:t.themevalue}),Object(s.h)("div",{style:{"background-color":"red",color:"yellow"}},e.errmsg))}}},jTUD:function(t){t.exports=function(){"use strict";var t=1e3,e=6e4,n=36e5,i="millisecond",a="second",s="minute",r="hour",l="day",o="week",c="month",u="quarter",h="year",d="date",f="Invalid Date",g=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},y=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},b={s:y,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),a=n%60;return(e<=0?"+":"-")+y(i,2,"0")+":"+y(a,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),a=e.clone().add(i,c),s=n-a<0,r=e.clone().add(i+(s?-1:1),c);return+(-(i+(n-a)/(s?a-r:r-a))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:h,w:o,d:l,D:d,h:r,m:s,s:a,ms:i,Q:u}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",k={};k[D]=m;var v=function(t){return t instanceof $},O=function t(e,n,i){var a;if(!e)return D;if("string"==typeof e){var s=e.toLowerCase();k[s]&&(a=s),n&&(k[s]=n,a=s);var r=e.split("-");if(!a&&r.length>1)return t(r[0])}else{var l=e.name;k[l]=e,a=l}return!i&&a&&(D=a),a||!i&&D},S=function(t,e){if(v(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new $(n)},j=b;j.l=O,j.i=v,j.w=function(t,e){return S(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var $=function(){function m(t){this.$L=O(t.locale,null,!0),this.parse(t)}var y=m.prototype;return y.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(j.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(g);if(i){var a=i[2]-1||0,s=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],a,i[3]||1,i[4]||0,i[5]||0,i[6]||0,s)):new Date(i[1],a,i[3]||1,i[4]||0,i[5]||0,i[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},y.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},y.$utils=function(){return j},y.isValid=function(){return!(this.$d.toString()===f)},y.isSame=function(t,e){var n=S(t);return this.startOf(e)<=n&&n<=this.endOf(e)},y.isAfter=function(t,e){return S(t)<this.startOf(e)},y.isBefore=function(t,e){return this.endOf(e)<S(t)},y.$g=function(t,e,n){return j.u(t)?this[e]:this.set(n,t)},y.unix=function(){return Math.floor(this.valueOf()/1e3)},y.valueOf=function(){return this.$d.getTime()},y.startOf=function(t,e){var n=this,i=!!j.u(e)||e,u=j.p(t),f=function(t,e){var a=j.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return i?a:a.endOf(l)},g=function(t,e){return j.w(n.toDate()[t].apply(n.toDate("s"),(i?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},p=this.$W,m=this.$M,y=this.$D,b="set"+(this.$u?"UTC":"");switch(u){case h:return i?f(1,0):f(31,11);case c:return i?f(1,m):f(0,m+1);case o:var D=this.$locale().weekStart||0,k=(p<D?p+7:p)-D;return f(i?y-k:y+(6-k),m);case l:case d:return g(b+"Hours",0);case r:return g(b+"Minutes",1);case s:return g(b+"Seconds",2);case a:return g(b+"Milliseconds",3);default:return this.clone()}},y.endOf=function(t){return this.startOf(t,!1)},y.$set=function(t,e){var n,o=j.p(t),u="set"+(this.$u?"UTC":""),f=(n={},n[l]=u+"Date",n[d]=u+"Date",n[c]=u+"Month",n[h]=u+"FullYear",n[r]=u+"Hours",n[s]=u+"Minutes",n[a]=u+"Seconds",n[i]=u+"Milliseconds",n)[o],g=o===l?this.$D+(e-this.$W):e;if(o===c||o===h){var p=this.clone().set(d,1);p.$d[f](g),p.init(),this.$d=p.set(d,Math.min(this.$D,p.daysInMonth())).$d}else f&&this.$d[f](g);return this.init(),this},y.set=function(t,e){return this.clone().$set(t,e)},y.get=function(t){return this[j.p(t)]()},y.add=function(i,u){var d,f=this;i=Number(i);var g=j.p(u),p=function(t){var e=S(f);return j.w(e.date(e.date()+Math.round(t*i)),f)};if(g===c)return this.set(c,this.$M+i);if(g===h)return this.set(h,this.$y+i);if(g===l)return p(1);if(g===o)return p(7);var m=(d={},d[s]=e,d[r]=n,d[a]=t,d)[g]||1,y=this.$d.getTime()+i*m;return j.w(y,this)},y.subtract=function(t,e){return this.add(-1*t,e)},y.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var i=t||"YYYY-MM-DDTHH:mm:ssZ",a=j.z(this),s=this.$H,r=this.$m,l=this.$M,o=n.weekdays,c=n.months,u=function(t,n,a,s){return t&&(t[n]||t(e,i))||a[n].slice(0,s)},h=function(t){return j.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},g={YY:String(this.$y).slice(-2),YYYY:j.s(this.$y,4,"0"),M:l+1,MM:j.s(l+1,2,"0"),MMM:u(n.monthsShort,l,c,3),MMMM:u(c,l),D:this.$D,DD:j.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,o,2),ddd:u(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:j.s(s,2,"0"),h:h(1),hh:h(2),a:d(s,r,!0),A:d(s,r,!1),m:String(r),mm:j.s(r,2,"0"),s:String(this.$s),ss:j.s(this.$s,2,"0"),SSS:j.s(this.$ms,3,"0"),Z:a};return i.replace(p,(function(t,e){return e||g[t]||a.replace(":","")}))},y.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},y.diff=function(i,d,f){var g,p=j.p(d),m=S(i),y=(m.utcOffset()-this.utcOffset())*e,b=this-m,D=j.m(this,m);return D=(g={},g[h]=D/12,g[c]=D,g[u]=D/3,g[o]=(b-y)/6048e5,g[l]=(b-y)/864e5,g[r]=b/n,g[s]=b/e,g[a]=b/t,g)[p]||b,f?D:j.a(D)},y.daysInMonth=function(){return this.endOf(c).$D},y.$locale=function(){return k[this.$L]},y.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=O(t,e,!0);return i&&(n.$L=i),n},y.clone=function(){return j.w(this.$d,this)},y.toDate=function(){return new Date(this.valueOf())},y.toJSON=function(){return this.isValid()?this.toISOString():null},y.toISOString=function(){return this.$d.toISOString()},y.toString=function(){return this.$d.toUTCString()},m}(),_=$.prototype;return S.prototype=_,[["$ms",i],["$s",a],["$m",s],["$H",r],["$W",l],["$M",c],["$y",h],["$D",d]].forEach((function(t){_[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),S.extend=function(t,e){return t.$i||(t(e,$,S),t.$i=!0),S},S.locale=O,S.isDayjs=v,S.unix=function(t){return S(1e3*t)},S.en=k[D],S.Ls=k,S.p={},S}()},meR3:function(t,e){"use strict";e.a={home:"home__nIvoY",cardHeader:"cardHeader__sKTze",cardBody:"cardBody__ktGWq"}},vqXW:function(t){"use strict";const{AbortController:e,AbortSignal:n}="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0;t.exports=e,t.exports.AbortSignal=n,t.exports.default=e}}]);
//# sourceMappingURL=10.chunk.81e40.esm.js.map