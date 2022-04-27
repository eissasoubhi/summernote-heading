import Utils from "./Utils";
import EventManager from "./EventManager";
import RenderModalTemplate from './templates/modalTemplate'
import ModalInterface from './Interfaces/Modal/ModalInterface'
import EventsAwareInterface from './Interfaces/EventsAwareInterface'
import HeadingDataInterface from "./Interfaces/HeadingDataInterface";
import ModalModeInterface from './Interfaces/Modal/ModalModeInterface'
import HeadingModalOptionsInterface from './Interfaces/HeadingModalOptionsInterface'
import DataValidator from "./DataValidator";
import ErrorMessage from "./Messages/ErrorMessage";

export default class HeadingModal implements ModalInterface, EventsAwareInterface{
    private $modal: JQuery;
    private eventManager: EventsAwareInterface;
    private readonly options: HeadingModalOptionsInterface;
    private mode: ModalModeInterface;

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
            underlineColorLabel: 'Underline color'
        }

        this.options = $.extend(defaultOptions, options);

        this.mode = mode;

        this.eventManager = new EventManager();
    }

    attachEvents($modal: JQuery) {
        let _this = this;

        $modal.find("button#save").on('click',function(event) {

            const validator = new DataValidator(_this.getData())

            _this.clearMessages()

            if (!validator.isValid()) {
                _this.showErrors(validator.getErrors())
                return
            }

            _this.close()

            _this.trigger('beforeSave');

            _this.trigger('save', {data: _this.getData()});
            _this.mode.save(_this.getData())

            _this.trigger('afterSave');
        });
    }

    open() {
        this.$modal = this.createModal(this.mode.getModalLoadData(this.options));

        this.attachEvents(this.$modal);

        (this.$modal as any).modal();
    }

    close() {
        (this.$modal as any).modal('hide');
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

    createModal(data: HeadingDataInterface): JQuery {
        const modalJSX = RenderModalTemplate(data, this.options)
        return $( Utils.JSXElementToHTMLElement(modalJSX) ).hide();
    }

    on(eventName: string, eventHandler: (data: unknown) => void): EventsAwareInterface {
        return this.eventManager.on(eventName, eventHandler);
    }

    trigger(eventName: string, data: any = {}): EventsAwareInterface {
        return this.eventManager.trigger(eventName, data) ;
    }

    showErrors(errors: any): void {

        for (const errorKey in errors) {
            const message = new ErrorMessage(errors[errorKey])
            const messageNode = message.getHtmlNode()

            this.getMessagesContainer().append(messageNode)
        }
    }

    clearMessages():void {
        this.getMessagesContainer().html('')
    }
}