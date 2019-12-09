function updatePet(id){
    $.ajax({
        url: '/viewPet/' + id,
        type: 'PUT',
        data: $('#updatePet').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
}