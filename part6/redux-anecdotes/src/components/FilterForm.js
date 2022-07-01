import { connect } from 'react-redux'
import { createFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  // const dispatch = useDispatch()

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const content = event.target.value
    props.createFilter(content)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  createFilter
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter