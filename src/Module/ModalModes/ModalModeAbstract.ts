import Utils from "../Utils";
import Editor from "../Editor";
import EditableBrick from "../EditableBrick";
import RenderBrickTemplate from "../templates/brickTemplate";
import HeadingDataInterface from "../Interfaces/HeadingDataInterface";

export default abstract class ModalModeAbstract {

    protected editor: Editor;

    constructor(editor: Editor) {
        this.editor = editor
    }

    createBrick(data: HeadingDataInterface): HTMLElement {
        const newBrick = Utils.JSXElementToHTMLElement( RenderBrickTemplate(data) )

        const editableBrick = new EditableBrick(newBrick, {
            editableBrickClass: this.editor.editableBrickClass
        })

        return editableBrick.renderBrick()
    }
}