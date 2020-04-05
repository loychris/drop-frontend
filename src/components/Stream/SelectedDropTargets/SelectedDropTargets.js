import React, { Component } from "react";
import FriendsListItem from "../FriendsListItem/FriendsListItem";
import classes from "./SelectedDropTargets.Module.css";
import DropButton from "../../UI/DropButton/DropButton";

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
          <DropButton
            clicked={() => {
              this.props.sendMessage({
                type: "drop",
                postId: this.props.currentPostId,
                targets: this.props.selectedTargets,
              });
            }}
          >
            <h2>{`Drop to: ${buttonString}`}</h2>
          </DropButton>
        </div>
      </div>
    );
  }
}

export default SelectedDropTargets;
