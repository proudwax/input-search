modules.define('input-search', ['i-bem-dom', 'dom', 'input', 'popup', 'option', 'option__item', 'keyboard__codes', 'BEMHTML'], function (provide, bemDom, dom, Input, Popup, Option, OptionItem, keyCodes, BEMHTML) {

    provide(bemDom.declBlock(this.name, {
        onSetMod: {
            js: {
                inited: function () {

                    var _this = this;

                    this._input = this.findChildBlock(Input),
                        this._popup = this.findChildBlock(Popup).setAnchor(this._input),
                        this._option = this._popup.findChildBlock(Option).setInput(this._input),
                        this._currentData = [],
                        this._originData = [],
                        this._inputVal = '';

                    this._domEvents().on('click', function (e) {
                        this._popup.setMod('visible');
                        this._option.setMod('focused');
                    });

                    this._input._events(Input).on({ modName: 'focused', modVal: true }, function (e) {
                        if (!this._popup.hasMod('visible')) {
                            this._popup.setMod('visible');
                        }
                    }.bind(this));

                    this._popup._events(Popup).once({ modName: 'visible', modVal: true }, function () {
                        this._initPopupContent();
                    }.bind(this));

                    this._popup._events(Popup).on({ modName: 'visible', modVal: '*' }, function () {
                        this._option.toggleMod('focused');
                    }.bind(this));

                    this._option._events(OptionItem).on('itemClick', function () {
                        this._input.setMod('focused');
                        this._popup.delMod('visible');
                    }.bind(this));

                    this._events(Input).on('change', function (e) {
                        this._optionUnScroll();

                        if (this._input.getVal().length < this._inputVal.length) {  // при добавление символа, ищем по уменьшеному array
                            this._currentData = this._originData;
                        }
                        if (!this._popup.hasMod('visible')) {
                            this._popup.setMod('visible');
                        }
                        this._inputVal = this._input.getVal();
                        this._currentData = this._searchInData(this._currentData, this._input.getVal());
                        this._optionScroll(this._currentData);
                    });



                }
            }
        },

        _searchInData: function (data, pattern) {
            var _this = this;
            return data.filter(function (item) {
                return new RegExp('^' + _this._shielding(pattern), 'i').test(item.City);
            });
        },

        _shielding: function (text) {
            return (text + '').replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
        },

        _initPopupContent: function () {
            var _this = this;

            // return this._getData(this.params.url).then(function (data) {
            //     return _this._getBemJson(data.slice(0, 50));
            // }).then(function (bemJson) {
            //     _this._setBemJson(bemJson);
            // });

            return this._getData(this.params.url).then(function (data) {
                return _this._optionScroll(data);
            });
        },

        _getData: function (url) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();

                xhr.open('GET', url, true);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState != 4) return;

                    if (xhr.status != 200) {
                        // обработать ошибку
                        reject(xhr.status + ': ' + xhr.statusText);
                    } else {
                        // вывести результат
                        _this._originData = JSON.parse(xhr.responseText);
                        _this._currentData = JSON.parse(xhr.responseText);
                        resolve(_this._originData);
                    }
                }
                xhr.send();
            });
        },

        _getBemJson: function (data) {
            return data.map(function (item) {
                return { elem: 'item', js: { id: item.Id, val: item.City }, content: item.City };
            });
        },

        _setBemJson: function (bemJson) {
            this._option.updateItems(bemJson);
            // this._option.onClick(this); // передаю весь инстанс блока в Option для добавления значений в Input
        },

        _optionScroll: function (data) {
            var _this = this,
                startArr = 50;

            if (data.length > 50) {
                this._option._domEvents().on('scroll', function (e) {
                    var domElem = this.domElem[0];

                    if (domElem.scrollHeight - domElem.offsetHeight - domElem.scrollTop <= 5) {
                        var partData = data.slice(startArr, startArr + 50);

                        if (partData.length > 0) {
                            _this._option.removeSpin();
                            _this._option.addItems(_this._getBemJson(partData));
                            _this._option.addSpin();
                            startArr = startArr + 50;
                        } else {
                            _this._option.removeSpin();
                            _this._optionUnScroll();
                        }
                    }

                });
            }

            this._setBemJson(this._getBemJson(data.slice(0, 50)));
        },

        _optionUnScroll: function () {
            this._option._domEvents().un('scroll');

            return this;
        }
    }));

});
