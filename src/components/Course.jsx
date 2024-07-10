const Header = ({course}) => {
  console.log('Header:',course)
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Content = ({parts}) => {
  console.log('Content:',parts)
  return (
    <div>
      {parts.map(part => 
        <Part part={part} key={part.id}/>
      )}
    </div>
  )
}

const Part = ({part}) => {
  console.log('Part:',part)
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Total = ({parts}) => {
  console.log('Total:',parts)
  const totalNum = parts.reduce( (total, currentValue) => total+currentValue.exercises, 0 )
  console.log('Total Exercises:', totalNum)
  return (
    <div>
      <b>total of {totalNum} exercises</b>
    </div>
  )
}

const Course = ({course}) => {
  console.log('Course:',course)
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course