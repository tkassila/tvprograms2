    
import {h } from 'preact';
import Config from '../../utils/Config';
import ShowProgram from './ShowProgram';

/**
 * This Address function is showing a programgrid or -list.
 */
// class Address extends Component 
function RssTelkkuChannel(props)
{
       // const cssDark = useContext(CssDark);
        let displayitems = null;
        /*
        	jsonitem.title = item.getElementsByTagName("title")[0].childNodes[0].nodeValue;
		jsonitem.descripprogs && tion = item.getElementsByTagName("description")[0].childNodes[0].nodeValue;
		jsonitem.pubdate = item.getElementsByTagName("pubDate")[0].childNodes[0].nodeValue;
		jsonitem.link =
        */
        if (props.data.channelprograms !== null)
            displayitems = props.data.channelprograms.map((program, i) => {
				return <ShowProgram id={'telkkuchannel' +i} data={program}
                    displayAllDescriptions={props.displayAllDescriptions}
                    getPOfIndex={props.getPOfIndex}
                    themevalue={props.themevalue}
                    showSearch={props.showSearch == undefined ? false : props.showSearch}
                    channel={props.data.title} />;
			});

        return (
            <div>
            <h3 tabIndex="0" lang="fi" aria-label={props.data.title}>
                {props.showSearch && props.data.titleindex != undefined
                        ? props.getPOfIndex(props.data.titleindex, props.data.title,
                            this.props.themevalue) : props.data.title.toString().replace("Telkussa: ", "")}</h3>
            <div>{displayitems}</div>
            </div>
          );
}

export default RssTelkkuChannel;