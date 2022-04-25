import Utils from "./Utils";
import EventManager from "./EventManager";
import RenderModalTemplate from './templates/modalTemplate'
import ModalInterface from './Interfaces/Modal/ModalInterface'
import EventsAwareInterface from './Interfaces/EventsAwareInterface'
import HeadingDataInterface from "./Interfaces/HeadingDataInterface";
import ModalModeInterface from './Interfaces/Modal/ModalModeInterface'
import HeadingModalOptionsInterface from './Interfaces/HeadingModalOptionsInterface'

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

            subtitleLabel: 'Heading subtitle',
        }

        this.options = $.extend(defaultOptions, options);

        this.mode = mode;

        this.eventManager = new EventManager();
    }

    attachEvents($modal: JQuery) {
        let _this = this;

        $modal.find("button#save").on('click',function(event) {

            _this.close()

            _this.trigger('beforeSave');

            _this.trigger('save', {data: _this.getData()});
            _this.mode.save(_this.getData())

            _this.trigger('afterSave');
        });
    }

    open() {
        this.$modal = this.createModal(this.mode.getModalLoadData());

        this.attachEvents(this.$modal);

        (this.$modal as any).modal();
    }

    close() {
        (this.$modal as any).modal('hide');
    }

    getData(): HeadingDataInterface {
        return {
            brickIdentifier: Date.now().toString(),
            title: this.getBody().find('#snb-heading-title').val().toString(),
            subtitle: this.getBody().find('#snb-heading-subtitle').val().toString(),
        }
    }

    getBody(): JQuery {
        return this.$modal.find('.modal-body')
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
}