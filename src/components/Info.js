import React from 'react';

import '../style/Info.scss';

const Info = () => {

    return (
        <section id="info">
            <div className="spacer"></div>
            <div className="ui container">
            <div className="row">
                <div className="col-lg-12">
                    <h2 className="ui header text-center">Groom & Bride</h2>
                </div>
                <div className="col-md-5 col-sm-5 col-xs-12">
                        <div className="row section-success ourTeam-box text-center">
                            <div className="col-md-12 section1">
                                <img alt="groom" src="https://ojnsng.files.wordpress.com/2017/03/7a2d2b4469bb7b9be6d3627ce502d106.gif" />
                            </div>
                            <div className="col-md-12 section2">
                                <p>Kevin</p><br />
                                <h1>Groom</h1><br />
                            </div>
                            <div className="col-md-12 section3">
                                <p>
                                    His story..
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-2 col-xs-12">
                        <div className="row middle-section">
                            <i className="huge heart icon"></i>
                        </div>
                    </div>
                    <div className="col-md-5 col-sm-5 col-xs-12">
                        <div className="row section-info ourTeam-box text-center">
                            <div className="col-md-12 section1 bride">
                                <img alt="bride" src="https://i.pinimg.com/originals/23/2f/c4/232fc495e836b7d27f864c54ea76111c.gif" />
                            </div>
                            <div className="col-md-12 section2 bride">
                                <p>Nicole</p><br />
                                <h1>Bride</h1><br />
                            </div>
                            <div className="col-md-12 section3">
                                <p>
                                    Her story..
                                </p>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
            <div className="spacer"></div>
        </section>
    );
}

export default Info;


//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPWRSCJEPMoI7YuD2lh_XwdtR_Wzwh0mdNvVSxiRSjDb1NhRbtPA