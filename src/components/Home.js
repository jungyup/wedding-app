import React from 'react';

import '../style/Header.scss';

const Home = () => {
    return (
        <section id="home">
            <div className="row">
                <div className="col-lg-12">
                    <h2 className="text-uppercase text-center" style={{ marginTop: '50px', padding: '20px', color: '#b1afaf' }}>Kevin & Nicole's Wedding</h2>
                    <p className="message"><i className="mainIcon big heart icon"></i></p>
                    <p className="message">Save the date</p>
                    <p className="message">2017 August 15th</p>
                </div>
            </div>
        </section>
    );
}

export default Home;