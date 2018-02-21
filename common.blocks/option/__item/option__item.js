modules.define('option__item', ['i-bem-dom'], function (provide, bemDom) {

    provide(bemDom.declElem('option', 'item', {
        onSetMod: {
            js: {
                inited: function () {

                }
            }
        },

        getVal: function () {
            return this.params.val;
        }
    }));

});
