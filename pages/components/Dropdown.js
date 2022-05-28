import React from "react";
import styles from "../../styles/styles.module.css";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      states: {},
      city: ["City"],
    };
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/bhanuc/indian-list/master/state-city.json"
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState((state) => {
          return { ...state, states: { State: [], ...data } };
        })
      );
  }

  selectStates = (event) => {
    this.props.onApplyFilter(event.target.value, "City");
    this.setState((state) => {
      return {
        ...state,
        city: ["City", ...this.state.states[event.target.value]],
      };
    });
  };

  selectCities = (event) => {
    this.props.onApplyFilter(this.props.currState, event.target.value);
  };

  render() {
    return (
      <div className={styles.dropdown}>
        <h1 className={styles.dropdownHeading}>Filter</h1>
        <hr />
        <select
          value={this.props.currState}
          onChange={this.selectStates}
          className={styles.options}
        >
          {Object.keys(this.state.states).map((state, i) => {
            return (
              <option value={state} key={i}>
                {state}
              </option>
            );
          })}
        </select>
        <select
          value={this.props.currCity}
          onChange={this.selectCities}
          className={styles.options}
        >
          {this.state.city.map((city, i) => {
            return (
              <option value={city} key={i}>
                {city}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default Dropdown;
