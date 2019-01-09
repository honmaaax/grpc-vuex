import _ from 'lodash'

import Case from '../src/case'

describe('camel', ()=>{
  it('returns camel case', () => {
    expect(Case.camel('hoge')).toBe('hoge')
    expect(Case.camel('hogeFuga')).toBe('hogeFuga')
    expect(Case.camel('hoge_fuga')).toBe('hogeFuga')
    expect(Case.camel('hoge-fuga')).toBe('hogeFuga')
  })
})

describe('snake', ()=>{
  it('returns snake case', () => {
    expect(Case.snake('hoge')).toBe('hoge')
    expect(Case.snake('hogeFuga')).toBe('hoge_fuga')
    expect(Case.snake('hoge_fuga')).toBe('hoge_fuga')
    expect(Case.snake('hoge-fuga')).toBe('hoge_fuga')
  })
})

describe('pascal', ()=>{
  it('returns pascal case', () => {
    expect(Case.pascal('hoge')).toBe('Hoge')
    expect(Case.pascal('hogeFuga')).toBe('HogeFuga')
    expect(Case.pascal('hoge_fuga')).toBe('HogeFuga')
    expect(Case.pascal('hoge-fuga')).toBe('HogeFuga')
  })
})