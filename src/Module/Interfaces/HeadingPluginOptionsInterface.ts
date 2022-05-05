import HeadingModalOptionsInterface from "./HeadingModalOptionsInterface";
import SummernotePluginOptionsInterface from "snb-components/src/Module/Interfaces/Plugin/SummernotePluginOptionsInterface";

export default interface HeadingPluginOptionsInterface extends SummernotePluginOptionsInterface{
    modal?: HeadingModalOptionsInterface
}