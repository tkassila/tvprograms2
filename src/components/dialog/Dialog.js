import { h, Component, Fragment, createRef } from 'preact';
//import style from './style.css';
//import { styled, setup } from "goober";
import style from './Dialog.css';
import  '@omiu/dialog';
import _uniqueId from 'lodash/uniqueId';
// import '@omiu/common';
//import * as css from './Dialog.css';
import css from './Dialog.css';
//import Button from '../button/Button';

import Config from '../../utils/Config';

/* setup(h);

const ODialog = styled("o-dialog")`
position: relative;
background: black;
border-radius: 10px;
-webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
-webkit-box-sizing: border-box;
box-sizing: border-box;
width: 50%;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;
*/

class Dialog extends Component {

	dialogRef = null;
	closeButtonRef = null;
    channelHeader = null;

	constructor(props)
	{
		super(props);
		this.state = {
			dialogid:  _uniqueId('dialog-')
		};

		this.closeButtonRef = createRef();
     //   console.log("dialog constructor: dialogid=" +this.state.dialogid)
		// this.dialogRef = createRef();		
	}

	componentDidMount()
	{
		this.dialogRef = document.getElementById("dialog"+this.state.dialogid);
		this.closeButtonRef.current.focus();
	// this.dialogRef = document.getElementById("mydialog");	
    //    console.log("dialog componentDidMount: dialogRef=" +this.dialogRef)
   //    this.dialogRef.open();
	}

	dialogBttnPressed = (event) => {
		event.preventDefault();		
    //    console.log("dialog dialogBttnPressed: dialogRef=" +this.dialogRef)
		this.dialogRef.open();
	}

    open = () =>
    {
        this.dialogRef.open();
    }

    close = () =>
    {
        this.dialogRef.close();
    }

	cancelBttnPressed = (event) => {
		event.preventDefault();		
     //   console.log("dialog cancelBttnPressed: dialogRef=" +this.dialogRef)
		this.dialogRef.close();
        this.props.cancelButtonPressed(event);
	}

	okBttnPressed = (event) => {
		event.preventDefault();		
        console.log("dialog okBttnPressed: dialogRef=" +this.dialogRef);
		// console.log("this.dialogRef=" +this.dialogRef.visible);
		// this.dialogRef.visible = true;
		this.dialogRef.close();
        this.props.okButtonPressed(event);
		// console.log("this.dialogRef=" +this.dialogRef.visible);
	}

	changeThemeBttnPressed = (event) => {
		event.preventDefault();		
		const setTheme = Omiu.setTheme;
		setTheme('primary', 'green');		
	}

	enterKeyDown = (e) => 
	{ 
		e = e || window.event;
		let keyCode = e.keyCode || e.which;

        if (Config.bDebug)
			console.log("Dialog pressed");
			
			let currentColInd = null;

			// .item(0).innerHTML
		  switch (e.keyCode) {
			case 13:			
				this.dialogRef.close();
				this.props.okButtonPressed(e);		
				break;
		}
	}

    /*
                   <o-button type="primary" onClick={this.changeThemeBttnPressed} >Kissa2</o-button>
                    <o-button round type="primary" size="mini"
                    onClick={this.dialogBttnPressed} >Dialog</o-button>
            
					id={"dialog"+this.state.dialogid}
    */

	render(props, state) {
		console.log("->");
		console.log(props);
		console.log(state);
		console.log("<-");

		return(	
            <Fragment>
                <o-dialog id={"dialog"+this.state.dialogid} 
				title={props.title}
				style={css.odialog} 
				>
					{props.children ? props.children : null}
				<div onKeyDown={this.enterKeyDown}>	
                <span></span>
                <span slot="footer" class="dialog-footer">
                    {props.cancelButtonPressed !== undefined ? 
					<button style={" margin: 15px;  height: 30px; background: blue; color: white;"}
                    id="cancelBtn" tabIndex="0" 
                    type="primary" onClick={this.cancelBttnPressed} >
                        {props.cancelText !== undefined ? props.cancelText : 'Cancel'}</button> : null }
                    {props.okButtonPressed !== undefined ? 
					<button id="okBtn" tabIndex="0" style={" margin: 15px;  height: 30px; background: blue; color: white;"}
                    onClick={this.okBttnPressed} type="primary" autofocus={true}
					ref={this.closeButtonRef}>
                        {props.okText !== undefined ? props.okText : 'Ok'}</button> : null }
                </span>
				</div>
            </o-dialog>	
    </Fragment>
		);
	}
}

// {props.children ? props.children : null}

export default Dialog;
