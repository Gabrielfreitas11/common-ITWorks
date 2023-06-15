const AutoHandler = require("./handler/AutoHandler");

const setAWSLogLink = require('./middleware/setAWSLogLink');


module.exports = (dir, allowMethodsDiableCors =[]) => AutoHandler(dir, allowMethodsDiableCors, setAWSLogLink);
