const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo: 'A', url: 'https://www.acfun.cn'},
    {logo: 'B', url: 'https://bilibili.com'},
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')    //正则表达式 删除/后面的所有内容
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(
            `<li>            
            <div class="site">
                <div class="logo">${node.logo}
                </div >
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class='close'>
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>        
                </div >           
            </li > `
        )
            .insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)   //a标签不能阻止冒泡，代替a标签，并会打开一个新窗口
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()
$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问你要添加的网址是啥？')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        console.log(url)
        //一般为了方便区分jquery变量，用$开头命名
        hashMap.push(
            {
                logo: simplifyUrl(url)[0].toUpperCase(),
                url: url
            }
        )
        render()
    })

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    const {key} = e
    $('.searchForm').addEventListener('keypress', (e) => {
        e.stopPropagation()
    })
    console.log(key)
    console.log(hashMap)
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            console.log(hashMap[i].logo.toLowerCase())
            window.open(hashMap[i].url)
        }
    }
})