import { h, Fragment } from "preact";
// import { route } from 'preact-router';
// import { Link } from "wouter-preact";
// import { Router } from 'preact-router';
// import { Link } from 'preact-router/match';
// import { useContext } from "preact";
import { useState } from "preact/hooks";

/*
// import TopAppBar from 'preact-material-components/TopAppBar';
// import Drawer from 'preact-material-components/Drawer';
// import List from 'preact-material-components/List';
// import Dialog from 'preact-material-components/Dialog';
// import Switch from 'preact-material-components/Switch';
// import 'preact-material-components/Switch/style.css';
// import 'preact-material-components/Dialog/style.css';
// import 'preact-material-components/Drawer/style.css';
// import 'preact-material-components/List/style.css';
// import 'preact-material-components/TopAppBar/style.css';
// import Radio from 'preact-material-components/Radio';
// import FormField from 'preact-material-components/FormField';
// import 'preact-material-components/FormField/style.css';
// import 'preact-material-components/List/style.css';
// import Button from 'preact-material-components/Button';
// import 'preact-material-components/Button/style.css';
*/
import Media from "../../utils/Media";
// import { Link } from 'preact-router/match';

import Config from "../../utils/Config";

import style from "./style";

function openHtmlRadioPlayer () {
  let blankurl = 'https://www.radioplayer.fi';
  // window.open(blankurl, '_blank', "Telkurpurlrpurlssa", "location=no");
   window.open(blankurl, "_blank", "RadioPlayer");
}

function Header(props){
  
/*
  if (props.darkThemeEnabled) {
    import("../AppBackgroundBlack.css");
  } else {
  }
  */

  let curr_route = props.selectedRoute.toString();
  //   <header class={style.header}>
  return (
    <header class={style.header}>
        <div class={style.header}
          role="navigation"
          lang="fi"
          tabIndex="0"
          aria-label="Ohjelmalähteet ja ulkoasu (musta tai valkoinen)"
        >
          <nav>
            <h1>Tv- ja radio-ohjelmat</h1>
            <space> </space>
            <a 
              tablndex="0"
              id="radio_telkku"
              className={curr_route === "/telkku" ? style.active : null}
              href="/telkku"
            >
              Telkku
            </a>
            
            <a 
              tablndex="0"
              id="radio_player"
              className={curr_route === "/radioplayer" ? style.active : null}
              href="/radioplayer"
        
            >
              Radio Player
            </a>       
            <a 
              tablndex="0"
              id="radio_telkkuhtml"
              className={curr_route === "/htmltelkku" ? style.active : null}
              href="/htmltelkku"
            >
              Telkku html
            </a>

            <a 
              tablndex="0"
              id="radio_htmlamppari"
              className={curr_route === "/htmlamppari" ? style.active : null}
              href="/htmlamppari"
            >
              Amppari Tv html
            </a>
            <button onClick={props.toggleDarkTheme}>Vaihda teemaa</button>
          </nav>
        </div>
        </header>
  ); //      

}

/*

    <a tablndex="0"
              id="radio_yle"
              className={curr_route === "/" ? style.active : null}
              href="/"
            >
              Yle
            </a>   

            <a 
              tablndex="0"
              id="radio_amppari"
              className={curr_route === "/amppari" ? style.active : null}
              href="/amppari"
            >
              Amppari Tv
            </a>

<Link
              tablndex="0"
              id="radio_yle"
              activeClassName={style.active}
              href="/"
              onClick={this.linkClicked}
            >
              Yle
            </Link>
            <Link
              tablndex="0"
              id="radio_telkku"
              activeClassName={style.active}
              href="/telkku"
              onClick={this.linkClicked}
            >
              Telkku
            </Link>
            <Link
              tablndex="0"
              id="radio_telkkuhtml"
              activeClassName={style.active}
              href="/htmltelkku"
              onClick={this.linkClicked}
            >
              Telkku html
            </Link>
            <Link
              tablndex="0"
              id="radio_amppari"
              activeClassName={style.active}
              href="/amppari"
              onClick={this.linkClicked}
            >
              Amppari Tv
            </Link>
            <Link
              tablndex="0"
              id="radio_htmlamppari"
              activeClassName={style.active}
              href="/htmlamppari"
              onClick={this.linkClicked}
            >
              Amppari Tv html
            </Link>
*/

