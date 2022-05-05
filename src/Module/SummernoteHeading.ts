import Editor from "snb-components/src/Editor"
import HeadingModal from './HeadingModal'
import EditableBrick from "snb-components/src/Module/EditableBrick"
import HeadingCreatingMode from "./ModalModes/HeadingCreatingMode"
import ModalModeInterface from "snb-components/src/Module/Interfaces/Modal/ModalModeInterface"
import SummernoteBrickInterface from 'snb-components/src/Module/Interfaces//SummernoteBrickInterface'
import SummernotePluginInterface from 'snb-components/src/Module/Interfaces//Plugin/SummernotePluginInterface'
import HeadingPluginOptionsInterface from "./Interfaces/HeadingPluginOptionsInterface";
import HeadingEditingMode from "./ModalModes/HeadingEditingMode";
import ExtensionsManager from "snb-components/src/ExtensionsManager";
import ExtensibleBrickInterface from "snb-components/src/Module/Interfaces/ExtensibleBrickInterface";
import SnbExtensionInterface from "snb-components/src/Module/Interfaces/SnbExtensionInterface";
import HeadingMessageFactoriesProvider from "./Messages/HeadingMessageFactoriesProvider";
import LineBreakManager from "snb-components/src/LineBreak/LineBreakManager";

export default class SummernoteHeading implements SummernoteBrickInterface, SummernotePluginInterface, ExtensibleBrickInterface {
    private pluginOptions: HeadingPluginOptionsInterface;
    private readonly pluginName: string;
    public editor: Editor;
    private extensionsManager: ExtensionsManager;
    private readonly extensions: SnbExtensionInterface[];
    private linebreakManager: LineBreakManager;

    constructor(pluginName: string, extensions: SnbExtensionInterface[]) {
        this.pluginName = pluginName

        this.extensions = extensions

        this.extensionsManager = new ExtensionsManager()
    }

    init(context: any): void {
        this.pluginOptions = $.extend( this.defaultOptions(), context.options[this.pluginName])

        this.editor = new Editor(context)

        this.linebreakManager = new LineBreakManager(this.editor)

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

            this.linebreakManager.removeBlankLinebreak(blankLineIdentifier)
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
        let modal = new HeadingModal(mode, new HeadingMessageFactoriesProvider(), this.pluginOptions.modal)

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
                'snbWhiteSpaceManager'
            ]
        }
    }
 }