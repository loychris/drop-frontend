import React, { Component } from 'react'; 
import StreamElement from './StreamElement/StreamElement';
import Aux from '../../hoc/Aux';
import classes from './Stream.module.css';
import Modal from '../UI/Modal/Modal';
import River from '../../SVGs/River.svg';

class Stream extends Component {

    state = {
        streamElements: [
            {position: 20, show:'1'},
            {position: 19, show:'1'},
            {position: 18, show:'1'},
            {position: 17, show:'1'},
            {position: 16, show:'1'},
            {position: 15, show:'1'},
            {position: 14, show:'1'},
            {position: 13, show:'1'},
            {position: 12, show:'1'},
            {position: 11, show:'1'},
            {position: 10, show:'1'},
            {position: 9, show:'1'},
            {position: 8, show:'1'},
            {position: 7, show:'1'},
            {position: 6, show:'1'},
            {position: 5, show:'1'},
            {position: 4, show:'1'},
            {position: 3, show:'1'},
            {position: 2, show:'1'},
            {position: 1, show:'1'}
        ],
        currentlyDropping: false
    }


    swipeHandler = () => {
        let newElements = this.state.streamElements.map(element => {
            return {position: element.position-1, show: element.show}
        });
        
        newElements[0].show = '0';
        console.log("new elements: ", newElements);
        this.setState({streamElements: newElements});
    }

    abortDroppingHandler = () => {
        this.setState({currentlyDropping: false});
    }
    droppingHandler = () => {
        this.setState({currentlyDropping: true});
    }

    render = () => {
        let elements = [];
        this.state.streamElements.forEach(element => {
            elements.push(<StreamElement show={element.show} position={element.position} key={element.position}/>)
        });
        return (
                <Aux className={classes.stream}>
                    <Modal show={this.state.currentlyDropping} modalClosed={this.abortDroppingHandler}>
                        <ul>
                            <li>jgeaogwaoeginawogn</li>
                            <li>jgeaogwaoeginawogn</li>
                            <li>jgeaogwaoeginawogn</li>
                            <li>jgeaogwaoeginawogn</li>
                            <li>jgeaogwaoeginawogn</li>
                            <li>jgeaogwaoeginawogn</li>
                        </ul>
                    </Modal>
                    <button style={{left: '40px'}}onClick={this.droppingHandler}>DROP IT</button>
                    <button onClick={this.swipeHandler}>Swipe</button>
                    <img src={River} alt='' className='River'/>
                    {elements}    
                </Aux> 
        )
    }
}

export default Stream;