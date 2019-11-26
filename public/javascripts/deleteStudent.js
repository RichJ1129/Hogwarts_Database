function deleteStudent(id){
    $.ajax({
        url: "/viewStudent/" + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
}