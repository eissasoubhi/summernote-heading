import ModalOptionsInterface from "snb-components/src/Module/Interfaces/Modal/ModalOptionsInterface";

export default interface HeadingModalOptionsInterface extends ModalOptionsInterface {
    titleLabel: string
    
    subtitleLabel: string

    underlineColorLabel: string

    defaultUnderlineColor: string
}