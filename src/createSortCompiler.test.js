import createSortCompiler from './createSortCompiler'
import createJSCompiler from './createJSCompiler'
import compare from './compare'

describe('createSortCompiler', () => {
  it('should compile and run sort function when dir is 1', () => {
    const compile = createSortCompiler(createJSCompiler(), compare)
    const fn = compile({field: 'id', dir: 1, expression: 'parseInt(id.slice(1))' })
    const items = []
    for (let i = 0; i < 11; i++) items.push({ id: `p${i}` })
    expect(items.sort(fn)).toEqual([
      { id: 'p0' },
      { id: 'p1' },
      { id: 'p2' },
      { id: 'p3' },
      { id: 'p4' },
      { id: 'p5' },
      { id: 'p6' },
      { id: 'p7' },
      { id: 'p8' },
      { id: 'p9' },
      { id: 'p10' }
    ])
  })
  it('should compile and run sort function when dir = -1', () => {
    const compile = createSortCompiler(createJSCompiler(), compare)
    const fn = compile({field: 'id', dir: -1, expression: 'parseInt(id.slice(1))' })
    const items = []
    for (let i = 0; i < 11; i++) items.push({ id: `p${i}` })
    expect(items.sort(fn)).toEqual([
      { id: 'p10' },
      { id: 'p9' },
      { id: 'p8' },
      { id: 'p7' },
      { id: 'p6' },
      { id: 'p5' },
      { id: 'p4' },
      { id: 'p3' },
      { id: 'p2' },
      { id: 'p1' },
      { id: 'p0' }
    ])
  })
})