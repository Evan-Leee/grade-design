'use strict';

var mongoose = require('mongoose');
var contestPaper = require('../models/contest-paper');
var async = require('async');
var yamlConfig = require('node-yaml-config');
var config = yamlConfig.load(__dirname + '/../config/config.yml');
mongoose.connect(config.database);
var db = mongoose.connection;

db.once('open', () => {
  console.log('mongo refresh start...');

  async.waterfall([
    (done) => {
      contestPaper.remove(function () {
        contestPaper.create([
          {
            id: 1,
            img: "./build/html_css.jpg",
            name: "html+css 基础课程",
            desc: {
              heading: "前端开发",
              content: "主要考察HTML、CSS样式基础知识，了解各种常用标签的意义以及基本用法，CSS样式代码添加等内容"
            }
          },
          {
            id: 2,
            img: "./build/java.jpg",
            name: "java 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察jdk的安装，java所需环境的配置，java语言的基础语法，方法的调用，重载，参数的传递等。"
            }
          },
          {
            id: 3,
            img: "./build/c.jpg",
            name: "c语言 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察c的各类语法，变量和函数的声明，数组，指针，结构体的使用，函数的调用和参数传递等。"
            }
          },
          {
            id: 4,
            img: "./build/html_css.jpg",
            name: "html+css 基础课程",
            desc: {
              heading: "前端开发",
              content: "主要考察HTML、CSS样式基础知识，了解各种常用标签的意义以及基本用法，CSS样式代码添加等内容"
            }
          },
          {
            id: 5,
            img: "./build/java.jpg",
            name: "java 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察jdk的安装，java所需环境的配置，java语言的基础语法，方法的调用，重载，参数的传递等。"
            }
          },
          {
            id: 6,
            img: "./build/c.jpg",
            name: "c语言 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察c的各类语法，变量和函数的声明，数组，指针，结构体的使用，函数的调用和参数传递等。"
            }
          },
          {
            id: 7,
            img: "./build/html_css.jpg",
            name: "html+css 基础课程",
            desc: {
              heading: "前端开发",
              content: "主要考察HTML、CSS样式基础知识，了解各种常用标签的意义以及基本用法，CSS样式代码添加等内容"
            }
          },
          {
            id: 8,
            img: "./build/java.jpg",
            name: "java 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察jdk的安装，java所需环境的配置，java语言的基础语法，方法的调用，重载，参数的传递等。"
            }
          },
          {
            id: 9,
            img: "./build/c.jpg",
            name: "c语言 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察c的各类语法，变量和函数的声明，数组，指针，结构体的使用，函数的调用和参数传递等。"
            }
          },
          {
            id: 10,
            img: "./build/html_css.jpg",
            name: "html+css 基础课程",
            desc: {
              heading: "前端开发",
              content: "主要考察HTML、CSS样式基础知识，了解各种常用标签的意义以及基本用法，CSS样式代码添加等内容"
            }
          },
          {
            id: 11,
            img: "./build/java.jpg",
            name: "java 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察jdk的安装，java所需环境的配置，java语言的基础语法，方法的调用，重载，参数的传递等。"
            }
          },
          {
            id: 12,
            img: "./build/c.jpg",
            name: "c语言 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察c的各类语法，变量和函数的声明，数组，指针，结构体的使用，函数的调用和参数传递等。"
            }
          },
          {
            id: 13,
            img: "./build/html_css.jpg",
            name: "html+css 基础课程",
            desc: {
              heading: "前端开发",
              content: "主要考察HTML、CSS样式基础知识，了解各种常用标签的意义以及基本用法，CSS样式代码添加等内容"
            }
          },
          {
            id: 14,
            img: "./build/java.jpg",
            name: "java 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察jdk的安装，java所需环境的配置，java语言的基础语法，方法的调用，重载，参数的传递等。"
            }
          },
          {
            id: 15,
            img: "./build/c.jpg",
            name: "c语言 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察c的各类语法，变量和函数的声明，数组，指针，结构体的使用，函数的调用和参数传递等。"
            }
          },
          {
            id: 16,
            img: "./build/html_css.jpg",
            name: "html+css 基础课程",
            desc: {
              heading: "前端开发",
              content: "主要考察HTML、CSS样式基础知识，了解各种常用标签的意义以及基本用法，CSS样式代码添加等内容"
            }
          },
          {
            id: 17,
            img: "./build/java.jpg",
            name: "java 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察jdk的安装，java所需环境的配置，java语言的基础语法，方法的调用，重载，参数的传递等。"
            }
          },
          {
            id: 18,
            img: "./build/c.jpg",
            name: "c语言 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察c的各类语法，变量和函数的声明，数组，指针，结构体的使用，函数的调用和参数传递等。"
            }
          },
          {
            id: 19,
            img: "./build/html_css.jpg",
            name: "html+css 基础课程",
            desc: {
              heading: "前端开发",
              content: "主要考察HTML、CSS样式基础知识，了解各种常用标签的意义以及基本用法，CSS样式代码添加等内容"
            }
          },
          {
            id: 20,
            img: "./build/java.jpg",
            name: "java 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察jdk的安装，java所需环境的配置，java语言的基础语法，方法的调用，重载，参数的传递等。"
            }
          },
          {
            id: 21,
            img: "./build/c.jpg",
            name: "c语言 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察c的各类语法，变量和函数的声明，数组，指针，结构体的使用，函数的调用和参数传递等。"
            }
          },
          {
            id: 22,
            img: "./build/html_css.jpg",
            name: "html+css 基础课程",
            desc: {
              heading: "前端开发",
              content: "主要考察HTML、CSS样式基础知识，了解各种常用标签的意义以及基本用法，CSS样式代码添加等内容"
            }
          },
          {
            id: 23,
            img: "./build/java.jpg",
            name: "java 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察jdk的安装，java所需环境的配置，java语言的基础语法，方法的调用，重载，参数的传递等。"
            }
          },
          {
            id: 24,
            img: "./build/c.jpg",
            name: "c语言 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察c的各类语法，变量和函数的声明，数组，指针，结构体的使用，函数的调用和参数传递等。"
            }
          },
          {
            id: 25,
            img: "./build/html_css.jpg",
            name: "html+css 基础课程",
            desc: {
              heading: "前端开发",
              content: "主要考察HTML、CSS样式基础知识，了解各种常用标签的意义以及基本用法，CSS样式代码添加等内容"
            }
          },
          {
            id: 26,
            img: "./build/java.jpg",
            name: "java 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察jdk的安装，java所需环境的配置，java语言的基础语法，方法的调用，重载，参数的传递等。"
            }
          },
          {
            id: 27,
            img: "./build/c.jpg",
            name: "c语言 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察c的各类语法，变量和函数的声明，数组，指针，结构体的使用，函数的调用和参数传递等。"
            }
          },
          {
            id: 28,
            img: "./build/html_css.jpg",
            name: "html+css 基础课程",
            desc: {
              heading: "前端开发",
              content: "主要考察HTML、CSS样式基础知识，了解各种常用标签的意义以及基本用法，CSS样式代码添加等内容"
            }
          },
          {
            id: 29,
            img: "./build/java.jpg",
            name: "java 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察jdk的安装，java所需环境的配置，java语言的基础语法，方法的调用，重载，参数的传递等。"
            }
          },
          {
            id: 30,
            img: "./build/c.jpg",
            name: "c语言 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察c的各类语法，变量和函数的声明，数组，指针，结构体的使用，函数的调用和参数传递等。"
            }
          },
          {
            id: 31,
            img: "./build/html_css.jpg",
            name: "html+css 基础课程",
            desc: {
              heading: "前端开发",
              content: "主要考察HTML、CSS样式基础知识，了解各种常用标签的意义以及基本用法，CSS样式代码添加等内容"
            }
          },
          {
            id: 32,
            img: "./build/java.jpg",
            name: "java 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察jdk的安装，java所需环境的配置，java语言的基础语法，方法的调用，重载，参数的传递等。"
            }
          },
          {
            id: 33,
            img: "./build/c.jpg",
            name: "c语言 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察c的各类语法，变量和函数的声明，数组，指针，结构体的使用，函数的调用和参数传递等。"
            }
          },
          {
            id: 34,
            img: "./build/html_css.jpg",
            name: "html+css 基础课程",
            desc: {
              heading: "前端开发",
              content: "主要考察HTML、CSS样式基础知识，了解各种常用标签的意义以及基本用法，CSS样式代码添加等内容"
            }
          },
          {
            id: 35,
            img: "./build/java.jpg",
            name: "java 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察jdk的安装，java所需环境的配置，java语言的基础语法，方法的调用，重载，参数的传递等。"
            }
          },
          {
            id: 36,
            img: "./build/c.jpg",
            name: "c语言 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察c的各类语法，变量和函数的声明，数组，指针，结构体的使用，函数的调用和参数传递等。"
            }
          },
          {
            id: 37,
            img: "./build/html_css.jpg",
            name: "html+css 基础课程",
            desc: {
              heading: "前端开发",
              content: "主要考察HTML、CSS样式基础知识，了解各种常用标签的意义以及基本用法，CSS样式代码添加等内容"
            }
          },
          {
            id: 38,
            img: "./build/java.jpg",
            name: "java 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察jdk的安装，java所需环境的配置，java语言的基础语法，方法的调用，重载，参数的传递等。"
            }
          },
          {
            id: 39,
            img: "./build/c.jpg",
            name: "c语言 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察c的各类语法，变量和函数的声明，数组，指针，结构体的使用，函数的调用和参数传递等。"
            }
          },
          {
            id: 40,
            img: "./build/html_css.jpg",
            name: "html+css 基础课程",
            desc: {
              heading: "前端开发",
              content: "主要考察HTML、CSS样式基础知识，了解各种常用标签的意义以及基本用法，CSS样式代码添加等内容"
            }
          },
          {
            id: 41,
            img: "./build/java.jpg",
            name: "java 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察jdk的安装，java所需环境的配置，java语言的基础语法，方法的调用，重载，参数的传递等。"
            }
          },
          {
            id: 42,
            img: "./build/c.jpg",
            name: "c语言 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察c的各类语法，变量和函数的声明，数组，指针，结构体的使用，函数的调用和参数传递等。"
            }
          },
          {
            id: 43,
            img: "./build/html_css.jpg",
            name: "html+css 基础课程",
            desc: {
              heading: "前端开发",
              content: "主要考察HTML、CSS样式基础知识，了解各种常用标签的意义以及基本用法，CSS样式代码添加等内容"
            }
          },
          {
            id: 44,
            img: "./build/java.jpg",
            name: "java 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察jdk的安装，java所需环境的配置，java语言的基础语法，方法的调用，重载，参数的传递等。"
            }
          },
          {
            id: 45,
            img: "./build/c.jpg",
            name: "c语言 入门",
            desc: {
              heading: "后端开发",
              content: "主要考察c的各类语法，变量和函数的声明，数组，指针，结构体的使用，函数的调用和参数传递等。"
            }
          }
        ], function () {
          console.log('mongo refresh end.');
          done(null);
        });
      });
    }
  ],() => {
    process.exit();
  });
});