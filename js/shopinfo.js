function train (result){    
    console.log(result)
    data = result.data;
    var test = window.location.search.replace(/[^0-9]/ig,"");
    $(".jqzoom").attr('src', data[test].img);
    
    var colorselect = data[test].cansu.color[0] ;
    var neicunselect = data[test].cansu.neicun[0] ;
    $(".title").append(data[test].name+'&nbsp;&nbsp;&nbsp;'+colorselect+'&nbsp;&nbsp;&nbsp;'+neicunselect);
    $(".sale").append(data[test].price);
    // 添加颜色
    for (let i = 0; i < data[test].cansu.color.length; i++) {
        $(".color").append(
            '<li class="sku-line param">'+data[test].cansu.color[i]+'</li>'
        )
    }
    // 添加内存参数
    for (let i = 0; i < data[test].cansu.neicun.length; i++) {
        $(".neicun").append(
            '<li class="sku-line param">'+data[test].cansu.neicun[i]+'</li>'
        )     
    }
    // 商品参数选择
    $(".param").click(function () {
        var parentclass = $(this).parent().attr("class")
        if (parentclass == 'color') {
            colorselect = $(this).html();
            $(".title").html("");
            $(".title").append(data[test].name+'&nbsp;&nbsp;&nbsp;'+colorselect+'&nbsp;&nbsp;&nbsp;'+neicunselect);
        }
        else{
            neicunselect = $(this).html();
            $(".title").html("");
            $(".title").append(data[test].name+'&nbsp;&nbsp;&nbsp;'+colorselect+'&nbsp;&nbsp;&nbsp;'+neicunselect);
        }
        $(this).css('border','2px solid red')
        $(this).siblings().css('border','1px solid #ccc')
        // titlechange(colorselect)
    })


    // 库存数量
    $(".stock").append(data[test].kucun)

    // =====================加入购物车并将数据保存到sessionstorage================================
    $("#LikBasket").click(function () {
        var title = $(".title").html()
        var num = $(".num").val()
        var obj = { 
            "img": data[test].img,
            "title":title,
            "price":data[test].price,
            "cansu":[colorselect,neicunselect],
            "num":num
        };

        // 按{id:obj}的形式存储到sessionstorage
        // goodsstore存储{id:obj}

        // 涨姿势：将变量放在[]中可以作为js对象的key
        
        if (!sessionStorage.goodsstore) {
            var goodsstore = {
                [test]:obj
            }; 
        }
        else{
            var goodsstore = sessionStorage.getItem('goodsstore');
            goodsstore = JSON.parse(goodsstore)
            console.log(goodsstore)
            goodsstore[test] = obj
        }

      
        
        var str = JSON.stringify(goodsstore); 
        // 存入
        sessionStorage.setItem("goodsstore", str);

        // 跳转购物车页面
        // location.href='./shopCart.html';
        car_sum()
    })

    // ==============================立即购买=================================
    $('#LikBuy').click(function () {
        var title = $(".title").html()
        var num = $(".num").val()
        var obj = Object();
         obj[test] = { 
            "img": data[test].img,
            "title":title,
            "price":data[test].price,
            "cansu":[colorselect,neicunselect],
            "num":num
        };
        var str = JSON.stringify(obj);
        // 存入
        sessionStorage.setItem("goodsbuy", str);

        // 跳转购买页面
        location.href='./pay.html';
    })




    car_sum()
    function car_sum() {
        var goodsstore = sessionStorage.getItem('goodsstore');
            goodsstore = JSON.parse(goodsstore)
        var flag = 0;
          // 购物车图标显示数量
          for(var goods in goodsstore)
          {flag = flag+1}
          console.log($('.cart_num').html(flag))
    }



    // ========================猜你喜欢============================
    for (let i = 0; i < 12; i++) {
        var proid = parseInt(Math.random()*30);
        $(".boxes").append(
            '<li>'+
                '<div class="i-pic limit">'+
                    '<img src="'+data[proid].img+'" />'+
                    '<p>'+data[proid].name+'</p>'+
                    '<p class="price fl">'+
                        '<b>¥</b>'+
                        '<strong>'+data[proid].price+'</strong>'+
                    '</p>'+
                '</div>'+
            '</li>'
        )
        
    }

    // ==============================商品推荐====================================
    for (let i = 0; i < 12; i++) {
        var proid = parseInt(Math.random()*30);
        console.log(proid)
        $(".itd").append(
            '<li>'+
                '<div class="i-pic limit">'+
                    '<img src="'+data[proid].img+'" />'+
                    '<p>'+data[proid].name+'</p>'+
                    '<p class="price fl">'+
                        '<b>¥</b>'+
                        '<strong>'+data[proid].price+'</strong>'+
                    '</p>'+
                '</div>'+
            '</li>'
        )
        
    }

    //生成从minNum到maxNum的随机数
    function randomNum(minNum,maxNum){ 
        switch(arguments.length){ 
            case 1: 
                return parseInt(Math.random()*minNum+1,10); 
            break; 
            case 2: 
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            break; 
            default: 
                return 0; 
            break; 
        } 
    } 
}

