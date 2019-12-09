function filterByClass() {
    //get the id of the selected homeworld from the filter dropdown
    var class_id = document.getElementById('filter-by-select').value
    //construct the URL and redirect to it
    if(class_id == 'All Classes'){
        window.location = '/classEnrollment/'
    } else {
        window.location = '/classEnrollment/filter/' + parseInt(class_id)
    }
}