import { h } from 'preact';
import { useState } from 'preact/hooks';
import style from './style';
import Config from '../../utils/Config';
// import 'whatwg-fetch';
import { fetchJsonp } from 'fetch-jsonp';
//import dayjs from 'dayjs';
import _uniqueId from 'lodash/uniqueId';
// import List from 'preact-material-components/List';
// import 'preact-material-components/List/style.css';

// import Category from './Category';
// import GridOrList from './GridOrList';
import YleProgram from './YleProgram';


// import StaticFunctions from '../../utils/StaticFunctions';

export default function YleChannel(props) {

	// formatForServiceTime = "yyyy-MM-dd'T'HH:mm:ss.SSSZZ";

		const [h3id] = useState(_uniqueId('prefix-'));

		const oldProgram =(program, currenttime) =>
		{
			const startTime = new Date(program.startDate);
			const endtTime = new Date(program.endDate);
			const endtTimeHours =  endtTime.getHours();
			const currentHours =  currenttime.getHours();
			if (endtTime > currenttime)
			{
				// console.log("kkk");
				return false;
			}
			if (endtTime < currenttime)
			{
				// console.log("kkk");
				return true;
			}

			if (endtTimeHours < currentHours)
			{
				console.log("kkk");
				return true;
			}
			if (endtTimeHours > currentHours)
			{
				console.log("kkk");
				return false;
			}
			if (endtTime.getHours() === currenttime.getHours())
			{
				const endtTimeMinutes =  endtTime.getMinutes();
				const currentMinutes =  currenttime.getMinutes();
					if( endtTimeMinutes < currentMinutes)
				{
					console.log("kkk");
					return true;
				}
			}
			return false;
		}

		const getPrograms = (programs) =>
		{
			if (programs == undefined || programs === null)
				return null;

			let progs = programs.map((s, k) => {
				if (s === null || s === undefined || props.data === null
					|| props.data == undefined)
				{
					if (Config.bDebug)
					{
						console.log("s= k=" +k);
						console.log(s);
						console.log("data=");
						console.log(props.data);
					}
				}
				if ((props.data && s.status != 'schedule-list__no-data')
				 	/* && (!props.bShowOnlyMovies || 
					(props.bShowOnlyMovies && s.movie )) */ )
				{ 
					/*					
					if ((!props.bShowOnlyMovies &&
						(!props.bshowdcurrentprograms || (props.bshowdcurrentprograms 
							&& !oldProgram(s, props.currenttime)))) */ /* || 
						(props.bShowOnlyMovies && s.movie && (!props.bshowdcurrentprograms 
							|| (props.bshowdcurrentprograms && !oldProgram(s, props.currenttime))) )  ) */
					return <YleProgram id={k} data={s} 
						selectedcategory={props.selectedcategory} 
						bSvLang={props.bSvLang} 
						channelname={props.data ? props.data.name : ''}
						bShowDesciption={props.bShowDesciption}
						showSearch={props.showSearch == undefined ? false 
							: props.showSearch}
						themevalue={props.themevalue}
						getPOfIndex={props.getPOfIndex} />;
				}
		  });

		  
		  if (props.bShowOnlyMovies && progs)
		  {
			let progs2 = [];
			Array.from(progs).forEach(item => {
				if (item.props.data.movie)
				{
					if(Config.bDebug)
						console.log("movie");
					progs2.push(item);
				}
			});
			progs = progs2;
		  }

		  if (props.bshowdcurrentprograms && progs)
		  {
			let progs1 = [];
			Array.from(progs).forEach(item => {
				if (item.props.data.movie)
				{
					if(Config.bDebug)
						console.log("movie");
				}
				if (!oldProgram(item.props.data, props.currenttime))
				{
					if (Config.bDebug)
						console.log("!oldProgram");
					progs1.push(item);
				}
			});
			progs = progs1;
	       }

		  return progs;
		}

		const onfocusoutfunc = (e) =>
		{
			if (Config.bDebug)
				console.log("onfocusoutfunc");
		}

		const onfocusfunc = (e) =>
		{
			if (Config.bDebug)
				console.log("onfocusfunc");
		}

		return (			
			<div >
				<h3 id={h3id} name={h3id} tabIndex="0" lang="fi" aria-label={props.data.name}				
				onfocusout={onfocusoutfunc} onfocus={onfocusfunc}>{props.showSearch && 
					props.data.titleindex != undefined
					? props.getPOfIndex(props.data.titleindex, props.data.name,
						this.props.themevalue) : props.data.name}</h3>
				{props.data && props.data.nomoreprogramstoday && props.data.desciption ? 
				  <div>{props.data.desciption}</div> : null}
				<div>{props.schedules && getPrograms(props.schedules)}</div>
			</div>
		)
}
