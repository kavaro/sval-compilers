import createJSCompiler from './createJSCompiler'
import createInterpolationCompiler from './createInterpolationCompiler'

describe('createInterpolationCompiler', () => {
  it('should compile and run interpolated string', () => {
    const compile = createInterpolationCompiler(createJSCompiler())
    const run = compile({ string: 'Title: ${upperCase(title)}', scope: { upperCase: s => s.toUpperCase() } })
    expect(run({ scope: { title: 'Hello World' } })).toBe('Title: HELLO WORLD')
  })
})