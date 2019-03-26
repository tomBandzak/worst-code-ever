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
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  // @ts-ignore
  document.getElementById('mySidenav').style.width = '250px'
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  // @ts-ignore
  document.getElementById('mySidenav').style.width = '0'
}

class App extends Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      location: 'home',
      page: 1,
      favourites: [],
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

  addFavourite = (email: string) => {
    const length = this.state.favourites.length;
    this.state.favourites[length] = email;
    this.setState({ favourites: this.state.favourites })
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
    let data = this.state.data;
    let { search, favourites } = this.state;

    return (
      <div id="main">
        <SideNav menuClickItem={this.menuClickItem} closeNav={closeNav}/>
        <div className="App">
          <button onClick={() => openNav()}>menu</button>
          <br/><br/>
          {this.state.location === 'home' &&
          <div>
            <AddressBook
                addFavourite={this.addFavourite}
                favourites={favourites}
                search={search}
                data={data}
                onSearch={this.onSearch}
            />
            <button onClick={this.prevPage}>prev</button>{this.state.page}
            <button onClick={this.nextPage}>next</button>
          </div>
          }
          {this.state.location === 'favourites' &&
          <Favourites data={favourites}/>
          }
        </div>
      </div>
    )
  };
}

export default App
