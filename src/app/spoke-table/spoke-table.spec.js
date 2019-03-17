import React from 'react'
import { shallow } from 'enzyme'
import SpokeTable from './spoke-table'

jest.mock('../conversions', () => ({
  getTension: jest.fn(() => 100),
}))

const props = {
  spokeCount: 16,
  toolId: 'tool',
  spokeId: 'spoke-1.8',
}

describe('SpokeRow', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<SpokeTable {...props} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
