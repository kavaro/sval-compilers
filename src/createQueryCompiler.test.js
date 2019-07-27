import createJSCompiler from './createJSCompiler'
import createQueryCompiler from './createQueryCompiler'
import createIteratorCompiler from './createIteratorCompiler'
import createSortCompiler from './createSortCompiler'
import compare from './compare'

describe('createQueryCompiler', () => {
  it('should compile and run query', () => {
    const compileJS = createJSCompiler()
    const compile = createQueryCompiler(createIteratorCompiler(compileJS), createSortCompiler(compileJS, compare))
    const query = compile({
      filter: {
        expression: 'even'
      },
      sort: {
        field: 'id',
        dir: -1,
        expression: item => parseInt(item.id.slice(1))
      }
    })
    const list = []
    for (let i = 0; i < 500; i++) {
      list.push({ id: `p${i}` })
    }
    let l = list.length - 1
    if (l % 2 === 1) l--
    expect(query(list, { skip: 2, limit: 4 })).toEqual([
      list[l - 4],
      list[l - 6],
      list[l - 8],
      list[l - 10]
    ])
  })
})