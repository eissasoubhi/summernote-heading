import ModalModeAbstract from "./ModalModeAbstract";
import HeadingDataInterface from "./Interfaces/HeadingDataInterface";
import ModalModeInterface from './Interfaces/Modal/ModalModeInterface'

export default class CreatingMode extends ModalModeAbstract implements ModalModeInterface {

    save(data: HeadingDataInterface): void {
        const newLine = '<p><br></p>'

        this.editor.insertNode(this.createBrick(data))
        this.editor.insertHtml(newLine)
    }

    getModalLoadData(): HeadingDataInterface {
        return {
            brickIdentifier: Date.now().toString(),
            title: '',
            subtitle: '',
        }
    }
}