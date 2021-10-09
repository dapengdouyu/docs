/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require("fs-extra");
const path = require("path");
let program = null;
const dirs = fs
  .readdirSync(path.join(__dirname, "./docs"))
  .filter((dir) => !dir.startsWith("."));
for (let dir of dirs) {
  const basePath = path.join(__dirname, "./docs", dir);
  program = fs.readdirSync(basePath).reduce((memo, next) => {
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
}

module.exports = {
  // samples: {
  //   // Features: ["mdx"],
  //   "React 基础示例": [],
  // },
  program,
};
