export default function createInterpolationCompiler(compile) {
  return function compileInterpolationString(options = {}) {
    const {string = '', tag = '', ...compileOptions} = options
    return compile({expression: `${tag}\`${string}\``, ...compileOptions})
  }
}
