import { h, Fragment, Component, createRef } from "preact";
import { useState, useRef } from "preact/hooks";
//import Chips from 'preact-material-components/Chips';
//import 'preact-material-components/Chips/style.css';
//import Card from 'preact-material-components/Card';
//import 'preact-material-components/Card/style.css';
//import Dialog from 'preact-material-components/Dialog';
//import 'preact-material-components/Dialog/style.css';
//import 'preact-material-components/Theme/style.css';
//import Button from 'preact-material-components/Button';
//import 'preact-material-components/Button/style.css';
//import 'preact-material-components/Theme/style.css';

//import Dialog from '../dialog/Dialog'
import Dialog from "../dialog/PreactDialog";

//import Dialog from '../dialog/FDialog'

import dayjs from "dayjs";

import Config from "../../utils/Config";
import ShowProgram from "../telkku/ShowProgram";

dayjs.locale("fi");

/**
 * This Address function is showing a programgrid or -list.
 */
// class Address extends Component
function AmppariShowProgram(props) {
  let divDialogStyle =
    props.themevalue !== undefined && props.themevalue !== ""
      ? "color: #FFF; background-color: black; border-color: #FFF;"
      : "color: #FFF; background-color: black; border-color: #FFF;";

  const [displaydescription, setDisplayDescription] = useState(false);
  //    const [displayAllDescriptions, setDisplayAllDescriptions] = useState(props.displayAllDescriptions);
  const scrollingDlgRef = useRef(null);

  // dot = " height: 25px; width: 25px; background-color: #bbb; border-radius: 50%; display: inline-block;";
  const dot =
    "border-radius: 50%; width: 10px; height: 10px; padding: 2px; background: #fff; " +
    " border: 2px solid #000; color: #000; text-align: center; font: 10px Arial, sans-serif;";

  const onClickDisplay = (event) => {
    event.preventDefault();
    // console.log("onClickDisplay");
    if (props.displayAllDescriptions) return;
    if (!displaydescription)
      // scrollingDlgRef.current.MDComponent.show();
      scrollingDlgRef.current.open();
    setDisplayDescription(!displaydescription);
  };

  const onClickDisplayDialog = (event) => {
    event.preventDefault();
    // console.log("onClickDisplayDialog");
    if (displaydescription)
      //scrollingDlgRef.current.MDComponent.close();
      scrollingDlgRef.current.close();
    setDisplayDescription(!displaydescription);
  };

  const getTime = (timemillisec) => {
    let day = new Date(timemillisec * 1000);
    let hours = day.getHours();
    let minutes = day.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    if (hours < 10) hours = "0" + hours;
    return "" + hours + ":" + minutes;
  };

  /*
        	jsonitem.title = item.getElementsByTagName("title")[0].childNodes[0].nodeValue;
		jsonitem.description = item.getElementsByTagName("description")[0].childNodes[0].nodeValue;
		jsonitem.pubdate = item.getElementsByTagName("pubDate")[0].childNodes[0].nodeValue;
		jsonitem.link =

          <Chips.Chip onClick={onClickDisplay} >
                    <Chips.Text>{data.title}</Chips.Text></Chips.Chip> : <Chips.Chip onClick={onClickDisplay}>
                    <Chips.Text>Kissa</Chips.Text></Chips.Chip> }

                     {(!displaydescription ? 
                <Button onClick={onClickDisplay} >
                    {data.title}</Button> : <Chips.Chip onClick={onClickDisplay}>
                    <Chips.Text>Kissa</Chips.Text></Chips.Chip>) }

                                 <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>

                <Chips.Text>{props.data.title}</Chips.Text></Chips.Chip> 
        */

  const openHtmlPage = (event) => {
    console.log("openHtmlPage");
    event.preventDefault();
    let blankurl = event.target.href;
    console.log("blankurl");
    console.log(blankurl);
    // window.open(blankurl, '_blank', "Ampparissa", "location=no");
    window.open(blankurl, "_blank", "Ampparissa");
    return false;
  };

  const getPOfTitleIndex = (props) => {
    console.log("getPOfTitleIndex");

    let index = props.data.titleindex;
    console.log("titleindex");
    console.log(index);
    let title = props.data.title;
    if (title != null) title = title.toString();
    console.log("title");
    console.log(title);
    if (index == undefined || index < 0) return title;
    let ret = props.getPOfIndex(index, title, props.themevalue);
    console.log("ret after getPOfIndex");
    console.log(ret);
    return ret;
  };

  const getProgramSymbol = (props) => {
    let ret = null;
    if (props.data.movie) ret = <span style={dot}>E</span>;
    else if (props.data.sport) ret = <span style={dot}>U</span>;

    return ret;
  };

  const enterKeyDown = (e) => {
    e = e || window.event;
    let keyCode = e.keyCode || e.which;

    if (Config.bDebug) console.log("pressed");

    let currentColInd = null;

    // .item(0).innerHTML
    switch (e.keyCode) {
      case 13:
        onClickDisplay(e);
        break;
    }
  };

  console.log("Amppari ShowProgram.js props");
  console.log(props);

  // <p><a href={props.data.link} target="_blank" >ohjelmalinkki</a></p>onClik={this.openHtmlPage} linkurl={props.data.link}

  // +this.getPOfTitleIndex()
  return (
    <Fragment>
      <div>
        <div
          tabIndex="0"
          lang="fi"
          onClick={onClickDisplay}
          onKeyDown={enterKeyDown}
        >
          <p>
            <b>
              {props.showSearch && props.data.titleindex != undefined ? (
                <div>
                  {getProgramSymbol(props)} {getTime(props.data.timestamp)}
                  <space> </space>
                  {getPOfTitleIndex(props)}
                </div>
              ) : (
                <div>
                  {getProgramSymbol(props)} {getTime(props.data.timestamp)}
                  <space> </space>
                  {props.data.title.toString()}
                </div>
              )}
            </b>
          </p>
          {props.displayAllDescriptions ? (
            <Fragment>
              <p>
                {props.showSearch && props.data.descriptionindex != undefined
                  ? props.getPOfIndex(
                      props.data.descriptionindex,
                      props.data.description.toString(),
                      props.themevalue
                    )
                  : props.data.description.toString()}
              </p>
              {props.data.link != undefined || props.data.link != null ? (
                <p>
                  <a href={props.data.link} onClick={this.openHtmlPage}>
                    ohjelmalinkki
                  </a>
                </p>
              ) : null}
            </Fragment>
          ) : null}
        </div>
      </div>
      <Dialog
        role="dialog"
        id="showamppariprogram"
        aria-labelledby="amppari"
        aria-modal="false"
        lang="fi"
        ref={scrollingDlgRef}
        title={props.channel}
        okButtonPressed={onClickDisplayDialog}
        themevalue={props.themevalue}
        okText="Sulje"
        scrollable={true}
      >
        <div style={divDialogStyle}>
          <div class="card-header">
            <h3
              lang="fi"
              id="h1loading"
              default
              tabIndex="0"
              class=" mdc-typography--title"
            >
              {getProgramSymbol(props)} {getTime(props.data.timestamp)}
              <space> </space> {props.data.title.toString()}
            </h3>
            <h3 tabIndex="0" class=" mdc-typography--title">
              {props.data.description.toString()}
            </h3>
            <br />
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
}

/*
                    <Dialog role="dialog" id="dialogprogram" aria-modal="true"
                               ref={scrollingDlgRef}>
                                <Dialog.Header tabIndex="0" lang="fi">{props.channel}</Dialog.Header>
                                <Dialog.Body scrollable={true}>
                                  <div class="card-header">
                                     <h3 id="h1lprogram" tabIndex="0" class=" mdc-typography--title">
                                     {getProgramSymbol(props)} {getTime(props.data.timestamp)} 
                                     <space> </space> {props.data.title.toString()}</h3>
                                     <h3 tabIndex="0" class=" mdc-typography--title">
                                         {props.data.description.toString()}</h3><br/>
                                     </div>
                                </Dialog.Body>
                                <Dialog.Footer>
                                    <Dialog.FooterButton onCancel={onClickDisplayDialog} cancel={true} >Sulje</Dialog.FooterButton>
                                </Dialog.Footer>
                    </Dialog> 
*/
export default AmppariShowProgram;
