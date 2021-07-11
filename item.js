export default class item {
    constructor(record) {
        this.record = record
        this.finish = false
    }

    changeRecord = (record) => {
        this.record = record
    }

    getItemDOM = () => {
        // 创建DOM
        let div = document.createElement('div')
        div.setAttribute('class', 'item')

        let input_checkbox = document.createElement('input')
        input_checkbox.setAttribute('type', 'checkbox')

        let span = document.createElement('span')
        span.innerHTML = this.record

        let icon = document.createElement('span')
        icon.classList.add('iconfont', 'icon-jinzhi')
        icon.render = true

        div.appendChild(input_checkbox)
        div.appendChild(span)
        div.appendChild(icon)

        //绑定事件
        input_checkbox.onclick = this.changeFinish

        return div
    }

    changeFinish = () => {
        this.finish = !this.finish
    }

}