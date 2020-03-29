import React, { Component } from 'react';
import ChatPrev from './ChatPrev/ChatPrev'; 
import classes from './Chat.module.css';
import { NavLink, BrowserRouter, Route } from 'react-router-dom';


class Chat extends Component {

    state = {
        chats: [
            {
                chatId: 0,
                name: 'Pokern', 
                type: 'group', 
                preview: 'this is the last message, that was sent in Group1',
                latestMessages: [
                    {sender: 'Äntn', time: '17:31', message: 'Lass mal das Pokern auf Pokerstarts verlegen'},
                    {sender: 'David', time: '17:34', message: 'Ja, man!'},
                    {sender: 'Kirill', time: '17:35', message: 'Kostet das etwas?'},
                    {sender: 'User', time: '17:31', message: 'Ja! Ich schaue mal, ob ich noch in meinen Acc komme'},
                ]}, 
            {
                chatId: 1,
                name: 'Josua Sievers', 
                type: 'person', 
                preview: 'I bims, der Joshua',
                latestMessages: [
                    {sender: 'Josua', time: '12:43', message: 'I bims, der Joshua'}
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
                type: 'group', 
                preview: 'please stop contacting me',
                latestMessages: [
                    {user: true, time: '00:42', message: 'Huhu'},
                    {user: false, time: '04:05', message: 'please stop contacting me'}
                ]
            }   
        ]
    }

    render(){

        const chats = this.state.chats.map(x => {
            return (
                <NavLink 
                    key={x.chatId}
                    to={`/chat/${x.name}`}
                    activeClassName={classes.Active}>
                    <ChatPrev {...x} />
                </NavLink>)
        })

        return(
            <BrowserRouter>
            <div className={classes.Chat}>
                <div className={classes.Previews}>
                    {chats}
                </div>
                <div className={classes.ChatWindow}>
                    <div className={classes.Messages}>

                    </div>
                    <div className={classes.TextField}>

                    </div>
                </div>
            </div>
            </BrowserRouter>
        )
    }
}

export default Chat;