function train (result){    
    console.log(result)
    var test = window.location.search.replace(/[^0-9]/ig,"");
    // 激活页面添加边框
    $(".mr-pagination").find(".page").each(function () {
        if ($(this).html()==test) {
            $(this).css("border","2px solid red")
        }
    })
    var firstnum = (test-1)*20
    var goodsnum = 20*test;
    data = result.data;
    for (let i = firstnum; i < goodsnum; i++) {
        if (i>=data.length) {
            break;
        }
        $(".boxes").append(
            '<li id="'+i+'"><div class="i-pic limit" >'+
        '<a href="shopInfo.html?id='+i+'">'+
        '<img src="'+result.data[i].img+'" /></a>'+
        '<p class="title fl">'+result.data[i].name+'</p>'+
        '<p class="price fl"> <b>&yen;</b> <strong>'+result.data[i].price+'</strong> </p>'+
        '<p class="number fl"> 销量<span>'+result.data[i].xiaoliang+'</span> </p>'+
        '</div></li>')
    }
    
    $(".gbselect").click(function () {
        var gbsl = $(this).html();
        var gbslnum = gbsl+"+"
        console.log(gbslnum)
        for (let i = firstnum; i < goodsnum; i++) {
            if (gbsl == '全部') {
                $("li#"+i).css('display','block')
            }
            else{
            var neicun = data[i].cansu.neicun;

            for (let j = 0; j < neicun.length; j++) {
                if (neicun[j].indexOf(gbslnum) != -1) {
                    $("li#"+i).css('display','block')
                    break;
                }
                else{$("li#"+i).css('display','none')}
                
            }
        }
            // neicun.map(
            //     function (a) {
            //         console.log(a)
            //         if (a.indexOf(gbslnum) == -1) {
            //             $("li#"+i).css('display','none')
            //             // console.log("a")
            //         }
            //         else{
            //             $("li#"+i).css('display','block')
            //             // return console.log("b")
            //         }
            //         return console.log("b")
            //     }
            // );         
        }

    })

    $(".page").click(function () {
        var pagenum = $(this).html()
        console.log(this)
        window.location.href = './shopList.html?page='+pagenum;
    })
}

