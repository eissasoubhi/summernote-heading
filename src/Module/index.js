import SummernoteHeader from './SummernoteHeader'

export default class GalleryPlugin {
    constructor(options) {
        this.summernote_header = new SummernoteHeader(options);
    }

    getPlugin() {
        let plugin = {};
        let _this = this;
        let options = this.summernote_header.options

        plugin[options.name] = function(context) {

            let sgOptions = context.options[options.name] || {}
            let buttonLabel = sgOptions.buttonLabel || _this.summernote_header.options.buttonLabel

            _this.summernote_header.options.buttonLabel = buttonLabel

            // add gallery button
            context.memo('button.' + options.name, _this.createButton());

            this.events = {
                'summernote.keyup': function(we, e)
                {

                }
            };

            this.initialize = function() {
                _this.summernote_header.init(context);
            };
        }

        return plugin;
    }

    createButton() {
        return this.summernote_header.createButton();
    }
}