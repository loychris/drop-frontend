import React, { Component } from 'react';

import classes from './CommentMenu.module.css';
import TrashOpen from './TrashOpen.svg';
import TrashClosed from './TrashClosed.svg';

class CommentMenu extends Component {

    state ={
        trashOpen: false,
        deleteCommentOpen: false
    }


    render() {
        return(
            <div className={classes.CommentMenu}>
                {/* <div className={classes.MenuItem}>screenshot mode </div> */}
                {/* <div className={classes.Seperator}>|</div>  */}
                { !this.props.userComment && this.props.token ? <div className={classes.MenuItem}>report</div> : null}
                { !this.state.deleteCommentOpen 
                    ? this.props.userComment && this.props.token
                        ? <img 
                            src={this.state.trashOpen ? TrashOpen : TrashClosed} 
                            alt='' 
                            className={classes.Trash}
                            onMouseOver={() => this.setState({trashOpen: true})} 
                            onMouseOut={() => this.setState({trashOpen: false})}
                            onClick={() => this.setState({deleteCommentOpen: true})}/>
                        : null
                    : null }
                { this.state.deleteCommentOpen 
                    ? <div className={classes.DeleteDialog}>Delete Comment? 
                        <button className={classes.YesButton}>yes</button>
                        <button className={classes.NoButton} onClick={() => this.setState({deleteCommentOpen: false})}>no</button>
                      </div>
                    : null }
            </div>
        )
    }
}

export default CommentMenu;