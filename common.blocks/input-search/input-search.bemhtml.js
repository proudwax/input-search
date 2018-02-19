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
                mods: {
                    theme: 'islands',
                    size: 'm'
                },
                placeholder: 'Введите имя'
            },
            {
                block: 'popup',
                mainOffset: 1,
                directions: ['bottom-left'],
                mods: { theme: 'islands', target: 'anchor', autoclosable: true },
                content: [
                    {
                        block: 'spin',
                        mods: {  theme: 'islands',  size: 'm',  visible: true  }
                    }
                ]
            }
        ];
    })
);
