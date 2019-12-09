function deleteWand(id){
    $.ajax({
        url: "/viewWand/" + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
}