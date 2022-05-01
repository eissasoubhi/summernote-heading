import RenderErrorTemplate from '../templates/message/errorMessageTemplate'
import Utils from "snb-components/src/Utils";
import MessageFactoriesProvider from "snb-components/src/MessageFactoriesProvider";
import MessagesFactoriesInterface from "snb-components/src/Interfaces/MessagesFactoriesInterface";

export default class HeadingMessageFactoriesProvider extends MessageFactoriesProvider {

    getMessagesFactories(): MessagesFactoriesInterface {
       return {
            'error': (message: string) => Utils.JSXElementToHTMLElement( RenderErrorTemplate(message))
       }
    }
}