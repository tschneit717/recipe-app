import React from 'react';
const axios = require('axios');

class AddFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.state = {
      itemName: '',
      img: '',
    };
  }
  async fileUpload(event) {
    this.setState({ img: event.target.files[0] });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();

    formData.append('name', this.state.itemName);
    formData.append('image', this.state.img);
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    await axios.post('./items/add', formData, config);
  }

  handleChange(event) {
    let value;
    value = event.target.value;
    this.setState({
      [event.target.name]: [value],
    });
  }
  render() {
    return (
      <div className="main-content__wrapper -form">
        <h2 className="-light">Upload a new item to your inventory</h2>
        <form
          method="POST"
          action="/items/add"
          onSubmit={this.handleSubmit}
          className="form"
        >
          <div className="form-wrapper">
            <label htmlFor="itemName">Item Name</label>
            <input
              value={this.state.itemName}
              onChange={this.handleChange}
              type="text"
              name="itemName"
              required
            ></input>
            <label htmlFor="file-upload">Item Image</label>
            <input
              onChange={this.fileUpload}
              type="file"
              name="img"
              required
            ></input>
            <input type="submit" className="button -primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default AddFormComponent;
