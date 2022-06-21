// ===========================================================================
// In this file we define two structures that will contain the constants,
// as well as the Strings that will be used in the program. It is considered
// good programming hygiene to remove constant values and Strings from the
// actual code. This renders the code easier to read and also easier to modify
// when needed.
//
// ===========================================================================
// The cnst structure will store all kinds of values that will not be modified
// during the running of the program.
//
var cnst = {
    'start_val' : 0,
    'start_res' : 0,
    'pie' : 3.1415926
}

// THe dict structure will contain all strings that will be used in the program
// and the strings can easily be inserted at runtime through calls to the dict
// with the correct key.
//
var dict = {
    'add' : "Add",
    'sub' : "Subtract",
    'res' : "Result",
    'name': "Lars"
}

// ===========================================================================
// END OF FILE
// ===========================================================================
