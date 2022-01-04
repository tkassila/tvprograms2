import { h, Component } from 'preact';

const timezones = ['PST', 'MST', 'MDT', 'EST', 'UTC']

export default class TimeForm extends Component {

    constructor(props) {
        super(props);
        /*
        this.fetchCurrentTime = this.fetchCurrentTime.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        */
        const {tz, msg} = props;
        this.state = {tz, msg};
    }
        _
    _handleChange(evt) {
        typeof this.props.onFormChange === 'function' &&
        this.props.onFormChange(this.state);
    }

    _changeTimezone(evt) {
        const tz = evt.target.value;
        this.setState({tz}, this._handleChange);
    }

    _changeMsg(evt) {
        const msg =
        encodeURIComponent(evt.target.value).replace(/%20/, '+');
        this.setState({msg}, this._handleChange);
    }
        _
    _handleFormSubmit(evt) {
        evt.preventDefault();
        typeof this.props.onFormSubmit === 'function' &&
        this.props.onFormSubmit(this.state);
    }

    render(props, state) {
        const {tz} = state;
        return (
            <form onSubmit={this._handleFormSubmit}>
                <select
                    onChange={this._changeTimezone}
                    defaultValue={tz}>
                    {timezones.map(t => {
                    return (<option key={t} value={t}>{t}</option>)
                    })}
                </select>
                <input
                type="text"
                placeholder="A chronic string message (such as 7 hours from
                now)"
                onChange={this._changeMsg}
                />
                <input
                type="submit"
                value="Update request"
                />
            </form>
        )
    }
}
