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

  toggleFavourite = (email: string) => {
    let index = this.state.favourites.indexOf(email);
    if(index === -1) {
      this.state.favourites.push(email);
    } else {
      delete this.state.favourites[index];
    }
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
    let { data, location, search, favourites, page } = this.state;



    return (
      <div id="main">
        <SideNav menuClickItem={this.menuClickItem} closeNav={closeNav}/>
        <div className="App">
          <button onClick={() => openNav()}>menu</button>
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
