(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"2fTU":function(e,t,n){"use strict";function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,s(o.key),o)}}function l(e,t,n){return t=a(t),i(e,c()?Reflect.construct(t,n||[],a(e).constructor):t.apply(e,n))}function i(e,t){if(t&&("object"===o(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function c(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(c=function(){return!!e})()}function a(e){return a=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},a(e)}function u(e,t){return u=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},u(e,t)}function f(e,t,n){return(t=s(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e){var t=function(e,t){if("object"!=o(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=o(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==o(t)?t:t+""}var d=n("hosL"),b=n("kSFl"),p=n.n(b),y="odialog__C8B3T",h=n("x2AU"),g=n("nclG"),m=n.n(g),v=n("c/K1"),O=n.n(v);n("aejN"),t.a=function(e){function t(e){var n;return f(n=l(this,t,[e]),"dialogRef",null),f(n,"closeButtonRef",null),f(n,"channelHeader",null),f(n,"dialogBttnPressed",(function(e){e.preventDefault(),n.dialogRef.MDComponent.show()})),f(n,"open",(function(){n.dialogRef.current.MDComponent.show(),h.a.bDebug&&console.log("before closeButtonRef.current.focus"),n.closeButtonRef.current.focus(),h.a.bDebug&&console.log("dialog componentDidMount: dialogRef="+n.dialogRef)})),f(n,"close",(function(){n.dialogRef.current.MDComponent.close()})),f(n,"cancelBttnPressed",(function(e){e.preventDefault(),n.dialogRef.current.MDComponent.close(),n.props.cancelButtonPressed(e)})),f(n,"okBttnPressed",(function(e){e.preventDefault(),h.a.bDebug&&console.log("dialog okBttnPressed: dialogRef="+n.dialogRef),n.dialogRef.current.MDComponent.close(),n.props.okButtonPressed(e)})),f(n,"changeThemeBttnPressed",(function(e){e.preventDefault(),(0,Omiu.setTheme)("primary","green")})),f(n,"enterKeyDown",(function(e){e=e||window.event;h.a.bDebug&&console.log("Dialog pressed");if(13===e.keyCode)n.dialogRef.current.MDComponent.close(),n.props.okButtonPressed(e)})),n.state={dialogid:p()("dialog-")},n.closeButtonRef=Object(d.createRef)(),n.dialogRef=Object(d.createRef)(),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&u(e,t)}(t,e),n=t,(o=[{key:"componentDidMount",value:function(){}},{key:"render",value:function(e,t){return h.a.bDebug&&(console.log("->"),console.log(e),console.log(t),console.log("<-")),Object(d.h)(d.Fragment,null,Object(d.h)(m.a,{ref:this.dialogRef,role:"dialog",id:"dialogtheme","aria-modal":"true",style:y},Object(d.h)(m.a.Header,{lang:"fi",tabIndex:"0"},e.title),Object(d.h)(m.a.Body,{scrollable:!0},Object(d.h)(O.a,null,Object(d.h)("div",{class:"card-header"},e.children?e.children:null),Object(d.h)(O.a.Media,{className:"card-media"}))),Object(d.h)(m.a.Footer,null,Object(d.h)("div",{onKeyDown:this.enterKeyDown},Object(d.h)("span",null),Object(d.h)("span",{slot:"footer",class:"dialog-footer"},void 0!==e.cancelButtonPressed?Object(d.h)("button",{style:" margin: 15px;  height: 30px; background: blue; color: white;",id:"cancelBtn",tabIndex:"0",type:"primary",onClick:this.cancelBttnPressed},void 0!==e.cancelText?e.cancelText:"Cancel"):null,void 0!==e.okButtonPressed?Object(d.h)("button",{id:"okBtn",tabIndex:"0",style:" margin: 15px;  height: 30px; background: blue; color: white;",onClick:this.okBttnPressed,type:"primary",autofocus:!0,ref:this.closeButtonRef},void 0!==e.okText?e.okText:"Ok"):null)))))}}])&&r(n.prototype,o),i&&r(n,i),Object.defineProperty(n,"prototype",{writable:!1}),n;var n,o,i}(d.Component)},IKRQ:function(e,t,n){"use strict";var o=n("hosL");t.a=function(e){var t=Date.now();return Object(o.h)(o.Fragment,null,Object(o.h)("button",{type:"primary",onClick:e.onClick,tabIndex:"0",disabled:e.disabled,id:e.id?e.id:t,style:void 0!==e.style?e.style+" height: 30px; background: blue; ":" height: 30px; background: blue; ",class:void 0!==e.class?e.class:null},e.text))}},OXlV:function(e,t,n){"use strict";function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function r(e,t,n){return(t=i(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,i(o.key),o)}}function i(e){var t=function(e,t){if("object"!=o(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=o(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==o(t)?t:t+""}function c(e,t,n){return t=f(t),a(e,u()?Reflect.construct(t,n||[],f(e).constructor):t.apply(e,n))}function a(e,t){if(t&&("object"===o(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function u(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(u=function(){return!!e})()}function f(e){return f=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},f(e)}function s(e,t){return s=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},s(e,t)}var d=n("hosL"),b=n("x2AU");t.a=function(e){function t(e){var n;return n=c(this,t,[e]),b.a.bDebug&&(console.log("SwitchCheckBox.js"),console.log("props"),console.log(e)),n.state={errmsg:null},n.chechRef=Object(d.createRef)(),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&s(e,t)}(t,e),n=t,(o=[{key:"render",value:function(e){var t="float: none; display: inline-block; vertical-align: middle; ";return Object(d.h)(d.Fragment,null,Object(d.h)("input",{lang:"fi",tabIndex:"0",type:"checkbox",onChange:e.onChange,className:"form-check-input filled-in",ref:e.propref,style:t,id:void 0===e.inputid?"idcheckboxundef":e.inputid,checked:void 0!==e.checked&&e.checked}),Object(d.h)("label",r(r(r({lang:"fi",style:"margin-left: 5px;",class:"container"},"style",t),"for",void 0===e.inputid?"idcheckboxundef":e.inputid),"id",void 0===e.inputid?"idcheckboxundef-label":e.inputid+"-label"),e.labeltext))}}])&&l(n.prototype,o),i&&l(n,i),Object.defineProperty(n,"prototype",{writable:!1}),n;var n,o,i}(d.Component)},XmHI:function(e,t,n){"use strict";function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,l,i,c=[],a=!0,u=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(o=l.call(n)).done)&&(c.push(o.value),c.length!==t);a=!0);}catch(e){u=!0,r=e}finally{try{if(!a&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(u)throw r}}return c}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var l=n("hosL"),i=n("QRet"),c=n("2fTU");n("x2AU");t.a=function(e){var t=o(Object(i.d)(!1),2),n=t[0],r=t[1],a=Object(i.c)(null),u=function(t){t.preventDefault(),e.displayAllDescriptions||(n||a.current.open(),f())},f=function(){return s(!n)},s=function(e){r(e)},d=function(e){e.preventDefault(),a.current.close(),f()};return Object(l.h)("div",null,Object(l.h)("div",null,Object(l.h)("div",{onClick:u,onKeyDown:function(e){e=e||window.event;console.log("pressed");if(13===e.keyCode)u(e)}},Object(l.h)("p",{lang:"fi",tabIndex:"0"},Object(l.h)("b",null,e.showSearch&&null!=e.data.titleindex?e.getPOfIndex(e.data.titleindex,e.data.title):e.data.title)),e.displayAllDescriptions?Object(l.h)(l.Fragment,null,Object(l.h)("p",{lang:"fi",tabIndex:"0"},e.showSearch&&null!=e.data.descriptionindex?e.getPOfIndex(e.data.descriptionindex,e.data.description,e.themevalue):e.data.description),null!=e.data.link||null!=e.data.link?Object(l.h)("p",null,Object(l.h)("a",{lang:"fi",href:e.data.link,onClick:function(e){console.log("openHtmlPage"),e.preventDefault();var t=e.target.href;return console.log("blankurl"),console.log(t),window.open(t,"_blank","Telkussa"),!1}},"ohjelmalinkki")):null):null),Object(l.h)(c.a,{role:"dialog",id:"telkkudialogshowporg","aria-labelledby":"h1loading","aria-modal":"false",lang:"fi",ref:a,title:e.channel?e.channel.replace("Telkussa: ",""):"",okButtonPressed:d,okText:"Sulje",scrollable:!0,themevalue:e.themevalue},Object(l.h)("div",{class:"card-header",style:"color: #FFF; background-color: black; border-color: #FFF;"},Object(l.h)("h3",{lang:"fi",id:"h3program",tabIndex:"0",class:" mdc-typography--title"},e.data.title),Object(l.h)("h3",{lang:"fi",tabIndex:"0",class:" mdc-typography--title"},e.data.description),Object(l.h)("br",null)))))}}}]);
//# sourceMappingURL=1.chunk.55f46.js.map