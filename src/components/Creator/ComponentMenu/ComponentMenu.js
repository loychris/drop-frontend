import React, { Component } from 'react'; 
import classes from './ComponentMenu.module.css';
import Washington from '../Washington.jpeg';
import Monument from '../Washington_Monument.jpeg';
import WashingtonMonumentMeme from '../WashingtonMonumentMeme.jpeg';
import MemePreview from './ElementPreview/ElementPreview';
import Hillary from './previews/Hillary.jpg';
import Blink from './previews/Blink.jpg';
import TuYouyou from './previews/TuYouyou.jpg';
import Circle from './previews/Ellipse.png';
import Fallschirmjaegergewehr from './previews/Fallschirmjaegergewehr.jpg'
import ElementPreview from './ElementPreview/ElementPreview';


class ComponentMenu extends Component {

    state = {
        searchInput: '', 
        memes: [
            {
                type: 'meme',
                id: "1",
                title: "George Washington Monument",
                tags: ["George", "Washington", "Monument"],
                preview: WashingtonMonumentMeme,
                elements: [
                    {
                        type: 'text', 
                        elementId: '5',
                        height: 170,
                        width: 570, 
                        posX: 15,
                        posY: 15,
                        text: 'Y\'all ever notice that the Washington monument looks absolutely NOTHING like George Washington?',
                        font: 'Oswald',
                        fontSize: '28.5',
                        fontWeight: '700',
                        textAlign: 'center',
                        verticalAlign: 'top', 
                        fixedDimensions: true,
                        underline: false, 
                        italic: false, 
                        textStroke: true,
                        rotation: 0,
                    },
                    {
                        type: 'rect',
                        elementId: '8',
                        posX: 0,
                        posY: 0,
                        height: 200,
                        width: 600,
                        color: '#000000',
                        rotation: 0,
                    },
                    {
                        type: 'image',
                        elementId: '11',
                        imgSrc: Washington,
                        posX: 0,
                        posY: 200,
                        height: 365,
                        width: 300,
                        rotation: 0,
                    },
                    {
                        type: 'image',
                        elementId: '12',
                        imgSrc: Monument,
                        posX: 300,
                        posY: 200,
                        height: 365,
                        width: 300,
                        rotation: 0,
                    }
                ]
            },
            {
                type: 'meme',
                id: "2",
                title: "George Washington Monument",
                tags: ["George", "Washington", "Monument"],
                preview: Hillary,
                elements: [
                    {
                        type: 'text', 
                        elementId: '5',
                        height: 170,
                        width: 570, 
                        posX: 15,
                        posY: 15,
                        text: 'Y\'all ever notice that the Washington monument looks absolutely NOTHING like George Washington?',
                        font: 'Oswald',
                        fontSize: '28.5',
                        fontWeight: '700',
                        textAlign: 'center',
                        verticalAlign: 'top', 
                        fixedDimensions: true,
                        underline: false, 
                        italic: false, 
                        textStroke: true,
                        rotation: 0,
                    },
                    {
                        type: 'rect',
                        elementId: '8',
                        posX: 0,
                        posY: 0,
                        height: 200,
                        width: 600,
                        color: '#000000',
                        rotation: 0,
                    },
                    {
                        type: 'image',
                        elementId: '11',
                        imgSrc: Washington,
                        posX: 0,
                        posY: 200,
                        height: 365,
                        width: 300,
                        rotation: 0,
                    },
                    {
                        type: 'image',
                        elementId: '12',
                        imgSrc: Monument,
                        posX: 300,
                        posY: 200,
                        height: 365,
                        width: 300,
                        rotation: 0,
                    }
                ]
            },
            {
                type: 'meme',
                id: "3",
                title: "George Washington Monument",
                tags: ["George", "Washington", "Monument"],
                preview: Blink,
                elements: [
                    {
                        type: 'text', 
                        elementId: '5',
                        height: 170,
                        width: 570, 
                        posX: 15,
                        posY: 15,
                        text: 'Y\'all ever notice that the Washington monument looks absolutely NOTHING like George Washington?',
                        font: 'Oswald',
                        fontSize: '28.5',
                        fontWeight: '700',
                        textAlign: 'center',
                        verticalAlign: 'top', 
                        fixedDimensions: true,
                        underline: false, 
                        italic: false, 
                        textStroke: true,
                        rotation: 0,
                    },
                    {
                        type: 'rect',
                        elementId: '8',
                        posX: 0,
                        posY: 0,
                        height: 200,
                        width: 600,
                        color: '#000000',
                        rotation: 0,
                    },
                    {
                        type: 'image',
                        elementId: '11',
                        imgSrc: Washington,
                        posX: 0,
                        posY: 200,
                        height: 365,
                        width: 300,
                        rotation: 0,
                    },
                    {
                        type: 'image',
                        elementId: '12',
                        imgSrc: Monument,
                        posX: 300,
                        posY: 200,
                        height: 365,
                        width: 300,
                        rotation: 0,
                    }
                ]
            },
            {
                type: 'meme',
                id: 4, 
                title: "George Washington Monument",
                tags: ["George", "Washington", "Monument"],
                preview: TuYouyou,
                elements: [
                    {
                        type: 'text', 
                        elementId: '5',
                        height: 170,
                        width: 570, 
                        posX: 15,
                        posY: 15,
                        text: 'Y\'all ever notice that the Washington monument looks absolutely NOTHING like George Washington?',
                        font: 'Oswald',
                        fontSize: '28.5',
                        fontWeight: '700',
                        textAlign: 'center',
                        verticalAlign: 'top', 
                        fixedDimensions: true,
                        underline: false, 
                        italic: false, 
                        textStroke: true,
                        rotation: 0,
                    },
                    {
                        type: 'rect',
                        elementId: '8',
                        posX: 0,
                        posY: 0,
                        height: 200,
                        width: 600,
                        color: '#000000',
                        rotation: 0,
                    },
                    {
                        type: 'image',
                        elementId: '11',
                        imgSrc: Washington,
                        posX: 0,
                        posY: 200,
                        height: 365,
                        width: 300,
                        rotation: 0,
                    },
                    {
                        type: 'image',
                        elementId: '12',
                        imgSrc: Monument,
                        posX: 300,
                        posY: 200,
                        height: 365,
                        width: 300,
                        rotation: 0,
                    }
                ]
            },  
            {
                id: 5, 
                title: "George Washington Monument",
                tags: ["George", "Washington", "Monument"],
                preview: Fallschirmjaegergewehr,
                elements: [
                    {
                        type: 'text', 
                        elementId: '5',
                        height: 170,
                        width: 570, 
                        posX: 15,
                        posY: 15,
                        text: 'Y\'all ever notice that the Washington monument looks absolutely NOTHING like George Washington?',
                        font: 'Oswald',
                        fontSize: '28.5',
                        fontWeight: '700',
                        textAlign: 'center',
                        verticalAlign: 'top', 
                        fixedDimensions: true,
                        underline: false, 
                        italic: false, 
                        textStroke: true,
                        rotation: 0,
                    },
                    {
                        type: 'rect',
                        elementId: '8',
                        posX: 0,
                        posY: 0,
                        height: 200,
                        width: 600,
                        color: '#000000',
                        rotation: 0,
                    },
                    {
                        type: 'image',
                        elementId: '11',
                        imgSrc: Washington,
                        posX: 0,
                        posY: 200,
                        height: 365,
                        width: 300,
                        rotation: 0,
                    },
                    {
                        type: 'image',
                        elementId: '12',
                        imgSrc: Monument,
                        posX: 300,
                        posY: 200,
                        height: 365,
                        width: 300,
                        rotation: 0,
                    }
                ]
            },    
        ],
        shapes: [
            {
                type: 'shape',
                id: '1', 
                name: 'Rectangle',
                preview: <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="50" height="50" fill="#ABCDEA"/>
                        </svg>, 
                elements: [
                    {
                        type: 'rect', 
                        elementId: `rect-${Date.now()}`,
                        posX: 100,
                        posY: 100,
                        height: 400,
                        width: 400,
                        color: '#FF8592',
                        rotation: 0,
                    },
                ]
            },
            {
                type: 'shape',
                id: '2',
                name: 'Ellipse',
                preview: <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="25" cy="25" r="25" fill="#ABCDEA"/>
                         </svg>,  
                elements: [
                    {
                        type: 'ellipse',
                        elementId: `ellipse-${Date.now()}`,
                        posX: 100,
                        posY: 100,
                        height: 400,
                        width: 400,
                        color: '#FF8592',
                        rotation: 0,
                    }
                ]
            }
        ],
    }

