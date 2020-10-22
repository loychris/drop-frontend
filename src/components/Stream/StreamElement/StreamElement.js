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
      const headers = this.props.token ? { headers: { Authorisation: `Bearer ${this.props.token}` } } : null 
      axios.get(`/api/drop/${this.props.id}`, headers)
      .then(response => {
        this.props.onSetDrop(this.props.id, response.data.drop);
      })
      .catch(err => {
        console.log('FETCHING DROP FAILED, ', err);
      });
    }
  }

  componentDidUpdate() {
    if (this.props.status === 'id loaded') {
      const headers = this.props.token ? { headers: { Authorisation: `Bearer ${this.props.token}` } } : null 
      axios.get(`/api/drop/${this.props.id}`, headers)
      .then(response => {
        this.props.onSetDrop(this.props.id, response.data.drop);
      })
      .catch(err => {
        console.log('FETCHING DROP FAILED, ', err);
      });
    }
  }

  calcStyles2(pos) {
    const transY = (pos - 1) * -2;
    const transZ = (pos - 1) * -4;
    const styles = {};
    if (this.props.show === "left") {
      styles.transform = `translate3d(-100vw,0,0)`;
    } else if (this.props.show === "right") {
      styles.transform = `translate3d(+100vw,0,0)`;
    }else if (this.props.position === 1 && this.props.halfLeft){
      styles.transform = `translate3d(-5vw,0,0)`;
    }else if(this.props.position === 1 && this.props.halfRight){
      styles.transform = `translate3d(5vw,0,0)`;
    } else {
      styles.transform = `translate3d( 0, ${transY}px, ${transZ}px)`;
      styles.WebkitTransform = `translate3d( 0, ${transY}px, ${transZ}px)`;
    }
    return styles;
  }

  dropButtonClicked = () => {
    if(!this.props.token){
      this.props.onOpenAuth('Create an Account and directly share Memes with friends here!');
    } else {
      this.props.onOpenModal();
    }
  }

  render() {
    let droppedToYouBy = [];

    let cssClasses = [classes.StreamElement];

    if (this.props.show === "show") cssClasses.push(classes.ShowDrop);
    if (this.props.show === "right") cssClasses.push(classes.FadedRight);
    if (this.props.show === "left")  cssClasses.push(classes.FadedLeft);
    if (this.props.position === 1) {
      if(this.props.halfLeft) cssClasses.push(classes.HalfLeft);
      if(this.props.halfRight) cssClasses.push(classes.HalfRight);
    }
    cssClasses.push(this.props.darkmode ? classes.Dark : classes.Light)

    if (this.props.status === 'loaded') {
      if (this.props.position < 2 && this.props.post && this.props.post.droppedBy) {
        droppedToYouBy = <DroppedToYouBy names={this.props.post.droppedBy} />;
      }
      if (this.props.droppedBy) {
        cssClasses.push("classes.DroppedByFriend");
      }
    }

    return (
      <div
        tabIndex="0"
        className={cssClasses.join(" ")}
        style={this.calcStyles2(this.props.position)}>
        {droppedToYouBy}
        {this.props.title ? <h3 className={classes.title}>{this.props.title}</h3>: null }
        <Content 
          position={this.props.position} 
          id={this.props.id} 
          status={this.props.status} 
          memeStatus={this.props.memeStatus}/>
        {
          this.props.source ? 
          <Source sourceURL={this.props.source} /> 
          : null
        }
        <DropButton theme={NEUMORPHISM} clicked={this.dropButtonClicked}>
          <h3 className={classes.DROP}>Drop</h3>
        </DropButton>
        <CommentSection 
          position={this.props.position}
          dropId={this.props.id} 
          comments={this.props.comments} 
          dropLoaded={this.props.status === 'drop loaded'}
          commentStatus={this.props.commentsStatus}/>      
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    darkmode: state.ui.darkmode,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOpenAuth: (authReason) => dispatch(UIActions.openAuth(authReason)),
    onOpenModal: () => dispatch(UIActions.openModal()),
    onSetDrop: (dropId, drop) => dispatch(UIActions.setDrop(dropId, drop))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamElement);
