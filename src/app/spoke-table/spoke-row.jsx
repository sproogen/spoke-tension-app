import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  isNil, defaultTo,
} from 'ramda'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TextField from '@material-ui/core/TextField'
import { getTension } from '../conversions'

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

  handleChange = ({ target: { value } }) => {
    const { updateReading } = this.props

    updateReading(value)
  }

  render() {
    const { spoke, averageTension } = this.props
    const { toolId, spokeId, reading } = spoke

    const tension = getTension(toolId, spokeId, reading)
    const variance = isNil(tension)
      ? '-'
      : parseFloat(((tension / averageTension) * 100) - 100).toFixed(0)

    return (
      <TableRow>
        <TableCell>{spoke.number + 1}</TableCell>
        <TableCell>
          <TextField
            id={`spoke-reading-${spoke.number}`}
            margin="normal"
            variant="outlined"
            type="number"
            value={reading}
            onChange={this.handleChange}
            error={isNil(tension) && reading !== ''}
          />
        </TableCell>
        <TableCell>{defaultTo('-', tension)}</TableCell>
        <TableCell>{variance}</TableCell>
      </TableRow>
    )
  }
}

export default SpokeRow
