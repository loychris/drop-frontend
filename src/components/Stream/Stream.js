import React, { Component } from 'react'; 
import axios from 'axios';
import StreamElement from './StreamElement/StreamElement';
import Aux from '../../hoc/Aux';
import classes from './Stream.module.css';
import DropOptionsMenu from './DropOptionsMenu/DropOptionsMenu'
import Modal from '../UI/Modal/Modal';
import SecondModal from '../UI/SecondModal/SecondModal';
import River from '../../SVGs/River.svg';
import SelectedDropTargets from './SelectedDropTargets/SelectedDropTargets';
// import URLs from './URLs.json';


class Stream extends Component {

    state = {
        nextId: 21,
        streamElements: [
            {position: 0, show: 'left', id:'0'},
            {position: 1, show: 'show', id:'1'},
            {position: 2, show: 'show', id:'2'},
            {position: 3, show: 'show', id:'3'},
            {position: 4, show: 'show', id:'4'},
            {position: 5, show: 'show', id:'5'},
            {position: 6, show: 'show', id:'6'},
            {position: 7, show: 'show', id:'7'},
            {position: 8, show: 'show', id:'8'},
            {position: 9, show: 'show', id:'9'},
            {position: 10, show: 'show', id:'10'},
            {position: 11, show: 'show', id:'11'},
            {position: 12, show: 'show', id:'12'},
            {position: 13, show: 'show', id:'13'},
            {position: 14, show: 'show', id:'14'},
            {position: 15, show: 'show', id:'15'},
            {position: 16, show: 'show', id:'16'},
            {position: 17, show: 'show', id:'17'},
            {position: 18, show: 'show', id:'18'},
            {position: 19, show: 'show', id:'19'},
            {position: 20, show: 'show', id:'20'}
        ],
        currentlyDropping: false,
        targets: [
            {type: 'person', profilePic: '', name: 'Alessio', selected: false, id:1},
            {type: 'person', profilePic: '', name: 'David', selected: false, id:8},
            {type: 'person', profilePic: '', name: 'Donald Trump', selected: false, id:10},
            {type: 'person', profilePic: '', name: 'Elon Musk', selected: false, id:11},
            {type: 'person', profilePic: '', name: 'Enton', selected: false, id:7},
            {type: 'person', profilePic: '', name: 'Erdolars', selected: false, id:4},
            {type: 'person', profilePic: '', name: 'Felix', selected: false, id:0},
            {type: 'person', profilePic: '', name: 'Frank Buschmann', selected: false, id:6},
            {type: 'person', profilePic: '', name: 'Jon Bovi', selected: false, id:9},
            {type: 'person', profilePic: '', name: 'Kirill', selected: false, id:2},
            {type: 'person', profilePic: '', name: 'Max Mustenann', selected: false, id:5},
            {type: 'person', profilePic: '', name: 'Ullreich', selected: false, id:3},
        ],
        selectedTargets: [],
        dropTargetsLoaded: false,
        initialPageLoad: true
    }

    componentDidUpdate(){
        console.log("updated Stream")
    }

    componentDidMount(){
        document.addEventListener("keyup", this.swipeHandler, false);

        if(!this.state.dropTargetsLoaded){
            axios.get(`/dropTargets`)
                .then(response => {
                    this.setState({dropTargetsLoaded: true, targets: response.data});
                });
        }
    }

    swipeHandler = (event) => {
        if(event.keyCode === 37){
            let newElements = this.state.streamElements.map(element => {
                return {position: element.position-1,
                        id: element.id,
                        show: element.position-1 === 0 ? 'left' : 'show'}
                    });
                if(newElements[0].position < 0) {
                    newElements.shift();
                    newElements.push({position: 20, id: `${this.state.nextId}`, show: 'show'})
                }
                const nextId = this.state.nextId+1;
                this.setState({nextId: nextId, streamElements: newElements});


        }else if(event.keyCode === 39){
            let newElements = this.state.streamElements.map(element => {
                return {position: element.position-1,
                        id: element.id,
                        show: element.position-1 === 0 ? 'right' : 'show'}
                });
            if(newElements[0].position < 0) {
                newElements.shift();
                newElements.push({position: 20, id: `${this.state.nextId}`, show: 'show'})
            }
            const nextId = this.state.nextId+1;
            this.setState({nextId: nextId, streamElements: newElements});
        }
    }


    selectTargetHandler = (id) => {
        let target = this.state.targets.filter(x => x.id === id)[0];
        target.selected = true;
        let targetsNew = this.state.targets.filter(x => x.id !== id);
        targetsNew.unshift(target);
        let selectedTargetsNew = this.state.selectedTargets;
        selectedTargetsNew.unshift(target);
        targetsNew.sort((x,y) => { return x.name > y.name ? 1 : -1});
        this.setState({targets: targetsNew, selectedTargets: selectedTargetsNew});
    }

    unselectTargetHandler = (id) => {
        let target = this.state.selectedTargets.filter(x => x.id === id)[0];
        target.selected = false;
        let targetsNew = this.state.targets.filter(x => x.id !== id);
        targetsNew.unshift(target);
        targetsNew.sort((x,y) => { return x.name > y.name ? 1 : -1});
        let selectedTargetsNew = this.state.selectedTargets.filter(x => x.id !== id);
        this.setState({targets: targetsNew, selectedTargets: selectedTargetsNew});
    }

    abortDroppingHandler = () => {
        this.setState({currentlyDropping: false});
    }

    droppingHandler = (id) => {
        this.setState({currentlyDropping: true});
    }

    dropConfirmedHandler = () => {
        this.setState({currentlyDropping: false});
    }

    render = () => {
        let StreamElements = [];
        this.state.streamElements.forEach(element => {
            StreamElements.unshift(<StreamElement 
                            show={element.show} 
                            position={element.position} 
                            id={element.id} 
                            key={element.id}
                            currentlyDropping={this.state.currentlyDropping}
                            dropping={this.droppingHandler}/>)
        });
        return (
            <Aux className={classes.stream}>
                <Modal show={this.state.currentlyDropping} modalClosed={this.abortDroppingHandler}>
                    <DropOptionsMenu selectTarget={this.selectTargetHandler} unselectTarget={this.unselectTargetHandler} targets={this.state.targets}
                        postID={this.state.streamElements[19].id}/>
                </Modal>
                <SecondModal show={this.state.currentlyDropping}>
                    <SelectedDropTargets selectedTargets={this.state.selectedTargets} unselectTarget={this.unselectTargetHandler}/>
                </SecondModal>
                <img src={River} alt='' className='River'/>
                {StreamElements}    
            </Aux>
        )
    }
}

export default Stream;