import ModalOptionsInterface from './Modal/ModalOptionsInterface'

export default interface HeadingModalOptionsInterface extends ModalOptionsInterface {
    titleLabel: string
    
    subtitleLabel: string

    underlineColorLabel: string

    defaultUnderlineColor: string

    validations: any
}