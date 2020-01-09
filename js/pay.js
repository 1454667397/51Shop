(function($){
    var goodsbuy = sessionStorage.getItem("goodsbuy");
    goodsbuy = JSON.parse(goodsbuy);
    console.log(goodsbuy)
    money = 0;
    for(var goods in goodsbuy)
    {
        console.log(goodsbuy[goods])
        $('#payTable').append('<div class="bundle-main">'+
        '<ul class="item-content clearfix">'+
            '<div class="pay-phone">'+
                '<li class="td td-item">'+
                    '<div class="item-pic">'+
                        '<a href="#" class="J_MakePoint">'+
                            '<img src="'+goodsbuy[goods].img+'" width="80px" height="80px" class="itempic J_ItemImg"></a>'+
                    '</div>'+
                    '<div class="item-info">'+
                        '<div class="item-basic-info">'+
                            '<a href="#" class="item-title J_MakePoint" data-point="tbcart.8.11">'+goodsbuy[goods].title+'</a>'+
                        '</div>'+
                    '</div>'+
                '</li>'+
                '<li class="td td-info">'+
                    '<div class="item-props">'+
                        '<span class="sku-line">'+goodsbuy[goods].cansu[0]+'</span>'+
                        '<span class="sku-line">'+goodsbuy[goods].cansu[1]+'</span>'+
                    '</div>'+
                '</li>'+
                '<li class="td td-price">'+
                    '<div class="item-price price-promo-promo">'+
                        '<div class="price-content">'+
                            '<em class="J_Price price-now">'+goodsbuy[goods].price+'</em>'+
                        '</div>'+
                    '</div>'+
                '</li>'+
            '</div>'+
            '<li class="td td-amount">'+
                '<div class="amount-wrapper ">'+
                    '<div class="item-amount ">'+
                        '<span class="phone-title">购买数量</span>'+
                       '<div class="sl">'+
                            '<input class="min mr-btn" name="" type="button" value="-"/>'+
                            '<input class="num text_box" name="" type="text" value="'+goodsbuy[goods].num+'" style="width:30px;" disabled="disabled"/>'+
                            '<input class="add mr-btn" name="" type="button" value="+"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</li>'+
            '<li class="td td-sum">'+
                '<div class="td-inner">'+
                    '<em tabindex="0" class="J_ItemSum number">'+goodsbuy[goods].price*goodsbuy[goods].num+'</em>'+
                '</div>'+
            '</li>'+
            '<li class="td td-oplist">'+
                '<div class="td-inner">'+
                    '<span class="phone-title">配送方式</span>'+
                    '<div class="pay-logis">快递<b class="sys_item_freprice">10</b>元'+
                    '</div>'+
                '</div>'+
            '</li>'+
        '</ul>'+
        '<div class="clear"></div>'+
    '</div>')
    money += (goodsbuy[goods].price*goodsbuy[goods].num);
    }

    console.log(money)
    $("#J_ActualFee,.pay-sum").html(money)

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
        price = $(this).parents('.item-content').find('.price-now').html()
        // 总价格 = 数量*价格
        var a = $(this).parents('.item-content').find('.number').html(price*num)

        // 总计
        var pay_sum = 0;
        var totalprice = $(this).parents('#payTable').find('.number')
        $(totalprice).each(function () {
            pay_sum+=parseFloat($(this).html());
        })
        $(".pay-sum").html(pay_sum)

        // ================添加优惠卷及红包的总价================================
        $('#J_ActualFee').html($(".pay-sum").html())
    })

})(jQuery);