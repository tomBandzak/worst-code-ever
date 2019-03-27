import React, { Component } from 'react'
import AddressBookItem from './AddressbookItem'

const AddressBook = ({page, toggleFavourite, favourites, search, data, onSearch, prevPage, nextPage}: any) => (
      <div>
        <h1>Address Book</h1>
        <div>
          <input className="input" type="search" onChange={onSearch} placeholder="search"/>
        </div>
        <div>
          {data &&
          <table>
            <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Favourite</th>
            </tr>
            </thead>
            <tbody>{data.results.map((item: any) => (!search || item.name.first.includes(search) || item.name.last.includes(search) ) &&
              <AddressBookItem
                isFavourite={favourites.includes(item.email)}
                onClick={toggleFavourite}
                key={('abi_' + item.email)}
                {...item}
              />)}</tbody>
          </table>}
        </div>
        <button className="left-button" onClick={prevPage}>prev</button>
        <strong>{page}</strong>
        <button className="right-button" onClick={nextPage}>next</button>
      </div>
);


export default AddressBook
