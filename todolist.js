import item from './item.js'
import note from './note.js'

export default class todolist {
    constructor() {
        this.notes = []
    }

    addNote = (name, remindTime) => {
        let note = new this.note(name, remindTime)
        this.notes.push(note)
    }

    removeNote = (note) => {
        for (let i = 0; i < this.notes.length; i++) {
            if (note == this.notes[i])
                this.notes.splice(i, 1)
        }
    }




    render = () => {
        let content = document.getElementById('content')

        //清空
        while (content.hasChildNodes()) {
            content.removeChild(content.firstChild)
        }

        //添加note结点
        this.notes.forEach((item, index) => {
            let noteDOM = item.getNoteDOM()
            content.appendChild(noteDOM)

            //为删除绑定事件
            let remove = noteDOM.getElementsByClassName('icon-shanchu1')[0]
            remove.onclick = () => {
                this.removeNote(item)
            }


        })

        //设置渲染时机
        document.getElementsByClassName('mainDiv')[0].onclick = (event) => {
            console.log(event.target.render);
            if (event.target.render == true)
                this.render()
        }




    }


}