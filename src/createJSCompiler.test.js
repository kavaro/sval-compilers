import createJSCompiler from './createJSCompiler'

describe('createJSCompiler', () => {
  it('should compile and run code', () => {
    const compile = createJSCompiler()
    const run = compile({ code: 'let a = compiletimeA', expression: 'a + runtimeB', scope: { compiletimeA: 10 } })
    expect(run({ scope: { runtimeB: 20 } })).toBe(30)
  })
})