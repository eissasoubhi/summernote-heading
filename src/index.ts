import SummernotePlugin from './Module'

let summernotePlugin = new SummernotePlugin('summernoteHeading');

// add the plugin to summernote
$.extend(($ as any).summernote.plugins, summernotePlugin.getPlugin());
