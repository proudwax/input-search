block('option').elem('item')(
    tag()('span'),

    addAttrs()(function (node, ctx) {
        return {
            role: 'option'
        };
    })
);
