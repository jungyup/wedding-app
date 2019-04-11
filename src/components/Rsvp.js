import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Search, Button, Form } from 'semantic-ui-react';

import '../style/Rsvp.scss';

class Rsvp extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            results: [],
            value: '',
            confirmation: '',
            guestNum: 0
        };

        this.formRef = React.createRef();
        this.guestFormRef = React.createRef();
    }

    componentWillMount() {
        this.resetComponent();
    }

    resetComponent = () => {
        this.setState({ isLoading: false, results: [], value: '' });
    }

    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title });
        console.log(this.state.value);
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
        if (this.state.value.length < 1) {
            this.resetComponent();
            this.formRef.current.style.display = 'none';
        }
        
        this.setState({
            isLoading: false,
            results: this.onSearchSubmit(value)
        })
        }, 300)
    }

    // onFormSubmit = (event) => {
    //     event.preventDefault();

    //     console.log(this.state);
    //     this.props.onSubmit(this.state.term);
    // }

    inputOnChange = (event) => {
        console.log(event.target.value);
        const value = event.target.value;
        this.onSearchSubmit(value);
        this.setState({ value });
    }

    onSearchSubmit = (value) => {
        axios.get('http://localhost:1005/rsvps?title=' + value)
        .then(res => {
            this.setState({ results: res.data });
        });
        return this.state.results;
    }

    onConfirmationSubmit = () => {

        console.log(this.state.value);
        console.log(this.state.confirmation);

        axios.post('http://localhost:1005/rsvp', { 
            title: this.state.value, 
            confirmation: this.state.confirmation
        }, {
            headers: { 
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res);
        }).catch(error => {
            console.error(error);
        })
    }

    onSelectChange = (event, data) => {
        console.log(data);
        this.setState({ confirmation: data.value });
    }

    submitButton = () => {
        console.log(this.state.value);
        console.log(this.formRef);
        if (this.state.value) {
            this.formRef.current.style.display = 'inline';
        }
    }

    populateInputField = () => {
        let inputField = [];
        let fieldNum = document.getElementById("guestNum").value;
        console.log(fieldNum);
        for (let i = 0; i < fieldNum + 1; i++) {
            inputField.push(<input type="text" key={i} />);
        }
        console.log(inputField);
        return inputField;
    }

    render() {
        const { isLoading, value, results } = this.state;
        const options = [
            { key: 'y', text: 'Attending', value: 'yes' },
            { key: 'n', text: 'Not Attending', value: 'no' }
        ]

        let inputField = [];
        
        // Populate input field for guest name
        for (let i = 0; i < this.state.guestNum; i++) {
            inputField.push(<input type="text" id="guest_name" placeholder="Guest Name" key={i} />);
        }

        return (
            <section id="rsvp">
                <div className="spacer"></div>
                <div className="ui container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="ui header text-center" style={{ color: '#fda287' }}>RSVP</h2>
                            <h3 className="ui header text-center">Please Enter Your Name</h3>
                            <div className="searchName">
                                <Search 
                                    className="searchBox"
                                    loading={isLoading}
                                    onResultSelect={this.handleResultSelect}
                                    onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                                    results={results}
                                    value={value}
                                    fluid="true"
                                    placeholder="Search by name"
                                    {...this.props}
                                />
                                <Button className="nameBtn" onClick={this.submitButton}>Find</Button>
                            </div>
                            
                            <div className="ui form" ref={this.formRef} style={{ display: 'none' }}>
                                <h4 className="ui dividing header text-center">RSVP Information</h4>
                                    <div className="fields">
                                        <div className="field confirmForm">
                                            <label>Name</label>
                                            <input type="text" value={this.state.value} disabled />
                                        </div>
                                        <div className="field confirmForm">
                                            <Form.Select fluid label="Attend" onChange={this.onSelectChange} options={options} placeholder="Are You Attending?" />
                                        </div>
                                        <div className="field confirmField">
                                            <label>Confirmation</label>
                                            <Button className="confirmBtn" onClick={this.onConfirmationSubmit}>Confirm</Button>
                                        </div>
                                    </div>
                            </div>

                            <div className="ui form" ref={this.guestFormRef}>
                                <h4 className="ui dividing header text-center">Please Enter Guest Information If You Have (Optional)</h4>
                                <div className="fields">
                                    <div className="field guestForm">
                                        <label>Guest Number</label>
                                        <input id="guestNum" type="number" onChange={(e) => {
                                            this.setState({ guestNum: e.target.value });
                                            console.log(this.state.guestNum);
                                        }} defaultValue="0" min="0" max="4" />
                                    </div>
                                    <div className="field guestForm">
                                        <label>Guest Name</label>
                                        {inputField}
                                    </div>
                                    <div className="field guestField">
                                        <label>Confirmation</label>
                                        <Button className="guestBtn" onClick={this.onGuestSubmit}>Confirm</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="spacer"></div>
            </section>
        )
    }
}

export default Rsvp;


/* <div className="ui selection dropdown">
    <input type="hidden" name="attend" />
    <i className="dropdown icon"></i>
    <div className="default text">Are You Attending?</div>
    <div className="menu">
    <div className="item" data-value="1">Attending</div>
    <div className="item" data-value="0">Not Attending</div>
    </div>
</div> */

/* <select className="ui fluid dropdown">
    <option value="">Are You Attending?</option>
    <option value="Yes">Attending</option>
    <option value="No">Not Attending</option>
</select> */

/* <form onSubmit={(e) => {
    e.preventDefault();
    this.onSearchSubmit(this.state.term);
}} className="ui form">
    <div className="ui search">
        <h2 className="ui header text-center" style={{ color: '#fda287' }}>RSVP</h2>
        <label>Search by Name: </label>
        <input 
            type="text"
            onChange={this.inputOnChange}
            placeholder="Search by Name"
        />
        <div className="result"></div>
    </div>
</form> */