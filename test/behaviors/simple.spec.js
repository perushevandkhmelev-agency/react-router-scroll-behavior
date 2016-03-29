import expect from 'expect'
import scrollTop from 'dom-helpers/query/scrollTop'
import simple from '../../src/behaviors/simple'

describe('simple', () => {
  let behavior
  let spy

  beforeEach(() => {
    behavior = simple()
    spy = expect.spyOn(window, 'scrollTo')
  })

  afterEach(() => {
    spy.restore()
  })

  describe('updateScroll', () => {
    ['PUSH', 'REPLACE'].map((action) => {
      it('scroll to top on ' + action, () => {
        behavior.updateScroll({ action: action })
        expect(spy.calls.length).toEqual(1)
        expect(spy.calls[0].arguments).toEqual([0, 0])
      })
    })

    it('ignore POP', () => {
      behavior.updateScroll({ action: 'POP' })
      expect(spy.calls.length).toEqual(0)
    })
  })
})
