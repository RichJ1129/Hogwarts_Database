function deleteProfessor(id){
    $.ajax({
        url: "/viewProfessor/" + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
}