import HeadingDataInterface from "../HeadingDataInterface";

export default interface ModalModeInterface {

    save(data: HeadingDataInterface): void

    getModalLoadData(): HeadingDataInterface
}