import Options from './SummernoteHeaderOptionsInterface'

export default class SummernoteHeader {
    public options: Options;
    private context: any;

    constructor(options: Options) {
        this.options = $.extend({
            name: 'summernoteHeader',
            buttonLabel: '<i class="fa fa-file-header"></i> SN Header',
            tooltip: 'summernote header'
        }, options);
    }

    init(context: any) {
        this.context = context;
    }

    createButton() {
        let button = ($ as any).summernote.ui.button({
            className: 'w-100',
            contents: this.options.buttonLabel,
            tooltip: this.options.tooltip,
            click: () => {
                this.addHeaderToEditor();
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