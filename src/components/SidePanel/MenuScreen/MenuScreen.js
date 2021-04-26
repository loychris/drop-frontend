import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './MenuScreen.module.css';

import { ReactComponent as ArrowBack } from './arrow_back.svg'

import * as actions from '../../../store/actions/index';



class MenuScreen extends Component {

    getArrowBack = () => {
          return (
            <div className={classes.BackButton}>
                <ArrowBack className={classes.ArrowBack} onClick={this.props.onPopFromMenuStack}/>
            </div>
          )
      }

    render() {
        return(
            <div className={`${classes.MenuScreen} ${this.props.pos === -1 ? classes.left : this.props.pos === 1 ? classes.right : null}`}>
                {this.props.currentDepth !== 0 ? this.getArrowBack() : null}
                {this.props.children}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        authReason: state.user.authReason, 

        loginOrSignup: state.ui.loginOrSignup,
        currentDepth: state.ui.menu.currentDepth, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPopFromMenuStack: () => dispatch(actions.popFromMenuStack()), 
        openLogin: () => dispatch(actions.openLogin()),
        openSignup: () => dispatch(actions.openSignup()), 
        onLogout: () => dispatch(actions.logout()), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);