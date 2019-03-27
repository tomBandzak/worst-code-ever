import React, { Component } from 'react'
import AddressBookItem from './AddressbookItem'

const AddressBook = ({toggleFavourite, favourites, search, data, onSearch}: any) => (
      <div>
        <h1>AddressBook</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input type="search" onChange={onSearch} placeholder="search"/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          {data &&
          <table>
            <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th/>
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
      </div>
);


export default AddressBook
