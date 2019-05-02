import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Search, Button, Header, Modal, Form } from 'semantic-ui-react';

import '../style/Rsvp.scss';

let menuData = [];

class Rsvp extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            results: [],
            value: '',
            confirmation: '',
            rsvpId: 0,
            guestNum: 0,
            guestName: [],
            open: false
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
                this.guestFormRef.current.style.display = 'none';
            }
            
            this.setState({
                isLoading: false,
                results: this.onSearchSubmit(value)
            })
        }, 300)
    }

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
            this.setState({ rsvpId: res.data.id });
        }).catch(error => {
            console.error(error);
        })

        if (this.state.confirmation === 'yes') {
            this.guestFormRef.current.style.display = 'inline';
        }

        //alert("Your RVSP confirmation saved. Thank You!");
    }

    onGuestSubmit = () => {
        let guestData = [];
        //let guestName = [];
        for (let i = 0; i < this.state.guestNum; i++) {
            guestData.push({
                id: this.state.rsvpId,
                guestName: document.getElementById("guest_name" + i).value,
                menu: menuData[i]                
            });
        }
        console.log(this.state.rsvpId);
        if (guestData[0].id !== 0) {
            axios.post('http://localhost:1005/guest', {
            guestData
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res);
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].success === false) {
                        alert("The Guest named " + res.data[i].guestName + " is already in database!");
                        //this.setState({ open: true });
                        // return <Modal 
                        //         open={this.state.open}
                        //         header="Warning!"
                        //         content="Guest is already in database"
                        //         actions={{ key: 'done', content: 'Done', positive: true }}
                        //         />
                    }
                    else {
                        alert("Your Guest informations are saved. Thank you!");
                        // this.setState({ open: true });
                        // return <Modal 
                        //         open={this.state.open}
                        //         header="Confirmed!!"
                        //         content="Guest is saved"
                        //         actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
                        //         />
                    }
                }
            }).catch(error => {
                console.error(error);
            })
        } else {
            console.error("guest rsvp id is missing");
        }
        
        // this.setState({ value: '' });
        // console.log(document.getElementsByClassName('guest_name_field').value);
        // this.formRef.current.style.display = 'none';
        // this.guestFormRef.current.style.display = 'none';
    }

    temp = () => {
        this.setState({ open: false });
        // if (this.state.open === true) {
        //     return <Modal 
        //             open={this.state.open}
        //             header="Warning!"
        //             content="Guest is already in database"
        //             actions={{ key: 'done', content: 'Done', positive: true }}
        //             />
        // } else {
        //     return <Modal 
        //             open={this.state.open}
        //             header="Confirmed!!"
        //             content="Guest is saved"
        //             actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
        //             />
        // }
    }

    onAttendChange = (event, data) => {
        console.log(data);
        this.setState({ confirmation: data.value });
    }

    onMenuChange = (event, data) => {
        console.log(data);
        this.setState({ menu: data.value });
        console.log(document.getElementById("menuId"));
        console.log(document.getElementById("guestNum"));
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
        const attendOptions = [
            { key: 'y', text: 'Attending', value: 'yes' },
            { key: 'n', text: 'Not Attending', value: 'no' }
        ]
        const menuOptions = [
            { key: 'c', text: 'Chicken', value: 'chicken' },
            { key: 's', text: 'Steak', value: 'steak'}
        ]

        let inputField = [];
        let menuField = [];
        
        // Populate input field for guest name
        for (let i = 0; i < this.state.guestNum; i++) {
            let inputId = "guest_name" + i;
            inputField.push(<input type="text" className="guest_name_field" id={inputId} placeholder="Guest Name" key={i} style={{ marginBottom: '5px'}} />);
        }

        for (let i = 0; i < this.state.guestNum; i++) {
            menuField.push(<Form.Select fluid onChange={(e, data) => {
                menuData[i] = data.value;
                console.log(menuData);
            }} options={menuOptions} placeholder="Please Select Menu" key={i} style={{ marginBottom: '5px'}} />
            )
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
                                            <input type="text" value={value} disabled />
                                        </div>
                                        <div className="field confirmForm">
                                            <Form.Select fluid label="Attend" onChange={this.onAttendChange} options={attendOptions} placeholder="Are You Attending?" />
                                        </div>
                                        <div className="field confirmField">
                                            <label>Confirmation</label>
                                            <Modal 
                                                trigger={<Button className="confirmBtn" onClick={this.onConfirmationSubmit}>Confirm</Button>}
                                                header="Confirmed!"
                                                content="Your confirmation is saved. Thank you!"
                                                actions={[{ key: 'done', content: 'Done', positive: true }]}
                                            />
                                        </div>
                                    </div>
                            </div>

                            <div className="ui form" ref={this.guestFormRef} style={{ display: 'none' }}>
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
                                        {this.state.guestNum === 0 ? (<input type="text" disabled />) : inputField}
                                    </div>
                                    <div className="field guestForm">
                                        <label>Menu</label>
                                        {this.state.guestNum === 0 ? (<input type="text" disabled />) : menuField}
                                    </div>
                                    <div className="field guestField">
                                        <label>Confirmation</label>
                                        <Button className="guestBtn" onClick={this.onGuestSubmit}>Confirm</Button>
                                        
                                        {/* <Modal 
                                            open={this.state.open}
                                            onClose={this.temp}
                                            header="Confirmed!!"
                                            content="Guest is saved"
                                            actions={{ key: 'done', content: 'Done', positive: true }}
                                        /> */}
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