import React, { Component } from "react";
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from "./Creator.module.css";
import Rectangle from "./Rectangle/Rectangle";

class Creator extends Component {

  state = {
    selectedId: '5',
    editingId: '', 
  }

  select = (e, elementId) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      selectedId: elementId, 
      editingId: ''
    })
  }

  selectAndEdit = (e, elementId) => {
    console.log('doubleClick')
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      selectedId: elementId,
      editingId: elementId
    })
  }

  unSelect = (e) => {
    console.log('unselect')
    if(this.state.editingId !== 0){
      this.setState({editingId: ''});
    } else {
      this.setState({selectedId: ''});
    }
    
  }

  render() {
    const styleClasses = [classes.Creator];
    if (this.props.currentTab === 'stream') styleClasses.push(classes.OutLeftLeft);
    if (this.props.currentTab === 'chat') styleClasses.push(classes.OutLeft);
    return (
      <div 
        className={styleClasses.join(" ")}
        onClick={this.unSelect}>
        <Rectangle 
          currentlyEditing={this.state.editingId === '5'}
          type='text'
          elementId={'5'} 
          selected={'5' === this.state.selectedId}
          select={this.select}
          selectAndEdit={this.selectAndEdit}
          />
        <Rectangle 
          currentlyEditing={this.state.editingId === '6'}
          type='text'
          elementId={'6'} 
          selected={'6' === this.state.selectedId}
          select={this.select}
          selectAndEdit={this.selectAndEdit}
          />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.ui.currentTab,
    darkmode: state.ui.currentTab,

    sending: state.user.sendingSubscribeEmailList, 
    sent: state.user.sentSubscribeEmailList, 
    emailListError: state.user.emailListError,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubscribeEmailList: (email) => dispatch(actions.subscribeEmailList(email)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Creator);
