import BrickTemplateRenderer from "../templates/brickTemplate";
import HeadingDataInterface from "../Interfaces/HeadingDataInterface";
import BrickEditingModeAbstract from "snb-components/src/Module/ModalModes/BrickEditingModeAbstract";

export default class HeadingEditingMode extends BrickEditingModeAbstract {

    getBrickTemplate(data: HeadingDataInterface): JSX.Element {
        return BrickTemplateRenderer(data);
    }
}