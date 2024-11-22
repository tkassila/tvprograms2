import { Component, Fragment } from "preact";
import style from "./style";
import Config from "../../utils/Config";
import dayjs from "dayjs";

/**
 * This class is using preact signal function on its props signalValueChange.
 * When a new value is selected, then signalValueChange.value is asigned a new object.
 * This new object contains .ind = number and .selected text value.
 * If signal variable has code effect(() => ...code which refers signal variable)
 * or computed(() => ...code.. ) then that code is called indirectly from this class
 * under a user selection. Signal variable is: signalValueChange.
 *
 * <code>
 *   <SignalSelectedValue
                  disabled={
                    state.fetcheditems == null || state.fetcheditems.length == 0
                  }
                  labeltext="Kanavatyyppi"
                  signalValueChange={this.current_channeltype}
                  selectitems={this.arr_selectchanneltypes}
                />
   </code>             
 */
export default class SignalSelectedValue extends Component {
  _mounted = false;

  constructor(props) {
    super(props);
    if (Config.bDebug) {
      console.log("SignalSelectedValue.js");
      console.log("props");
      console.log(props);
    }

    this.state = {
      errmsg: null,
      disabled: props.disabled,
      selectedindex: props.signalValueChange.value.ind,
      selected: props.signalValueChange.value.selected,
    };
  }

  componentDidMount() {
    if (Config.bDebug) console.log("componentDidMount ChannnelTypes");

    this._mounted = true;
  }

  componentWillReceiveProps(nextProps) {
    if (Config.bDebug) {
      console.log("SignalSelectedValue componentWillReceiveProps nextProps");
      console.log(nextProps);
    }
    if (!this._mounted) return;
    if (
      nextProps.disabled != undefined &&
      nextProps.disabled != this.props.disabled
    )
      this.setState({ disabled: nextProps.disabled });
  }

  render(props, state) {
    if (Config.bDebug) {
      console.log("state");
      console.log(state);
    }

    const selectitems = props.selectitems.map((child, i) => (
      <option value={child} id={i}>
        {child}
      </option>
    ));

    return (
      <Fragment>
        <span>
          <label for="idchanneltype">{props.labeltext}</label>
          <select
            tabIndex="0"
            disabled={state.disabled}
            id="idchanneltype"
            selectedIndex={this.state.selectedindex}
            preselected
            outlined
            onChange={(e) => {
              console.log("e.target.target");
              const ind = e.target.selectedIndex;
              const selected = this.props.selectitems[ind];
              let changed = {};
              changed.ind = ind;
              changed.selected = selected;
              this.setState({
                selectedindex: ind,
                selected: selected,
              });
              this.props.signalValueChange.value = changed;
            }}
          >
            {selectitems}
          </select>
        </span>
      </Fragment>
    );
  }
}
