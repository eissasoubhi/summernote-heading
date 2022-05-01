import HeadingModalOptionsInterface from "./HeadingModalOptionsInterface";
import SummernotePluginOptionsInterface from "snb-components/src/Interfaces/Plugin/SummernotePluginOptionsInterface";

export default interface HeadingPluginOptionsInterface extends SummernotePluginOptionsInterface{
    modal?: HeadingModalOptionsInterface
}