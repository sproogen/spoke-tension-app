import React from 'react'
import { shallow } from 'enzyme'
import { getTension } from '../conversions'
import SpokeTable from './spoke-table'

jest.mock('../conversions', () => ({
  getTension: jest.fn(),
}))
getTension.mockImplementation(() => 100)

const props = {
  spokeCount: 3,
  toolId: 'tool',
  spokeId: 'spoke-1.8',
}

describe('SpokeTable', () => {
  describe('getDerivedStateFromProps', () => {
    it('should initially have state matching props spokeCount', () => {
      const wrapper = shallow(<SpokeTable {...props} />)
      expect(wrapper.state().spokes.length).toEqual(3)
    })

    it('should add spokes to props when spokes change', () => {
      const wrapper = shallow(<SpokeTable {...props} />)
      wrapper.find('#spoke-2').props().updateReading('46')
      wrapper.setProps({ spokeCount: 5 })
      expect(wrapper.state().spokes.length).toEqual(5)
      expect(wrapper.state().spokes).toEqual(expect.arrayContaining([{ id: 2, reading: '46' }]))
    })

    it('should remove spokes to props when spokes change', () => {
      const wrapper = shallow(<SpokeTable {...props} />)
      wrapper.find('#spoke-2').props().updateReading('46')
      wrapper.setProps({ spokeCount: 2 })
      expect(wrapper.state().spokes.length).toEqual(2)
      expect(wrapper.state().spokes).toEqual(expect.not.arrayContaining([{ id: 2, reading: '46' }]))
    })

    it('should do nothing spokes to state when spokes don\'t change', () => {
      const wrapper = shallow(<SpokeTable {...props} />)
      wrapper.find('#spoke-2').props().updateReading('46')
      wrapper.setProps({ spokeCount: 3 })
      expect(wrapper.state().spokes.length).toEqual(3)
      expect(wrapper.state().spokes).toEqual(expect.arrayContaining([{ id: 2, reading: '46' }]))
    })
  })

  describe('actions', () => {
    describe('SpokeRow on updateReading', () => {
      it('should update state with reading', () => {
        const wrapper = shallow(<SpokeTable {...props} />)

        wrapper.find('#spoke-2').props().updateReading('46')

        expect(wrapper.state().spokes).toEqual(expect.arrayContaining([{ id: 2, reading: '46' }]))
      })
    })
  })

  describe('render', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<SpokeTable {...props} />)
      expect(wrapper).toMatchSnapshot()
    })

    describe('with no tension', () => {
      it('should match snapshot', () => {
        getTension.mockImplementation(() => null)

        const wrapper = shallow(<SpokeTable {...props} />)
        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})
