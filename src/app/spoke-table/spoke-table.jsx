import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  adjust, reduce, add, defaultTo, dropLast, addIndex, map,
} from 'ramda'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import SpokeRow from './spoke-row'
import { getTension } from '../conversions'

const mapIndexed = addIndex(map)

class SpokeTable extends Component {
  propTypes = {
    spokeCount: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
    toolId: PropTypes.string.isRequired,
    spokeId: PropTypes.string.isRequired,
  }

  state = {
    spokes: [],
  }

  static getDerivedStateFromProps(props, state) {
    const { spokes: prevSpokes } = state
    const { spokeCount } = props

    if (prevSpokes.length < spokeCount) {
      return {
        spokes: mapIndexed(
          (value, index) => ({ ...value, id: index }),
          [...prevSpokes, ...new Array(spokeCount - prevSpokes.length).fill({ reading: '' })]
        ),
      }
    }
    if (prevSpokes.length > spokeCount) {
      return {
        spokes: dropLast(prevSpokes.length - spokeCount, prevSpokes),
      }
    }
    return null
  }

  updateReading = index => value => (
    this.setState(({ spokes }) => ({
      spokes: adjust(index, spoke => ({ ...spoke, reading: value }), spokes),
    }))
  )

  sumTensionForSpokes = (spokes) => {
    const { toolId, spokeId } = this.props

    return reduce((acc, spoke) => add(acc, defaultTo(0, getTension(toolId, spokeId, spoke.reading))), 0, spokes)
  }

  countSpokesWithReading = (spokes) => {
    const { toolId, spokeId } = this.props

    return reduce((acc, spoke) => add(acc, getTension(toolId, spokeId, spoke.reading) ? 1 : 0), 0, spokes)
  }

  calculateAverageTension = () => {
    const { spokes } = this.state

    return defaultTo(0, this.sumTensionForSpokes(spokes) / this.countSpokesWithReading(spokes))
  }

  render() {
    const { toolId, spokeId } = this.props
    const { spokes } = this.state
    const averageTension = this.calculateAverageTension()

    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Spoke #</TableCell>
              <TableCell>Reading</TableCell>
              <TableCell>Tension (kgf)</TableCell>
              <TableCell>Variance (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {spokes.map((spoke, index) => (
              <SpokeRow
                id={`spoke-${spoke.id}`}
                key={`spoke-${spoke.id}`}
                spoke={{
                  ...spoke, toolId, spokeId, number: index,
                }}
                averageTension={averageTension}
                updateReading={this.updateReading(index)}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default SpokeTable
