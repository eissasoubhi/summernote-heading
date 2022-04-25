import Utils from "./Utils";
import Editor from "./Editor";
import EditableBrick from "./EditableBrick";
import renderBrick from "./templates/brickTemplate";
import HeaderDataInterface from "./Interfaces/HeaderDataInterface";

export default abstract class ModalModeAbstract {

    protected editor: Editor;

    constructor(editor: Editor) {
        this.editor = editor
    }

    createBrick(data: HeaderDataInterface): HTMLElement {
        const newBrick = Utils.JSXElementToHTMLElement( renderBrick(data) )

        const editableBrick = new EditableBrick(newBrick, {
            editableBrickClass: this.editor.editableBrickClass
        })

        return editableBrick.renderBrick()
    }
}