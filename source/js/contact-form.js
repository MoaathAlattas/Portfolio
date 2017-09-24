
//
$("#contactForm").on("submit", (e)=>{
    e.preventDefault()

    $("#formSending").show("slow")
    $("#contactForm").hide("slow")

    let name = $("#name").val()
    let email = $("#email").val()
    let message = $("#message").val()

    const data = `name=${name}&email=${email}&message=${message}`
    submitForm(data)
})

//
$("#resetContactFrom").on('click', ()=>{
    resetContactFrom()
})


//
function submitForm(data){
    $.ajax({
        type: "POST",
        url: "https://us-central1-my-portfolio-44e58.cloudfunctions.net/sendEmail",
        data: data,

        success : (text)=>{
            $("#formSending").hide("slow")
            $("#formSuccess").show("slow")
            $("#resetContactFrom").show("slow")
        },

        error : (text)=>{
            $("#formSending").hide("slow")
            $("#formError").show("slow")
            $("#resetContactFrom").show("slow")
        },
    })
}

//
function resetContactFrom(){
    $("#contactForm").show("slow")
    $("#contactForm input,#contactForm textarea").val('')

    $("#formSending").hide("slow")
    $("#formSuccess").hide("slow")
    $("#formError").hide("slow")
    $("#resetContactFrom").hide("slow")
}

