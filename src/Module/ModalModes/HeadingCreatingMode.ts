import BrickStyleRenderer from '../styles/brickStyle'
import BrickTemplateRenderer from "../templates/brickTemplate";
import HeadingDataInterface from "../Interfaces/HeadingDataInterface";
import HeadingModalOptionsInterface from "../Interfaces/HeadingModalOptionsInterface";
import BrickCreatingModeAbstract from "snb-components/src/ModalModes/BrickCreatingModeAbstract";

export default class HeadingCreatingMode extends BrickCreatingModeAbstract {

    getModalLoadData(modalOptions: HeadingModalOptionsInterface): HeadingDataInterface {
        return {
            brickIdentifier: `brick_${Date.now()}`,
            title: '',
            subtitle: '',
            underlineColor: modalOptions.defaultUnderlineColor
        }
    }

    getBrickStyleTemplate(data: HeadingDataInterface): JSX.Element {
        return BrickStyleRenderer({
            styleIdentifier: this.editor.styleIdentifier,
            snbBrickClass: this.editor.editableBrickClass,
            underlineColor: data.underlineColor
        })
    }

    getBrickTemplate(data: HeadingDataInterface): JSX.Element {
        return BrickTemplateRenderer(data)
    }
}