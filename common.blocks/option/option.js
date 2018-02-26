modules.define('option', ['i-bem-dom', 'option__item', 'spin', 'keyboard__codes', 'functions__throttle', 'BEMHTML'], function (provide, bemDom, OptionItem, Spin, keyCodes, throttle, BEMHTML) {

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

        _isVisible: function (node) {
            var coordsNode = node[0].getBoundingClientRect(),
                coordsOption = this.domElem[0].getBoundingClientRect();

            return coordsNode.top > 0 && coordsNode.top < coordsOption.top + coordsOption.height;
        },

        _onScroll: function (data) {
            var items = this.findChildElems('item').toArray(),
                lastItem = items[items.length - 1],
                spin = this.findChildElem({ elem: 'item', modName: 'spin', modVal: true });

            this._domEvents().on('scroll', throttle(
                function (e) {
                    if (this._isVisible(lastItem.domElem)) {
                        this
                            ._replaceContent(this._getBemJson(data.splice(0, 50)), spin.domElem)
                            ._addSpin()
                            ._domEvents().un('scroll');
                        
                        this._addPartOfData(data);
                    }
                }, 100).bind(this));
        },

        updateContent: function (bemJson) {
            bemDom.update(this.domElem, BEMHTML.apply({ block: 'option', tag: '', content: bemJson }));

            return this;
        },

        _replaceContent: function (bemJson, ctx) {
            bemDom.replace(ctx || this.domElem, BEMHTML.apply({ block: 'option', tag: '', content: bemJson }));

            return this;
        },

        addContent: function (bemJson) {
            bemDom.append(this.domElem, BEMHTML.apply({ block: 'option', tag: '', content: bemJson }));
        },

        _addSpin: function () {
            this.addContent({ elem: 'item', elemMods: { spin: true }, content: [{ block: 'spin', mods: { theme: 'islands', size: 's', visible: true } }, 'Загрузка'] });

            return this;
        },

        setInput: function (input) {
            this._input = input;

            return this;
        },

        _addPartOfData: function (data) {
            if (data.length > 50) {
                this._onScroll(data);
            } else {
                var spin = this.findChildElem({ elem: 'item', modName: 'spin', modVal: true });
                    bemJson = this._getBemJson(data.splice(0, 50));

                this._replaceContent(bemJson, spin.domElem)
            }
        },
        
        setData: function (data) {
            if (data.length > 50) {
                this._originData = data.slice();
                this
                    .updateContent(this._getBemJson(this._originData.splice(0,50)))
                    ._addSpin()
                    ._addPartOfData(this._originData);
            } else {
                this.updateContent(this._getBemJson(data));
            }
        },

        _getBemJson: function (data) {
            return data.map(function (item) {
                return { elem: 'item', js: { id: item.Id, val: item.City }, content: item.City };
            });
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

        _getBemJson: function (data) {
            return data.map(function (item) {
                return { elem: 'item', js: { id: item.Id, val: item.City }, content: item.City };
            });
        },
    }));

});

