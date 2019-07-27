import createIteratorCompiler from './createIteratorCompiler'
import createJSCompiler from './createJSCompiler'

describe('createIteratorCompiler', () => {
  it('should compile and run iterator function', () => {
    const compile = createIteratorCompiler(createJSCompiler())
    const fn = compile({ 
      expression: 'id === 1 || list[index].id === 3 || (index > 4 && index < 7 && odd) || (index > 7 && even)' 
    })
    const docs = []
    for (let i = 0; i < 10; i++) {
      docs.push({ id: i })
    }
    expect(docs.filter(fn)).toEqual([
      { id: 1 },
      { id: 3 },
      { id: 5 },
      { id: 8 }
    ])
  })
})