import React, { Component } from 'react';
import ChatPrev from './ChatPrev/ChatPrev'; 
import classes from './Chat.module.css';

class Chat extends Component {

    state = {
        chats: [
            {
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
                name: 'Josua Sievers', 
                type: 'person', 
                preview: 'I bims, der Joshua',
                latestMessages: [
                    {sender: 'Josua', time: '12:43', message: 'I bims, der Joshua'}
                ]}, 
            {   
                name: 'Group2', 
                type: 'group', 
                preview: 'this is the last message, that was sent in Group2',
                latestMessages: []
            }, 
            {
                name: 'Elon Musk', 
                type: 'group', 
                preview: 'please stop contacting me',
                latestMessages: [
                    {user: true, time: '00:42', message: 'Huhu'},
                    {user: false, time: '04:05', message: 'please stop contacting me'}
                ]
            }, 
            {name: 'Group1', type: 'group', preview: 'this is the last message, that was sent in Group1'}   
        ]
    }

    render(){

        const chats = this.state.chats.map(x => {
            return <ChatPrev {...x} />
        })

        return(
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
        )
    }
}

export default Chat;