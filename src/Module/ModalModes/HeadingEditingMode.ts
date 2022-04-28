import BrickTemplateRenderer from "../templates/brickTemplate";
import BrickEditingModeAbstract from "./BrickEditingModeAbstract";
import HeadingDataInterface from "../Interfaces/HeadingDataInterface";

export default class HeadingEditingMode extends BrickEditingModeAbstract {

    getBrickTemplate(data: HeadingDataInterface): JSX.Element {
        return BrickTemplateRenderer(data);
    }
}