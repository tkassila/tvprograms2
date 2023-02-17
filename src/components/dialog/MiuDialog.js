import { h, Component, Fragment, createRef } from "preact";
// import { useState } from "preact/hooks";
import _uniqueId from "lodash/uniqueId";
import style from "./Dialog.css";
import css from "./Dialog.css";
import Config from "../../utils/Config";

// !!!! This file is not ready!!

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

class MiuDialog extends Component {
  dialogRef = null;
  closeButtonRef = null;
  channelHeader = null;

  constructor(props) {
    super(props);
    this.state = {
      dialogid: _uniqueId("dialog-"),
      open: false,
    };

    this.closeButtonRef = createRef();
    this.dialogRef = createRef();
    //   console.log("dialog constructor: dialogid=" +this.state.dialogid)
    // this.dialogRef = createRef();
  }

  setOpen = (value) => this.setState({ open: value });

  handleClickOpen = () => {
    setOpen(true);
  };

  handleClose = () => {
    this.setOpen(false);
  };

  componentDidMount() {
    //TODO:  this.dialogRef = document.getElementById("dialog" + this.state.dialogid);
    //    this.dialogRef.open();
  }

  dialogBttnPressed = (event) => {
    event.preventDefault();
    //    console.log("dialog dialogBttnPressed: dialogRef=" +this.dialogRef)
    this.dialogRef.open();
  };

  open = () => {
    this.dialogRef.current.open();
    console.log("before closeButtonRef.current.focus");
    this.closeButtonRef.current.focus();
    // this.dialogRef = document.getElementById("mydialog");
    console.log("dialog componentDidMount: dialogRef=" + this.dialogRef);
  };

  close = () => {
    this.dialogRef.current.close();
  };

  cancelBttnPressed = (event) => {
    event.preventDefault();
    //   console.log("dialog cancelBttnPressed: dialogRef=" +this.dialogRef)
    this.dialogRef.current.close();
    this.props.cancelButtonPressed(event);
  };

  okBttnPressed = (event) => {
    event.preventDefault();
    if (Config.bDebug)
      console.log("dialog okBttnPressed: dialogRef=" + this.dialogRef);
    // console.log("this.dialogRef=" +this.dialogRef.visible);
    // this.dialogRef.visible = true;
    this.dialogRef.current.close();
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
        this.dialogRef.current.close();
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
    console.log("->");
    console.log(props);
    console.log(state);
    console.log("<-");

    return (
      <Fragment>
        <Dialog
          ref={this.dialogRef}
          role="dialog"
          id="dialogtheme"
          open={state.open}
          onClose={this.dialogBttnPressed}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="dialog-title" lang="fi" tabIndex="0">
            {props.title}
          </DialogTitle>
          <DialogContent>
            {props.children ? props.children : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.dialogBttnPressed}>
              id="okBtn" tabIndex="0" style=
              {" margin: 15px;  height: 30px; background: blue; color: white;"}
              onClick={this.okBttnPressed}
              type="primary" autofocus={true}
              ref={this.closeButtonRef}>
              {props.okText !== undefined ? props.okText : "Ok"}
            </Button>
            <Button onClick={this.cancelBttnPressed}>
              {props.cancelText !== undefined ? props.cancelText : "Cancel"}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

// {props.children ? props.children : null}

export default MiuDialog;
