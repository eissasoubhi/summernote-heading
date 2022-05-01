import SummernotePlugin from './Module'
import extensions from './Extensions'

let summernotePlugin = new SummernotePlugin('summernoteHeading', extensions);

// add the plugin to summernote
$.extend(($ as any).summernote.plugins, summernotePlugin.getPlugin());
