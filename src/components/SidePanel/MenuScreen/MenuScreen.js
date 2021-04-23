import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './MenuScreen.module.css';

import { ReactComponent as ArrowBack } from './arrow_back.svg'
import DropButton from '../../UI/DropButton/DropButton';
import MenuItem from '../Menu/MenuItem/MenuItem';

import * as actions from '../../../store/actions/index';



class MenuScreen extends Component {

    state = {
        name: {
            value: '',
            touched: false,
            valid: false,
        },
        password: {
            value: '',
            touched: false,
            valid: false,
        },
        secondPassword: {
            value: '', 
            touched: false,
            valid: false,
        },
        email: {
            value: '',
            touched: false,
            valid: false,
        },
        handle: {
            value: '',
            touched: false,
            valid: false,
        },
        profilePic: {
            tooUgly: true,
            src: null,
            file: null, 
        },
        userConditions: {
            value: true,
            touched: false,
        }, 
        newsletter: true,
        loginError: null,
    }

    //--------- NAME ---------------------------------------------------------

    onInputName = (event) => {
        const name = event.target.value;
        const valid =  name ? name.length > 3 && name.length < 20  : false
        this.setState({ 
            name: {
                ...this.state.name, 
                value: event.target.value,
                errorMessage: valid ? null : '4-20 characters',
                valid: valid
            }
        })
    }

    onLeaveNameFocus = () => {
        this.setState({
            name: {
                ...this.state.name, 
                touched: true
            }
        })
    }

    //--------- PROFILE PIC --------------------------------------------------


    onUploadprofilePic = (acceptedFiles) => {
        if(acceptedFiles && acceptedFiles.length > 0){
            const file = Array.from(acceptedFiles)[0];
            const src = window.URL.createObjectURL(file)
            this.setState({
                profilePic :{ 
                    file, 
                    src,
                    tooUgly: false
                }
            });
        }
    }

    onRemoveProfilePic = (event) => {
        this.setState({
            profilePic: {
                tooUgly: true,
                src: null,
                file: null, 
            },
        })
    }

    //--------- EMAIL --------------------------------------------------------

    onInputEmail = (event) => {
        const email = event.target.value;
        const valid = email ? /^\S+@\S+\.\S+$/.test(email) : false;
        this.setState({ 
            email: {
                value: event.target.value,
                touched: true,
                errorMessage: valid ? null : 'Please enter valid email.',
                valid: valid
            }
        })  
    }

    onLeaveEmailFocus = () => {
        this.setState({
            email: {
                ...this.state.email, 
                touched: true
            }
        })
    }

    //--------- HANDLE -------------------------------------------------------

    onInputHandle = (event) => {
        const handle = event.target.value.startsWith('@') ? event.target.value.substring(1) : event.target.value;
        let errorMessage = '';
        if(handle.length < 4 || handle.length > 14) errorMessage = '4-14 characters.'; 
        if(!/^[a-zA-Z]+$/.test(handle)) errorMessage = 'letters only!';
        this.setState({ 
            handle: {
                ...this.state.handle, 
                value: handle,
                errorMessage,
                valid: errorMessage === '',
            }
        })  
    }

    onLeaveHandleFocus = () => {
        this.setState({
            handle: {
                ...this.state.handle, 
                touched: true
            }
        })
    }

    //--------- PASSWORD -----------------------------------------------------


    onInputPassword = (event) => {
        const password = event.target.value;
        const valid = password && password !== '123456' ? password.length >= 5 : false
        const errorMessage = valid ? null : password === '123456' ? 'Really? Can u please chose another password?' : 'Min 5 characters.';
        this.setState({ 
            password: {
                ...this.state.password,
                value: event.target.value,
                errorMessage,
                valid: valid
            }
        })
    }

    onLeavePasswordFocus = () => {
        this.setState({
            password: {
                ...this.state.password,
                touched: true
            }
        })
    }

    //--------- SECOND PASSWORD  ---------------------------------------------

