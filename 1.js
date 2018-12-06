let duration = 20;

function writeCss(prefix, code, fn) {
  let domCode = document.querySelector('#code')
  let n = 0
  setTimeout(function f() {
    n += 1
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
    styleTag.innerHTML = prefix + code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight
    if (n >= code.length) {
      fn && fn.call()
    }else{
      setTimeout(f,duration);
    }
  },duration)
}
function writeMarkdown(markdown, fn) {
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  setTimeout(function f() {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      fn && fn.call()
    }else{
      setTimeout(f,duration);
    }
  },duration)
}

var css1 = `/* 
* 面试官你好，我是XXX
* 只用文字作做我介绍太单调了
* 我就用代码来介绍吧
* 首先准备一些样式
*/
*{
  transition: all 1s;
  font-size:16px;
  font-family:"微软雅黑";
}
html{
  background: #eee;
}
#code{
  border: 1px solid #aaa;
  padding: 16px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2)
}
/* 我需要一点代码高亮 */
.token.selector{ 
  color: #690; 
}
.token.property{ 
  color: #905; 
}
/* 来动一动 */
#code{
  transform: rotate(360deg);
}
/* 现在正式开始 */
/* 我需要一张白纸 */
#code-wrapper{
  width: 50%; left: 0; position: fixed; 
  height: 100%;
}
#paper > .content {
 display: block;
}
/* 于是我就可以在白纸上写字了，请看右边 */
`

var css2 = `
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
  `
var md = `
# 自我介绍
我叫奚恒正
1996年 12 月出生
南京信息工程大学学校毕业
自学前端半年
希望应聘前端开发岗位
# 技能介绍
熟悉 JavaScript CSS
# 项目介绍
1. 苹果风格轮播
2. 会动的简历
3. canvas画板

# 联系方式
- QQ 912575054
- Email 912575054@qq.com
- 手机 xxxxxxx


`
let css3 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`

writeCss('', css1, () => {
  createPaper(() => {
    writeMarkdown(md, () => {
      writeCss(css1, css2, () => {
        convertMarkdownToHtml(() => {
          writeCss(css1 + css2, css3, () => {
            console.log('完成')
          })
        })
      })
    })
  })
})




function createPaper(fn) {
  var paper = document.createElement('div')
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn && fn.call()
}

function convertMarkdownToHtml(fn) {
  var div = document.createElement('div')
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
}
