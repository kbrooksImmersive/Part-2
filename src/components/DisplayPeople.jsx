const Person = ({person}) => {
  return(
    <tr key={person.name}>
      <td>{person.name} {person.number}</td>
    </tr>
  )
}

const DisplayPeople = ({peopleToShow}) => {
  return(
    <table>
      <tbody>
        {peopleToShow.map(person => <Person person={person} key={person.id}/>)}
      </tbody>
    </table>
  )
}

export default DisplayPeople