    onInputSecondPassword = (event) => {
        const password = event.target.value;
        const valid = password === this.state.password.value;
        const errorMessage = valid ? null : 'Passwords do not match.';

        this.setState({ 
            secondPassword: {
                ...this.state.secondPassword,
                value: event.target.value,
                errorMessage,
                valid: valid
            }
        })
    }

    onLeaveSecondPasswordFocus = () => {
        this.setState({
            secondPassword: {
                ...this.state.password,
                touched: true
            }
        })
    }

    //--------- USER CONDITIONS & NEWSLETTER  --------------------------------

    onChangeUserconditions = (event) => {
        this.setState(prevState => {
            return { 
                userConditions: {
                    ...prevState.userConditions,
                    value: !prevState.userConditions.value 
                }
            }
        })
    }
    

    onChangeNewsletter = (event) => {
        this.setState(prevState => {
            return { 
                newsletter: !prevState.newsletter 
            }
        })
    }


    getArrowBack = () => {
          return (
            <div className={classes.BackButton}>
                <ArrowBack className={classes.BackArrow} onClick={this.props.goBack}/>
            </div>
          )
      }

    getContent = () => {
        switch(this.props.screen){
            case 'AUTH': 
                return (
                    <div>
                        <MenuItem invalid={false}>
                            <input
                                className={classes.TextInput}
                                element="input"
                                id="email"
                                type="email"
                                placeholder='email'
                                value={this.state.email.value}
                                onChange={this.onInputEmail}
                            />
                            <input
                                className={classes.TextInput}
                                element="input"
                                type="password"
                                placeholder='password'
                                value={this.state.password.value}
                                onChange={this.onInputPassword}
                                onBlur={this.onLeavePasswordFocus}
                            />
                            <DropButton clicked={() => this.props.onLogin(this.state.email.value, this.state.password.value)}>
                                <h3>Login</h3>
                            </DropButton>
                        </MenuItem>
                        <MenuItem invalid={false}>
                            <input
                                className={classes.TextInput}
                                element="input"
                                id="email"
                                type="email"
                                placeholder="Elon@musk.com"
                                value={this.state.email.value}
                                onChange={this.onInputEmail}
                            />
                            <input
                                className={classes.TextInput}
                                element="input"
                                type="password"
                                placeholder='password'
                                value={null}
                                onChange={null}
                                onBlur={null}
                            />
                            <input 
                                className={classes.TextInput}
                                id="name" 
                                placeholder="Full Name"
                                type="text"
                                value={null}
                                onChange={null}
                                onBlur={null}
                            />
                            <DropButton clicked={() => this.props.addToMenuStack('CHOOSE_HANDLE')}>
                                <h3>Create Account</h3>
                            </DropButton>
                    </MenuItem>
                    </div>
                )
            case 'CHOOSE_HANDLE': return (
                <MenuItem>
                    <h3>Enter @ Handle:</h3>            
                    <input
                        className={classes.TextInput}
                        element="input"
                        id="handle"
                        type="text"
                        placeholder="@elon"
                        value={'@' + 'chris'}
                        onChange={null}
                        onBlur={null}
                    />
                </MenuItem>
            )
            case 'LOGOUT': return (
                <MenuItem>
                    
                </MenuItem>
            )
            default: return null
        }
    }

    render() {
        return(
            <div className={`${classes.MenuScreen} ${this.props.pos === -1 ? classes.left : this.props.pos === 1 ? classes.right : null}`}>
                {this.props.screen !== 'AUTH' ? this.getArrowBack() : null}
                {this.getContent()}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loading: state.user.loading,
        authReason: state.user.authReason, 
        loginOrSignup: state.ui.loginOrSignup
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openLogin: () => dispatch(actions.openLogin()),
        openSignup: () => dispatch(actions.openSignup()), 
        onLogin: (email, password) => dispatch(actions.login(email, password)),
        onSignup: (name, email, handle, password, file, src, newsletter) => dispatch(actions.signup(name, email, handle, password, file, src, newsletter)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);