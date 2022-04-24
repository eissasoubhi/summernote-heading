import SummernotePlugin from './Module'

let summernotePlugin = new SummernotePlugin('summernoteHeader');

// add the plugin to summernote
$.extend(($ as any).summernote.plugins, summernotePlugin.getPlugin());
