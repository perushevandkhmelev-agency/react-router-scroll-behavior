import expect from 'expect'
import scrollTop from 'dom-helpers/query/scrollTop'
import { readState, saveState } from 'history/lib/DOMStateStorage'
import fixtures from '../fixtures'
import simple from '../../src/behaviors/standard'

describe('standard', () => {
  let behavior
  let key

  beforeEach(() => {
    behavior = simple()
    fixtures.setup()
    key = '@@History/' + Date.now()
    saveState(key, { scrollPosition: [0, 100] })
  })

  afterEach(() => {
    fixtures.teardown()
  })

  describe('updateScroll', () => {
    it('scroll to remembered position', () => {
      scrollTop(window, 15000)
      behavior.updateScroll({ key })
      expect(scrollTop(window)).toBe(100)
    })
  })
})
