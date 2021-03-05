import React from 'react';

class ActiveItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idk: [],
    };
  }
  render() {
    return (
      <div className="active-item">
        <img src={`/images/${this.props.activeItem.img}`} alt="" />
        <div className="active-item__content">
          <div className="active-item__content-wrapper">
            <h2>{this.props.activeItem.itemName}</h2>
            <p>About me</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ActiveItemComponent;
