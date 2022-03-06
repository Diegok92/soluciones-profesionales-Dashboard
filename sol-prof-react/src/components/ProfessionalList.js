import React from "react";

function ProfessionalList(props) {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.firstName}</td>
      <td>{props.lastName}</td>
      <td>
        {props.workDays.map((element, i) => {
          return <p key={i}>{element.day + " - " + element.shift}</p>;
        })}
      </td>
      <td>{props.workZones}</td>
      <td>{props.profession}</td>
      <td>{props.url}</td>
    </tr>
  );
}

export default ProfessionalList;
