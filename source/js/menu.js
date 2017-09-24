const aboutOffset = $('#about').offset().top
const projectsOffset = $('#projects').offset().top
const contactOffset = $('#contact').offset().top

//
$("nav ul li a[href^='#']").on('click', function(e) {
    let offset
    e.preventDefault()

    resetContactFrom()
    

    if(this.hash == '#about'){ 
        offset = aboutOffset
        $('#projects, #contact').animate({opacity: 0}, 500)
    }
    else if(this.hash == '#projects'){ 
        offset = projectsOffset
        $('#about, #contact').animate({opacity: 0}, 500)
     }
    else if(this.hash == '#contact'){ 
        offset = contactOffset
        $('#about, #projects').animate({opacity: 0}, 500)
     }
  
     
     if ($(window).width() < 768) {
        offset = offset - 140
     }

    //
    $(`.content`).animate({ scrollTop: offset },300)

    })