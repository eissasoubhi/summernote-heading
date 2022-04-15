
export default class SummernoteGallery {
    constructor(options) {
        this.options = $.extend({
            name: 'summernoteHeader',
            buttonLabel: '<i class="fa fa-file-header"></i> SN Header',
            tooltip: 'summernote header'
        }, options);

        this.plugin_default_options = {}
    }

    init(context) {
        this.context = context;
    }

    createButton() {
        var _this = this;

        var button = $.summernote.ui.button({
            className: 'w-100',
            contents: this.options.buttonLabel,
            tooltip: this.options.tooltip,
            click: function() {
                _this.addHeaderToEditor();
            }
        });

        // create jQuery object from button instance.
        return button.render();
    }

    addHeaderToEditor() {
        this.context.invoke(
            'editor.pasteHTML',
            '<div style="color: brown"><h1>Summernote header</h1></div>'
        );
    }
}