import {h, Fragment, Component, createRef } from 'preact';
import { useState, useRef } from 'preact/hooks';
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
//import Formfield from 'preact-material-components/FormField';
//import 'preact-material-components/Checkbox/style.css';
//import LayoutGrid from 'preact-material-components/LayoutGrid';
//import 'preact-material-components/LayoutGrid/style.css';

import Dialog from '../dialog/Dialog';

import Config from '../../utils/Config';

/**
 * This Address function is showing a programgrid or -list.
 */
// class Address extends Component 
function ShowProgram(props)
{
    const [displaydescription, setDisplayDescription] = useState(false);
 //   const [displayAllDescriptions, setDisplayAllDescriptions] = useState(props.displayAllDescriptions);
    const scrollingDlgRef = useRef(null);

    let divDialogStyle = (props.themevalue !== undefined && props.themevalue !== '' ? "color: #FFF; background-color: black; border-color: #FFF;" : "color: #FFF; background-color: black; border-color: #FFF;");
    const inputw = "float: none; display: inline-block; vertical-align: middle; ";

    const onClickDisplay = (event) => {     
        event.preventDefault();   
//   console.log("onClickDisplay");
        if (props.displayAllDescriptions)
            return;
        if (!displaydescription)
            //scrollingDlgRef.current.MDComponent.show();
            scrollingDlgRef.current.open();
        setDisplayDescription(! displaydescription );
    }

    const onClickDisplayDialog = (event) => {     
        event.preventDefault();   
   //    console.log("onClickDisplayDialog");
       // if (displaydescription)
            //scrollingDlgRef.current.MDComponent.close();
            scrollingDlgRef.current.close();
        setDisplayDescription(! displaydescription );
    }

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

    const openHtmlPage = (event) =>
    {
        console.log("openHtmlPage");
        event.preventDefault();
        let blankurl = event.target.href;
        console.log("blankurl");
        console.log(blankurl);
        // window.open(blankurl, '_blank', "Telkussa", "location=no");
        window.open(blankurl, '_blank', "Telkussa");
        return false;
    }

    const enterKeyDown= (e) => 
	{ 
		e = e || window.event;
		let keyCode = e.keyCode || e.which;
			console.log("pressed");
			
			let currentColInd = null;

			// .item(0).innerHTML
		  switch (e.keyCode) {
			case 13:
                onClickDisplay(e);
				break;
		}
	}

    const onEnterDisplayDialog = (e) =>
    {
        if (e.keyCode === 13)
            onClickDisplayDialog(e);
    }

    return (           
            <div>
                <div>
                    <div onClick={onClickDisplay} onKeyDown={enterKeyDown}>                  
                        <p lang="fi" tabIndex="0"><b>{props.showSearch && props.data.titleindex != undefined
                        ? props.getPOfIndex(props.data.titleindex, props.data.title) 
                        : props.data.title}</b></p>
                        {props.displayAllDescriptions ? 
                        <Fragment><p lang="fi" tabIndex="0">{ props.showSearch 
                            && props.data.descriptionindex != undefined
                            ? props.getPOfIndex(props.data.descriptionindex, 
                                props.data.description, props.themevalue) 
                            : props.data.description }</p>
                            {props.data.link != undefined || props.data.link != null ?
                            <p><a lang="fi" href={props.data.link} onClick={openHtmlPage} >ohjelmalinkki</a></p> : null} 
                            </Fragment> : null}
                     </div>
                     <Dialog role="dialog" id="telkkudialogshowporg" aria-labelledby="h1loading"
                        aria-modal="false" lang="fi" ref={scrollingDlgRef} 
                        title={props.channel ? 
                            props.channel.replace("Telkussa: ", "") : ''}
                        okButtonPressed={onClickDisplayDialog}
                        okText="Sulje" scrollable={true}
                        themevalue={props.themevalue}
                        >
                            <div class="card-header" style={divDialogStyle}>
                                     <h3 lang="fi" id="h3program" tabIndex="0" class=" mdc-typography--title">
                                         {props.data.title}</h3>
                                     <h3 lang="fi" tabIndex="0" class=" mdc-typography--title">
                                         {props.data.description}</h3><br/>
                            </div>
                        </Dialog>
                    </div>
            </div>

          );
}

/*
                    <Dialog role="dialog" id="dialogtheme" aria-modal="true"
                               ref={scrollingDlgRef}>
                                <Dialog.Header lang="fi" tabIndex="0">{props.channel ? 
                                props.channel.replace("Telkussa: ", "") : ''}</Dialog.Header>
                                <Dialog.Body scrollable={true}>
                                  <Card><div class="card-header">
                                     <h3 lang="fi" id="h3program" tabIndex="0" class=" mdc-typography--title">
                                         {props.data.title}</h3>
                                     <h3 lang="fi" tabIndex="0" class=" mdc-typography--title">
                                         {props.data.description}</h3><br/>
                                     </div>
                                     <Card.Media className="card-media" />
                                  </Card>
                                </Dialog.Body>
                                <Dialog.Footer>
                                    <Dialog.FooterButton tabIndex="0" 
                                    onKeyDown={onEnterDisplayDialog} 
                                    onCancel={onClickDisplayDialog} onAccept={onClickDisplayDialog}
                                    cancel={true} >Sulje</Dialog.FooterButton>
                                </Dialog.Footer>
                    </Dialog> 
*/

export default ShowProgram;