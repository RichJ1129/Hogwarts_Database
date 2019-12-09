function updateWand(id){
    $.ajax({
        url: '/viewWand/' + id,
        type: 'PUT',
        data: $('#updateWand').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
} 