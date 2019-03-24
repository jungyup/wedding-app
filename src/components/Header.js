import React from 'react';

import '../style/Header.scss';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = { isTop: true };

        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        document.addEventListener('scroll', () => {
            const isTop = window.scrollY < 200;
            if (isTop !== this.state.isTop) {
                this.onScroll(isTop);
            }
        });
    }

    onScroll(isTop) {
        this.setState({ isTop });
    }

    // moveDiv = (name) => {
        
    //     if (name === "info") {
    //         document.body.scrollTop = 400;
    //         document.documentElement.scrollTop = 400;
    //     } else if (name === "photo") {
    //         document.body.scrollTop = 800;
    //         document.documentElement.scrollTop = 800;
    //     } else if (name === "rsvp") {
    //         document.body.scrollTop = 1200;
    //         document.documentElement.scrollTop = 1200;
    //     }
    // }

    render() {
        return (
            <nav className="navbar navbar-expand-lg fixed-top" style={this.state.isTop ? {backgroundColor: 'transparent'} : {backgroundColor: 'pink', borderBottom: '2px solid white'}}>
                <div className="container-fluid">
                <div className="collapse navbar-collapse order-0">
                <a className="navbar-brand" href="#">Kevin & Nicole's Wedding  <i className="heart icon"></i></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                </div>
                <div className="collapse navbar-collapse order-1">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#info">G & B</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#location">Location</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#photo">Photo</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#rsvp">RSVP</a>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
        );
    }
}

export default Header;