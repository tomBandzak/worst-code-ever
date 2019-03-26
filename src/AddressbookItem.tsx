import React from 'react'


const AddressBookItem = (item: any) => (
  <tr style={{ background: item.isFavourite ? '#ffe6e3' : 'none' }}>
    <td>{item.name.first}</td>
    <td>{item.name.last}</td>
    <td><button onClick={() => item.onClick(item.email)}>Like</button></td>
  </tr>
);

export default AddressBookItem
