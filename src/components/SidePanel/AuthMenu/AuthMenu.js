import React, { Component } from "react";
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import * as actions from '../../../store/actions/index';



import MenuScreen from '../MenuScreen/MenuScreen';
import DropButton from '../../UI/DropButton/DropButton'; 
import MenuItem from "../MenuItem/MenuItem";
import Loader from "react-loader-spinner";

import classes from "./AuthMenu.module.css";
import ProfilePicPlaceholder from './ProfilePicPlaceholder.svg'; 

const UNACCEPTABLE_PASSWORDS = ['12345', '123456', '1234567', '12345678', '123456789', '1234567890']


class AuthMenu extends Component { 

  state = {
    loginEmail: {
        value: '',
        touched: false,
        valid: false,
    },
    loginPassword: {
        value: '',
        touched: false,
        valid: false,
    },
    name: {
        value: '',
        touched: false,
        valid: false,
    },
    password: {
        value: '',
        touched: false,
        valid: false,
        errorMessage: 'Min 5 Characters'
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
}

//--------- LOGIN EMAIL --------------------------------------------------------

onInputLoginEmail = (event) => {
    const email = event.target.value;
    const valid = email ? /^\S+@\S+\.\S+$/.test(email) : false;
    this.setState({ 
        loginEmail: {
            ...this.state.loginEmail,
            value: event.target.value,
            errorMessage: valid ? null : 'Please enter valid email.',
            valid: valid
        }
    })  
}

onLeaveLoginEmailFocus = () => {
    this.setState({
        loginEmail: {
            ...this.state.loginEmail, 
            touched: true
        }
    })
}

//--------- LOGIN PASSWORD -----------------------------------------------------


onInputLoginPassword = (event) => {
    const password = event.target.value;
    this.setState({ 
        loginPassword: {
            ...this.state.loginPassword, 
            value: password
        }
    })
}

onLeaveLoginPasswordFocus = () => {
    this.setState({
        loginPassword: {
            ...this.state.loginPassword,
            touched: true
        }
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
    let valid = true; 
    let errorMessage;
    if(!password || password.length < 5){
        valid = false;
        errorMessage = 'Min 5 Characters';
    } else if(UNACCEPTABLE_PASSWORDS.includes(password)){
        valid = false;
        errorMessage = 'Really? Can u please chose another password?';
    } else if(password.length > 30){
        valid = false;
        errorMessage = 'Max 30 characters'
    }
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
            ...this.state.secondPassword,
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

  componentDidUpdate = () => {
    if(this.props.shouldMoveRight) {
      this.props.onMoveRight()
    }; 
    if(this.props.menuStack[this.props.menuStack.length-1] === 'CHOOSE_HANDLE'){
        document.getElementById('handle').focus(); 
    }
  }

  createAccount = () => {
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
        this.state.profilePic.file,
        this.state.profilePic.src, 
        this.state.newsletter
    );
  }

  login = (event) => {
    event.preventDefault();
    this.props.onLogin(this.state.loginEmail.value, this.state.loginPassword.value)
  }

  signup = (event) => {
    event.preventDefault();
    if(this.state.email.valid && this.state.password.valid && this.state.secondPassword.valid && this.state.name.valid){
        this.props.checkEmailTaken(this.state.email.value);
    }else {
        this.setState({
            email: { ...this.state.email, touched: true },
            password: { ...this.state.password, touched: true },
            secondPassword: { ...this.state.secondPassword, touched: true },
            name: { ...this.state.name, touched: true },
        })
    }
  }

  chooseHandle = (event) => {
      event.preventDefault(); 
      if(this.state.handle.valid){
        this.props.checkHandleTaken(this.state.handle.value);
      }else{
          this.setState({
              handle: { ...this.state.handle, touched: true }
          })
      }
  }


  getMenuScreens = () => {
    return this.props.menuStack.map((s,i) => {
        const pos = this.props.menuStack[this.props.currentDepth] === s ? 0 : i < this.props.currentDepth ? -1 : 1
        let content = []; 
        switch(s){
            case 'AUTH': 
                const loginErrorMessage = !this.state.loginEmail.valid & this.state.loginEmail.touched ? 'Not a valid email' : this.props.loginError;
                let emailErrorMessage, 
                    passwordErrorMessage, 
                    secondPasswordErrorMessage;
                if(!this.state.email.valid && this.state.email.touched) emailErrorMessage = 'Not a valid email';
                if(this.props.takenEmails.some(e => e === this.state.email.value)) emailErrorMessage = 'There already exists an account with that email.';
                if(!this.state.password.valid && this.state.password.touched) passwordErrorMessage = this.state.password.errorMessage;
                if(!this.state.secondPassword.valid && this.state.secondPassword.touched) secondPasswordErrorMessage = this.state.secondPassword.errorMessage;
            
                content.push(
                    <MenuItem key={s + 'login'}>
                        <form onSubmit={this.login}>
                            <input
                                onAnimationStart={this.onInputEmail}
                                className={classes.TextInput}
                                element="input"
                                id="emailLogin"
                                type="email"
                                placeholder='email'
                                spellCheck='false'
                                value={this.state.loginEmail.value}
                                onChange={this.onInputLoginEmail}
                                onBlur={this.onLeaveLoginEmailFocus}
                            />
                            <input
                                onAnimationStart={this.onInputLoginPassword}
                                className={classes.TextInput}
                                element="input"
                                type="password"
                                placeholder='password'
                                value={this.state.loginPassword.value}
                                onChange={this.onInputLoginPassword}
                                onBlur={this.onLeaveLoginPasswordFocus}
                            />
                            {
                                loginErrorMessage ? 
                                <div className={classes.ErrorMessage}>
                                    {loginErrorMessage}
                                </div>
                                :null
                            }

                            <DropButton clicked={this.login}>
                                { this.props.loginLoading 
                                ? <Loader 
                                    className={classes.Spinner} 
                                    type="ThreeDots" 
                                    color="#FFFFFF" 
                                    height={30} 
                                    width={30}/> 
                                : <h3>Login</h3> }
                            </DropButton>
                        </form>
                    </MenuItem>)
                content.push(
                    <MenuItem key={s + 'signup'}>
                        <form onSubmit={this.signup}>
                            <input
                                className={classes.TextInput}
                                element="input"
                                id="emailSignup"
                                type="email"
                                placeholder='email'
                                value={this.state.email.value}
                                onChange={this.onInputEmail}
                                onAnimationStart={this.onInputEmail}
                                onBlur={this.onLeaveEmailFocus}
                            />
                            {
                                emailErrorMessage ? 
                                <div className={classes.ErrorMessage}>
                                    {emailErrorMessage}
                                </div>
                                : null
                            }
                            <input
                                className={classes.TextInput}
                                element="input"
                                type="password"
                                placeholder='password'
                                value={this.state.password.value}
                                onChange={this.onInputPassword}
                                onAnimationStart={this.onInputPassword}
                                onBlur={this.onLeavePasswordFocus}
                            />
                            {
                                passwordErrorMessage ? 
                                <div className={classes.ErrorMessage}>
                                    {passwordErrorMessage}
                                </div>
                                :null
                            }
                            <input
                                className={classes.TextInput}
                                element="input"
                                type="password"
                                placeholder='repeat password'
                                value={this.state.secondPassword.value}
                                onChange={this.onInputSecondPassword}
                                onAnimationStart={this.onInputSecondPassword}
                                onBlur={this.onLeaveSecondPasswordFocus}
                            />
                            {
                                secondPasswordErrorMessage ? 
                                <div className={classes.ErrorMessage}>
                                    {secondPasswordErrorMessage}
                                </div>:null
                            }
                            <input 
                                className={classes.TextInput}
                                id="name" 
                                placeholder="Your Name"
                                type="text"
                                value={this.state.name.value}
                                onChange={this.onInputName}
                                onAnimationStart={this.onInputName}
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
                            <DropButton type="submit" clicked={(event) => this.signup(event)}>
                                { 
                                    this.props.checkEmailLoading 
                                    ? <Loader 
                                        className={classes.Spinner} 
                                        type="ThreeDots" 
                                        color="#FFFFFF" 
                                        height={30} 
                                        width={30}/> 
                                    : <h3>Create Account</h3>
                                }
                            </DropButton>
                        </form>
                    </MenuItem>
                );
                break; 
            case 'CHOOSE_HANDLE': 
                let handleErrorMessage;
                if(!this.state.handle.valid && this.state.handle.touched) handleErrorMessage = this.state.handle.errorMessage;
                if(this.props.takenHandles.some(h => h === this.state.handle.value)) handleErrorMessage = 'Handle already taken'
                content.push(
                    <MenuItem  key={s}>
                        <form onSubmit={this.chooseHandle}>
                            <h3>Enter @ Handle:</h3>            
                            <input
                                className={classes.TextInput}
                                element="input"
                                id="handle"
                                type="text"
                                placeholder="@elon"
                                value={'@' + this.state.handle.value}
                                onChange={this.onInputHandle}
                                onAnimationStart={this.onInputHandle}
                                onBlur={this.onLeaveHandleFocus}
                            />
                            {
                                handleErrorMessage ? 
                                <div className={classes.ErrorMessage}>
                                    {handleErrorMessage}
                                </div>:null
                            }
                            <DropButton type="submit" clicked={(event) => this.chooseHandle(event)}>
                            { 
                                this.props.checkHandleLoading 
                                ? <Loader 
                                    className={classes.Spinner} 
                                    type="ThreeDots" 
                                    color="#FFFFFF" 
                                    height={30} 
                                    width={30}/> 
                                : <h3>Choose {this.state.handle.value}</h3>
                            }
                            </DropButton>
                        </form>
                    </MenuItem>
                ); 
                break; 
            case 'CHOOSE_PROFILE_PIC':
                content.push(
                    <MenuItem  key={s}>
                        <h3>Profile Picture</h3>
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
                        <DropButton clicked={this.createAccount}>
                        { 
                                this.props.signupLoading 
                                ? <Loader 
                                    className={classes.Spinner} 
                                    type="ThreeDots" 
                                    color="#FFFFFF" 
                                    height={30} 
                                    width={30}/> 
                                : <h3>Finish</h3>
                            }
                        </DropButton>
                    </MenuItem>
                );
                break; 
            default: console.log('INVALID ELEMENT ON MENU STACK');
        }
        return (
            <MenuScreen screen={s} pos={pos} goBack={this.goBack} addToMenuStack={this.addToMenuStack}  key={s}>
                {content}
            </MenuScreen>
        )
    })
  }


  render() {
    return (
        <div className={classes.MenuItems}>
          { this.getMenuScreens() }
        </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    menuStack: state.ui.menu.menuStack, 
    loginLoading: state.user.loginLoading,
    checkEmailLoading: state.user.checkEmailLoading,
    signupLoading: state.user.signupLoading,
    checkHandleLoading: state.user.checkHandleLoading,
    shouldMoveRight: state.ui.menu.shouldMoveRight, 

    darkmode: state.ui.darkmode,
    currentDepth: state.ui.menu.currentDepth, 

    name: state.user.name, 
    handle: state.user.handle,
    token: state.user.token,

    loginError: state.user.loginError, 
    signupError: state.user.signupError,
    takenEmails: state.user.takenEmails,
    takenHandles: state.user.takenHandles,

    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMoveRight: () => dispatch(actions.moveRight()),
    onAddToMenuStack: (next) => dispatch(actions.addToMenuStack(next)), 

    checkEmailTaken: (email) => dispatch(actions.checkEmailTaken(email)),
    checkHandleTaken: (handle) => dispatch(actions.checkHandleTaken(handle)),
    onLogin: (email, password) => dispatch(actions.login(email, password)),
    onSignup: (name, email, handle, password, file, src, newsletter) => dispatch(actions.signup(name, email, handle, password, file, src, newsletter)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthMenu);

