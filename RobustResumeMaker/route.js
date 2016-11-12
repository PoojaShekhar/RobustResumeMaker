// JavaScript source code

var userDetails = connectionsubject.model('', {}, 'userdetails');

module.exports = function (app) {

    app.get('/api/international', function (req, res) {
        intr.find(function (err, subjectDetails) {
            res.json(subjectDetails); // return all nerds in JSON format
        });

    });
}