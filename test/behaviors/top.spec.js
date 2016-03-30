import expect from 'expect'
import scrollTop from 'dom-helpers/query/scrollTop'
import fixtures from '../fixtures'
import top from '../../src/behaviors/top'

describe('top', () => {
  let behavior

  beforeEach(() => {
    behavior = top()
    fixtures.setup()
  })

  afterEach(() => {
    fixtures.teardown()
  })

  describe('updateScroll', () => {
    it('scroll to top on POP', done => {
      scrollTop(window, 15000)
      behavior.updateScroll({ action: 'POP' })
      setTimeout(() => {
        expect(scrollTop(window)).toBe(0)
        done()
      })
    })
  })
})
