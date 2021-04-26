import React, { Component } from "react";
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import * as actions from '../../../store/actions/index';



import MenuScreen from '../MenuScreen/MenuScreen';
import DropButton from '../../UI/DropButton/DropButton'; 
import MenuItem from "../MenuItem/MenuItem";
import Loader from "react-loader-spinner";

import classes from "./AuthMenu.module.css";
import LogoutIcon from './logout.svg';
import ProfilePicPlaceholder from './ProfilePicPlaceholder.svg'; 



class AuthMenu extends Component { 

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

  componentDidUpdate = () => {
    if(this.props.shouldMoveRight) {
      this.props.onMoveRight()
      console.log('MOVE RIGHT!')
    }; 
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


  getMenuScreens = () => {
    return this.props.menuStack.map((s,i) => {
        const pos = this.props.menuStack[this.props.currentDepth] === s ? 0 : i < this.props.currentDepth ? -1 : 1
        let content = []; 
        switch(s){
            case 'AUTH': 
                content.push(
                    <MenuItem invalid={this.state.email.valid} key={s + 'login'}>
                        <input
                            className={classes.TextInput}
                            element="input"
                            id="emailLogin"
                            type="email"
                            placeholder='email'
                            value={this.state.email.value}
                            onChange={this.onInputEmail}
                            onBlur={this.onLeaveEmailFocus}
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
                    </MenuItem>)
                content.push(
                    <MenuItem invalid={false}  key={s + 'signup'}>
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
                );
                break; 
            case 'CHOOSE_HANDLE': 
                content.push(
                    <MenuItem  key={s}>
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
                ); 
                break; 
            case 'CHOOSE_PROFILE_PIC':
                content.push(
                    <MenuItem  key={s}>
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
                        <DropButton clicked={this.createAccount}>
                            <h3>Finish</h3>
                        </DropButton>
                    </MenuItem>
                );
                break; 
            case 'USER_MENU': 
                content.push(
                    <MenuItem  key={s}>
                        <div className={classes.LogoutContainer} onClick={this.props.onLogout}>
                        <img className={classes.LogoutIcon} src={LogoutIcon} alt='logoutIcon'/>
                        <p className={classes.LogoutText}>logout</p>
                        </div>
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
    let menuClasses = [classes.Menu];
    let lightButtonClasses = [classes.LightButton];
    let darkButtonClasses = [classes.DarkButton];
    if(this.props.darkmode){
      menuClasses.push(classes.DarkMenu); 
      darkButtonClasses.push(classes.Active);
      lightButtonClasses.push(classes.Inactive);
    } else {
      menuClasses.push(classes.LightMenu); 
      lightButtonClasses.push(classes.Active);
      darkButtonClasses.push(classes.Inactive);
    }


    return (
      <div className={menuClasses.join(' ')}>
        <div className={classes.NameArea}>
          <h2 className={classes.Name}>{this.props.name}</h2>
          {this.props.token ? <p className={classes.Handle}>@{this.props.handle}</p> : null }
        </div>
        <hr/>
        <div className={classes.MenuItems}>
          { this.getMenuScreens() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    menuStack: state.ui.menu.menuStack, 
    loading: state.user.loading,
    shouldMoveRight: state.ui.menu.shouldMoveRight, 

    darkmode: state.ui.darkmode,
    currentDepth: state.ui.menu.currentDepth, 

    name: state.user.name, 
    handle: state.user.handle,
    token: state.user.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMoveRight: () => dispatch(actions.moveRight()),
    onAddToMenuStack: (next) => dispatch(actions.addToMenuStack(next)), 
    onLogin: (email, password) => dispatch(actions.login(email, password)),
    onSignup: (name, email, handle, password, file, src, newsletter) => dispatch(actions.signup(name, email, handle, password, file, src, newsletter)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthMenu);

