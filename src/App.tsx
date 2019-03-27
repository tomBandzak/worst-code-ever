import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import AddressBook from './AddressBook'
import SideNav from './SideNav'
import Favourites from './Favourites'

interface IProps {
}

interface IState {
  data?: any,
  search?: string,
  favourites: string[];
  page: number;
  navigation: boolean;
}

class App extends Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      favourites: [],
      page: 1,
      navigation: false
    }
  }
  dataCache: any = [];

  fetchData = (page: number) => {
    if(this.dataCache[page]) {
      this.setState({ page: page, data: this.dataCache[page] });
    } else {
      fetch(`https://randomuser.me/api/?page=${page}&&results=10&seed=worst-code-ever`).then((response) => {
        return response.json();
      }).then((data) => {
        this.dataCache[page] = data;
        this.setState({page: page, data: data});
      });
    }
  };

  componentDidMount = (): void => {
    this.fetchData(this.state.page)
  };

  onSearch = (e: any) => {
    this.setState({ search: e.target.value })
  };

  toggleFavourite = (email: string) => {
    if(this.state.favourites.includes(email)) {
      this.setState({ favourites: this.state.favourites.filter((f) => { return f !== email; }) });
    } else {
      this.setState({ favourites: [...this.state.favourites, email] });
    }
  };

  toggleNavigation = () => {
    this.setState({ navigation: !this.state.navigation });
  };

  nextPage = () => {
    const currentPage = this.state.page;
    this.fetchData(currentPage + 1);
  };

  prevPage = () => {
    const currentPage = this.state.page;
    this.fetchData(currentPage > 1 ? currentPage - 1 : 1);
  };

  render = () => {
    let { data, search, favourites, page, navigation } = this.state;
    return (
      <div className={navigation ? 'with-navigation' : ''} id="main">
        <button onClick={this.toggleNavigation}>menu</button>
        <br/><br/>
        <SideNav favourites={favourites} closeNav={this.toggleNavigation} open={navigation}/>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={props => <AddressBook
                {...props}
                page={page}
                toggleFavourite={this.toggleFavourite}
                favourites={favourites}
                search={search}
                data={data}
                onSearch={this.onSearch}
                prevPage={this.prevPage}
                nextPage={this.nextPage}
              />}
            />
            <Route exact path="/favourites" render={props => <Favourites  {...props} data={favourites} onClick={this.toggleFavourite} />} />
          </Switch>
        </div>
      </div>
    )
  };
}

export default App
