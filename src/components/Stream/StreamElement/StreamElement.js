import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux';

import * as UIActions from '../../../store/actions/index';
import classes from "./StreamElement.module.css";

import Content from "./Content/Content";
import CommentSection from "./CommentSection/CommentSection";
import DroppedToYouBy from "./DroppedToYouBy/DroppedToYouBy";
import DropButton from "../../UI/DropButton/DropButton";
import Source from "./Source/Source";

// import LogoForButton from '../../../media/LogoForButton.png';

const NEUMORPHISM = false;

// const R = 200; //Distance eye to projection
// const Y = 150; //vertical position of th object
// const B = 1100; //width of the object
// const X = 100; //Distance projection to element

class StreamElement extends Component {


  componentDidMount() {
    if (this.props.status === 'id loaded') {
      axios.get(`/api/drop/${this.props.id}`)
      .then(response => {
        this.props.onSetDrop(this.props.id, response.data.drop);
      })
      .catch(err => {
        console.log('FETCHING DROP FAILED, ', err);
      });
    }
  }


  //////////////////////////////////////////////////////////////////////////
  // calcStyles(pos) {
  //   const x = X + pos * 20;
  //   const yy = 5 + R * Math.tan(Math.atan(Y / (x + R))); //projected posY
  //   const bb = 2 * R * Math.tan(Math.atan(B / 2 / (x + R))); //projected width
  //   return { marginTop: yy - 62, width: bb };
  // }
  //////////////////////////////////////////////////////////////////////////

  calcStyles2(pos) {
    const transY = (pos - 1) * -2;
    const transZ = (pos - 1) * -4;
    const styles = {};
    if (this.props.show === "left") {
      styles.transform = `translate3d(-100vw,0,0)`;
    } else if (this.props.show === "right") {
      styles.transform = `translate3d(+100vw,0,0)`;
    } else {
      styles.transform = `translate3d( 0, ${transY}px, ${transZ}px)`;
      styles.WebkitTransform = `translate3d( 0, ${transY}px, ${transZ}px)`;
    }
    return styles;
  }

  render() {
    const commentSection =
      this.props.position < 2 ?
        <CommentSection postId={this.props.id} pos={this.props.position}/>
        : null;

    let droppedToYouBy = [];
    const source = this.props.source ? <Source sourceURL={this.props.source} /> : null

    let cssClasses = [classes.StreamElement];

    if (this.props.show === "show") cssClasses.push(classes.ShowDrop);
    if (this.props.show === "right") cssClasses.push(classes.FadedRight);
    if (this.props.show === "left")  cssClasses.push(classes.FadedLeft);
    cssClasses.push(this.props.darkmode ? classes.Dark : classes.Light)

    if (this.props.status === 'loaded') {
      if (this.props.position < 2 && this.props.post && this.props.post.droppedBy) {
        droppedToYouBy = <DroppedToYouBy names={this.props.post.droppedBy} />;
      }
      if (this.props.post.droppedBy) {
        cssClasses.push("classes.DroppedByFriend");
      }
    }

    return (
      <div
          tabIndex="0"
        className={cssClasses.join(" ")}
        style={this.calcStyles2(this.props.position)}
      >
        {droppedToYouBy}
        {this.props.title ? <h3 className={classes.title}>{this.props.title}</h3>: null }
        <Content position={this.props.position} id={this.props.id} />
        {source}
        <DropButton theme={NEUMORPHISM} clicked={this.props.onOpenModal}>
          <h3 className={classes.DROP}>Drop</h3>
        </DropButton>
        {commentSection}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    darkmode: state.ui.darkmode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOpenModal: () => dispatch(UIActions.openModal()),
    onSetDrop: (dropId, drop) => dispatch(UIActions.setDrop(dropId, drop))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamElement);
