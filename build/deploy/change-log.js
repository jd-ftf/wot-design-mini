/**
 * @description 提取changelog.md的日志，用于github release
 * @author Gkxie
 * @date 2019-12-25
 */
const minimist = require('minimist')
const fs = require('fs')
const path = require('path')
const MarkdownIt = require('markdown-it')
const args = minimist(process.argv.slice(2))
const md = new MarkdownIt()
const html = md.render(
  fs.readFileSync(
    args.hasOwnProperty('path') ? path.resolve(args.path) : 'changelog.md'
    , { encoding: 'utf-8' })
)
  .split('\n')
  .filter(s => Boolean(s))

const queue = []
let start = false
for (let i = 0; i < html.length; i++) {
  if (html[i].indexOf('<h2>') === 0) {
    continue
  } else if (html[i].indexOf('<h3>') === 0 && !start) {
    start = true
  } else if (html[i].indexOf('<h3>') === 0 && start) {
    break
  }
  queue.push(html[i])
}
queue.shift()
process.stdout.write(queue.join('') + '\n')