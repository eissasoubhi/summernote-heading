import { HeadingData, HeadingLevel, parseHeading, renderHeading } from './heading';

const PLUGIN_NAME = 'summernoteHeading';
const EVENT_NAMESPACE = '.snbHeadingV3';

interface HeadingV3Options {
    buttonLabel: string;
    tooltip: string;
    defaultLevel: HeadingLevel;
    dialogTitle: string;
    saveText: string;
    titleLabel: string;
    subtitleLabel: string;
    levelLabel: string;
    anchorLabel: string;
}

const defaultOptions: HeadingV3Options = {
    buttonLabel: 'Heading',
    tooltip: 'Insert heading',
    defaultLevel: 2,
    dialogTitle: 'Heading',
    saveText: 'Save',
    titleLabel: 'Title',
    subtitleLabel: 'Subtitle',
    levelLabel: 'Level',
    anchorLabel: 'Anchor',
};

function escapeAttribute(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function fieldId(context: any, suffix: string): string {
    const editorId = context.options && context.options.id ? String(context.options.id) : 'editor';
    return `snb-heading-${editorId}-${suffix}`;
}

function renderDialogBody(context: any, options: HeadingV3Options): string {
    const titleId = fieldId(context, 'title');
    const subtitleId = fieldId(context, 'subtitle');
    const levelId = fieldId(context, 'level');
    const anchorId = fieldId(context, 'anchor');

    return [
        '<div class="snb-heading-form">',
        `<label for="${levelId}">${escapeAttribute(options.levelLabel)}</label>`,
        `<select id="${levelId}" class="snb-heading-form__level">`,
        '<option value="1">H1</option>',
        '<option value="2">H2</option>',
        '<option value="3">H3</option>',
        '<option value="4">H4</option>',
        '<option value="5">H5</option>',
        '<option value="6">H6</option>',
        '</select>',
        `<label for="${titleId}">${escapeAttribute(options.titleLabel)}</label>`,
        `<input id="${titleId}" class="snb-heading-form__title" type="text" autocomplete="off">`,
        `<label for="${subtitleId}">${escapeAttribute(options.subtitleLabel)}</label>`,
        `<input id="${subtitleId}" class="snb-heading-form__subtitle" type="text" autocomplete="off">`,
        `<label for="${anchorId}">${escapeAttribute(options.anchorLabel)}</label>`,
        `<input id="${anchorId}" class="snb-heading-form__anchor" type="text" autocomplete="off">`,
        '<p class="snb-heading-form__error" role="alert" aria-live="polite"></p>',
        '</div>',
    ].join('');
}

function readDialogData($dialog: JQuery): HeadingData {
    const level = Number($dialog.find('.snb-heading-form__level').val()) as HeadingLevel;

    return {
        level,
        title: String($dialog.find('.snb-heading-form__title').val() || ''),
        subtitle: String($dialog.find('.snb-heading-form__subtitle').val() || ''),
        anchor: String($dialog.find('.snb-heading-form__anchor').val() || ''),
    };
}

function writeDialogData($dialog: JQuery, data: HeadingData): void {
    $dialog.find('.snb-heading-form__level').val(String(data.level));
    $dialog.find('.snb-heading-form__title').val(data.title);
    $dialog.find('.snb-heading-form__subtitle').val(data.subtitle || '');
    $dialog.find('.snb-heading-form__anchor').val(data.anchor || '');
    $dialog.find('.snb-heading-form__error').text('');
}

export default function SummernoteHeadingV3(this: any, context: any): void {
    const ui = ($ as any).summernote.ui;
    const pluginOptions = $.extend(true, {}, defaultOptions, context.options[PLUGIN_NAME] || {}) as HeadingV3Options;
    const $editable = context.layoutInfo.editable as JQuery;
    const $editor = context.layoutInfo.editor as JQuery;
    let $dialog: JQuery | null = null;
    let editingTarget: HTMLElement | null = null;

    context.memo(`button.${PLUGIN_NAME}`, () => {
        return ui.button({
            contents: pluginOptions.buttonLabel,
            tooltip: pluginOptions.tooltip,
            click: () => this.show(),
        }).render();
    });

    this.initialize = () => {
        const $container = context.options.dialogsInBody ? $(document.body) : $editor;

        $dialog = ui.dialog({
            title: pluginOptions.dialogTitle,
            body: renderDialogBody(context, pluginOptions),
            footer: `<button type="button" class="note-btn snb-heading-form__save">${escapeAttribute(pluginOptions.saveText)}</button>`,
        }).render().appendTo($container);

        $editable.on(`dblclick${EVENT_NAMESPACE}`, '[data-snb-brick="heading"]', (event) => {
            const target = event.currentTarget;

            if (target instanceof HTMLElement) {
                this.show(target);
            }
        });
    };

    this.destroy = () => {
        $editable.off(EVENT_NAMESPACE);

        if ($dialog) {
            ui.hideDialog($dialog);
            $dialog.remove();
            $dialog = null;
        }

        editingTarget = null;
    };

    this.show = (target?: HTMLElement) => {
        if (!$dialog) {
            return;
        }

        editingTarget = target || null;
        const existing = editingTarget ? parseHeading(editingTarget) : null;

        writeDialogData($dialog, existing || {
            level: pluginOptions.defaultLevel,
            title: '',
            subtitle: '',
            anchor: '',
        });

        const $save = $dialog.find('.snb-heading-form__save');
        $save.off(`click${EVENT_NAMESPACE}`);

        ui.onDialogShown($dialog, () => {
            $dialog && $dialog.find('.snb-heading-form__title').trigger('focus');
        });

        ui.onDialogHidden($dialog, () => {
            $save.off(`click${EVENT_NAMESPACE}`);
            editingTarget = null;
        });

        $save.on(`click${EVENT_NAMESPACE}`, (event: JQuery.ClickEvent) => {
            event.preventDefault();

            if (!$dialog) {
                return;
            }

            try {
                const nextElement = renderHeading(readDialogData($dialog));

                if (editingTarget) {
                    context.invoke('editor.beforeCommand');
                    editingTarget.replaceWith(nextElement);
                    context.invoke('editor.afterCommand');
                } else {
                    context.invoke('editor.insertNode', nextElement);
                }

                ui.hideDialog($dialog);
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Unable to save heading.';
                $dialog.find('.snb-heading-form__error').text(message);
            }
        });

        ui.showDialog($dialog);
    };
}
