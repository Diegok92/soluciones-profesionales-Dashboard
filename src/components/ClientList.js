import React from "react";

function ClientList(props) {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.firstName}</td>
      <td>{props.lastName}</td>
      <td>{props.email}</td>
      <td>{props.url}</td>
    </tr>
  );
}

export default ClientList;
