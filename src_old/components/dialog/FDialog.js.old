import { h, Component, Fragment, createRef } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

//import style from './style.css';
//import { styled, setup } from "goober";
import style from "./Dialog.css";
import "@omiu/dialog";
import _uniqueId from "lodash/uniqueId";
// import '@omiu/common';
//import * as css from './Dialog.css';
import css from "./Dialog.css";
//import Button from '../button/Button';

import Config from "../../utils/Config";

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

function FDialog(props) {
  const [dialogRef, setDialogRef] = useState(null);
  const closeButtonRef = useRef(null);
  const channelHeader = useRef(null);
  const dialogid = _uniqueId("dialog-");

  useEffect(() => {
    setDialogRef(document.getElementById("dialog" + dialogid));
    closeButtonRef.current.focus();
  }, []);

  const dialogBttnPressed = (event) => {
    event.preventDefault();
    //    console.log("dialog dialogBttnPressed: dialogRef=" +dialogRef)
    dialogRef.open();
  };

  const open = () => {
    dialogRef.open();
  };

  const close = () => {
    dialogRef.close();
  };

  const cancelBttnPressed = (event) => {
    event.preventDefault();
    //   console.log("dialog cancelBttnPressed: dialogRef=" +dialogRef)
    dialogRef.close();
    props.cancelButtonPressed(event);
  };

  const okBttnPressed = (event) => {
    event.preventDefault();
    if (Config.bDebug)
      console.log("dialog okBttnPressed: dialogRef=" + dialogRef);
    // console.log("dialogRef=" +dialogRef.visible);
    // dialogRef.visible = true;
    dialogRef.close();
    props.okButtonPressed(event);
    // console.log("dialogRef=" +dialogRef.visible);
  };

  const changeThemeBttnPressed = (event) => {
    event.preventDefault();
    const setTheme = Omiu.setTheme;
    setTheme("primary", "green");
  };

  const enterKeyDown = (e) => {
    e = e || window.event;
    let keyCode = e.keyCode || e.which;

    if (Config.bDebug) console.log("Dialog pressed");

    let currentColInd = null;

    // .item(0).innerHTML
    switch (e.keyCode) {
      case 13:
        dialogRef.close();
        props.okButtonPressed(e);
        break;
    }
  };

  /*
                   <o-button type="primary" onClick={this.changeThemeBttnPressed} >Kissa2</o-button>
                    <o-button round type="primary" size="mini"
                    onClick={this.dialogBttnPressed} >Dialog</o-button>
            
					id={"dialog"+this.state.dialogid}
    */

  return (
    <Fragment>
      <o-dialog
        id={"dialog" + dialogid}
        title={props.title}
        style={css.odialog}
      >
        {props.children ? props.children : null}
        <div onKeyDown={enterKeyDown}>
          <span></span>
          <span slot="footer" class="dialog-footer">
            {props.cancelButtonPressed !== undefined ? (
              <button
                style={
                  " margin: 15px;  height: 30px; background: blue; color: white;"
                }
                id="cancelBtn"
                tabIndex="0"
                type="primary"
                onClick={cancelBttnPressed}
              >
                {props.cancelText !== undefined ? props.cancelText : "Cancel"}
              </button>
            ) : null}
            {props.okButtonPressed !== undefined ? (
              <button
                id="okBtn"
                tabIndex="0"
                style={
                  " margin: 15px;  height: 30px; background: blue; color: white;"
                }
                onClick={okBttnPressed}
                type="primary"
                autofocus={true}
                ref={closeButtonRef}
              >
                {props.okText !== undefined ? props.okText : "Ok"}
              </button>
            ) : null}
          </span>
        </div>
      </o-dialog>
    </Fragment>
  );
}

// {props.children ? props.children : null}

export default FDialog;
