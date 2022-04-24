import SummernoteHeader from './SummernoteHeader'

export default class GalleryPlugin {
    private summernoteHeader: SummernoteHeader;
    private readonly name: string;
    
    constructor(name: string) {
        this.name = name
        this.summernoteHeader = new SummernoteHeader(this.name);
    }

    getPlugin(): object {
        let plugin: any = {};
        let _this = this;

        plugin[this.name] = function(context: any) {

            _this.summernoteHeader.init(context);

            context.memo('button.' + _this.name, _this.createButton());

            this.events = {
                'summernote.keyup': function(we: any, e: any)
                {
                    _this.summernoteHeader.editor.saveLastFocusedElement();
                }
            };

            this.initialize = function() {

            };
        }

        return plugin;
    }

    createButton(): JQueryStatic {
        return this.summernoteHeader.createButton();
    }
}