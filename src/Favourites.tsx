import React from 'react'

const Favourites = ({ data }: any) => (
  <div>
    <h1>Favourites</h1>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
    <ul>
      {data.map((d: string) => <li key={'f_' + d}>{d}</li>)}
    </ul>
    </div>
  </div>
);

export default Favourites;
