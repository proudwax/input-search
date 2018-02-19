[{
    mustDeps : 'i-bem-dom',
    shouldDeps : [
        {
            block: 'input',
            mods: {  theme: 'islands',  size: 'm' }
        },
        {
            block: 'popup',
            mods: { theme: 'islands', target: 'anchor', autoclosable: true },
        },
        {
            block: 'spin',
            mods: { theme: 'islands', size: 'm', visible: true }
        },
        'option'
    ]
},
{
    tech: 'js',
    mustDeps: [
        { block: 'option', tech: 'bemhtml' }
    ]
}]
