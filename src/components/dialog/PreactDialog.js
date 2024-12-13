import { h, Component, Fragment, createRef } from "preact";
import _uniqueId from "lodash/uniqueId";
import style from "./Dialog.css";
import css from "./Dialog.css";
import Config from "../../utils/Config";

import Dialog from "preact-material-components/Dialog";
//import Button from "preact-material-components/Button";
// import Button from "../button/Button";
// import List from "preact-material-components/List";
import Card from "preact-material-components/Card";
// import "preact-material-components/List/style.css";
// import "preact-material-components/Button/style.css";
import "preact-material-components/Dialog/style.css";

/**
 * This dialog class combines together preact dialog class with
 * @micro/button class, because preact material button class dies
 * not work with DialogFooter.Button alias preact Button!
 */
class PreactDialog extends Component {
  dialogRef = null;
  closeButtonRef = null;
  channelHeader = null;

  constructor(props) {
    super(props);
    this.state = {
      dialogid: _uniqueId("dialog-"),
    };

    this.closeButtonRef = createRef();
    this.dialogRef = createRef();
    //   console.log("dialog constructor: dialogid=" +this.state.dialogid)
    // this.dialogRef = createRef();
  }

  componentDidMount() {
    //TODO:  this.dialogRef = document.getElementById("dialog" + this.state.dialogid);
    //    this.dialogRef.open();
  }

  dialogBttnPressed = (event) => {
    event.preventDefault();
    //    console.log("dialog dialogBttnPressed: dialogRef=" +this.dialogRef)
    this.dialogRef.MDComponent.show();
  };

  open = () => {
    this.dialogRef.current.MDComponent.show();
    if (Config.bDebug) console.log("before closeButtonRef.current.focus");
    this.closeButtonRef.current.focus();
    // this.dialogRef = document.getElementById("mydialog");
    if (Config.bDebug)
      console.log("dialog componentDidMount: dialogRef=" + this.dialogRef);
  };

  close = () => {
    this.dialogRef.current.MDComponent.close();
  };

  cancelBttnPressed = (event) => {
    event.preventDefault();
    //   console.log("dialog cancelBttnPressed: dialogRef=" +this.dialogRef)
    this.dialogRef.current.MDComponent.close();
    this.props.cancelButtonPressed(event);
  };

  okBttnPressed = (event) => {
    event.preventDefault();
    if (Config.bDebug)
      console.log("dialog okBttnPressed: dialogRef=" + this.dialogRef);
    // console.log("this.dialogRef=" +this.dialogRef.visible);
    // this.dialogRef.visible = true;
    this.dialogRef.current.MDComponent.close();
    this.props.okButtonPressed(event);
    // console.log("this.dialogRef=" +this.dialogRef.visible);
  };

  changeThemeBttnPressed = (event) => {
    event.preventDefault();
    const setTheme = Omiu.setTheme;
    setTheme("primary", "green");
  };

  enterKeyDown = (e) => {
    e = e || window.event;
    let keyCode = e.keyCode || e.which;

    if (Config.bDebug) console.log("Dialog pressed");

    let currentColInd = null;

    // .item(0).innerHTML
    switch (e.keyCode) {
      case 13:
        this.dialogRef.current.MDComponent.close();
        this.props.okButtonPressed(e);
        break;
    }
  };

  /*
                   <o-button type="primary" onClick={this.changeThemeBttnPressed} >Kissa2</o-button>
                    <o-button round type="primary" size="mini"
                    onClick={this.dialogBttnPressed} >Dialog</o-button>
            
					id={"dialog"+this.state.dialogid}
    */

  render(props, state) {
    if (Config.bDebug) {
      console.log("->");
      console.log(props);
      console.log(state);
      console.log("<-");
    }

    return (
      <Fragment>
        <Dialog
          ref={this.dialogRef}
          role="dialog"
          id="dialogtheme"
          aria-modal="true"
          style={css.odialog}
        >
          <Dialog.Header lang="fi" tabIndex="0">
            {props.title}
          </Dialog.Header>       

          <Dialog.Body scrollable={true}>
            <Card>
         //     <div class="card-header">
                {props.children ? props.children : null}
        //      </div>
              <Card.Media className="card-media" />
            </Card>
          </Dialog.Body>
          <Dialog.Footer>
            <div onKeyDown={this.enterKeyDown}>
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
                    onClick={this.cancelBttnPressed}
                  >
                    {props.cancelText !== undefined
                      ? props.cancelText
                      : "Cancel"}
                  </button>
                ) : null}
                {props.okButtonPressed !== undefined ? (
                  <button
                    id="okBtn"
                    tabIndex="0"
                    style={
                      " margin: 15px;  height: 30px; background: blue; color: white;"
                    }
                    onClick={this.okBttnPressed}
                    type="primary"
                    autofocus={true}
                    ref={this.closeButtonRef}
                  >
                    {props.okText !== undefined ? props.okText : "Ok"}
                  </button>
                ) : null}
              </span>
            </div>
          </Dialog.Footer>
        </Dialog>
      </Fragment>
    );
  }
}

// {props.children ? props.children : null}

export default PreactDialog;
