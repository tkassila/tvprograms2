import {h, Fragment, Component, createRef, render } from 'preact';
import { useRef } from 'preact/hooks';
// import { forwardRef } from 'preact/compat';
import Config from '../../utils/Config';
import './index.css';
//import Switch from 'preact-material-components/Switch';
//import 'preact-material-components/Switch/style.css';

/**
 * This Address function is showing a programgrid or -list.
 */
// class Address extends Component 
class SwitchCheckBox extends Component 
// function SwitchCheckBox(props) /* = forwardRef((props, ref) => */
{
    constructor(props)
	{
		super(props);
		if(Config.bDebug) 
		{
			console.log("SwitchCheckBox.js");
			console.log("props");
			console.log(props);
		}

		this.state = {
			errmsg: null,
		}
		
		this.chechRef = createRef();
	
	 }

    //const refcomp = useRef(null);
    /*
       <Fragment>

        <Switch lang="fi" tabIndex="0" type="checkbox" onChange={props.onChange} .
                            ref={props.inputref === undefined ? undefined : props.inputref}                     
                            id={props.inputid === undefined ? 'idcheckboxundef' : props.inputid}
                            checked={props.checked === undefined ? false : props.checked}

                        <input lang="fi" type="checkbox" onChange={props.onChange} 
                            ref={props.inputref === undefined ? undefined : props.inputref}                     
                            id={props.inputid === undefined ? 'idcheckboxundef' : props.inputid}
                            checked={props.checked === undefined ? false : props.checked} />
                            <span class="checkmark"></span>
                            <label lang="fi" class="container" 
                        for={props.inputid === undefined ? 'idcheckboxundef' : props.inputid}
                        id={props.inputid === undefined ? 'idcheckboxundef-label' : props.inputid+'-label'} >
                            {props.labeltext}
                    </label>
                </Fragment>
                */
     render(props, state)
     {
        const inputw = "float: none; display: inline-block; vertical-align: middle; ";

        return (
                <Fragment>
                        <input lang="fi" tabIndex="0" type="checkbox" onChange={props.onChange} 
                            className="form-check-input filled-in" 
                            ref={props.propref} style={inputw}                    
                            id={props.inputid === undefined ? 'idcheckboxundef' : props.inputid}
                            checked={props.checked === undefined ? false : props.checked}
                             />
                         
                            <label lang="fi" style={  'margin-left: 5px;'} class="container" style={inputw} 
                        for={props.inputid === undefined ? 'idcheckboxundef' : props.inputid}
                        id={props.inputid === undefined ? 'idcheckboxundef-label' : props.inputid+'-label'} >
                            {props.labeltext}
                    </label>
                </Fragment>
        );
     }
}

export default SwitchCheckBox;