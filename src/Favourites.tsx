import React from 'react'

const Favourites = ({ data, onClick }: any) => (
  <div>
      <h1>Favourites</h1>
      <div>
        <table>
            <thead>
            <tr>
                <th>E-mail address</th>
                <th>Favourite</th>
            </tr>
            </thead>
          {data &&
          <tbody>
          {data.map((email: any) =>
            <tr key={'f_' + email}>
                <td>{email}</td>
                <td><span className="fa fa-star checked" onClick={() => onClick(email)} /></td>
            </tr>)}
          </tbody>
          }
        </table>
      </div>
  </div>
);

export default Favourites;
