import React from 'react'
import { shallow } from 'enzyme'
import SpokeRow from './spoke-row'

jest.mock('../conversions', () => ({
  getTension: jest.fn(() => 100),
}))

const props = {
  spoke: {
    toolId: 'tool',
    spokeId: 'spoke-1.8',
    number: 0,
    reading: '40',
  },
  averageTension: 110,
  updateReading: jest.fn(),
}

describe('SpokeRow', () => {
  describe('actions', () => {
    describe('reading onChange', () => {
      it('should call update reading', () => {
        const wrapper = shallow(<SpokeRow {...props} />)
        const event = {
          preventDefault() { },
          target: { value: '41' },
        }

        wrapper.find('#spoke-reading-0').props().onChange(event)

        expect(props.updateReading).toHaveBeenCalledWith('41')
      })
    })
  })

  describe('render', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<SpokeRow {...props} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
