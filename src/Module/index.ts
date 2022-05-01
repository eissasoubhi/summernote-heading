import SummernoteHeading from './SummernoteHeading'
import SnbExtensionInterface from "./Interfaces/SnbExtensionInterface";

export default class SummernotePlugin{
    private summernoteHeading: SummernoteHeading;
    private readonly name: string;
    
    constructor(name: string, extensions: SnbExtensionInterface[]) {
        this.name = name
        this.summernoteHeading = new SummernoteHeading(this.name, extensions);
    }

    getPlugin(): object {
        let plugin: any = {};
        let _this = this;

        plugin[this.name] = function(context: any) {

            _this.summernoteHeading.init(context);

            context.memo('button.' + _this.name, _this.createButton());

            this.events = {
                'summernote.keyup': function(we: any, e: any)
                {
                    _this.summernoteHeading.editor.saveLastFocusedElement();
                }
            };

            this.initialize = function() {

            };
        }

        return plugin;
    }

    createButton(): JQueryStatic {
        return this.summernoteHeading.createButton();
    }
}