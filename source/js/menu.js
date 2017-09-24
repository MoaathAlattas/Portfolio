
//
$("nav ul li a[href^='#']").on('click', function(e) {

    e.preventDefault()
    resetContactFrom()

    $('nav ul li').removeClass('active')
    $(this).parent().toggleClass('active')

    $(`.content>div:not(${this.hash})`).fadeOut("fast")
    $(this.hash).fadeIn("slow")
        
    $(this.hash).scrollTop(0)
})