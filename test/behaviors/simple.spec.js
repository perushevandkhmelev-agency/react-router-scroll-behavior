import expect from 'expect'
import scrollTop from 'dom-helpers/query/scrollTop'
import fixtures from '../fixtures'
import simple from '../../src/behaviors/simple'

describe('simple', () => {
  let behavior

  beforeEach(() => {
    behavior = simple()
    fixtures.setup()
  })

  afterEach(() => {
    fixtures.teardown()
  })

  describe('updateScroll', () => {
    ['PUSH', 'REPLACE'].map((action) => {
      it('scroll to top on ' + action, () => {
        scrollTop(window, 15000)
        behavior.updateScroll({ action: action })
        expect(scrollTop(window)).toBe(0)
      })
    })

    it('ignore POP', () => {
      scrollTop(window, 15000)
      behavior.updateScroll({ action: 'POP' })
      expect(scrollTop(window)).toBe(15000)
    })
  })
})
