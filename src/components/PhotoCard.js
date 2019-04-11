import React from 'react';
import ExifOrientationImg from 'react-exif-orientation-img';

class PhotoCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = { spans: 0 };

        this.photoRef = React.createRef();
    }

    componentDidMount() {
        this.photoRef.current.addEventListener('load', this.setSpans);
    }

    setSpans = () => {
        const height = this.photoRef.current.clientHeight;

        const spans = Math.ceil(height / 10);
        console.log(height);

        this.setState({ spans });
    }

    render() {
        
        return (
            <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
                <img
                    ref={this.photoRef}
                    alt=""
                    src={this.props.photo}
                />
            </div>
        );
    }
}

export default PhotoCard;