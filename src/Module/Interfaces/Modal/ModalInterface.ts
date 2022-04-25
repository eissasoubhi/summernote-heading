import HeadingDataInterface from "../HeadingDataInterface";

export default interface ModalInterface {

    open(data: HeadingDataInterface): void

    close(): void

    getData(): HeadingDataInterface
}