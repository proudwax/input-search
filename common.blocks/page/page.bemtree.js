block('page').content()(function () {
    return [
        {
            block: 'test',
            content: [
                {
                    elem: 'elem',
                    mix: { block: 'content' },
                    content: [
                        {
                            block: 'input-search',
                            mods: { size: 'm', theme: 'islands' },
                            data: '/kladr.json',
                            name: 'city'
                        }
                    ]
                }
            ]
        }
    ];
});
