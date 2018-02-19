modules.define('input-search', ['i-bem-dom', 'input', 'popup', 'BEMHTML'], function(provide, bemDom, Input, Popup, BEMHTML) {

provide(bemDom.declBlock(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                var _this = this,
                    input = this.findChildBlock(Input),
                    popup = this.findChildBlock(Popup).setAnchor(input);

                    
                    input._domEvents().on('click', function (e) {
                        popup.setMod('visible');
  
                    });


                    popup._events().once({ modName: 'visible', modVal: '*' }, function () {
                        _this._getPopupContent(_this, popup);
                    });
                }
            }
        },

    _getPopupContent: function (block, popup) {
        return this._getData(this.params.url).then(function (data) {
            return block._getHtml(JSON.parse(data));
        }).then(function (html) {
            popup.setContent(html);
        });
    },   
        
    _getData: function (url) {
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
                    resolve(xhr.responseText);
                }
            }
            xhr.send();
        });
    },

    _getHtml: function (data) {
        var newData = data.slice(0, 50).map(function (item) {
                return { elem: 'item', js: { id: item.Id }, content: item.City };
            });

        return BEMHTML.apply({ block: 'option', content: newData });
    }
})); 

});
