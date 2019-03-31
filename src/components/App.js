import React from 'react';
import axios from 'axios';

import Header from './Header';
import Home from './Home';
import Info from './Info';
import Location from './Location';
import Photo from './Photo';
import Rsvp from './Rsvp';

import '../style/App.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = { data: [] };
    }

    // onSearchSubmit = (term) => {
    //     axios.get('http://localhost:1005/rsvps?name=' + term)
    //     .then(res => {
    //         this.setState({ data: res.data });
    //         console.log(res.data);
    //     });
    // }
    
    render() {

        console.log(document.body.scrollHeight);
        const name = 'asdasd';

        return (
            <section className="mb-0">
                <Header />
                <Home />
                
                    <Info />
                    <Location />
                    <Photo />
                    <Rsvp />
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="ui header text-center" style={{ color: '#fda287' }}>This is Footer section.</h2>
                        </div>
                    </div>
                
                
            </section>
        );
    }

}

export default App;