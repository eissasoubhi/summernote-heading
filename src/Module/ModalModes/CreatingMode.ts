import Utils from "../Utils";
import RenderBrickStyle from '../styles/brickStyle'
import ModalModeAbstract from "../ModalModeAbstract";
import HeadingDataInterface from "../Interfaces/HeadingDataInterface";
import ModalModeInterface from '../Interfaces/Modal/ModalModeInterface'

export default class CreatingMode extends ModalModeAbstract implements ModalModeInterface {

    save(data: HeadingDataInterface): void {
        if (!this.editor.hasStyle(this.editor.styleIdentifier)) {
            this.editor.insertHtml(this.createStyle())
        }

        this.editor.insertNode(this.createBrick(data))
        this.editor.insertHtml(this.createBlankLine(data))
    }

    getModalLoadData(): HeadingDataInterface {
        return {
            brickIdentifier: Date.now().toString(),
            title: '',
            subtitle: '',
        }
    }

    createStyle(): string {
        let style = Utils.JSXElementToHTMLElement( RenderBrickStyle({
            styleIdentifier: this.editor.styleIdentifier,
            snbBrickClass: this.editor.editableBrickClass
        }) )

        style =  $(style).wrap('<span contenteditable="false"></span>').parent()[0]

        // for an unknown reason, quotes and double-quotes inside the style tags are escaped,
        // here we recover them by replacing the escaped characters.
        // the escaped string must be inserted to the editor as HTML text, not as HTML node, in order for it to work
        return style.outerHTML.replace(/(&quot;)|(&#x27;)/g, '"')
    }

    createBlankLine(data: HeadingDataInterface): string {
        return `<p class="${this.editor.blankLineClass} ${data.brickIdentifier}" ><br></p>`
    }
}