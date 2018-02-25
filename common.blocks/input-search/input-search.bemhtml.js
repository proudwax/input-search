block('input-search')(
    js()(function (node, ctx) {
        return {
            'url': ctx.data
        };
    }),

    def()(function (node, ctx) {
        return applyNext();
    }),

    content()(function (node, ctx) {
        return [
            {
                block: 'input',
                mix: { block: this.block, elem: 'input' },
                mods: {
                    theme: ctx.mods.theme || false,
                    size: ctx.mods.size || false,
                    'has-clear': true
                },
                name: ctx.name || null,
                placeholder: 'Введите имя'
            },
            {
                block: 'popup',
                mix: { block: this.block, elem: 'popup' },
                mainOffset: 1,
                directions: ['bottom-left'],
                mods: {
                    theme: ctx.mods.theme || false,
                    target: 'anchor',
                    autoclosable: true
                },
                content: [
                    {
                        block: 'option',
                        mods: { size: 'm' },
                        content: [
                            {
                                block: 'spin',
                                mix: { block: 'option', elem: 'spin' },
                                mods: {
                                    theme: ctx.mods.theme || false,
                                    size: ctx.mods.size || false,
                                    visible: true
                                }
                            }
                        ]
                    }
                ]
            }
        ];
    })
);