    wheel = (e) => {
        e.stopPropagation()
    }

    onSearchInput = (e) => {
        this.setState({searchInput: e.target.value})
    }

    getPreviewsStyles = () => {
        const height = document.getElementById('creator').clientHeight;
        return {
            maxHeight: `${height-85}px`
        }
    }

    getEllipse = () => {
        return(
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="25" fill="#ABCDEA"/>
            </svg>
        )
    }

    render(){
        if(!this.props.menu) return null; 
        const previews = this.props.menu === 'memes' ? this.state.memes : this.state.shapes;
        return(
            <div 
                id="ComponentMenu"
                className={classes.ComponentMenu} 
                onWheel={this.wheel}
            >  
                <div className={classes.X} onClick={() => this.props.openComponentMenu(null)}>x</div>
                {
                    this.props.menu === 'memes' ? 
                    <div className={classes.Search}>
                        <input 
                            type="text"
                            onInput={this.onSearchInput}
                            value={this.state.search}
                            placeholder="...search for memes"/>
                    </div> : null
                }
               <div
                    className={classes.Previews} 
                    style={this.getPreviewsStyles()}
                    >
                    {
                        previews.map(meme => {
                            return(
                                <ElementPreview 
                                    element={meme} 
                                    key={meme.id}
                                    grabNewElement={this.props.grabNewElement}
                                    addElements={this.props.addElements}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ComponentMenu;