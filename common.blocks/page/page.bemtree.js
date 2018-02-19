block('page').content()(function() {
    return [
        {
            block: 'content',
            mods: { type: 'center' },
            content: [
                {
                    block: 'input-search',
                    data: '/kladr.json'
                }
            ]
        }
    ];
});
