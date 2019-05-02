/* global google */
import React from 'react';
import AddToCalendar from 'react-add-to-calendar';

import '../style/Location.scss';

// const google = window.google;

class Location extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            event: {
              title: 'Kevin & Nicole Wedding',
              description: 'Wedding Day',
              location: 'Columbus Centre, 901 Lawrence Ave W, North York, ON M6A 1C3',
              startTime: '2019-08-15T14:15:00-04:00',
              endTime: '2019-08-15T22:45:00-04:00'
            }
        };
    }

    static displayName = 'Example';

    getGoogleMaps() {
        // If we haven't already defined the promise, define it
        if (!this.googleMapsPromise) {
          this.googleMapsPromise = new Promise((resolve) => {
            // Add a global handler for when the API finishes loading
            window.resolveGoogleMapsPromise = () => {
              // Resolve the promise
              resolve(google);
    
              // Tidy up
              delete window.resolveGoogleMapsPromise;
            };
    
            // Load the Google Maps API
            const script = document.createElement("script");
            const API = 'Secret';
            script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
            script.async = true;
            document.body.appendChild(script);
          });
        }
        return this.googleMapsPromise;
    }

    componentWillMount() {
        // Start Google Maps API loading since we know we'll soon need it
        this.getGoogleMaps();
      }
    
    componentDidMount() {
      // Once the Google Maps API has finished loading, initialize the map
      this.getGoogleMaps().then((google) => {
        const columbus = {lat: 43.7132868, lng: -79.4586517};
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: columbus
        });
        const marker = new google.maps.Marker({
          position: columbus,
          map: map
        });
      });
    }

    render () {

        let items = [
          { google: 'Google' },
          { apple: 'Apple Calendar' },
          { outlookcom: 'Outlook.com' }
        ]

        //let buttonLabel = (<i className="calendar alternate outline icon"></i>) + "3pm | August 15, 2017";

        return (
            <section id="location">
                <div className="spacer"></div>
                <div className="ui container">
                    <div className="row" style={{ paddingBottom: '5px' }}>
                        <div className="col-lg-12">
                            <h2 className="ui header text-center">Location & Map</h2>
                            <div className="ico" style={{ textAlign: 'center' }}>
                                <span className="line"> </span>
                                <i className="heart icon" style={{ color: '#80bdff' }}></i>
                                <span className="line"> </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <h2 className="lm-title">Location</h2>
                            <img alt="place" id="columbus" src="https://columbuseventcentre.com/wp-content/uploads/2018/10/3-big.jpg" />
                            
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <h2 className="lm-title">Map</h2>
                            <div id="map" style={{ width: '80%', height: '80%', margin: 'auto', borderRadius: '10px' }}></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <h3 className="lm-title">Ceremony</h3>
                            <p className="lm-content"><i className="map marker alternate icon"></i> Columbus Centre</p>
                            <p className="lm-content"><i className="calendar alternate outline icon"></i> 3pm | August 15, 2017</p>
                            <AddToCalendar event={this.state.event} listItems={items} />
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <h3 className="lm-title">Address</h3>
                            <p className="lm-content"><i className="map icon"></i> Columbus Centre, 901 Lawrence Ave W, North York, ON M6A 1C3</p>
                        </div>
                    </div>
                </div>
                <div className="spacer"></div>
            </section>
        );
    }
}

export default Location;