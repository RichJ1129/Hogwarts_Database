function deleteSFromC(sID, cID){
    console.log(sID);
    $.ajax({
        url: "/classEnrollment/" + cID + '/_/' + sID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
}