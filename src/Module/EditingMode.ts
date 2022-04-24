import Editor from "./Editor";
import EditableBrick from "./EditableBrick";
import ModalModeAbstract from "./ModalModeAbstract";
import HeaderDataInterface from "./Interfaces/HeaderDataInterface";
import ModalModeInterface from './Interfaces/Modal/ModalModeInterface'

export default class EditingMode extends ModalModeAbstract implements ModalModeInterface {

    private readonly editingBrick: HTMLElement;

    constructor(editingBrick: HTMLElement, editor: Editor) {
        super(editor);
        this.editingBrick = editingBrick
    }

    save(data: HeaderDataInterface): void {
        $(this.editingBrick).replaceWith(this.createBrick(data))
    }

    getModalLoadData(): HeaderDataInterface {

        let editableBrick = new EditableBrick(this.editingBrick, {
            editableBrickClass: this.editor.editableBrickClass,
        })

        return editableBrick.getBrickData()
    }
}