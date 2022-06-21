// ===========================================================================
// In this file we define the actual functions that will perform the
// work on the model. These functions have to know about the data types,
// which is why we use the parseInt function, since values fetched from
// the HTML entries will be in the form of Strings.
//
// In order to be able to use the UNDO-manager the functions have to be
// defined with all three actions as "execute", "unexecute" and "reexecute".
//
// The names of the functions are mnemonic for our purposes, they could
// just as well have been named "fun1", "fun2" etc. as long as we keep
// track of which is which.
//
// Currently it is just the names of the functions that give a semantic
// connection between the layers.
//
// ===========================================================================
// The addfun function returns the value of adding two numbers.
//
function addfun(a, b) {
    var temp = {
        arg: parseInt(a),
        oldsum : parseInt(b),

        execute: function () {      // The original action
            modelData['result'] = this.arg + this.oldsum;
            update_view();
        },
        unexecute: function () {    // Undoing the action
            modelData['result'] = this.oldsum;
            update_view();
        },
        reexecute: function () {    // Redoing the action is the same as doing it
                                    // the first time.
            modelData['result'] = this.arg + this.oldsum;
            update_view();
        }
    }
    return temp;
}

// ===========================================================================
// The subfun function returns the value of adding two numbers.
//
function subfun(a, b) {
    var temp = {
        arg: parseInt(a),
        oldsum: parseInt(b),

        execute: function () {
            modelData['result'] = this.oldsum - this.arg;
            update_view();
        },
        unexecute: function () {
            modelData['result'] = this.oldsum;
            update_view();
        },
        reexecute: function () {
            modelData['result'] = this.oldsum - this.arg;
            update_view();
        }
    }
    return temp;
}

// ===========================================================================
// END OF FILE
// ===========================================================================









