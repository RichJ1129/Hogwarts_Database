function deleteStudentFromClass(sID, cID){
    $.ajax({
        url: "/classEnrollment/" + cID + '_' + sID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
}