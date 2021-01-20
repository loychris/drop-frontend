import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as UIActions from '../../../store/actions/index';

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
                <Backdrop show={this.props.modalOpen} clicked={this.props.backDropClick} />
                <div className={classes.Modal} style={{height: this.props.height, width: this.props.width}}>
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
      onCloseModal: () => dispatch(UIActions.closeModal()),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Modal);