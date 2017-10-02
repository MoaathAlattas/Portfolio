
$('.details-toggle').on('click', function(){

    let target = $(this).data("target")
    let expanded = $(this).attr("aria-expanded")==="true"

    $(`${target} > .info, ${target} > img`).toggleClass("open")
    $(this).toggleClass("open")
           .attr("aria-expanded", !expanded)

    if(!expanded){
        $("i",this).removeClass("fa-info-circle")
                    .addClass("fa-chevron-down")
        $(`${target} > .info > .details`).delay(500).fadeIn("slow")
    }else{
        $("i",this).removeClass("fa-chevron-down")
                    .addClass("fa-info-circle")
        $(`${target} > .info > .details`).fadeOut("fast")
    }
    

})

