//{{{ // The MIT License
/*
 * The MIT License
 *
 * Copyright (c) 2013 haxahaxa.info
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction,including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software,and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
//}}}

jQuery.event.add(window, "load", function(){
    var dwriter = {
        dump:function(){ console.dir(this) },
document_write:null,
args:[],
init:
    function(){
        if(!dwriter.document_write){
            dwriter.document_write = document.write;
            document.write = function(str){
                dwriter.args.push(str);
            }
        }
    },
fin:
    function(){
        if(dwriter.document_write){
            document.write = dwriter.document_write;
        }
    },
get:
    function(){
        return dwriter.args;
    },
clear:
    function(){
        dwriter.args = [];
    },
    }

    var linkedAjax = function(divlist){
        var div = divlist.shift();
        dwriter.init();
        $.ajax({
            url:div.data('url'),
            dataType:'jsonp',
            cache:false,
        }).fail(function(ex){
            console.log('linkedAjax err');
        }).always(function(){
            var str = dwriter.get().join('');
            console.log(str);
            div.html(str);
            dwriter.clear();
            if(divlist.length){
                linkedAjax(divlist);
            }else{
                dwriter.fin();
            }
        });
    }

    // -----------------------------------------
    var divs = [];
    $('div' + '.jiab').each(function(){
        divs.push($(this));
    });
    linkedAjax(divs);
});

