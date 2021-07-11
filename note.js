import item from './item.js'

export default class note {
    constructor(name, remindTime) {
        this.name = name
        if (remindTime == undefined)
            this.remindTime = '无提醒时间'
        else
            this.remindTime = remindTime
        this.items = []
        this.fold = true
    }

    addItem = (item) => {
        this.items.push(item)
    }

    removeItem = (item) => {
        return () => {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i] == item)
                    this.items.splice(i, 1)
            }
        }
    }

    changeNote = (name, remindTime) => {
        this.name = name
        if (remindTime == undefined)
            this.remindTime = '无提醒时间'
        else
            this.remindTime = remindTime
        this.items = []
    }

    getNoteDOM = () => {
        //创建DOM
        let div_note = document.createElement('div')
        div_note.classList.add('note')

        let noteHeader = document.createElement('div')
        noteHeader.classList.add('noteHeader')

        div_note.appendChild(noteHeader)

        let left = document.createElement('div')
        left.classList.add('left')
        let span_name = document.createElement('span')
        span_name.innerHTML = this.name
        let span_remindTime = document.createElement('span')
        span_remindTime.innerHTML = this.remindTime

        left.appendChild(span_name)
        left.appendChild(document.createElement('br'))
        left.appendChild(span_remindTime)
        noteHeader.appendChild(left)

        let right = document.createElement('div')
        right.classList.add('right')

        let icon1 = document.createElement('span')
        icon1.classList.add('iconfont', 'icon-jiahao')
        icon1.render = true
        icon1.onclick = this.openAddModal

        let icon2 = document.createElement('span')
        icon2.classList.add('iconfont', 'icon-shanchu1')
        icon2.render = true

        let icon3 = document.createElement('span')
        icon3.classList.add('iconfont', 'icon-shezhi')
        icon3.render = true
        icon3.onclick = this.openChangeNoteModal

        let icon4 = document.createElement('span')
        icon4.classList.add('iconfont', 'icon-Other-4')
        icon4.onclick=this.showItems
        icon4.render=true

        let icon5 = document.createElement('span')
        icon5.classList.add('iconfont', 'icon-Other-2')
        icon5.onclick=this.foldItems
        icon5.render=true

        right.appendChild(icon1)
        right.appendChild(icon2)
        right.appendChild(icon3)
        right.appendChild(icon4)
        right.appendChild(icon5)
        noteHeader.appendChild(right)

        let itemDiv = document.createElement('div')
        itemDiv.classList.add('itemDiv')
        if (this.fold) {
            itemDiv.style.display = 'none'
            icon5.style.display = 'none'
        }
        else {
            itemDiv.style.display = 'block'
            icon4.style.display = 'none'
        }
        div_note.appendChild(itemDiv)

        this.items.forEach((item, index) => {
            let itemDOM = item.getItemDOM()
            let icon = itemDOM.getElementsByClassName('iconfont')[0]
            icon.onclick = this.removeItem(item)
            itemDiv.appendChild(itemDOM)
        })



        return div_note

    }


    openAddModal = () => {
        let modal = document.getElementById('addItem')
        modal.style.display = 'block'
        let sure = document.getElementsByClassName('sureAddItem')[0]

        sure.onclick = () => {
            let newRecord = document.getElementById('record').value
            document.getElementById('record').value = ''
            let newItem = new item(newRecord)
            this.items.push(newItem)
            modal.style.display = 'none'

        }
    }

    openChangeNoteModal = () => {
        let modal = document.getElementById('changeNote')
        modal.style.display = 'block'
        let sure = document.getElementsByClassName('sureChangeNote')[0]

        sure.onclick = () => {
            let newName = document.getElementById('note').value
            document.getElementById('note').value = ''
            this.name = newName
            modal.style.display = 'none'
        }
    }

    showItems = () => {
        this.fold=false
    }

    foldItems=()=>{
        this.fold=true
    }

}