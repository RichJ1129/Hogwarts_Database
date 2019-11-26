function updateStudent(id){
    $.ajax({
        url: '/viewStudent/' + id,
        type: 'PUT',
        data: $('#update-student').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};