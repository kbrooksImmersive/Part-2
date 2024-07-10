const PersonForm = (props) => {
  return(
    <form onSubmit={props.handlePersonSubmit}>
        <div>
          name: <input value={props.nameVal} onChange={props.handleNameChange}/>
        </div>
        <div>
          number: <input value={props.phoneVal} onChange={props.handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm