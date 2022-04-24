import HeaderDataInterface from "../HeaderDataInterface";

export default interface ModalModeInterface {

    save(data: HeaderDataInterface): void

    getModalLoadData(): HeaderDataInterface
}