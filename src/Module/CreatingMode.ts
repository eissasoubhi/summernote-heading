import ModalModeAbstract from "./ModalModeAbstract";
import HeaderDataInterface from "./Interfaces/HeaderDataInterface";
import ModalModeInterface from './Interfaces/Modal/ModalModeInterface'

export default class CreatingMode extends ModalModeAbstract implements ModalModeInterface {

    save(data: HeaderDataInterface): void {
        this.editor.insert(this.createBrick(data))
    }

    getModalLoadData(): HeaderDataInterface {
        return {
            brickIdentifier: Date.now().toString(),
            title: '',
        }
    }
}