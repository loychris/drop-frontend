import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actionTypes';

import Aux from "../../../hoc/Aux";
import FriendsListItem from "../FriendsListItem/FriendsListItem";

import classes from "./DropOptionsMenu.module.css";

class DropOptionsMenu extends Component {
  state = {
    searchBarValue: "",
    active: "friends",
  };

  selectOption = (option) => {
    this.setState({ active: option });
  };

  getNoFriendsDrop = () => {
    return (
      <svg
        width="203"
        height="247"
        viewBox="0 0 203 247"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M168.518 124.5C168.518 130.5 170.018 198.5 100.519 198.5C30.0185 198.5 33.0185 124.5 33.0185 124.5C33.0185 85 97.5185 3 100.519 0C103.518 3 168.518 74.5 168.518 124.5Z"
          fill="url(#paint0_linear)"
        />
        <ellipse
          cx="104.5"
          cy="223.5"
          rx="97.5"
          ry="23.5"
          fill="url(#paint1_radial)"
        />
        <circle cx="71.5" cy="133.5" r="12.5" fill="#090000" />
        <circle cx="131.5" cy="133.5" r="12.5" fill="#090000" />
        <path
          d="M39.1981 157.712C38.6713 159.712 22.8103 180.212 22.8103 180.212C22.8103 180.212 49.3101 166.712 55.8103 163.712C62.3104 160.712 77.3102 172.212 63.3103 180.212C49.3104 188.212 15.1408 201.573 15.1408 201.573C15.1408 201.573 -0.189855 206.712 2.68579 195.501C5.56144 184.289 33.3102 141.212 34.5811 139.212C35.8521 137.212 39.7249 155.712 39.1981 157.712Z"
          fill="black"
        />
        <ellipse cx="100.5" cy="166" rx="11.5" ry="14" fill="black" />
        <path
          d="M67 146.449C67 146.449 76.8426 149.797 80.6062 154.757C84.2264 159.527 85 169.449 85 169.449"
          stroke="#48656F"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M163.208 157.712C163.735 159.712 179.596 180.212 179.596 180.212C179.596 180.212 153.096 166.712 146.596 163.712C140.096 160.712 125.096 172.212 139.096 180.212C153.096 188.212 187.266 201.573 187.266 201.573C187.266 201.573 202.596 206.712 199.721 195.501C196.845 184.289 169.096 141.212 167.825 139.212C166.554 137.212 162.682 155.712 163.208 157.712Z"
          fill="black"
        />
        <path
          d="M135.407 146.449C135.407 146.449 125.564 149.797 121.8 154.757C118.18 159.527 117.407 169.449 117.407 169.449"
          stroke="#48656F"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="101"
            y1="243"
            x2="101"
            y2="9.00001"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#677AD4" />
            <stop offset="1" stopColor="#A7EBFA" />
          </linearGradient>
          <radialGradient
            id="paint1_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(104.5 223.5) rotate(90) scale(23.5 97.5)"
          >
            <stop stopColor="#AFAFAF" stopOpacity="0.72" />
            <stop
              offset="0.0001"
              stopColor="#BFBFBF"
              stopOpacity="0.607348"
            />
            <stop
              offset="0.539302"
              stopColor="#CFCFCF"
              stopOpacity="0.489212"
            />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    );
  };


  getFriendsList = () => {
    let targets = this.props.dropTargets;
    if (this.state.searchBarValue !== "") {
      return targets
        .filter((x) => {
          return x.name
            .toLowerCase()
            .startsWith(this.state.searchBarValue.toLowerCase());
        })
        .map((x) => {
          return (
            <FriendsListItem
              clicked={
                x.selected ? () => this.props.onUnSelectDropTarget(x.id) : () => this.props.onSelectDropTarget(x.id)              }
              type={x.type}
              selected={x.selected}
              name={x.name}
              id={x.id}
              key={x.id}
            />
          );
        });
    }
    return targets.map((x) => {
      return (
        <FriendsListItem
          clicked={
            x.selected ? () => this.props.onUnSelectDropTarget(x.id) : () => this.props.onSelectDropTarget(x.id)
          }
          type={x.type}
          profilePic={x.profilePic}
          selected={x.selected}
          name={x.name}
          id={x.id}
          key={x.id}
        />
      );
    });
  };

  getRecentList = () => {
    return this.getNoFriendsDrop();
  };

  handleSearchBarChange = (event) => {
    this.setState({ searchBarValue: event.target.value });
  };

  render() {
    let targets = (
      <div className={classes.NoFriends}>
        <h1>Oh no!</h1>
        {this.getNoFriendsDrop()}
        <h3>Looks like you dont have any {this.state.active} yet.</h3>
      </div>
    );
    if (this.state.active === "friends") targets = this.getFriendsList();
    return (
      <Aux className={classes.DropOptionsMenu}>
        <h2 className={classes.MenuHeader}>Select Friends/Groups </h2>
        <ul className={classes.Options}>
          <li
            onClick={() => this.selectOption("recent chats")}
            className={ this.state.active === "recent chats" ? classes.Active : classes.Inactive }>
            Recent
          </li>
          <li
            onClick={() => this.selectOption("friends")}
            className={ this.state.active === "friends" ? classes.Active : classes.Inactive }>
            Friends
          </li>
          <li
            onClick={() => this.selectOption("groups")}
            className={ this.state.active === "groups" ? classes.Active : classes.Inactive }>
            Groups
          </li>
        </ul>
        <div className={classes.DropOptionsList}>{targets}</div>
        <input
          className={classes.SearchBar}
          type="text"
          onChange={this.handleSearchBarChange}
        />
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    selectedTargets: state.stream.selectedTargets,
    dropTargets: state.stream.dropTargets
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectDropTarget: (id) => dispatch({type: actionTypes.SELECT_DROPTARGET, id: id}),
    onUnSelectDropTarget: (id) => dispatch({type: actionTypes.UNSELECT_DROPTARGET, id: id}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropOptionsMenu);
