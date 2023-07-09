const Path = require("path")
const FS = require("fs-extra")
const postcss = require("postcss")
const postcssJs = require("postcss-js")

const ttfUrl = Path.join(__dirname, "../src/font/iconfont.ttf")
const cssStyle = Path.join(__dirname, "../src/font/iconfont.css")
const outPath = Path.join(__dirname, "../src/styles/font.scss")

const runIcon = async () => {
  try {

    if (!FS.existsSync(ttfUrl)) {
      console.warn("iconfont.ttf 文件不存在")
      return
    }

    if (!FS.existsSync(cssStyle)) {
      console.warn("iconfont.css 文件不存在")
      return
    }

    const iconfontCSS = FS.readFileSync(cssStyle, "utf-8")
    const ttfBase64 = FS.readFileSync(ttfUrl, "base64")
    const cssParse = postcss.parse(iconfontCSS)
    const cssObj = postcssJs.objectify(cssParse)

    const newCssObj = {
      '@font-face': {
        src: `url('data:font/ttf;charset=utf-8;base64,${ttfBase64}') format('truetype')`,
        "font-family": "'fairys-icon'",
        "font-weight": "normal",
        "font-style": "normal",
        "font-display": "swap",
      },
      ".fairys-icon": {
        "font-family": "'fairys-icon' !important",
        "font-size": "12px",
        "font-style": "normal",
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale"
      }
    }
    Object.entries(cssObj).forEach(([key, value]) => {
      if (/^\.icon\-/.test(key)) {
        const newKey = key.replace(/^\.icon-/, ".fairys-")
        newCssObj[newKey] = value
      }
    })

    const result = await postcss().process(newCssObj, { parser: postcssJs })
    FS.ensureFileSync(outPath)
    FS.writeFileSync(outPath, result.css, { encoding: "utf-8", flag: "w+" })

  } catch (err) {
    console.error(err)
    process.exit()
  }
}
runIcon()