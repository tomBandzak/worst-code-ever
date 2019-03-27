import React from 'react'

const AddressBookItem = (item: any) => (
  <tr>
    <td>{item.name.first}</td>
    <td>{item.name.last}</td>
    <td><span className={item.isFavourite ? "fa fa-star checked" : "fa fa-star"} onClick={() => item.onClick(item.email)} /></td>
  </tr>
);

export default AddressBookItem
