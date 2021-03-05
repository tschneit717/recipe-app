import React from 'react';
import './assets/styles/App.scss';
import ButtonComponent from './components/button';
import HeaderComponent from './components/header';
import FooterComponent from './components/footer';
import ItemAreaComponent from './components/itemArea';
import AddFormComponent from './components/AddForm';
import ActiveItemComponent from './components/activeItem.js';
import AccountPage from './components/account';
import LoginPage from './components/login';
import RecipePage from './components/recipe';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      items: [],
      activeItem: '',
      loggedIn: false,
    };
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleLoadItems = this.handleLoadItems.bind(this);
    this.itemLoad = this.itemLoad.bind(this);
    this.activeItemRender = this.activeItemRender.bind(this);
    this.duplicateItem = this.duplicateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {}

  async handleLoadItems() {
    await axios
      .get('/items')
      .then((res) => this.setState({ items: res.data, loaded: true }));
  }

  async duplicateItem() {
    await axios
      .post('/items/duplicate', {
        name: this.state.activeItem.itemName,
        photo: this.state.activeItem.img,
      })
      .then((res) => {
        this.setState({ items: res.data });
      });
  }
  async deleteItem() {
    await axios.delete('/items/delete', {
      params: { id: this.state.activeItem._id },
    });
    const findArrayPos = this.state.items.findIndex(
      (x) => x._id === this.state.activeItem._id
    );
    this.state.items.splice(findArrayPos, 1);

    this.setState({
      items: this.state.items,
      activeItem: null,
    });
  }

  handleItemChange(e) {
    this.setState({ activeItem: e });
  }

  activeItemRender() {
    if (this.state.activeItem) {
      return (
        <div>
          <ActiveItemComponent
            activeItem={this.state.activeItem}
          ></ActiveItemComponent>
          <div className="main-content__wrapper-buttons">
            <ButtonComponent
              type="-primary"
              text="Duplicate"
              onClick={this.duplicateItem}
            ></ButtonComponent>
            <ButtonComponent
              type="-primary"
              text="Remove"
              onClick={this.deleteItem}
            ></ButtonComponent>
          </div>
        </div>
      );
    }
  }

  itemLoad() {
    return (
      <div>
        {!this.state.loaded && (
          <div className="main-content__initial-button--wrapper">
            <ButtonComponent
              onClick={this.handleLoadItems}
              text="Load API"
              type="-primary"
            ></ButtonComponent>
          </div>
        )}
        {this.state.loaded && (
          <div className="main-content__wrapper">
            <ItemAreaComponent
              onItemChange={this.handleItemChange}
              data={this.state.items}
              activeItem={this.state.activeItem}
            ></ItemAreaComponent>
            <div className="main-content__wrapper-items">
              {this.state.loaded && this.activeItemRender()}
            </div>
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <HeaderComponent></HeaderComponent>
          <main>
            <Switch>
              <Route path="/" exact>
                {this.itemLoad()}
              </Route>
              <Route path="/add" component={AddFormComponent}></Route>
              <Route
                path="/account"
                component={this.state.loggedIn ? AccountPage : LoginPage}
              ></Route>
              <Route path="/recipe" component={RecipePage}></Route>
            </Switch>
          </main>
          <FooterComponent></FooterComponent>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
