import React, { Component } from 'react'
import './App.css'
import AddressBook from './AddressBook'
import SideNav from './SideNav'
import Favourites from './Favourites'

interface IProps {
}

interface IState {
  data?: any,
  location: string,
  search?: string,
  favourites: string[];
  page: number;
  navigation: boolean;
}

class App extends Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      location: 'home',
      favourites: [],
      page: 1,
      navigation: false
    }
  }

  fetch = (page: number) => {
    // @ts-ignore
    $.ajax({
      url: `https://randomuser.me/api/?page=${page}&&results=10&seed=worst-code-ever`,
      dataType: 'json',
      success: (data: any) => {
        this.setState({ page: page, data: data });
      },
    })
  };

  componentDidMount = (): void => {
    this.fetch(this.state.page)
  };

  menuClickItem = (location: string) => {
    this.setState({ location })
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
    this.fetch(currentPage + 1);
  };

  prevPage = () => {
    const currentPage = this.state.page;
    this.fetch(currentPage > 1 ? currentPage - 1 : 1);
  };

  render = () => {
    let { data, location, search, favourites, page, navigation } = this.state;
    return (
      <div id="main">
        <SideNav menuClickItem={this.menuClickItem} closeNav={this.toggleNavigation} open={navigation}/>
        <div className="App">
          <button onClick={this.toggleNavigation}>menu</button>
          <br/><br/>
          {data && location === 'home' &&
          <div>
            <AddressBook
              toggleFavourite={this.toggleFavourite}
              favourites={favourites}
              search={search}
              data={data}
              onSearch={this.onSearch}
            />
            <button onClick={this.prevPage}>prev</button>{page}
            <button onClick={this.nextPage}>next</button>
          </div>
          }
          {location === 'favourites' &&
          <Favourites data={favourites}/>
          }
        </div>
      </div>
    )
  };
}

export default App
