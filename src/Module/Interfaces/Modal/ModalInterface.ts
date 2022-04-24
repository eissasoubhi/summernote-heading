import HeaderDataInterface from "../HeaderDataInterface";

export default interface ModalInterface {

    open(data: HeaderDataInterface): void

    close(): void

    getData(): HeaderDataInterface
}