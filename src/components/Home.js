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
                    {/* <div className="title">
                        <h2 className="ui header text-center" style={{ color: '#fda287' }}>
                            Kevin & Nicole's Wedding  <i className="heart icon"></i>
                        </h2>
                        <img className="ui image" width="600" height="250" src="https://post-phinf.pstatic.net/MjAxODAxMThfMTcw/MDAxNTE2MjUyMTM2Nzc5.1KITNbuFaNLcd_cLT6jxrurbO4QkBSbn8RZw_TQlzogg.Q6XjhDEyyufhA1n-GVc-VeX0gsHJA4U89cHBCJTgL9Yg.PNG/%EA%B2%B0%ED%98%BC%EA%B0%90%EC%82%AC%EC%9D%B8%EC%82%AC%EB%A7%90_%286%29.png?type=w1200" />
                    </div>
                    
                    <div className="ui three item menu">
                        <button className="item infoBtn" onClick={() => this.moveDiv("info")}>Information</button>
                        <button className="item photoBtn" onClick={() => this.moveDiv("photo")}>Photo</button>
                        <button className="item rsvpBtn" onClick={() => this.moveDiv("rsvp")}>RSVP</button>
                    </div> */}
                </div>
            </div>
        </section>
    );
}

export default Home;