import React, { Component } from "react";
import { connect } from 'react-redux';
import * as streamActions from '../../../store/actions/index';


import FriendsListItem from "../FriendsListItem/FriendsListItem";
import classes from "./SelectedDropTargets.Module.css";
import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";

class SelectedDropTargets extends Component {
  render() {
    let selectedTargets =
      this.props.selectedTargets && this.props.selectedTargets.length > 0
        ? this.props.selectedTargets.map((x) => {
            return (
              <FriendsListItem
                clicked={this.props.unselectTarget}
                type={x.type}
                profilePic={x.profilePic}
                selected={x.selected}
                name={x.name}
                id={x.id}
                key={x.id}
              />
            );
          })
        : [];

    let buttonString = this.props.selectedTargets
      .map((x) => {
        return x.name;
      })
      .join(", ");
    if (buttonString.length > 15)
      buttonString = buttonString.substring(0, 14) + "...";
    console.log(buttonString);

    return (
      <div>
        <h2>Drop to: </h2>
        <div className={classes.SelectedTargetsList}>
          {selectedTargets}
          <PrimaryButton
            clicked={() => {
              this.props.sendMessage({
                type: "drop",
                postId: this.props.currentPostId,
                targets: this.props.selectedTargets,
              });
            }}
          >
            <h2>{`Drop to: ${buttonString}`}</h2>
          </PrimaryButton>
        </div>
      </div>
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
    unselectTarget: (id) => dispatch(streamActions.selectDropTarget(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedDropTargets);