/*
				<TopAppBar className="topappbar">	
					<TopAppBar.Row>
						<TopAppBar.Section align-start={!Media.screen.isTabbletOrMobile_1224}>
							<TopAppBar.Title tabIndex="0" >TV ohjelmat</TopAppBar.Title>
							
							<div role="radiogroup" aria-labelledby="idprogramdatasource"
							style={{ "display": "table", "margin": "0 auto" }} 
							data-message="Mistä ohjelmia haetaan (radionapit) sekä ulkoasun valinta painonapista">
							<label id="idprogramdatasource">Ohjelmalähde:</label>
						<FormField>
							<Radio aria-label="" tabIndex="0" id="radio_yle" name='optsource' 
							    checked={state.progsource == 'radio_yle'} 
								onChange={this.radioProgSourceChanged} ></Radio>
							<label style={{ color: "white" }} 
							for="radio_yle">Yle</label>
						</FormField>
						<FormField>
							<Radio tabIndex="0" id="radio_telkku" name='optsource' 
							    checked={state.progsource == 'radio_telkku'}
								onChange={this.radioProgSourceChanged}></Radio>
							<label style={{ color: "white" }} 
							for="radio_telkku">Telkku</label>
						</FormField>
						<FormField>
							<Radio tabIndex="0" id="radio_telkkuhtml" name='optsource' 
							    checked={state.progsource == 'radio_telkkuhtml'} 
								onChange={this.radioProgSourceChanged}></Radio>
							<label style={{ color: "white" }} 
							for="radio_telkkuhtml">Telkku html</label>
						</FormField>
						<FormField>
							<Radio tabIndex="0" id="radio_amppari" name='optsource' 
							    checked={state.progsource == 'radio_amppari'} 
								onChange={this.radioProgSourceChanged}></Radio>
							<label style={{ color: "white" }} 
							for="radio_amppari">Amppari tv</label>
						</FormField>
						<FormField>
							<Radio tabIndex="0" id="radio_htmlamppari" name='optsource' 
							    checked={state.progsource == 'radio_htmlamppari'}
								onChange={this.radioProgSourceChanged}></Radio>
							<label style={{ color: "white" }} 
							for="radio_htmlamppari">Amppari tv html</label>
						</FormField>						
				</div>
					<div><FormField><Button style={{ color: "white" }} role="button" lang="fi"
						tabIndex="0" onClick={this.toggleDarkTheme}>Vaihda ulkoasua</Button></FormField>
					</div>

						</TopAppBar.Section>
						<TopAppBar.Section align-end={!Media.screen.isTabbletOrMobile_1224} shrink-to-fit onClick={this.openSettings}>
							<TopAppBar.Icon>settings</TopAppBar.Icon>
						</TopAppBar.Section>
					</TopAppBar.Row>
				</TopAppBar>
				<Drawer modal ref={this.drawerRef}>
					<Drawer.DrawerContent >
						<Drawer.DrawerItem selected={props.selectedRoute === '/'} onClick={this.goHome}>
							<List.ItemGraphic>home</List.ItemGraphic>
							Home
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/profile'} onClick={this.goToMyProfile}>
							<List.ItemGraphic>account_circle</List.ItemGraphic>
							Profile
						</Drawer.DrawerItem>
					</Drawer.DrawerContent>
				</Drawer>
				<Dialog tabIndex="0" ref={this.dialogRef} role="dialog" id="dialogtheme" 
					 aria-modal="false">
					<Dialog.Header tabIndex="0" >Asetukset</Dialog.Header>
					<Dialog.Body>
						<div>
							<div id="divtheme" lang="fi" >Vaihda tummaan sivuteemaan tai vaaleaan teemaan 
							</div>
							<br/><Switch ref={this.themeswitch} 
							checked={this.state.darkThemeEnabled}
							onClick={this.toggleDarkTheme} />
						</div>
					</Dialog.Body>
					<Dialog.Footer>
						<Dialog.FooterButton tabIndex="0" accept>OK</Dialog.FooterButton>
					</Dialog.Footer>
				</Dialog>


<h1>Tv-ohjelmat</h1>
		<nav>
			<Link tablndex="0" activeClassName={style.active} href="/">Yle</Link>
			<Link tablndex="0" activeClassName={style.active} href="/telkku">Telkku</Link>
			<Link tablndex="0" activeClassName={style.active} href="/telkkuhtml">Telkku html</Link>
			<Link tablndex="0" activeClassName={style.active} href="/amppari">Amppari Tv</Link>
			<Link tablndex="0" activeClassName={style.active} href="/ampparihtml">Amppari Tv html</Link>
		</nav>
		*/

export default Header; 