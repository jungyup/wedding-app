import React from 'react';

import PhotoCard from './PhotoCard';

import '../style/Photo.scss'

const Photo = () => {

    const importAll = (r) => {
        return r.keys().map(r);
    }

    const photos = importAll(require.context('../images/', false, /\.(png|jpe?g|svg)$/));

    const photoLists = photos.map((photo) => {
        console.log(photo);
        return <PhotoCard key={photo.id} photo={photo} />
    })

    console.log(photos);

    return (
        <section id="photo">
            <div className="spacer"></div>
            <div className="ui container">
                <div className="row">
                    <div className="col-lg-12 photo-div">
                        <h2 className="ui header text-center" style={{ color: '#fda287' }}>This is Photo Page.</h2>
                        <div className="photo-list">{photoLists}</div>
                    </div>
                </div>
            </div>
            <div className="spacer"></div>
        </section>
    );
    
}

export default Photo;