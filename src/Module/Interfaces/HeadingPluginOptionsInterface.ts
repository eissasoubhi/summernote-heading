import HeadingModalOptionsInterface from "./HeadingModalOptionsInterface";
import SummernotePluginOptionsInterface from "./Plugin/SummernotePluginOptionsInterface";

export default interface HeadingPluginOptionsInterface extends SummernotePluginOptionsInterface{
    modal?: HeadingModalOptionsInterface
}