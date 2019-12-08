function filterByClass() {
    //get the id of the selected homeworld from the filter dropdown
    var class_id = document.getElementById('filter-by-select').value
    //construct the URL and redirect to it
    window.location = '/classEnrollment/filter/' + parseInt(class_id)
}