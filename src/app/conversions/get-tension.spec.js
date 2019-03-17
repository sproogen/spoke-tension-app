import getTension from './get-tension'
import config from './config'

const mockToolConfig = {
  spokes: {
    'spoke-1.8': {
      readings: {
        39: 105,
        40: 112,
        41: 119,
      },
    },
  },
}

config.tool = mockToolConfig

describe('conversions', () => {
  describe('get-tension', () => {
    it('should return tension', () => {
      const tension = getTension('tool', 'spoke-1.8', 40)

      expect(tension).toBe(112)
    })

    it('should return undefined if conversion doesn\'t exist', () => {
      const tension = getTension('tool', 'spoke-1.8', 20)

      expect(tension).toBeUndefined()
    })
  })
})
