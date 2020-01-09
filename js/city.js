function cityselect(result) {
    console.log(result)
    var provinces = result.provinces;   
    for (let i = 0; i < provinces.length; i++) {
        $('#provinces').append(
            '<option value="'+provinces[i].provinceName+'"></option>'
        )
    }

    $('.prosel').val(provinces[0].provinceName)
    $('.citsel').val(provinces[0].citys[0].citysName)

    $(".prosel").bind("input propertychange",function(event){
        $('#citys').empty()
        $('.citsel').val('')
        var options=$('.prosel').val()
        for (let i = 0; i < provinces.length; i++) {
            if (provinces[i].provinceName == options) {
                var citylist = provinces[i].citys
                for (let i = 0; i < citylist.length; i++) {
                    $('#citys').append(
                        '<option value="'+citylist[i].citysName+'"></option>'
                    )
                }
            } 
            
        }        
        
    
        // console.log(options.val())
        
    });
}