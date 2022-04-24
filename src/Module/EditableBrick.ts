import Utils from "./Utils";
import RenderEditableWrap from "./templates/editableWrapTemplate";
import HeaderDataInterface from "./Interfaces/HeaderDataInterface";
import EditableBrickOptionsInterface from "./Interfaces/Editable/EditableBrickOptionsInterface";

export default class EditableBrick {
    private readonly brick: HTMLElement;
    private readonly options: EditableBrickOptionsInterface;
    private readonly snbBrickContainerClass: string;

    constructor(brick: HTMLElement, options: EditableBrickOptionsInterface) {
        this.brick = brick
        this.options = options
        this.snbBrickContainerClass = 'sn-brick-container';
    }

    renderBrick(): HTMLElement {
        const editableWrap = RenderEditableWrap({
            editableBrickClass: this.options.editableBrickClass,
            snbBrickContainerClass: this.snbBrickContainerClass,
        })

        const editableBrick = Utils.JSXElementToHTMLElement(editableWrap)

        $(editableBrick).find(`.${this.snbBrickContainerClass}`).append(this.brick)

        return editableBrick
    }

    getBrickData(): HeaderDataInterface {
        return $(this.brick).find('[data-brickdata]').data('brickdata')
    }
}