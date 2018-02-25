modules.define('option__item', ['i-bem-dom'], function (provide, bemDom) {

    provide(bemDom.declElem('option', 'item', {
        onSetMod: {
            js: {
                inited: function () {
                    this._domEvents()
                        .on('pointerleave', this._onPointerLeave)
                        .on('pointerover', this._onPointerOver)
                        .on('click', this._onClick);
                }
            }
        },

        getVal: function () {
            return this.params.val;
        },

        _onPointerOver: function () {
            this.setMod('hovered');
        },

        _onPointerLeave: function () {
            this.delMod('hovered');
        },

        _onClick: function () {
            this._emit('itemClick', { val: this.params.val });
        }
    }));

});
