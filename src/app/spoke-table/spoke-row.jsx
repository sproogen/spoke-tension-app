import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  path, defaultTo, has, compose,
} from 'ramda'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TextField from '@material-ui/core/TextField'
import conversions from '../conversions'

class SpokeRow extends Component {
  static propTypes = {
    spoke: PropTypes.shape({
      toolId: PropTypes.string,
      spokeId: PropTypes.string,
      number: PropTypes.number,
    }).isRequired,
    averageTension: PropTypes.number.isRequired,
    updateReading: PropTypes.func.isRequired,
  }

  state = {
    error: false,
  }

  handleChange = ({ target: { value } }) => {
    const { updateReading } = this.props

    updateReading(value)
    this.setState({ error: !this.validate(value) })
  }

  validate = (value) => {
    const { spoke: { toolId, spokeId } } = this.props

    return compose(
      has(value),
      path([toolId, 'spokes', spokeId, 'readings'])
    )(conversions)
  }

  getTension = () => {
    const { spoke: { toolId, spokeId, reading } } = this.props

    return compose(
      defaultTo('-'),
      path([toolId, 'spokes', spokeId, 'readings', reading])
    )(conversions)
  }

  render() {
    const { spoke, averageTension } = this.props
    const { reading, error } = this.state

    const tension = this.getTension()
    const variance = tension === '-'
      ? 100.00
      : 100 - ((tension / averageTension) * 100)

    return (
      <TableRow>
        <TableCell>{spoke.number}</TableCell>
        <TableCell>
          <TextField
            id={`spoke-reading-${spoke.number}`}
            margin="normal"
            variant="outlined"
            type="number"
            value={reading}
            onChange={this.handleChange}
            error={error}
          />
        </TableCell>
        <TableCell>{tension}</TableCell>
        <TableCell>{parseFloat(variance).toFixed(2)}</TableCell>
      </TableRow>
    )
  }
}

export default SpokeRow
