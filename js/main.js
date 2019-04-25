var codeContent1 = `/* 
  你好，我叫成焕兴

  只用文字作做自我介绍实在过于单调了

  我就用代码来介绍吧
*/

/*先添加一些样式*/

*{
  transition: all 1s;
  margin:0;padding:0;
}

/*给代码加点高亮*/

.token.selector{ color: #690; }
.token.property{ color: #905; }
#code{color:#ec620c;}

/*添加一个背景动画*/

body{ 
  font-family: Courier; 
  background: black; 
  overflow: hidden; 
}
canvas { 
  position: absolute; 
  left: 0; bottom: 0;
  cursor: default; 
}
#code{
  border:1px solid #b6b6b6;
  border-radius:10px 0 0 10px;
  box-shadow: 0px 0px 1px 1px rgba(255,255,255,0.6);
  overflow:auto;
  background-color:rgba(255,255,255,0.8);
}

/*我要开始介绍自己了

  先创建一张白纸*/

#code{
  width:50%;
  
  margin-right:8px;
}
#reHTML{
  width:50%;
  margin-left:8px;
  border:1px solid #b6b6b6;
  border-radius:10px 0 0 10px;
  box-shadow: 0px 0px 1px 1px rgba(255,255,255,0.6);
  background-color:rgba(255,255,255,0.8);
  overflow:auto;
}

/*创建完毕，为了节约时间就不再进行代码滚动了*/
`
var codeContent2 = `
# 自我介绍

- 我叫 成焕兴
- 1995 年 12 月出生
- 毕业于哈尔滨理工大学 信息管理与信息系统专业
- 自学前端半年
- 希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS http

# 项目介绍

1. 轮播banner
2. 个人简历网站
3. 简易画板

# 联系方式

- QQ 787129485
- Email daxian.cheng@foxmail.com
- 手机 15846618920

## 感谢您的浏览，再会！
`
function writeCode(code1,fn){
	let n = 0
	let a = setInterval(() => {
		n += 1
		codeCSS.textContent = code1.substring(0, n)
		code.innerHTML = Prism.highlight(code1.substring(0, n), Prism.languages.css, 'css')
		code.scrollTop = code.scrollHeight
		if(n>=code1.length){
      window.clearInterval(a)
      fn.call()
		}
  }, 50)
}
function writeResume(code2){
	let n = 0
	let b = setInterval(() => {
		n += 1
    reHTML.innerHTML =  marked(code2.substring(0,n))
    reHTML.scrollTop = reHTML.scrollHeight
		if(n>=code2.length){
			window.clearInterval(b)
		}
  }, 50)
}
writeCode(codeContent1,()=>{writeResume(codeContent2)})