import ModalAbstract from "./ModalAbstract";
import RenderModalTemplate from './templates/modalTemplate'
import ModalInterface from './Interfaces/Modal/ModalInterface'
import EventsAwareInterface from './Interfaces/EventsAwareInterface'
import HeadingDataInterface from "./Interfaces/HeadingDataInterface";
import ModalModeInterface from './Interfaces/Modal/ModalModeInterface'
import HeadingModalOptionsInterface from './Interfaces/HeadingModalOptionsInterface'

export default class HeadingModal extends ModalAbstract implements ModalInterface, EventsAwareInterface{


    constructor(mode: ModalModeInterface, options: HeadingModalOptionsInterface) {
        const defaultOptions: HeadingModalOptionsInterface = {
            // modal title
            title: 'summernote heading title',

            // close button text
            closeText: 'Close',

            // save button text
            saveText: 'Save',

            // title input label text
            titleLabel: 'Heading title',

            // title input label text
            subtitleLabel: 'Heading subtitle',

            // the html element class containing the modal messages
            messageContainerClass: 'snb-modal-message',

            // the default value of the underline color input
            defaultUnderlineColor: '#c50000',

            // the text of the label of the underline color input
            underlineColorLabel: 'Underline color',

            // modal inputs validations
            validations: {
                "title": ["required"],
                "subtitle": ["required"]
            }
        }

        const headingModalOptions: HeadingModalOptionsInterface = $.extend(defaultOptions, options);

        super(mode, headingModalOptions)
    }

    getSaveButton(): JQuery {
        return this.$modal.find("button#save")
    }

    getData(): HeadingDataInterface {
        return {
            brickIdentifier: `brick_${Date.now()}`,
            title: this.getBody().find('#snb-heading-title').val().toString(),
            subtitle: this.getBody().find('#snb-heading-subtitle').val().toString(),
            underlineColor: this.getBody().find('#snb-heading-underline-color').val().toString()
        }
    }

    getBody(): JQuery {
        return this.$modal.find('.modal-body')
    }

    getMessagesContainer(): JQuery {
        return this.$modal.find(`.${this.options.messageContainerClass}`)
    }

    getTemplate(data: HeadingDataInterface, options: HeadingModalOptionsInterface): JSX.Element {
        return RenderModalTemplate(data, options)
    }
}