var btn = $('#add');
var tab = $('#tab');
var tittle = $('#recipient-name');
var question = $('#question-text');
var resolve = $('#resolve-text');
btn.click(function(){
    $.ajax({
        url: 'http://10.31.165.29:88/yinyuestore/src/php/wrongquestion/add.php',
        data: {
            tit: tittle.val(),
            que: question.val(),
            res: resolve.val()
        }

    }).done(function(e) {
        location.reload()
    })
})
$.ajax({
    url: 'http://10.31.165.29:88/yinyuestore/src/php/wrongquestion/display.php',
    dataType:'json'
}).done(function(e) {
     // e = JSON.parse(e);
    $.each(e,function(i,v){
        var str = `<tr class='container-fluid bg-warn'><td>${e[i].id}</td><td>${e[i].tittle}</td><td>${e[i].question}</td><td>${e[i].resolve}</td><td>${e[i].time}</td><td><button type="button" class="btn btn-danger">删除</button></td></tr>`;
        tab.append(str);
        // var tr = document.createElement('tr');
        // var str = `<td>${e[i].id}</td><td>${e[i].tittle}</td><td>${e[i].question}</td><td>${e[i].resolve}</td><td>${e[i].time}</td><td><button type="button" class="btn btn-danger">删除</button></td>`;
        // tr.innerHTML = str;
        // tr.className = 'container-fluid bg-warn';
        // tab.append(tr);
    }) 


})
tab.on('click','button',function(){
    console.log($(this).parent().parent().children('td:first-child').html())
    if(confirm('你确定要删除吗?')){
            $.ajax({
                url: 'http://10.31.165.29:88/yinyuestore/src/php/wrongquestion/del.php',
                data: {
                    // id: e.parentNode.parentNode.firstElementChild.innerHTML
                    id:$(this).parent().parent().children('td:first-child').html()
                }
            }).done(function(e) {
                alert(e)
            })
            // console.log(e.parentNode.parentNode.firstElementChild.innerHTML);
            // e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);
            $(this).parent().parent().remove()
        }
})
