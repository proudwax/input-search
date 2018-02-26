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
                    size: ctx.mods.size || false
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
                                elem: 'item',
                                elemMods: 'spin',
                                content: [
                                    {
                                        block: 'spin',
                                        mix: { block: 'option', elem: 'spin' },
                                        mods: {
                                            theme: ctx.mods.theme || false,
                                            size: 's',
                                            visible: true
                                        }
                                    },
                                    'Загрузка'
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
    })
);
