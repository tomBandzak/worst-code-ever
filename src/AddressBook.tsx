import React, { Component } from 'react'
import AddressBookItem from './AddressbookItem'


class AddressBook extends Component<any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    if (!this.props.data) {
      return null
    }

    var items: any = new Array();
    for (var i = 0; i < this.props.data.results.length; i++) {
      if (
        this.props.search &&
        !this.props.data.results[i].name.first.includes(this.props.search) &&
        !this.props.data.results[i].name.last.includes(this.props.search)
      ) {
        continue
      }

      items[i] = (
          <AddressBookItem
              isFavourite={this.props.favourites.includes(this.props.data.results[i].email)}
              onClick={this.props.addFavourite}
              {...this.props.data.results[i]}
          />
      )
    }

    return (
      <div>
        <h1>AddressBook</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input type="search" onChange={this.props.onSearch} placeholder="search"/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <table>
            <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th/>
            </tr>
            </thead>
            <tbody>{items}</tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default AddressBook
