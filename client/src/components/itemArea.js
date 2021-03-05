import React from 'react';
import ItemCard from './itemCard';

class ItemAreaComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleFocusChange = this.handleFocusChange.bind(this);
    this.state = {
      activeItem: [],
    };
  }

  handleFocusChange(e) {
    this.setState(
      {
        activeItem: this.props.data.find((item) => item._id === e),
      },
      () => {
        this.props.onItemChange(this.state.activeItem);
      }
    );
  }

  render() {
    return (
      <div className="item-area">
        {this.props.data.map((item) => (
          <ItemCard
            img={`/images/${item.img}`}
            key={item._id}
            itemName={item.itemName}
            id={item._id}
            onFocusChange={this.handleFocusChange}
            activeItem={this.props.activeItem}
          ></ItemCard>
        ))}
      </div>
    );
  }
}

export default ItemAreaComponent;
