(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{GucW:function(e,t,n){"use strict";function s(e,t,n){var s;return(t="symbol"==typeof(s=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var s=n.call(e,t||"default");if("object"!=typeof s)return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?s:s+"")in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t,n){var s;return(t="symbol"==typeof(s=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var s=n.call(e,t||"default");if("object"!=typeof s)return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?s:s+"")in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.r(t),n.d(t,"default",(function(){return g}));var r=n("hosL"),i=n("x2AU"),l="home__g-WfZ",o=n("vqXW"),c=n.n(o),u=n("rnI4"),h=n("jTUD"),d=n.n(h);class f extends r.Component{constructor(e){var t;super(e),t=this,s(this,"fetch_url_telkku",null),s(this,"fetch_url_telkussa",null),s(this,"removelisteners",(()=>{})),s(this,"fetchHtmlTelkkuPrograms",(async function(){i.a.bDebug&&console.log("fetchHtmlTelkkuPrograms");let e=1,n=null,s=[];try{for(;n=await t.fetchHtmlTelkkuChannels(e),null!==n&&(s.push(n),1!==e);)e+=1}catch(e){if("Error: 500"!==e.message)return console.error("error"),console.error(e),void t.setState({errmsg:e.toString()})}i.a.bDebug&&(console.log("fetcheditems"),console.log(s)),t.setState({fetcheditems:s,errmsg:null})})),s(this,"getSelectedDateParam",(()=>{let e=this.state.selecteddate,t=""+(e.getMonth()+1);1===t.trim().length&&(t="0"+t);let n=""+e.getDate();return 1===n.trim().length&&(n="0"+n),""+e.getFullYear()+t+n})),s(this,"openHtmlTelkkuPage",(e=>{let t=this.fetch_url_telkussa+"sivu/"+e+"/"+this.getSelectedDateParam();window.open(t,"_blank","Telkussa")})),s(this,"fetchHtmlTelkkuChannels",(async function(e){let n=t.fetch_url_telkku+"sivu/"+e+"/"+t.getSelectedDateParam();i.a.bDebug&&(console.log("fetchRssTelkkuChannel 1"),console.log(n));let s=null;return await fetch(n,{method:"GET",timeout:6e3,headers:{"Content-Type":"text/html; charset=UTF-8",Accept:"*/*"},mode:"same-origin",signal:t.abortSignal}).then(t.handleErrors).then((e=>e.text())).then((e=>{t.setState({errmsg:null}),s=e})).catch((e=>{throw console.error("error"),console.error(e),t.setState({errmsg:e.toString()}),new t.TelkkuException(e.toString())})),s})),s(this,"getJsonDataFromTelkkuRssXml",(e=>{e.querySelectorAll("item")})),s(this,"handleErrors",(e=>{if(!e.ok)throw console.log("response"),console.log(e),console.log(e.status),Error(e.status);return e})),s(this,"openHtmlTelkkuElokuvat",(()=>{window.open(this.fetch_url_telkussa+"elokuva/lista","_blank","Telkussa")})),s(this,"openHtmlTelkkuNyt",(()=>{window.open(this.fetch_url_telkussa+"nyt","_blank","Telkussa")})),s(this,"onClickLink",(e=>{e.preventDefault();let t=e.target.text;console.log("onClicked"),console.log(t),"elokuva"===t?this.openHtmlTelkkuElokuvat():"nyt"===t?this.openHtmlTelkkuNyt():this.openHtmlTelkkuPage(t),this.setState({selectedpage:t})})),s(this,"getPlus1DayId",(e=>{const t=d()();let n=t;e>0&&(n=t.add(e,"days"));return n.format("YYYY-MM-DD")})),s(this,"getPlus1Day",(e=>{const t=d()();let n=t;e>0&&(n=t.add(e,"days"));let s="";switch(new Date(n).getDay()){case 1:s="Ma";break;case 2:s="Ti";break;case 3:s="Ke";break;case 4:s="To";break;case 5:s="Pe";break;case 6:s="La";break;case 0:s="Su"}return s+" "+n.format("DD.MM.YYYY")})),s(this,"onClickSetDateString",(e=>{e.preventDefault();let t=e.target.id;console.log("onClickSetDateString"),console.log("dayparameter"),console.log(t);const n="dayname_";let s=t.indexOf(n);s>-1&&(t=t.substring(s+8)),console.log("dayparameter"),console.log(t),console.log("onClickSetDateString"),console.log(t),this.setState({selecteddate:new Date(Date.parse(t))})})),s(this,"onClickSetDateStringold",(e=>{e.preventDefault();let t=e.target.text.replace(".","-").replace(".","-");const n=t.indexOf("-");if(n>-1){const e=t.indexOf("-",n+1);if(e>-1){const s=t.substring(0,n),a=t.substring(n+1,e),r=t.substring(e+1);t=r+"/"+a+"/"+s}}const s=new Date(t);this.setState({selecteddate:s})})),s(this,"getFetchedDate",(()=>{i.a.bDebug&&(console.log("getFetchedDate"),console.log("this.state.selecteddate"),console.log(this.state.selecteddate));let e=this.state.selecteddate;if(null==e||null==e)return"";"string"==typeof e&&(e=Date.parse(this.state.selecteddate));let t=e.getDate(),n=e.getMonth()+1;t<10&&(t="0"+t),n<10&&(n="0"+n);return t+"."+n+"."+e.getFullYear()})),i.a.bDebug&&(console.log("HtmlTelkku.js"),console.log("props"),console.log(e));new Date(Date.now());this.state={errmsg:null,html:null,selecteddate:null,fetcheditems:[],selectedpage:1,today:new Date(Date.now)},this.fetch_url_telkku="/telkkussa/",this.fetch_url_telkussa="https://telkussa.fi/",this.TelkkuException=this.TelkkuException.bind(this)}componentDidMount(){i.a.bDebug&&console.log("componentDidMount 1"),this.abortController=new c.a,this.abortSignal=this.abortController.signal}componentWillReceiveProps(e){i.a.bDebug&&(console.log("HtmlTelkku componentWillReceiveProps nextProps"),console.log(e)),null!==e&&e.themevalue!=this.props.themevalue&&this.setState({themevalue:e.themevalue})}componentWillUnmount(){this.abortSignal&&!this.abortSignal.aborted&&this.abortController.abort()}TelkkuException(e){this.message=e,this.name="TelkkuException"}render(e,t){const n=e.themevalue;let s=void 0!==e.themevalue&&""!==e.themevalue?"color: #FFF; background-color: black; border-color: #FFF;":"";return i.a.bDebug&&(console.log("state"),console.log(t),console.log("darkstyle"),console.log(n)),Object(r.h)("div",{id:"htmltelkku_main_div",style:s},Object(r.h)("div",{class:u.a.cardHeader},Object(r.h)("h1",{tabIndex:"0",lang:"fi"},"Telkussa.fi ",this.getFetchedDate()),Object(r.h)("div",{tabIndex:"0",lang:"fi"},"Aseta avattavan html sivun päivämääräksi jokin seuraavista:"),Object(r.h)("div",{class:u.a.cardHeader},Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",id:"dayname_"+this.getPlus1DayId(0),onClick:this.onClickSetDateString},this.getPlus1Day(0)),Object(r.h)("space",null," "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",id:"dayname_"+this.getPlus1DayId(1),onClick:this.onClickSetDateString},this.getPlus1Day(1)),Object(r.h)("space",null," "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",id:"dayname_"+this.getPlus1DayId(2),onClick:this.onClickSetDateString},this.getPlus1Day(2)),Object(r.h)("space",null," "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",id:"dayname_"+this.getPlus1DayId(3),onClick:this.onClickSetDateString},this.getPlus1Day(3)),Object(r.h)("space",null," "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",id:"dayname_"+this.getPlus1DayId(4),onClick:this.onClickSetDateString},this.getPlus1Day(4)),Object(r.h)("space",null," "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",id:"dayname_"+this.getPlus1DayId(5),onClick:this.onClickSetDateString},this.getPlus1Day(5)),Object(r.h)("space",null," "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",id:"dayname_"+this.getPlus1DayId(6),onClick:this.onClickSetDateString},this.getPlus1Day(6)),Object(r.h)("space",null," "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",id:"dayname_"+this.getPlus1DayId(7),onClick:this.onClickSetDateString},this.getPlus1Day(7)),Object(r.h)("space",null," "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",id:"dayname_"+this.getPlus1DayId(8),onClick:this.onClickSetDateString},this.getPlus1Day(8)),Object(r.h)("space",null," "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",id:"dayname_"+this.getPlus1DayId(9),onClick:this.onClickSetDateString},this.getPlus1Day(9)),Object(r.h)("space",null," "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",id:"dayname_"+this.getPlus1DayId(10),onClick:this.onClickSetDateString},this.getPlus1Day(10)),Object(r.h)("space",null," "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",id:"dayname_"+this.getPlus1DayId(11),onClick:this.onClickSetDateString},this.getPlus1Day(11)),Object(r.h)("space",null," "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",id:"dayname_"+this.getPlus1DayId(12),onClick:this.onClickSetDateString},this.getPlus1Day(12)),Object(r.h)("space",null," "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",id:"dayname_"+this.getPlus1DayId(13),onClick:this.onClickSetDateString},this.getPlus1Day(13)),Object(r.h)("space",null," "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",id:"dayname_"+this.getPlus1DayId(14),onClick:this.onClickSetDateString},this.getPlus1Day(14)),Object(r.h)("br",null)),Object(r.h)("div",{tabIndex:"0",lang:"fi",class:u.a.cardHeader},"Avaa uusi selain sivu klikkaamalla linkkejä:"),Object(r.h)("div",{class:u.a.cardHeader},Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",onClick:this.onClickLink},"1"),Object(r.h)("space",null," "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",onClick:this.onClickLink},"2"),Object(r.h)("space",null,"   "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",onClick:this.onClickLink},"3"),Object(r.h)("space",null,"   "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",onClick:this.onClickLink},"4"),Object(r.h)("space",null,"   "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",onClick:this.onClickLink},"5"),Object(r.h)("space",null,"   "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",onClick:this.onClickLink},"6"),Object(r.h)("space",null,"   "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",onClick:this.onClickLink},"nyt"),Object(r.h)("space",null,"   "),Object(r.h)("a",{tabIndex:"0",href:".",lang:"fi",onClick:this.onClickLink},"elokuva"))))}}class g extends r.Component{constructor(e){super(e),a(this,"control",null),a(this,"removelisteners",(()=>{this.control.removelisteners()})),i.a.bDebug&&(console.log("HtmlTelkkuRoute.js"),console.log("props"),console.log(e)),this.state={errmsg:null},this.control=Object(r.createRef)()}componentDidMount(){i.a.bDebug&&console.log("componentDidMount 1")}render(e,t){return Object(r.h)("div",{class:`${l} page`},Object(r.h)(f,{store:e.store,ref:this.control,themevalue:e.themevalue}),Object(r.h)("div",{style:{"background-color":"red",color:"yellow"}},t.errmsg))}}},jTUD:function(e){e.exports=function(){"use strict";var e=1e3,t=6e4,n=36e5,s="millisecond",a="second",r="minute",i="hour",l="day",o="week",c="month",u="quarter",h="year",d="date",f="Invalid Date",g=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,b=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,k={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},m=function(e,t,n){var s=String(e);return!s||s.length>=t?e:""+Array(t+1-s.length).join(n)+e},D={s:m,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),s=Math.floor(n/60),a=n%60;return(t<=0?"+":"-")+m(s,2,"0")+":"+m(a,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var s=12*(n.year()-t.year())+(n.month()-t.month()),a=t.clone().add(s,c),r=n-a<0,i=t.clone().add(s+(r?-1:1),c);return+(-(s+(n-a)/(r?a-i:i-a))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:c,y:h,w:o,d:l,D:d,h:i,m:r,s:a,ms:s,Q:u}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",p={};p[y]=k;var v="$isDayjsObject",S=function(e){return e instanceof C||!(!e||!e[v])},O=function e(t,n,s){var a;if(!t)return y;if("string"==typeof t){var r=t.toLowerCase();p[r]&&(a=r),n&&(p[r]=n,a=r);var i=t.split("-");if(!a&&i.length>1)return e(i[0])}else{var l=t.name;p[l]=t,a=l}return!s&&a&&(y=a),a||!s&&y},$=function(e,t){if(S(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new C(n)},j=D;j.l=O,j.i=S,j.w=function(e,t){return $(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var C=function(){function k(e){this.$L=O(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[v]=!0}var m=k.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(j.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var s=t.match(g);if(s){var a=s[2]-1||0,r=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],a,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)):new Date(s[1],a,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)}}return new Date(t)}(e),this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return j},m.isValid=function(){return!(this.$d.toString()===f)},m.isSame=function(e,t){var n=$(e);return this.startOf(t)<=n&&n<=this.endOf(t)},m.isAfter=function(e,t){return $(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<$(e)},m.$g=function(e,t,n){return j.u(e)?this[t]:this.set(n,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,t){var n=this,s=!!j.u(t)||t,u=j.p(e),f=function(e,t){var a=j.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return s?a:a.endOf(l)},g=function(e,t){return j.w(n.toDate()[e].apply(n.toDate("s"),(s?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},b=this.$W,k=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(u){case h:return s?f(1,0):f(31,11);case c:return s?f(1,k):f(0,k+1);case o:var y=this.$locale().weekStart||0,p=(b<y?b+7:b)-y;return f(s?m-p:m+(6-p),k);case l:case d:return g(D+"Hours",0);case i:return g(D+"Minutes",1);case r:return g(D+"Seconds",2);case a:return g(D+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(e,t){var n,o=j.p(e),u="set"+(this.$u?"UTC":""),f=(n={},n[l]=u+"Date",n[d]=u+"Date",n[c]=u+"Month",n[h]=u+"FullYear",n[i]=u+"Hours",n[r]=u+"Minutes",n[a]=u+"Seconds",n[s]=u+"Milliseconds",n)[o],g=o===l?this.$D+(t-this.$W):t;if(o===c||o===h){var b=this.clone().set(d,1);b.$d[f](g),b.init(),this.$d=b.set(d,Math.min(this.$D,b.daysInMonth())).$d}else f&&this.$d[f](g);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[j.p(e)]()},m.add=function(s,u){var d,f=this;s=Number(s);var g=j.p(u),b=function(e){var t=$(f);return j.w(t.date(t.date()+Math.round(e*s)),f)};if(g===c)return this.set(c,this.$M+s);if(g===h)return this.set(h,this.$y+s);if(g===l)return b(1);if(g===o)return b(7);var k=(d={},d[r]=t,d[i]=n,d[a]=e,d)[g]||1,m=this.$d.getTime()+s*k;return j.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var s=e||"YYYY-MM-DDTHH:mm:ssZ",a=j.z(this),r=this.$H,i=this.$m,l=this.$M,o=n.weekdays,c=n.months,u=function(e,n,a,r){return e&&(e[n]||e(t,s))||a[n].slice(0,r)},h=function(e){return j.s(r%12||12,e,"0")},d=n.meridiem||function(e,t,n){var s=e<12?"AM":"PM";return n?s.toLowerCase():s};return s.replace(b,(function(e,s){return s||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return j.s(t.$y,4,"0");case"M":return l+1;case"MM":return j.s(l+1,2,"0");case"MMM":return u(n.monthsShort,l,c,3);case"MMMM":return u(c,l);case"D":return t.$D;case"DD":return j.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return u(n.weekdaysMin,t.$W,o,2);case"ddd":return u(n.weekdaysShort,t.$W,o,3);case"dddd":return o[t.$W];case"H":return String(r);case"HH":return j.s(r,2,"0");case"h":return h(1);case"hh":return h(2);case"a":return d(r,i,!0);case"A":return d(r,i,!1);case"m":return String(i);case"mm":return j.s(i,2,"0");case"s":return String(t.$s);case"ss":return j.s(t.$s,2,"0");case"SSS":return j.s(t.$ms,3,"0");case"Z":return a}return null}(e)||a.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(s,d,f){var g,b=this,k=j.p(d),m=$(s),D=(m.utcOffset()-this.utcOffset())*t,y=this-m,p=function(){return j.m(b,m)};switch(k){case h:g=p()/12;break;case c:g=p();break;case u:g=p()/3;break;case o:g=(y-D)/6048e5;break;case l:g=(y-D)/864e5;break;case i:g=y/n;break;case r:g=y/t;break;case a:g=y/e;break;default:g=y}return f?g:j.a(g)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return p[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),s=O(e,t,!0);return s&&(n.$L=s),n},m.clone=function(){return j.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},k}(),w=C.prototype;return $.prototype=w,[["$ms",s],["$s",a],["$m",r],["$H",i],["$W",l],["$M",c],["$y",h],["$D",d]].forEach((function(e){w[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),$.extend=function(e,t){return e.$i||(e(t,C,$),e.$i=!0),$},$.locale=O,$.isDayjs=S,$.unix=function(e){return $(1e3*e)},$.en=p[y],$.Ls=p,$.p={},$}()},rnI4:function(e,t){"use strict";t.a={home:"home__wog+i",cardHeader:"cardHeader__dyMRZ",cardBody:"cardBody__M1xly"}},vqXW:function(e){"use strict";const{AbortController:t,AbortSignal:n}="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0;e.exports=t,e.exports.AbortSignal=n,e.exports.default=t}}]);
//# sourceMappingURL=11.chunk.53c83.esm.js.map