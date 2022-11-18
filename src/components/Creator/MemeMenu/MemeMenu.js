import React, { Component } from 'react'; 
import classes from './MemeMenu.module.css';
import Washington from '../Washington.jpeg';
import Monument from '../Washington_Monument.jpeg';
import WashingtonMonumentMeme from '../WashingtonMonumentMeme.jpeg';
import MemePreview from './MemePreview/MemePreview';
import Hillary from './memes/Hillary.jpg';
import Blink from './memes/Blink.jpg';
import TuYouyou from './memes/TuYouyou.jpg'
import Fallschirmjaegergewehr from './memes/Fallschirmjaegergewehr.jpg'


class MemeMenu extends Component {

    state = {
        searchInput: '', 
        memes: [
            {
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
        ]
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

    render(){
        return(
            <div 
                id="MemeMenu"
                className={classes.MemeMenu} 
                onWheel={this.wheel}
            >
                <div className={classes.Search}>
                    <input 
                        type="text"
                        onInput={this.onSearchInput}
                        value={this.state.search}
                        placeholder="...search for memes"/>
                </div>
                <div
                    className={classes.Previews} 
                    style={this.getPreviewsStyles()}
                    >
                    {
                        this.state.memes.map(meme => {
                            return(
                                <MemePreview meme={meme} key={meme.id}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default MemeMenu;