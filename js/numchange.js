// 数量框功能

// 数量减少
$(".min").click(function(){
    // 当点击“-”时，input数量会减1,最小单位为1，最小时为disable。
    var num = $(this).siblings('.num').val();
    // console.log($(this).siblings().val())
    if (num <=1) {
        return
    }
    else{
        num--;
        num = $(this).siblings('.num').val(num);
    }
})
// 数量增加
$(".add").click(function () {
            // 当点击“+”时，input数量会加1,最大单位为maxnum，最大时为disable。
            // 如何将库存数量或者限购数量传入？
            var num = $(this).siblings('.num').val();
            // console.log($(this).siblings('.num'))
            var maxnum = 1000;
            if (num >=maxnum) {
                $(this).attr("disabled",'disabled');
            }
            else{
                num++;
                $(this).siblings('.num').val(num);
            }
})
