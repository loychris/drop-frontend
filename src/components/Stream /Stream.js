import React, { Component } from 'react'; 
import StreamElement from './StreamElement/StreamElement';
import Aux from '../../hoc/Aux';
import classes from './Stream.module.css';
import Modal from '../UI/Modal/Modal';
import River from '../../SVGs/River.svg';


class Stream extends Component {

    state = {
        nextId: 21,
        streamElements: [
            {position: 20, show: 'show', id:'0020'},
            {position: 19, show: 'show', id:'0019'},
            {position: 18, show: 'show', id:'0018'},
            {position: 17, show: 'show', id:'0017'},
            {position: 16, show: 'show', id:'0016'},
            {position: 15, show: 'show', id:'0015'},
            {position: 14, show: 'show', id:'0014'},
            {position: 13, show: 'show', id:'0013'},
            {position: 12, show: 'show', id:'0012'},
            {position: 11, show: 'show', id:'0011'},
            {position: 10, show: 'show', id:'0010'},
            {position: 9, show: 'show', id:'0009'},
            {position: 8, show: 'show', id:'0008'},
            {position: 7, show: 'show', id:'0007'},
            {position: 6, show: 'show', id:'0006'},
            {position: 5, show: 'show', id:'0005'},
            {position: 4, show: 'show', id:'0004'},
            {position: 3, show: 'show', id:'0003'},
            {position: 2, show: 'show', id:'0002'},
            {position: 1, show: 'show', id:'0001'},
            {position: 0, show: 'left', id:'0000'}
        ]
    }

    componentDidMount(){
        document.addEventListener("keyup", this.swipeHandler, false);
      }

    swipeHandler = (event) => {
        if(event.keyCode === 37){
            let newElements = this.state.streamElements.map(element => {
                return {position: element.position-1,
                        id: element.id,
                        show: element.position-1 === 0 ? 'left' : 'show'}
                    });
                if(newElements[newElements.length-1].position < 0) {
                    newElements.pop();
                    newElements.unshift({position: 20, show: 'show', id: `${this.state.nextId}`})
                }
                this.setState({nextId: this.state.nextId+1, streamElements: newElements});
        }else if(event.keyCode === 39){
            let newElements = this.state.streamElements.map(element => {
                return {position: element.position-1,
                        id: element.id,
                        show: element.position-1 === 0 ? 'right' : 'show'}
                });
            if(newElements[newElements.length-1].position < 0) {
                newElements.pop();
                newElements.unshift({position: 20, show: 'show', id: `${this.state.nextId}`})
            }
            this.setState({nextId: this.state.nextId+1, streamElements: newElements});
        }
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
            elements.push(<StreamElement show={element.show} position={element.position} key={element.id}/>)
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
                    <img src={River} alt='' className='River'/>
                    {elements}    
                </Aux> 
        )
    }
}

export default Stream;