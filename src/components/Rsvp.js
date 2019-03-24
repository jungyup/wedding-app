import React from 'react';
import axios from 'axios';

import '../style/Rsvp.scss';

class Rsvp extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            term: ''
        };
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        console.log(this.state);
        this.props.onSubmit(this.state.term);
    }

    inputOnChange = (event) => {
        console.log(event.target.value);
        this.setState({ term: event.target.value });

        console.log(this.state);
        this.props.onSubmit(event.target.value);
    }

    // getRsvpList = () => {
    //     axios.get()
    // }

    render() {
        return (
            <section id="rsvp">
                <div className="spacer"></div>
                <div className="ui container">
                    <div className="row">
                        <div className="col-lg-12">
                            <form onSubmit={this.onFormSubmit} className="ui form">
                                <h2 className="ui header text-center" style={{ color: '#fda287' }}>RSVP</h2>
                                <label>Search by Name: </label>
                                <input 
                                    type="text"
                                    onChange={this.inputOnChange}
                                />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="spacer"></div>
            </section>
        )
    }
}

export default Rsvp;