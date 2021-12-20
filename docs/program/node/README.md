## PM2 配置文件的使用

### 一、前言

PM2 支持配置文件方式进行应用服务设置，文件支持的配置格式为 `Javascript`、`JSON`、`YAM`L。以下主要讲述 `Javascript`，`JSON` 这 2 种格式；

### 二、配置文件

1. `Javascript` 格式

输入以下命令可以生产配置文件模板：

```sh
pm2 init
```

![](/img/pm2/pm2_1.png)

```sh
pm2 ecosystem
```

![](/img/pm2/pm2_2.png)

生成是 `ecosystem.config.js` 如下：

```js
module.exports = {
  apps: [
    {
      name: "API",
      script: "app.js",
      args: "one two",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: "node",
      host: "212.83.163.1",
      ref: "origin/master",
      repo: "git@github.com:repo.git",
      path: "/var/www/production",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
    },
  },
};
```

可以根据需要修改配置内容，启动命令：

```sh
pm2 start ecosystem.config.js
```

请注意，使用`Javascript`配置文件要求文件名结尾为 `.config.js`

2. json 格式

例如命名为 `config.json：`

```json
{
  "apps": [
    {
      "name": "test", //名称
      "script": "server.js", //程序入口
      "cwd": "./", //根目录
      "instances": 1,
      "error_file": "./logs/error.log", //错误输出日志
      "out_file": "./logs/out.log", //日志
      "log_date_format": "YYYY-MM-DD HH:mm Z" //日期格式
    }
  ]
}
```

启动命令：

```sh
pm2 start config.json
```

也可以把命令写在 `package.json` 里。如下:
![](/img/pm2/pm2_2.png)
通过 `npm run pm2` 来启动

可以根据需要设置任意多个 `JSON` 应用程序声明

```json
{
  "apps": [
    {
      "name": "testOne",
      "script": " testOne/server.js",
      "instances": 1,
      "log_date_format": "YYYY-MM-DD HH:mm Z",
      "max_memory_restart": "500M"
    },
    {
      "name": "testTwo",
      "script": " testTwo/server.js",
      "instances": 1,
      "log_date_format": "YYYY-MM-DD HH:mm Z",
      "max_memory_restart": "500M"
    }
  ]
}
```

3. 常用配置项说明:

- `apps`： json 结构，apps 是一个数组，每一个数组成员就是对应一个 pm2 中运行的应用；

- `name`：应用程序名称；

- `cwd`：应用程序所在的目录；

- `script`：应用程序的脚本路径；

- `log_date_format`： 指定日志日期格式，如 YYYY-MM-DD HH：mm：ss；

- `error_file`：自定义应用程序的错误日志文件，代码错误可在此文件查找；

- `out_file`：自定义应用程序日志文件，如应用打印大量的标准输出，会导致 pm2 日志过大；

- `pid_file`：自定义应用程序的 pid 文件；

- `interpreter`：指定的脚本解释器；

- `interpreter_args`：传递给解释器的参数；

- `instances`： 应用启动实例个数，仅在 cluster 模式有效，默认为 fork；

- `min_uptime`：最小运行时间，这里设置的是 60s 即如果应用程序在 60s 内退出，pm2 会认为程序异常退出，此时触发重启 max_restarts 设置数量；

- `max_restarts`：设置应用程序异常退出重启的次数，默认 15 次（从 0 开始计数）；

- `autorestart` ：默认为 true, 发生异常的情况下自动重启；

- `cron_restart`：定时启动，解决重启能解决的问题；

- `max_memory_restart`：最大内存限制数，超出自动重启；

- `watch`：是否启用监控模式，默认是 false。如果设置成 true，当应用程序变动时，pm2 会自动重载。这里也可以设置你要监控的文件。

- `ignore_watch`：忽略监听的文件夹，支持正则表达式；

- `merge_logs`： 设置追加日志而不是新建日志；

- `exec_interpreter`：应用程序的脚本类型，默认是 nodejs；

- `exec_mode`：应用程序启动模式，支持 fork 和 cluster 模式，默认是 fork；

- `autorestart`：启用/禁用应用程序崩溃或退出时自动重启；

- `vizion`：启用/禁用 vizion 特性(版本控制)；

- `env`：环境变量，object 类型；

- `force`：默认 false，如果 true，可以重复启动一个脚本。pm2 不建议这么做；

- `restart_delay`：异常重启情况下，延时重启时间；
