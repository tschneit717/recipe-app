import React from 'react';

class ItemCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleFocus = this.handleFocus.bind(this);
    this.state = {
      activeItem: this.props.id,
    };
  }
  handleFocus() {
    this.props.onFocusChange(this.state.activeItem);
  }
  render() {
    return (
      <button
        cardid={this.props.id}
        className={`item-card ${
          this.props.activeItem &&
          this.props.activeItem._id === this.state.activeItem
            ? 'active'
            : ''
        } `}
        onFocus={this.handleFocus}
      >
        <div className="item-card__content">
          <span className="triangle -top-left"></span>
          <span className="triangle -top-right"></span>
          <span className="triangle -bottom-left"></span>
          <span className="triangle -bottom-right"></span>
          <img src={this.props.img} alt={this.props.itemName}></img>
        </div>
      </button>
    );
  }
}

export default ItemCard;
