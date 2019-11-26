function updateStudent(id){
    $.ajax({
        url: '/viewStudent/' + id,
        type: 'PUT',
        data: $('#updateStudent').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};