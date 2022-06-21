// ===========================================================================
// Note that the functions in the control layer do not know anything about the
// data, neither what type the arguments or the results are, nor what the
// actual function does. It just makes sure to call the appropriate functions
// and updates the model with the result, and then updates the view from the model.
//
// The variable names and the function names are chosen to be human readable, which
// also includes the addition of some semantic. However, the interpretation of
// the activities as numbers, are not mandatory, it could be used for string
// concatenation actions as well.
// ===========================================================================
// The function doAdd gets the data from the input fields in
// the HTML and performs the apropriate addition function.
//
function doAdd() {
    a = $("#arg1").text();  // Get content of the HTML-container arg1
    b = $("#arg2").text();  // same for arg2
    c = add(a, b);          // Perform the add operation (note that this is still
                            // not the math "+" but a general call for "adding".

    update_db(c);           // Update the model
    update_view();          // Update view from the model.
}
// The function doSubtract gets the data from the input fields in
// the HTML and performs the apropriate subtraction function.
//
function doSubtract() {
    a = $("#arg1").text();
    b = $("#arg2").text();
    c = sub(a, b);
    update_db(c);
    update_view();
}
// When updating the database (the model), the result is stored
// in the correct variable in the model.
//
function update_db(c) {
    result = c;
}

// The update_view function takes the result from the storage and puts
// in the corresponding HTML-container, the display-div.
//
function update_view() {
    $("#display").text(result);
}
// ===========================================================================
// INITIALIZATION OF HTML AND MODEL DATA.
// ===========================================================================
// This construct ensures that the document is finished loading before
// the code below is executed. This is essentially the initialisation
// of the HTML-page, which should be completely empty of content in the
// program before start.
//
// The initialisation data could just as well have been fetched from a
// file or other storage.
//
// Note that we make use of two dictionaries, the storage for constant values,
// and a dictionary for strings. Both these will be useful later.
//
$(document).ready(function() {
        $("#fun1").text(dict['add']),
        $("#sum-tag").text(dict['res']),
        $("#fun2").text(dict['sub']),

        $("#arg1").text(cnst['start_val']),
        $("#arg2").text(cnst['start_val']),
        $("#display").text(cnst['start_val'])
    }
);

// ===========================================================================
// END OF FILE
// ===========================================================================


