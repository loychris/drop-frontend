import React, { Component } from 'react';
import { connect } from 'react-redux';

import MenuItem from '../MenuItem/MenuItem';
import Loader from 'react-loader-spinner';
import DropButton from '../../../UI/DropButton/DropButton';

import * as actions from '../../../../store/actions/index';
import classes from './AuthForm.module.css';
import ProfilePicPlaceholder from './ProfilePicPlaceholder.svg'; 
import Dropzone from 'react-dropzone';


class AuthForm extends Component {

    state = {
        isLogin: true,
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
            file: null, 

        },
        userConditions: {
            value: false,
            touched: false,
        }, 
        newsletter: true,
        loginError: null,
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return { isLogin: !prevState.isLogin }
        })
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

    onProfilePicCheckboxChange = (event) => {
        this.setState(prevState => {
            return { 
                profilePic: {
                    ...prevState.profilePic,
                    tooUgly: !prevState.profilePic.tooUgly,
                }
            }
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



    formStateValid = () => {
        return this.state.email.valid
            && this.state.password.valid
            && this.state.handle.valid 
            && this.state.name.valid
            && this.state.userConditions.value
    }

    submitHandler = (event) => {
        event.preventDefault();
        if(this.state.isLogin){
            if(!this.state.email.valid || !this.state.password.valid){
                this.setState({
                    email: {
                        ...this.state.email, 
                        touched: true, 
                    },
                    password: {
                        ...this.state.password,
                        touched: true,
                    },
                    loginError: 'Email or password not valid',
                })
            } else {
                this.props.onLogin(this.state.email.value, this.state.password.value)
            }
        }else{
            if(!this.formStateValid()){
                this.setState(prevState => {
                    return {
                        name: {
                            ...prevState.name,
                            touched: true,
                        },
                        password: {
                            ...prevState.password,
                            touched: true,
                        },
                        secondPassword: {
                            ...prevState.secondPassword,
                            touched: true,
                        },
                        email: {
                            ...prevState.email,
                            touched: true,
                        },
                        handle: {
                            ...prevState.handle,
                            touched: true,
                        },
                        userConditions: {
                            ...prevState.userConditions,
                            touched: true,
                        },
                    }
                })
            } else { 
                console.log(`
                    src:      ${this.state.profilePic.src}
                    name:     ${this.state.name.value}
                    password: ${this.state.password.value}
                    handle:   ${this.state.handle.value}
                    email:    ${this.state.email.value}
                    file:     ${this.state.profilePic.file}
                `)
                this.props.onSignup(
                    this.state.name.value, 
                    this.state.email.value, 
                    this.state.handle.value, 
                    this.state.password.value, 
                    this.state.profilePic.file
                );
            }
        }

    }



    render() {
        if(this.state.isLogin){
            return(
                <form className={classes.Form}>
                    <h2>Log in</h2>
                    <MenuItem invalid={this.state.email.touched && this.state.password.touched && (!this.state.email.valid || this.state.password.valid)}>
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
                        {
                            this.state.loginError ? <p className={classes.ErrorMessage}>{this.state.loginError}</p> : null
                        }
                    </MenuItem>
                    <p className={classes.CreateAccount} onClick={() => this.setState({isLogin: false})}>Don't have an account? <u>Sign up!</u></p>
                    <DropButton clicked={this.submitHandler}>
                        {
                            this.props.loading 
                            ? <Loader className={classes.Spinner} 
                                type="ThreeDots" 
                                color="#ffffff" 
                                height={30} 
                                width={30}/>
                            : <h3>Login</h3>
                        }
                    </DropButton>
                    <div onClick={() => this.props.onLogin('cloy202@gmail.com', '1234567890')}>Log in as Chris</div>
                </form>
            )
        }
        return(
            <div className={classes.Form}>
                <h2>Create an Account</h2>
                <MenuItem invalid={this.state.name.touched && !this.state.name.valid}>
                    <h4>Full Name</h4>
                    <input 
                        className={classes.TextInput}
                        id="name" 
                        placeholder="Your Name"
                        type="text"
                        value={this.state.name.value}
                        onChange={this.onInputName}
                        onBlur={this.onLeaveNameFocus}
                    />
                    {this.state.name.touched && !this.state.name.valid
                        ? <p className={classes.ErrorMessage}>4-20 characters</p>
                        : null 
                    }
                </MenuItem>
                <MenuItem>
                    <h4>Profile Picture</h4>
                    <input type='checkbox' onChange={this.onProfilePicCheckboxChange} checked={this.state.profilePic.tooUgly}/> I'm too ugly<br/>
                    <input type='checkbox' onChange={this.onProfilePicCheckboxChange} checked={!this.state.profilePic.tooUgly}/> Upload picture

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
                <MenuItem invalid={this.state.email.touched && !this.state.email.valid}>
                    <h4>E-Mail</h4>
                    <input
                        className={classes.TextInput}
                        element="input"
                        id="email"
                        type="email"
                        placeholder="Elon@musk.com"
                        value={this.state.email.value}
                        onChange={this.onInputEmail}
                    />
                    {this.state.email.errorMessage
                        ? <p className={classes.ErrorMessage}>{this.state.email.errorMessage}</p>
                        : null 
                    }
                </MenuItem>
                <MenuItem invalid={this.state.handle.touched && !this.state.handle.valid}>
                    <h4>@Handle</h4>
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
                    {this.state.handle.touched && !this.state.handle.valid
                        ? <p className={classes.ErrorMessage}>{this.state.handle.errorMessage}</p>
                        : null 
                    }
                </MenuItem>
                <MenuItem invalid={(this.state.password.touched && !this.state.password.valid) || (this.state.secondPassword.touched && !this.state.secondPassword.valid)}>
                    <h4>Password</h4>
                    <input
                        className={classes.TextInput}
                        element="input"
                        type="password"
                        placeholder="123456"
                        value={this.state.password.value}
                        onChange={this.onInputPassword}
                        onBlur={this.onLeavePasswordFocus}
                    />
                    {this.state.password.touched && this.state.password.errorMessage
                        ? <p className={classes.ErrorMessage}>{this.state.password.errorMessage}</p>
                        : null 
                    }
                    <input
                        className={classes.TextInput}
                        element="input"
                        type="password"
                        placeholder="123456"
                        value={this.state.secondPassword.value}
                        onChange={this.onInputSecondPassword}
                        onBlur={this.onLeaveSecondPasswordFocus}
                    />
                    {this.state.secondPassword.touched && this.state.secondPassword.errorMessage
                        ? <p className={classes.ErrorMessage}>{this.state.secondPassword.errorMessage}</p>
                        : null 
                    }
                </MenuItem>
                <MenuItem invalid={!this.state.userConditions.value && this.state.userConditions.touched}>
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
                            Get an email whenever I feel like adding a new feature. (no more that 1 a week, I'm not an asshole)
                        </p>
                    </div>
                </MenuItem>
                <DropButton clicked={this.submitHandler}>
                    {
                        this.props.loading 
                        ? <Loader className={classes.Spinner} 
                            type="ThreeDots" 
                            color="#ffffff" 
                            height={30} 
                            width={30}/>
                        : <h3>Create Account</h3>
                    }
                </DropButton>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.user.loading,
        authReason: state.user.authReason
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email, password)),
        onSignup: (name, email, handle, password, file) => dispatch(actions.signup(name, email, handle, password, file)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);