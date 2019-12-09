function deletePet(id){
    $.ajax({
        url: "/viewPet/" + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
}