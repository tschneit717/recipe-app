import React from 'react';

class ButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.props.onClick();
  }

  render() {
    return (
      <button
        onClick={this.handleClick}
        className={'button ' + this.props.type}
        {...this.props.functions}
      >
        {this.props.text}
      </button>
    );
  }
}

export default ButtonComponent;
