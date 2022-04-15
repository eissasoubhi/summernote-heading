import GalleryPlugin from './Module'

let gallery_plugin = new GalleryPlugin();

// add the plugin to summernote
$.extend(($ as any).summernote.plugins, gallery_plugin.getPlugin());