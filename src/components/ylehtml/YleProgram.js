import { h, Fragment, Component, createRef } from "preact";
import { useState, useRef } from "preact/hooks";
import _uniqueId from "lodash/uniqueId";
// // "@omiu/dialog": "0.0.4",
// import Card from 'preact-material-components/Card';
//import 'preact-material-components/Card/style.css';
//import 'preact-material-components/Button/style.css';
//import Select from 'preact-material-components/Select';
//import 'preact-material-components/List/style.css';
//import 'preact-material-components/Menu/style.css';
//import 'preanpct-material-components/Select/style.css';
//import Radio from 'preact-material-components/Radio';
//import FormField from 'preact-material-components/FormField';
//import 'preact-material-components/FormField/style.css';
// import Dialog from 'preact-material-components/Dialog';
// import 'preact-material-components/Dialog/style.css';
//import 'preact-material-components/Theme/style.css';

//import Dialog from "../dialog/Dialog";
import Dialog from "../dialog/PreactDialog";
import style from "./style";
import Config from "../../utils/Config";
// import 'whatwg-fetch';
//import { fetchJsonp } from 'fetch-jsonp';
import DayGrid from "./DayServices";

// import StaticFunctions from '../../utils/StaticFunctions';

export default function YleProgram(props) {
  const [displaydescription, setDisplayDescription] = useState(false);
  //    const [displayAllDescriptions, setDisplayAllDescriptions] = useState(props.displayAllDescriptions);
  const scrollingDlgRef = useRef(null);
  const digalogId = _uniqueId("YleProgram");
  let divDialogStyle =
    props.themevalue !== undefined && props.themevalue !== ""
      ? "color: #FFF; background-color: black; border-color: #FFF;"
      : "color: #FFF; background-color: black; border-color: #FFF;";

  // dot = " height: 25px; width: 25px; background-color: #bbb; border-radius: 50%; display: inline-block;";
  const dot =
    "border-radius: 50%; width: 10px; height: 10px; padding: 2px; background: #fff; " +
    " border: 2px solid #000; color: #000; text-align: center; font: 10px Arial, sans-serif;";

  const onClickDisplay = (event) => {
    event.preventDefault();
    if (props.bShowDesciption) return;
    // console.log("onClickDisplay");
    if (props.displayAllDescriptions) return;
    //        if (!displaydescription)
    //            scrollingDlgRef.current.MDComponent.show();
    if (!displaydescription) scrollingDlgRef.current.open();
    changeDisplayDescriptionValue();
  };

  const changeDisplayDes = (bValue) => {
    setDisplayDescription(bValue);
  }

  const changeDisplayDescriptionValue = () => changeDisplayDes(!displaydescription);

  const onClickDisplayDialog = (event) => {
    event.preventDefault();
    // console.log("onClickDisplayDialog");
    // if (displaydescription)
    // scrollingDlgRef.current.MDComponent.close();
    scrollingDlgRef.current.close();
    changeDisplayDescriptionValue();
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
    let title = props.data.name;
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
    if (props.data.movie) {
      ret = <span style={dot}>E</span>;
    } else if (props.data.sport) ret = <span style={dot}>U</span>;

    return ret;
  };

  const enterKeyDown = (e) => {
    e = e || window.event;
    let keyCode = e.keyCode || e.which;

    let currentColInd = null;

    // .item(0).innerHTML
    switch (e.keyCode) {
      case 13:
        onClickDisplay(e);
        break;
    }
  };

  // <p><a href={props.data.link} target="_blank" >ohjelmalinkki</a></p>onClik={this.openHtmlPage} linkurl={props.data.link}

  // +this.getPOfTitleIndex()

  return (
    <div>
      <div onClick={onClickDisplay} onKeyDown={enterKeyDown}>
        <h4 lang="fi" tabIndex="0">
          {getProgramSymbol(props)}{" "}
          {props.data.startTime ? props.data.startTime + " " : ""}
          {props.showSearch && props.data.titleindex != undefined
            ? getPOfTitleIndex(props)
            : props.data.name
            ? props.data.name + " "
            : ""}{" "}
          {props.data.captiontext ? props.data.captiontext : ""}
        </h4>
        {props.bShowDesciption && (
          <p
            style={{ fontWeight: "normal", "text-align": "left" }}
            lang="fi"
            tabIndex="0"
          >
            {props.data.description
              ? props.showSearch && props.data.descriptionindex != undefined
                ? props.getPOfIndex(
                    props.data.descriptionindex,
                    props.data.description.toString(),
                    props.themevalue
                  )
                : props.data.description
              : ""}
          </p>
        )}
      </div>
      <Dialog
        role="dialog"
        id={"dialogtheme" + digalogId}
        aria-modal="true"
        lang="fi"
        ref={scrollingDlgRef}
        title={props.channelname}
        themevalue={props.themevalue}
        okButtonPressed={onClickDisplayDialog}
        okText="Sulje"
        scrollable={true}
      >
        <div style={divDialogStyle}>
          <h3
            lang="fi"
            id="h3program"
            tabIndex="0"
            class=" mdc-typography--title"
          >
            {props.channelname}
          </h3>
          <h3
            lang="fi"
            id="h3program"
            tabIndex="0"
            class=" mdc-typography--title"
          >
            {getProgramSymbol(props)} {props.data.startTime}
            <space> </space> {props.data.name}{" "}
            {props.data.captiontext ? props.data.captiontext : ""}
          </h3>
          <h3 lang="fi" tabIndex="0" class=" mdc-typography--title">
            {props.data.description ? props.data.description : ""}
          </h3>
          <br />
        </div>
      </Dialog>
    </div>
  );
}

/*
			<Dialog role="dialog" id="dialogtheme" aria-modal="true"
				 ref={scrollingDlgRef}>
				  <Dialog.Header lang="fi" tabIndex="0" >{props.channelname}</Dialog.Header>
				  <Dialog.Body scrollable={true}>
					<Card><div class="card-header">
					   <h3 lang="fi" id="h3program" tabIndex="1" class=" mdc-typography--title">
					   {getProgramSymbol(props)} {props.data.startTime} 
					   <space> </space> {props.data.name} {props.data.captiontext ? props.data.captiontext : ''}</h3>
					   <h3 lang="fi" tabIndex="3" class=" mdc-typography--title">					   	   
						   {props.data.description ? props.data.description : ''}</h3><br/>
					   </div>
					   <Card.Media className="card-media" />
					</Card>
				  </Dialog.Body>
				  <Dialog.Footer>
					  <Dialog.FooterButton lang="fi" tabIndex="4" onCancel={onClickDisplayDialog} cancel={true} >Sulje</Dialog.FooterButton>
				  </Dialog.Footer>
	  		</Dialog> 
*/
