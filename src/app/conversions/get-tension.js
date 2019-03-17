import {
  path,
} from 'ramda'
import config from './config'

const getTension = (toolId, spokeId, reading) => (
  path([toolId, 'spokes', spokeId, 'readings', reading])(config)
)

export default getTension
