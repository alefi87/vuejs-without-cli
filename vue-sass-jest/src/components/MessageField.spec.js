import MessageField from './MessageField.vue'
import { mount } from '@vue/test-utils'

describe('MessageField', () => {
  it('should mount', () => {
    const wrapper = mount(MessageField)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('should match the snapshot', () => {
    const wrapper = mount(MessageField)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
