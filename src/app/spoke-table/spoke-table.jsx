import React, { Component } from 'react'
import {
  update, path, reduce, add, prop, defaultTo,
} from 'ramda'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import SpokeRow from './spoke-row'
import conversions from '../conversions'

const toolId = 'x-tools'
const spokeId = 'round-1.8'

const spokeType = { toolId, spokeId }

class SpokeTable extends Component {
  state = {
    spokes: [
      { reading: '' },
      { reading: '' },
      { reading: '' },
    ],
  }

  updateReading = index => value => (
    this.setState(({ spokes }) => ({
      spokes: update(index, { reading: value }, spokes),
    }))
  )

  getTensionForSpoke = spoke => path([toolId, 'spokes', spokeId, 'readings', prop('reading', spoke)])(conversions)

  getTensionForSpokes = spokes => (
    reduce((acc, spoke) => add(acc, defaultTo(0, this.getTensionForSpoke(spoke))), 0, spokes)
  )

  countSpokesWithReading = spokes => (
    reduce((acc, spoke) => add(acc, this.getTensionForSpoke(spoke) ? 1 : 0), 0, spokes)
  )

  calculateAverageTension = () => {
    const { spokes } = this.state

    return defaultTo(0, this.getTensionForSpokes(spokes) / this.countSpokesWithReading(spokes))
  }

  render() {
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
                key={`spoke-${index}`}
                spoke={{ ...spokeType, ...spoke, number: index }}
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
