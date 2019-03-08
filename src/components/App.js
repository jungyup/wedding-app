import React from 'react';

import Info from './Info';
import Photo from './Photo';
import Rsvp from './Rsvp';

import '../style/App.css'

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = { };
    }

    moveDiv = (name) => {
        
        if (name === "info") {
            document.body.scrollTop = 400;
            document.documentElement.scrollTop = 400;
        } else if (name === "photo") {
            document.body.scrollTop = 800;
            document.documentElement.scrollTop = 800;
        } else if (name === "rsvp") {
            document.body.scrollTop = 1200;
            document.documentElement.scrollTop = 1200;
        }
        
    }

    render() {

        console.log(document.body.scrollHeight);

        return (
            <section className="mb-0">
                <div className="ui container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="text-center">This is main page</h2>
                            <div className="ui three item menu">
                                <button className="item infoBtn" onClick={() => this.moveDiv("info")}>Information</button>
                                <button className="item photoBtn" onClick={() => this.moveDiv("photo")}>Photo</button>
                                <button className="item rsvpBtn" onClick={() => this.moveDiv("rsvp")}>RSVP</button>
                            </div>
                        </div>
                    </div>
                    <Info />
                    <Photo />
                    <Rsvp />
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="text-center">This is Footer section.</h2>
                        </div>
                    </div>
                </div>
                
            </section>
        );
    }

}

export default App;