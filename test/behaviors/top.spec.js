import expect from 'expect'
import scrollTop from 'dom-helpers/query/scrollTop'
import top from '../../src/behaviors/top'

describe('top', () => {
  let behavior
  let spy

  beforeEach(() => {
    behavior = top()
    spy = expect.spyOn(window, 'scrollTo')
  })

  afterEach(() => {
    spy.restore()
  })

  describe('updateScroll', () => {
    it('scroll to top on POP', done => {
      behavior.updateScroll({ action: 'POP' })
      setTimeout(() => {
        expect(spy.calls.length).toEqual(1)
        expect(spy.calls[0].arguments).toEqual([0, 0])
        done()
      })
    })
  })
})
