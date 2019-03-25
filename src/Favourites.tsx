import React from 'react'

const Favourites = ({ data }: any) => (
  <div>
    <h1>Favourites</h1>
    <ul>
      {data.map((d: string) => <li>{d}</li>)}
    </ul>
  </div>
)

export default Favourites;
