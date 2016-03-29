import expect from 'expect'
import { readState, saveState } from 'history/lib/DOMStateStorage'
import simple from '../../src/behaviors/standard'

describe('standard', () => {
  let behavior
  let spy
  let key

  beforeEach(() => {
    behavior = simple()
    spy = expect.spyOn(window, 'scrollTo')
    key = '@@History/' + Date.now()
    saveState(key, { scrollPosition: [0, 100] })
  })

  afterEach(() => {
    spy.restore()
  })

  describe('updateScroll', () => {
    it('scroll to remembed position', () => {
      behavior.updateScroll({ key })
      expect(spy.calls.length).toEqual(1)
      expect(spy.calls[0].arguments).toEqual([0, 100])
    })
  })
})
