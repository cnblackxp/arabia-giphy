import React from 'react';
import logo from '../assets/logo.png';

export class ImageFullView extends React.Component {
  render() {
    let image = this.props.currentFullView;
    if (image === undefined)
      return (
        <div className="full-img-view hidden">
          <div className="img-container">
              <div className="exit-btn">X</div>
              <img src={logo} className="full-img" alt="gif full view" />
              <p>Loading ...</p>
          </div>
        </div>
      );
    else
    return (
      <div className="full-img-view">
        <div className="img-container">
            <div className="exit-btn" onClick={()=>this.props.closeFullView()}>X</div>
            <img src={image} className="full-img" alt="gif full view" />
            {/* <p>Loading ...</p> */}
        </div>
      </div>
    );
  }
}