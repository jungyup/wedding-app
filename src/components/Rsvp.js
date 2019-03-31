import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Search, Grid, Header, Segment } from 'semantic-ui-react';

import '../style/Rsvp.scss';

let source = _.times(5, () => ({
    title: "",
    description: ""
}));

class Rsvp extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            term: '',
            name: [],
            isLoading: false,
            results: [],
            value: ''
        };

    }

    componentWillMount() {
        this.resetComponent();
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
        if (this.state.value.length < 1) return this.resetComponent()

        const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
        const isMatch = result => re.test(result.title);
        this.setState({
            isLoading: false,
            results: this.onSearchSubmit(value)
        })
        }, 300)
    }

    // componentDidMount() {
    //     $('.ui.search').search({
    //         apiSettings: {
                
    //         }
    //     })
    // } 

    // onFormSubmit = (event) => {
    //     event.preventDefault();

    //     console.log(this.state);
    //     this.props.onSubmit(this.state.term);
    // }

    inputOnChange = (event) => {
        console.log(event.target.value);
        const term = event.target.value;
        this.onSearchSubmit(term);
        this.setState({ term });
    }

    onSearchSubmit = (term) => {
        axios.get('http://localhost:1005/rsvps?title=' + term)
        .then(res => {
            this.setState({ results: res.data });
        });
        // let temp = { title: '' };
        // this.state.results.map((t) => {
        //     temp["title"] = t;
        // })
        // console.log(temp);
        // this.setState({ results: temp });
        return this.state.results;
    }


    // getRsvpList = () => {
    //     axios.get()
    // }

    render() {
        console.log(this.state.results);
        const { isLoading, value, results } = this.state;

        return (
            <section id="rsvp">
                <div className="spacer"></div>
                <div className="ui container">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* <form autoComplete="off" onSubmit={(e) => {
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
                            </form> */}
                            <h2 className="ui header text-center" style={{ color: '#fda287' }}>RSVP</h2>
                            <h3 className="ui header text-center">Please Enter Your Name</h3>
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
                            
                        </div>
                    </div>
                </div>
                <div className="spacer"></div>
            </section>
        )
    }
}

export default Rsvp;
