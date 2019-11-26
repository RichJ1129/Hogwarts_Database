function updateProfessor(id){
    $.ajax({
        url: "/viewProfessor/" + id,
        type: 'PUT',
        data: $('#updateProfessor').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
}