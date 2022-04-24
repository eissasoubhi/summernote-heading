import Editor from "./Editor";
import EditingMode from "./EditingMode";
import HeaderModal from './HeaderModal'
import CreatingMode from "./CreatingMode";
import SummernoteBrickInterface from './Interfaces/SummernoteBrickInterface'
import SummernotePluginInterface from './Interfaces/Plugin/SummernotePluginInterface'
import ModalModeInterface from "./Interfaces/Modal/ModalModeInterface";
import SummernotePluginOptionsInterface from './Interfaces/Plugin/SummernotePluginOptionsInterface'

export default class SummernoteHeader implements SummernoteBrickInterface, SummernotePluginInterface {
    private pluginOptions: SummernotePluginOptionsInterface;
    private readonly pluginName: string;
    public editor: Editor;

    constructor(pluginName: string) {
        this.pluginName = pluginName
    }

    init(context: any): void {
        this.pluginOptions = context.options[this.pluginName] || {}

        this.editor = new Editor(context)

        this.attachEditorEvents();
    }

    attachEditorEvents() {
        this.editor.on('brick-editing', (brick: HTMLElement) => {
            this.openModal(new EditingMode(brick, this.editor) )
        })
    }


    openModal(mode: ModalModeInterface) {
        let modal = new HeaderModal(mode, this.pluginOptions.modal)

        modal.on('beforeSave',  () => {
            this.editor.recoverEditorFocus();
        });

        modal.open()
    }

    createButton():JQueryStatic {
        let button = ($ as any).summernote.ui.button({
            className: 'w-100',
            contents: this.pluginOptions.buttonLabel,
            tooltip: this.pluginOptions.tooltip,
            click: () => {
                this.openModal(new CreatingMode(this.editor) )
            }
        });

        // create jQuery object from button instance.
        return button.render();
    }
}