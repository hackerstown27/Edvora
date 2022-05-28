import React from "react";
import styles from "../../styles/styles.module.css";
import Image from "next/image";
import Card from "./Card";
import Dropdown from "./Dropdown";

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currTab: 0,
      nearestRides: [],
      upcomingRides: [],
      prevRides: [],
      currRides: [],
      dropDownEnabled: false,
      currState: "State",
      currCity: "City",
    };
  }

  componentDidMount() {
    let userDist = this.props.userInfo.station_code;
    fetch("https://assessment.api.vweb.app/rides")
      .then((res) => res.json())
      .then((data) => {
        let distAdded = data.map((ride) => {
          let dist = ride.station_path.reduce(function (prev, curr) {
            return Math.abs(curr - userDist) < Math.abs(prev - userDist)
              ? curr
              : prev;
          });
          return { ...ride, distance: Math.abs(dist - userDist) };
        });
        distAdded.sort((a, b) => a.distance - b.distance);

        let upRides = distAdded.filter((a) => new Date(a.date) > new Date());
        let prevRides = distAdded.filter((a) => new Date(a.date) < new Date());
        this.setState((state) => {
          return {
            ...state,
            nearestRides: distAdded,
            upcomingRides: upRides,
            prevRides: prevRides,
            currRides: distAdded,
            currState: "State",
            currCity: "City",
          };
        });
      });
  }

  onClickTabHandle = (id) => {
    this.setState((state) => {
      return {
        ...state,
        currState: "State",
        currCity: "City",
        currTab: id,
        currRides:
          id == 0
            ? this.state.nearestRides
            : id == 1
            ? this.state.upcomingRides
            : this.state.prevRides,
      };
    });
  };

  onToggleDropDown = () => {
    this.setState((state) => {
      return {
        ...state,
        dropDownEnabled: !state.dropDownEnabled,
      };
    });
  };

  onApplyFilter = (state, city) => {
    let selectedRide =
      this.state.currTab == 0
        ? this.state.nearestRides
        : this.state.currTab == 1
        ? this.state.upcomingRides
        : this.state.prevRides;
    let filterRides = selectedRide.filter((ride) => {
      if (state == "State") return true;
      else if (ride.state == state && city == "City") return true;
      else if (ride.state == state && ride.city == city) return true;
      return false;
    });
    this.setState((prevState) => {
      return {
        ...prevState,
        currRides: filterRides,
        currState: state,
        currCity: city,
      };
    });
  };

  render() {
    return (
      <div className={styles.result}>
        <div className={styles.header}>
          <div className={styles.tab}>
            <div
              className={this.state.currTab == 0 && styles.tabFocus}
              onClick={() => this.onClickTabHandle(0)}
            >
              Nearest Rides
            </div>
            <div
              className={this.state.currTab == 1 && styles.tabFocus}
              onClick={() => this.onClickTabHandle(1)}
            >
              Upcoming Rides ({this.state.upcomingRides.length})
            </div>
            <div
              className={this.state.currTab == 2 && styles.tabFocus}
              onClick={() => this.onClickTabHandle(2)}
            >
              Past Rides ({this.state.prevRides.length})
            </div>
          </div>
          <div className={styles.filter}>
            <Image
              src="/icons/filter.svg"
              alt="filter-icon"
              width={25}
              height={25}
            />
            <div onClick={this.onToggleDropDown}>Filter</div>
            {this.state.dropDownEnabled && (
              <Dropdown
                onApplyFilter={this.onApplyFilter}
                currState={this.state.currState}
                currCity={this.state.currCity}
              />
            )}
          </div>
        </div>
        <div className={styles.cards}>
          {this.state.currRides.length != 0 ? (
            this.state.currRides.map((ride, i) => <Card key={i} info={ride} />)
          ) : (
            <div className={styles.notFound}>
              <Image
                src="/icons/not_found.gif"
                alt="filter-icon"
                width={500}
                height={500}
              />
              <h1>Sorry, we were unable fetch anything for you. 💔😭</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Result;
