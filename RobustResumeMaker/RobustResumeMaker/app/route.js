// JavaScript source code

var userDetails = connectionsubject.model('', {}, 'userdet');

var Subjects = require('./models/SubjectViews');

module.exports = function (app) {
    
    // server routes ===========================================================
    // handle things like api calls
    // authentication routes	
    // sample api route
    app.get('/api/data', function (req, res) {
        // use mongoose to get all nerds in the database
        Subjects.find(function (err, subjectDetails) {
            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            res.json(subjectDetails); // return all nerds in JSON format
        });
    });
}

//module.exports = function (app) {

//    app.get('/api/userDetails', function (req, res) {
//        userDetails.find(function (err, subjectDetails) {
//            res.json(subjectDetails); // return all nerds in JSON format
//        });

//    });
//}