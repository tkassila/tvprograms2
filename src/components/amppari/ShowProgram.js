    
import {h, Fragment, Component, createRef } from 'preact';
import { useState } from 'preact/hooks';
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

//import Dialog from '../dialog/Dialog';
import Dialog from '../dialog/PreactDialog';

import Config from '../../utils/Config';

/**
 * This Address function is showing a programgrid or -list.
 */
// class Address extends Component 
class ShowProgram extends Component
{

    scrollingDlgRef = null;

    constructor(props){
        super(props);
        this.state = {
            count: 0,
            displaydescription: false,
            displayAllDescriptions: props.displayAllDescriptions,
        };
        this.scrollingDlgRef = createRef();
    }

    increment = () => { this.setState({count: count + 1}); }
    // You can also pass a callback to the setter
    decrement = () => { this.setState({count: count - 1}); }

    onClickDisplay = (event) => {     
        event.preventDefault();   
        console.log("onClickDisplay");
        if (this.state.displayAllDescriptions)
            return;
        if (!this.state.displaydescription)
            this.scrollingDlgRef.current.MDComponent.show();
        this.setState({displaydescription: ! this.state.displaydescription });
    }

    onClickDisplayDialog = (event) => {     
        event.preventDefault();   
        console.log("onClickDisplayDialog");
        if (this.state.displaydescription)
            this.scrollingDlgRef.current.MDComponent.close();
        this.setState({displaydescription: ! this.state.displaydescription });
    }

    componentDidMount()
	{
        console.log("componentDidMount");
        console.log("this.scrollingDlgRef");
        console.log(this.scrollingDlgRef);
    }

    
    componentWillReceiveProps(nextProps) 
	{
	  if (Config.bDebug)
	  {
		console.log("ShowProgram componentWillReceiveProps nextProps"); 
		console.log(nextProps); 				
	  }

      this.setState({ displayAllDescriptions: nextProps.displayAllDescriptions
					});
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

    render(props, state) {
        let divDialogStyle = (props.themevalue !== undefined && props.themevalue !== '' ? "color: #FFF; background-color: black; border-color: #FFF;" : "color: #FFF; background-color: black; border-color: #FFF;");
		const inputw = "float: none; display: inline-block; vertical-align: middle; ";
        const tltle = (props.data.title !== undefined && props.data.title != '' ?
            props.data.title.replaceAll("\n"," ").replaceAll("\s+"," ") : '';

            /*
        console.log("->" );
        console.log(props.data.title);
        console.log("<-");

        console.log("->" );
        console.log(divDialogStyle);
        console.log("<-");
        */
       
        return (           
            <Fragment>
                <div onClick={this.onClickDisplay} >                  
                    <p><b>{props.showSearch && props.data.titleindex != undefined
                    ? props.getPOfIndex(props.data.titleindex, props.data.title,
                        props.themevalue) 
                    : props.data.title}</b></p>
                    {state.displayAllDescriptions ? 
                    <Fragment><p>{ props.showSearch && props.data.descriptionindex != undefined
                        ? props.getPOfIndex(props.data.descriptionindex, 
                            props.data.description, this.props.themevalue) 
                        : props.data.description }</p>
                        <p><a href={props.data.link} target="_blank">ohjelmalinkki</a></p>
                        </Fragment> : null}
                    
                        <Dialog role="dialog" id="yledialogshowprog" aria-labelledby="h1loading"
                            aria-modal="true" lang="fi" ref={this.scrollingDlgRef} 
                            title={props.channel} 
                            themevalue={props.themevalue}
                            okButtonPressed={this.onClickDisplayDialog}
                            okText="Sulje" scrollable={true}
                            >
                                <div class="card-header" style={divDialogStyle}>
                                     <h3 id="h1lprogram" class=" mdc-typography--title">
                                         {props.data.title}</h3>
                                     <h3 class=" mdc-typography--title">
                                         {props.data.description}</h3><br/>
                                </div>
   	        			</Dialog>
                    </div>
            </Fragment>

          );
   }
}

/*
       <Dialog role="dialog" id="dialogprogram" aria-modal="true"
                               ref={this.scrollingDlgRef}>
                                <Dialog.Header>{props.channel}</Dialog.Header>
                                <Dialog.Body scrollable={true}>
                                  <Card><div class="card-header">
                                     <h3 id="h1lprogram" class=" mdc-typography--title">
                                         {props.data.title}</h3>
                                     <h3 class=" mdc-typography--title">
                                         {props.data.description}</h3><br/>
                                     </div>
                                     <Card.Media className="card-media" />
                                  </Card>
                                </Dialog.Body>
                                <Dialog.Footer>
                                    <Dialog.FooterButton onCancel={this.onClickDisplayDialog} cancel={true} >Sulje</Dialog.FooterButton>
                                </Dialog.Footer>
                    </Dialog> 
             */

export default ShowProgram;