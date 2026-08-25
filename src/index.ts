import SummernoteHeadingV3 from './plugin';

const summernote = ($ as any).summernote;

if (!summernote || !summernote.plugins) {
    throw new Error('Summernote must be loaded before summernote-heading.');
}

$.extend(summernote.plugins, {
    summernoteHeading: SummernoteHeadingV3,
});

export { SummernoteHeadingV3 };
export * from './heading';
