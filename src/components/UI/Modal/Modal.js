import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actionTypes';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {


    shouldComponentUpdate(){
        return this.props.show === true;
    }

    render(){
        return(
            <Aux>
                <Backdrop show={this.props.modalOpen} clicked={this.props.onCloseModal} />
                <div
                    className={classes.Modal}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        modalOpen: state.ui.modalOpen,
        darkmode: state.ui.darkmode
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onCloseModal: () => dispatch({type: actionTypes.CLOSE_MODAL}),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Modal);