module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard", "@vue/typescript"],
  globals: {
    BMap: true
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // 允许多余空格
    "no-trailing-spaces": 0,
    // 关闭制表符
    "no-tabs": 0,
    "eol-last": 0,
    // 允许三元运算符
    "no-unused-expressions": 0,
    // 函数名称和括号之间必须有空格关闭
    "space-before-function-paren": 0,
    // 不校验缩进
    indent: "off",
    eqeqeq: "off",
    "no-useless-escape": 0,
    "spaced-comment": 0,
    // 必须单引号
    quotes: 0,
    semi: 0,
    "no-console": "off"
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};