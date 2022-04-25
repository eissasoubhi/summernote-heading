import ModalModeAbstract from "./ModalModeAbstract";
import HeaderDataInterface from "./Interfaces/HeaderDataInterface";
import ModalModeInterface from './Interfaces/Modal/ModalModeInterface'

export default class CreatingMode extends ModalModeAbstract implements ModalModeInterface {

    save(data: HeaderDataInterface): void {
        const newLine = '<p><br></p>'

        this.editor.insertNode(this.createBrick(data))
        this.editor.insertHtml(newLine)
    }

    getModalLoadData(): HeaderDataInterface {
        return {
            brickIdentifier: Date.now().toString(),
            title: '',
        }
    }
}