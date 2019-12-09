function deleteStudentFromClass(sID, cID){
    console.log(sID);
    console.log(cID);
    $.ajax({
        url: cID + '_' + sID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
}