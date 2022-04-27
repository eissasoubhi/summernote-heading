import HeadingDataInterface from "../HeadingDataInterface";
import HeadingModalOptionsInterface from "../HeadingModalOptionsInterface";

export default interface ModalModeInterface {

    save(data: HeadingDataInterface): void

    getModalLoadData(modalOptions: HeadingModalOptionsInterface): HeadingDataInterface
}