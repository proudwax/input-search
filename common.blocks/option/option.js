modules.define('option', ['i-bem-dom', 'option__item', 'spin', 'keyboard__codes', 'BEMHTML'], function (provide, bemDom, OptionItem, Spin, keyCodes, BEMHTML) {

    provide(bemDom.declBlock(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this._input = null;

                    this._events(OptionItem).on('itemClick', this._onItemClick);

                    this._events(OptionItem).on({ modName: 'hovered', modVal: '*' }, function (e) {
                        this._onItemHover(e.bemTarget);
                    });

                }
            },

            focused: {
                true: function () {
                    this._domEvents(bemDom.doc).on('keydown', this._onKeyDown);
                },

                '': function () {
                    this._domEvents(bemDom.doc).un('keydown');
                }
            }
        },

        onScroll: function () {
            this._domEvents().on('scroll', function (e) {
                console.dir(this.domElem[0]);
                console.log(this.domElem[0].scrollTop);
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

        removeSpin: function () {
            bemDom.destruct(this.findChildBlock(Spin).domElem);
        },

        setInput: function (input) {
            this._input = input;

            return this;
        },

        _onKeyDown: function (e) {
            var keyCode = e.keyCode,
                isArrow = keyCode === keyCodes.UP || keyCode === keyCodes.DOWN;

            if (isArrow && !e.shiftKey) {
                e.preventDefault();

                var dir = keyCode - 39, // using the features of key codes for "up"/"down" ;-)
                    items = this.findChildElems('item'),
                    len = items.size(),
                    hoveredIdx = items.toArray().indexOf(this._hoveredItem),
                    nextIdx = hoveredIdx,
                    i = 0;

                if (len === 1) {
                    items.get(0).setMod('hovered');
                    return; // if we have no next item to hover
                }

                do {
                    nextIdx += dir;
                    nextIdx = nextIdx < 0 ? len - 1 : nextIdx >= len ? 0 : nextIdx;
                } while (items.get(nextIdx).hasMod('disabled'));

                items.get(nextIdx).setMod('hovered');
            }

            if (e.keyCode === keyCodes.ENTER) {
                this._hoveredItem._emit('itemClick', { val: this._hoveredItem.params.val });
            }

        },

        _onItemClick: function (e, data) {
            this._input.setVal(data.val);

            return this;
        },

        _scrollToItem: function (item) {
            var domElemOffsetTop = this.domElem.offset().top,
                itemDomElemOffsetTop = item.domElem.offset().top,
                relativeScroll;

            if ((relativeScroll = itemDomElemOffsetTop - domElemOffsetTop) < 0 ||
                (relativeScroll =
                    itemDomElemOffsetTop +
                    item.domElem.outerHeight() -
                    domElemOffsetTop -
                    this.domElem.outerHeight()) > 0) {
                this.domElem.scrollTop(this.domElem.scrollTop() + relativeScroll);
            }
        },

        _onItemHover: function (item) {
            if (item.hasMod('hovered')) {
                this._hoveredItem && this._hoveredItem.delMod('hovered');
                this._hoveredItem = item;
                this._scrollToItem(item);
            } else if (this._hoveredItem === item) {
                this._hoveredItem = null;
            }
        },
    }));

});

