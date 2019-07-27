import Sval from 'sval'
import { isFunction } from 'lodash/lang'

// options: object Sval options defaults to ecmaVer: 9 and sendBox execution
export default function createJSCompiler(options) {
  const svalOptions = {
    ecmaVer: 9,
    sandBox: true,
    ...options
  }
  return function compile(compileOptions = {}) {
    const {
      scope: compileScope,      // object: compile time scope for javascript code and expression
      onError: onCompileError,  // function(err): function to execute when compile error occurs  
      code,                     // string: javascript code                
      expression                // string: javascript expression to return
    } = compileOptions
    if (!code && isFunction(expression)) {
      return function run(runOptions = {}) {
        try {
          return expression({ ...compileScope, ...runOptions.scope })
        } catch (err) {
          const { onRunError } = runOptions
          if (onRunError) {
            return onRunError(err)
          }
          throw err
        }
      }
    }
    return function run(runOptions = {}) {
      const {
        scope: runScope,        // object: runtime scope for javascript code and expression
        onError: onRunError,    // function(err): function to execute when runtime error occurs
        expressionExportKey = '_EXPRESSION_EXPORT_KEY_' // string: name of the identifier used to export expression
      } = runOptions
      try {
        try {
          const interpreter = new Sval(svalOptions)
          interpreter.import({ ...compileScope, ...runScope })
          interpreter.run(`${code ? code : ''}${expression ? `\nexports.${expressionExportKey} = ${expression}` : ''}`)
          const { exports = {} } = interpreter
          return expression ? exports[expressionExportKey] : exports
        } catch (err) {
          if (onRunError) {
            return onRunError(err)
          }
          throw err
        }
      } catch (err) {
        if (onCompileError) {
          return onCompileError(err)
        }
        throw err
      }
    }
  }
}