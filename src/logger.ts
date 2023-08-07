import chalk from 'chalk'
import * as fs from 'fs'
const args = process.argv.slice(2)

export const verbose =
  args.find((arg) => ['-v', '--verbose'].includes(arg)) !== undefined

const outputIdx = args.findIndex((arg) => {
  return ['-o', '--output'].includes(arg)
})

export const outputPath = outputIdx == -1 ? undefined : args[outputIdx + 1]

function getDateString(dstr: Date) {
  return dstr.toISOString().replace('T', ' ').substring(0, 19)
}

const storeLog = console.log
// overriding the original console log
console.log = (logData: unknown[]) => {
  storeLog(logData)

  const cleanLog = [logData].map((s: unknown) =>
    s?.toString().replace(/\u001b[^m]*?m/g, ''),
  )

  if (outputPath) fs.appendFileSync(outputPath, cleanLog + '\n')
}
const storeTable = console.table

console.table = (args: unknown[]) => {
  storeTable(args)
  if (outputPath) fs.appendFileSync(outputPath, args + '\n')
}

const log = {
  info: (...args: unknown[]) => {
    console.log(chalk.green(...args))
  },

  warning: (...args: unknown[]) => console.log(chalk.yellow(...args)),
  error: (...args: unknown[]) => console.log(chalk.red(...args)),
  debug: (...args: unknown[]) =>
    verbose
      ? console.log(chalk.blue('[' + getDateString(new Date()) + '] ', ...args))
      : '',
  table: (...args: unknown[]) => console.table(...args),
}

export default log
