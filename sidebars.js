/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require("fs-extra");
const path = require("path");
let program = {};
const dirs = fs
  .readdirSync(path.join(__dirname, "./docs"))
  .filter((dir) => !dir.startsWith("."));
for (let dir of dirs) {
  const basePath = path.join(__dirname, "./docs", dir);
  program[dir] = fs.readdirSync(basePath).reduce((memo, next) => {
    const contents = fs
      .readdirSync(path.join(basePath, next))
      .map((name) => name.replace(/^(.*)\.(.+)$/g, "$1"))
      .filter((name) => name !== "index");
    contents.sort((a, b) => {
      return parseInt(a) - parseInt(b);
    });
    memo[next] = ["index", ...contents].map((name) =>
      path.join(dir, next, name)
    );
    return memo;
  }, {});
};
// console.log(program)
// https://github.com/Cansiny0320/blog/blob/main/sidebars.js
module.exports = program
