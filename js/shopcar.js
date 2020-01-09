(function($){
    var goodsstore = sessionStorage.getItem("goodsstore");
    goodsstore = JSON.parse(goodsstore);
    console.log(goodsstore)
    for(var goods in goodsstore)
    {
        // var product = sessionStorage.getItem(i)
        // product = JSON.parse(product)
        console.log(goodsstore[goods])


    $("#cartTable").append(
        '<div class="bundle  bundle-last ">'+
            '<div class="bundle-hd">'+
                '<div class="bd-promos">'+
                    '<div class="bd-has-promo">已享优惠:<span class="bd-has-promo-content">省￥100.00</span>&nbsp;&nbsp;</div>'+
                   '<span class="list-change theme-login">编辑</span>'+
                '</div>'+
            '</div>'+
            '<div class="clear"></div>'+
            '<div class="bundle-main">'+
                '<ul class="item-content clearfix">'+
                    '<li class="td td-chk">'+
                        '<div class="cart-checkbox ">'+
                            '<input class="check" id="J_CheckBox_'+goods+'" name="items[]" value="170769542747" type="checkbox" >'+
                            '<label for="J_CheckBox_'+goods+'"></label>'+
                        '</div>'+
                    '</li>'+
                    '<li class="td td-item">'+
                        '<div class="item-pic">'+
                            '<a href="#" target="_blank" data-title=" " class="J_MakePoint" data-point="tbcart.8.12">'+
                                '<img src="'+goodsstore[goods].img+'" width="80px" height="80px" class="itempic J_ItemImg"></a>'+
                        '</div>'+
                        '<div class="item-info">'+
                            '<div class="item-basic-info">'+
                                '<a href="#" target="_blank" title="" class="item-title J_MakePoint" data-point="tbcart.8.11">'+goodsstore[goods].title+'</a>'+
                            '</div>'+
                        '</div>'+
                    '</li>'+
                    '<li class="td td-info">'+
                        '<div class="item-props item-props-can">'+
                            '<span class="sku-line">颜色：'+goodsstore[goods].cansu[0]+'</span><br>'+
                            '<span class="sku-line">内存：'+goodsstore[goods].cansu[1]+'</span>'+
                            '<span tabindex="0" class="btn-edit-sku theme-login">修改</span>'+
                            '<i class="theme-login mr-icon-sort-desc"></i>'+
                        '</div>'+
                    '</li>'+
                    '<li class="td td-price">'+
                        '<div class="item-price price-promo-promo">'+
                            '<div class="price-content">'+
                                '<div class="price-line">'+
                                   ' <em class="price-original">599.00</em>'+
                              '  </div>'+
                                '<div class="price-line">'+
                                    '<em class="J_Price price-now" tabindex="0">'+goodsstore[goods].price+'</em>'+
                               ' </div>'+
                           ' </div>'+
                       ' </div>'+
                    '</li>'+
                   ' <li class="td td-amount">'+
                        '<div class="amount-wrapper ">'+
                            '<div class="item-amount ">'+
                                '<div class="sl">'+
                                  '  <input class="min mr-btn" name="" type="button" value="-"/>'+
                                    '<input class="num text_box" name="" type="text" value="'+goodsstore[goods].num+'" style="width:30px;" disabled/>'+
                                    '<input class="add mr-btn" name="" type="button" value="+" "/>'+
                                '</div>'+
                           ' </div>'+
                        '</div>'+
                    '</li>'+
                    '<li class="td td-sum">'+
                        '<div class="td-inner">'+
                            '<em tabindex="0" class="J_ItemSum number" style="color:red">'+goodsstore[goods].price*goodsstore[goods].num+'</em>'+
                        '</div>'+
                    '</li>'+
                    '<li class="td td-op">'+
                        '<div class="td-inner">'+
                            '<a title="移入收藏夹" class="btn-fav" href="#">移入收藏夹</a>'+
                            '<a href="javascript:;" data-point-url="#" class="delete">删除</a>'+
                        '</div>'+
                    '</li>'+
               ' </ul>'+
            '</div>'+
       ' </div>')
    }



    // 涨姿势：多个元素绑定一个事件$('.add, .min').click(function () {})
// 单个商品总价的变化
$('.add, .min').click(function () {
    // console.log($(this).val())
    var type = $(this).val()
    // 数量
    var num = $(this).siblings('.num').val()
    if (type == '+') {
        num = parseInt(num)+1
    }
    else{
        if (num >= 2) {num = parseInt(num)-1}
    }
    // 价格
    price = $(this).parents('.td-amount').prev().find('.price-now').html()
    // 总价格 = 数量*价格
    $(this).parents('.td-amount').next().find('em').html(price*num)

    total(type)
})
//======================================移除商品========================================

var order_lists = [];
$('.delete').click(function () {
    order_lists.push($(this).parents('.bundle'));
    $('.model_bg').fadeIn(300);
    $('.my_model').fadeIn(300);
});

//关闭模态框
$('.closeModel').click(function () {
    closeM();
});
$('.dialog-close').click(function () {
    closeM();
});
function closeM() {
    $('.model_bg').fadeOut(300);
    $('.my_model').fadeOut(300);
}
//确定按钮，移除商品
$('.dialog-sure').click(function () {
    for (let i = 0;order_lists.length != 0; i++) {
        a = order_lists.pop()
        a.remove()

        // sessionstorage的商品删除
        var id = $(a.find('.check')).attr('id')
        id = id.slice(11)
        delete goodsstore[id];
        var str = JSON.stringify(goodsstore);
        sessionStorage.setItem("goodsstore", str);
    }
    closeM();



    // 总计
    total();
})


// ============================全选=============================
$('#J_SelectAllCbx2').click(function () {
    var checkboxs=document.getElementsByTagName('input');
	for(var i=0;i<checkboxs.length;i++)
	{
		if(checkboxs[i].type=='checkbox')
		{
			checkboxs[i].checked=document.getElementsByName('select-all')[0].checked;			
		}
    }
    total();
})

// ============对选中的商品进行删除=================
$('.deleteAll').click(function () {
    $('.model_bg').fadeIn(300);
    $('.my_model').fadeIn(300);
    var checkboxs=document.getElementsByTagName('input');
	for(var i=0;i<checkboxs.length;i++)
	{
		if(checkboxs[i].type=='checkbox' && checkboxs[i].className.indexOf('check-all') === -1 && $(checkboxs[i]).is(':checked'))
		{
            console.log(checkboxs[i])
            order_lists.push($(checkboxs[i]).parents('.bundle'));
		}
    }
});

//===================================总计商品的个数和总价格===========================
$('.check').change(total)
function total(type=''){
    var checkbtn = $('#cartTable').find('.check');
    var total_money = 0;
    var total_count = 0;
    $(checkbtn).each(function () {
        if ($(this).is(':checked')) {
            var totalprice = parseInt($(this).parents('.bundle').find('.number').html());
            var num =  parseInt($(this).parents('.bundle').find('.num').val());
            // $(this).parents('.bundle').find('.num').val()返回的是之前的值
            // 先运行该js文件后运行numchange.js文件
            if (type == '+') {
                num = parseInt(num)+1
            }
            else if(type == '-'){
                if (num >= 2) {num = parseInt(num)-1}
            }
            total_money += totalprice;
            total_count += num;
        }
    })
    $('#J_SelectedItemsCount').html(total_count)
    $('#J_Total').html(total_money)
}

// ============================将数据保存到sessionstorage并跳转到购物页面===========================
$('#J_Go').click(function () {
    var checkgoods = $('#cartTable').find(".check");
    var obj = Object();
    $(checkgoods).each(function () {
        if ($(this).is(':checked')) {
            var id = $(this).attr('id')
            id = id.slice(11)
            var num = parseInt($(this).parents('.bundle').find('.num').val());
            var price = parseInt($(this).parents('.bundle').find('.price-now').html());
            var img = $(this).parents('.bundle').find('.J_ItemImg').attr('src');

            // 将参数保存到数组中
            var cansu = Array();
            var cansu1 = $($(this).parents('.bundle').find('.sku-line'))
            cansu1.each(function () {cansu.push($(this).html())})
            
            var title = $(this).parents('.bundle').find('.item-title').html()
            // console.log(id,num,totalprice)
            obj[id] = {
                "num":num,
                "price":price,
                "img":img,
                "cansu":cansu,
                "title":title
            }
            console.log(obj)
            var str = JSON.stringify(obj); 

            // 存入
            sessionStorage.setItem("goodsbuy", str);
        }
    })
    // 跳转购买页面
    location.href='./pay.html';
})

})(jQuery);