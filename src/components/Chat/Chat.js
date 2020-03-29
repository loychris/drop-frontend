import React, { Component } from 'react';
import ChatPrev from './ChatPrev/ChatPrev'; 
import classes from './Chat.module.css';
import Message from './Message/Message';
// import { NavLink, BrowserRouter, Route } from 'react-router-dom';


class Chat extends Component {

    state = {
        searchBarValue: '',
        currentChat: 0,
        chats: [
            {
                chatId: 0,
                name: 'Pokern', 
                type: 'group', 
                preview: 'this is the last message, that was sent in Group1',
                latestMessages: [
                    {msgId: 400, sent: false, sender: 'Äntn', time: '17:31', message: 'Lass mal das Pokern auf Pokerstarts verlegen'},
                    {msgId: 401, sent: false, sender: 'David', time: '17:34', message: 'Ja, man!'},
                    {msgId: 402, sent: false, sender: 'Kirill', time: '17:35', message: 'Kostet das etwas?'},
                    {msgId: 403, sent: true, sender: 'User', time: '17:31', message: 'Ja! Ich schaue mal, ob ich noch in meinen Acc komme'}
                ]}, 
            {
                chatId: 1,
                name: 'Josua Sievers', 
                type: 'person', 
                preview: 'I bims, der Joshua',
                latestMessages: [
                    {msgId: 7, sent: false, sender: 'Josua', time: '12:43', message: 'I bims, der Joshua'}
                ]}, 
            {   
                chatId: 2,
                name: 'Group2', 
                type: 'group', 
                preview: '',
                latestMessages: []
            }, 
            {
                chatId: 3,
                name: 'Elon Musk', 
                type: 'person', 
                preview: 'please stop contacting me',
                latestMessages: [
                    {msgId: 563, sent: true, time: '00:42', message: 'Huhu'},
                    {msgid: 564, sent: false, time: '04:05', message: 'please stop contacting me'}
                ]
            }   
        ]
    }

    render(){

        let chats = this.state.chats.map(x => {
            return (<ChatPrev key={x.chatId} {...x}/>);
                //return(
                // <NavLink 
                //     key={x.chatId}
                //     to={`/chat/${x.name}`}
                //     activeClassName={classes.Active}>
                //     <ChatPrev {...x} />
                // </NavLink>)

        })

        const messages = this.state.chats.find(x => x.chatId === this.state.currentChat).latestMessages.map(x => {
            return(<Message key={x.msgId} {...x}/>)
        })

        const styleClasses = [classes.Chat];
        if(this.props.showing !== true) styleClasses.push(classes.OutLeft);

        return(
            <div className={styleClasses.join(' ')}>
                <div className={classes.Previews}>
                    {chats}
                    <div className={classes.ChatSearch}>abcde</div>
                </div>
                <div className={classes.ChatWindow}>
                    <div className={classes.Messages}>
                        {messages}
                    </div>
                    <div className={classes.TextField}>

                    </div>
                </div>
            </div>
        )
    }
}

export default Chat;