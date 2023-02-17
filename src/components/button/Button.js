import { h, Component, Fragment } from 'preact';
//import style from './style.css';
// import { styled, setup } from "goober";
// import style from './Button.css';
// import  '@omiu/button';
// import * as css from './Dialog.css';

/*
setup(h);

const OButton = styled("button")`
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

const Button = (props) => {

	const buttonid = Date.now();

    /*
	constructor(props)
	{
		super(props);
		this.state = {
		    buttonid:  Date.now()
		};
     //   console.log("dialog constructor: dialogid=" +this.state.dialogid)
		// this.dialogRef = createRef();		
	}
    */

    /*
	componentDidMount()
	{
	//	this.dialogRef = document.getElementById("dialog"+this.state.dialogid);
//	this.dialogRef = document.getElementById("mydialog");	
    //    console.log("dialog componentDidMount: dialogRef=" +this.dialogRef)
   //    this.dialogRef.open();
	}
    */

    /*
                   <o-button type="primary" onClick={this.changeThemeBttnPressed} >Kissa2</o-button>
                    <o-button round type="primary" size="mini"
                    onClick={this.dialogBttnPressed} >Dialog</o-button>
            
					id={"dialog"+this.state.dialogid}
    */

//	render(props, state) {
		return(	
            <Fragment>
                <button type="primary" onClick={props.onClick} tabIndex="0"
                disabled={props.disabled} id={ props.id ? props.id : buttonid}
				style={props.style !== undefined ? props.style +" height: 30px; background: blue; " : " height: 30px; background: blue; "} 
				class={props.class !== undefined ? props.class : null} 
				>{props.text}
            </button>	
            </Fragment>
		);
//	}
}

/*
             <o-button type="primary" onClick={props.onClick} tabIndex="0"
                disabled={props.disabled}
				style={props.style !== undefined ? props.style : null} 
				class={props.class !== undefined ? props.class : null} 
				>{props.text}
            </o-button>	
   */
export default Button;
