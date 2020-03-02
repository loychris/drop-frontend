import React, { Component } from 'react'; 
import StreamElement from './StreamElement/StreamElement';
import Aux from '../../hoc/Aux';
import classes from './Stream.module.css';
import DropOptionsMenu from './DropOptionsMenu/DropOptionsMenu'
import Modal from '../UI/Modal/Modal';
import SecondModal from '../UI/SecondModal/SecondModal';
import River from '../../SVGs/River.svg';
import DropTargets from './DropTargets/DropTargets';
// import URLs from './URLs.json';


class Stream extends Component {

    state = {
        nextId: 21,
        streamElements: [
            {position: 20, show: 'show', id:'20'},
            {position: 19, show: 'show', id:'19'},
            {position: 18, show: 'show', id:'18'},
            {position: 17, show: 'show', id:'17'},
            {position: 16, show: 'show', id:'16'},
            {position: 15, show: 'show', id:'15'},
            {position: 14, show: 'show', id:'14'},
            {position: 13, show: 'show', id:'13'},
            {position: 12, show: 'show', id:'12'},
            {position: 11, show: 'show', id:'11'},
            {position: 10, show: 'show', id:'10'},
            {position: 9, show: 'show', id:'9'},
            {position: 8, show: 'show', id:'8'},
            {position: 7, show: 'show', id:'7'},
            {position: 6, show: 'show', id:'6'},
            {position: 5, show: 'show', id:'5'},
            {position: 4, show: 'show', id:'4'},
            {position: 3, show: 'show', id:'3'},
            {position: 2, show: 'show', id:'2'},
            {position: 1, show: 'show', id:'1'},
            {position: 0, show: 'left', id:'0'}
        ],
        currentlyDropping: false,
        targets: [
            {type: 'person', profilePic: '', name: 'Felix', id:0},
            {type: 'person', profilePic: '', name: 'Alessio', id:1},
            {type: 'person', profilePic: '', name: 'Kirill', id:2},
            {type: 'person', profilePic: '', name: 'Ullreich', id:3},
            {type: 'person', profilePic: '', name: 'Erdolars', id:4},
            {type: 'person', profilePic: '', name: 'Max Mustenann', id:5},
            {type: 'person', profilePic: '', name: 'Frank Buschmann', id:6},
            {type: 'person', profilePic: '', name: 'Enton', id:7},
            {type: 'person', profilePic: '', name: 'David', id:8},
            {type: 'person', profilePic: '', name: 'Jon Bovi', id:9},
            {type: 'person', profilePic: '', name: 'Donald Trump', id:10},
            {type: 'person', profilePic: '', name: 'Elon Musk', id:11}
        ],
        selectedTargets: [
            {type: 'person', profilePic: '', name: 'Ullreich', id:3},
            {type: 'person', profilePic: '', name: 'Erdolars', id:4},
            {type: 'person', profilePic: '', name: 'Max Mustenann', id:5},
            {type: 'person', profilePic: '', name: 'Frank Buschmann', id:6},
            {type: 'person', profilePic: '', name: 'Enton', id:7},
            {type: 'person', profilePic: '', name: 'David', id:8},
            {type: 'person', profilePic: '', name: 'Jon Bovi', id:8},
            {type: 'person', profilePic: '', name: 'Donald Trump', id:9},
            {type: 'person', profilePic: '', name: 'Elon Musk', id:10}
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

    droppingHandler = (id) => {
        this.setState({currentlyDropping: true});
    }

    render = () => {
        let elements = [];
        this.state.streamElements.forEach(element => {
            elements.push(<StreamElement 
                            show={element.show} 
                            position={element.position} 
                            id={element.id} 
                            key={element.id}
                            dropping={this.droppingHandler}/>)
        });
        return (
            <Aux className={classes.stream}>
                <Modal show={this.state.currentlyDropping} modalClosed={this.abortDroppingHandler}>
                    <DropOptionsMenu targets={this.state.targets}
                        postID={this.state.streamElements[19].id}/>
                </Modal>
                <SecondModal show={this.state.currentlyDropping}>
                    <DropTargets selectedTargets={this.state.selectedTargets}/>
                </SecondModal>
                <img src={River} alt='' className='River'/>
                {elements}    
            </Aux> 
        )
    }
}

export default Stream;