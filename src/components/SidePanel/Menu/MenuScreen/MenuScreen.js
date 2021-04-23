import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './MenuScreen.module.css';

import { ReactComponent as ArrowBack } from './arrow_back.svg'
import DropButton from '../../../UI/DropButton/DropButton';
import MenuItem from './MenuItem/MenuItem';

import * as actions from '../../../../store/actions/index';
import ProfilePicPlaceholder from './ProfilePicPlaceholder.svg'; 
import LogoutIcon from './logout.svg';
import Loader from 'react-loader-spinner';
import Dropzone from 'react-dropzone';



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
                <ArrowBack className={classes.ArrowBack} onClick={this.props.onPopFromMenuStack}/>
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
                                id="emailLogin"
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
                                { this.props.loading 
                                ? <Loader 
                                    className={classes.Spinner} 
                                    type="ThreeDots" 
                                    color="#FFFFFF" 
                                    height={30} 
                                    width={30}/> 
                                : <h3>Login</h3> }
                            </DropButton>
                        </MenuItem>
                        <MenuItem invalid={false}>
                            <input
                                className={classes.TextInput}
                                element="input"
                                id="emailSignup"
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
                            <input 
                                className={classes.TextInput}
                                id="name" 
                                placeholder="Your Name"
                                type="text"
                                value={this.state.name.value}
                                onChange={this.onInputName}
                                onBlur={this.onLeaveNameFocus}
                            />
                            <div className={classes.CheckboxContainer}>
                                <input 
                                    type='checkbox' 
                                    onChange={this.onChangeUserconditions} 
                                    checked={this.state.userConditions.value}/>
                                <p onClick={this.onChangeUserconditions} className={classes.CheckboxText}>
                                    accept user conditions & shit
                                </p>
                            </div>
                            <div className={classes.CheckboxContainer}>
                                <input 
                                    type='checkbox' 
                                    onChange={this.onChangeNewsletter} 
                                    checked={this.state.newsletter}/>
                                <p onClick={this.onChangeNewsletter} className={classes.CheckboxText}>
                                    Receive an email for every big new feature
                                </p>
                            </div>
                            <DropButton clicked={() => this.props.onAddToMenuStack('CHOOSE_HANDLE')}>
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
                        value={'@' + this.state.handle.value}
                        onChange={this.onInputHandle}
                        onBlur={this.onLeaveHandleFocus}
                    />
                        <DropButton clicked={() => this.props.onAddToMenuStack('CHOOSE_PROFILE_PIC')}>
                            <h3>Choose {this.state.handle.value}</h3>
                        </DropButton>
                </MenuItem>
            )
            case 'CHOOSE_PROFILE_PIC': return (
                <MenuItem>
                    <h4>Profile Picture</h4>
                    <input type='checkbox' onChange={this.onRemoveProfilePic} checked={this.state.profilePic.tooUgly}/> I'm too ugly<br/>
                    <input type='checkbox' onChange={() => console.log('Upload Pic!')} checked={!this.state.profilePic.tooUgly}/> Upload picture
                    <Dropzone onDrop={this.onUploadprofilePic}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                    <div className={classes.Dropzone}>
                                    { 
                                        this.state.profilePic.src 
                                        ? <img 
                                            className={classes.ProfilePic}
                                            src={this.state.profilePic.src} 
                                            alt='profilePic'/> 
                                        : <img 
                                            className={classes.ProfilePicPlaceholder} 
                                            src={ProfilePicPlaceholder} 
                                            alt='drag & drop profile Pic here'/>
                                    }
                                    </div> 
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </MenuItem>
            )
            case 'USER_MENU': return (
                <MenuItem>
                    <div className={classes.LogoutContainer} onClick={this.props.onLogout}>
                    <img className={classes.LogoutIcon} src={LogoutIcon} alt='logoutIcon'/>
                    <p className={classes.LogoutText}>logout</p>
                    </div>
                </MenuItem>
            )
            default: return null
        }
    }

    render() {
        return(
            <div className={`${classes.MenuScreen} ${this.props.pos === -1 ? classes.left : this.props.pos === 1 ? classes.right : null}`}>
                {this.props.currentDepth !== 0 ? this.getArrowBack() : null}
                {this.getContent()}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loading: state.user.loading,
        authReason: state.user.authReason, 

        loginOrSignup: state.ui.loginOrSignup,
        currentDepth: state.ui.menu.currentDepth, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPopFromMenuStack: () => dispatch(actions.popFromMenuStack()), 
        onAddToMenuStack: (next) => dispatch(actions.addToMenuStack(next)), 
        openLogin: () => dispatch(actions.openLogin()),
        openSignup: () => dispatch(actions.openSignup()), 
        onLogin: (email, password) => dispatch(actions.login(email, password)),
        onLogout: () => dispatch(actions.logout()), 
        onSignup: (name, email, handle, password, file, src, newsletter) => dispatch(actions.signup(name, email, handle, password, file, src, newsletter)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);