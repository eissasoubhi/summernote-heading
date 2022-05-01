import Editor from "./Editor"
import HeadingModal from './HeadingModal'
import EditableBrick from "./EditableBrick"
import HeadingCreatingMode from "./ModalModes/HeadingCreatingMode"
import ModalModeInterface from "./Interfaces/Modal/ModalModeInterface"
import SummernoteBrickInterface from './Interfaces/SummernoteBrickInterface'
import SummernotePluginInterface from './Interfaces/Plugin/SummernotePluginInterface'
import HeadingPluginOptionsInterface from "./Interfaces/HeadingPluginOptionsInterface";
import HeadingEditingMode from "./ModalModes/HeadingEditingMode";
import ExtensionsManager from "./ExtensionsManager";
import ExtensibleBrickInterface from "./Interfaces/ExtensibleBrickInterface";
import SnbExtensionInterface from "./Interfaces/SnbExtensionInterface";

export default class SummernoteHeading implements SummernoteBrickInterface, SummernotePluginInterface, ExtensibleBrickInterface {
    private pluginOptions: HeadingPluginOptionsInterface;
    private readonly pluginName: string;
    public editor: Editor;
    private extensionsManager: ExtensionsManager;
    private extensions: SnbExtensionInterface[];

    constructor(pluginName: string, extensions: SnbExtensionInterface[]) {
        this.pluginName = pluginName

        this.extensionsManager = new ExtensionsManager()

        this.extensions = extensions
    }

    init(context: any): void {
        this.pluginOptions = $.extend( this.defaultOptions(), context.options[this.pluginName])

        this.editor = new Editor(context)

        this.attachEditorEvents();

        this.addOptionsExtensions()

        this.extensionsManager.triggerEvent('onInit', [this.editor])
    }

    attachEditorEvents() {
        this.editor.on('brick-editing', (brick: HTMLElement) => {
            this.openModal(new HeadingEditingMode(brick, this.editor) )
        })

        this.editor.on('brick-removed', (brick: HTMLElement) => {
            const editableBrick = new EditableBrick(brick, {
                editableBrickClass: this.editor.editableBrickClass,
            })

            const blankLineIdentifier = editableBrick.getBrickData().brickIdentifier

            this.editor.removeBlankLine(blankLineIdentifier)
        })
    }

    addOptionsExtensions(): void {
        const optionsExtensions: string[] = this.pluginOptions.extensions || [
            ''
        ]
        const indexedExtensions: { [key: string]: SnbExtensionInterface } = {}

        for (let i = 0; i < this.extensions.length; i++) {
            indexedExtensions[this.extensions[i].name] = this.extensions[i]
        }

        for (let i = 0; i < optionsExtensions.length; i++) {
            const optionsExtension = optionsExtensions[i]

            if (typeof indexedExtensions[optionsExtension] !== 'undefined') {
                this.use(indexedExtensions[optionsExtension])
            } else {
                console.error(`"${optionsExtension}" is an invalid extension name`)
            }
        }
    }

    openModal(mode: ModalModeInterface) {
        let modal = new HeadingModal(mode, this.pluginOptions.modal)

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
                this.openModal(new HeadingCreatingMode(this.editor) )
            }
        });

        // create jQuery object from button instance.
        return button.render();
    }

    use(extension: SnbExtensionInterface): void {
        this.extensionsManager.add(extension)
    }

    defaultOptions(): HeadingPluginOptionsInterface {
        return {
            modal: null,

            buttonLabel: '<i class="fa fa-header"></i> SN Heading',

            tooltip: 'Summernote Heading',

            extensions: [
                'whiteSpaceManager'
            ]
        }
    }
 }