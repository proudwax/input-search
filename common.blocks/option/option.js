modules.define('option', ['i-bem-dom', 'option__item', 'BEMHTML'], function (provide, bemDom, OptionItem, BEMHTML) {

    provide(bemDom.declBlock(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                }
            }
        },

        onScroll: function () {
            this._domEvents().on('scroll', function (e) {
                console.dir(this.domElem[0]);
                console.log(this.domElem[0].scrollTop);
            });

        },

        onClick: function (block) {
            this._domEvents({ elem: 'item' }).on('click', function (e) {
                block._input.setVal(e.bemTarget.getVal()).setMod('focused');
                block._popup.delMod('visible');
            });
        },

        updateItems: function (bemJson) {
            bemDom.update(this.domElem, BEMHTML.apply({ block: 'option', tag: '', content: bemJson }));

            return this;
        },

        addItems: function (bemJson) {
            bemDom.append(this.domElem, BEMHTML.apply({ block: 'option', tag: '', content: bemJson }));
        },

        addSpin: function () {
            bemDom.append(this.domElem, BEMHTML.apply({ block: 'spin', mods: { theme: 'islands', size: 'm', visible: true } }));
        },

        // removeSpin: function () {
        //     bemDom.destruct(this.domElem,  
        // }
    }));

});

