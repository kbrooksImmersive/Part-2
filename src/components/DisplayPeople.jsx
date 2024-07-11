const Person = ({person,handledelete}) => {
  return(
    <tr key={person.name}>
      <td>{person.name} {person.number}</td>
      <td>
        <button onClick={()=>handledelete(person)}>delete</button>
      </td>
    </tr>
  )
}

const DisplayPeople = ({peopleToShow,handledelete}) => {
  return(
    <table>
      <tbody>
        {peopleToShow.map(person => <Person person={person} handledelete={handledelete} key={person.id}/>)}
      </tbody>
    </table>
  )
}

export default DisplayPeople