import Utils from "../Utils";
import RenderErrorTemplate from '../templates/message/errorMessageTemplate'
import MessageInterface from "../Interfaces/MessageInterface";

export default class ErrorMessage implements MessageInterface{
    private readonly message: string;

    constructor(message: string) {
        this.message = message
    }

    getHtmlNode() {
        return Utils.JSXElementToHTMLElement( RenderErrorTemplate(this.message) )
    }

}