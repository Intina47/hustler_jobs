const path = require('path');
const fs = require('fs');
const getJobDetails = (req, res) => {
    console << "System Request!"
    const fileName = req.params.fileName;
    let ip = req.connection.remoteAddress;
    const filePath = path.join(__dirname, '..','assets', 'pdf_files', fileName);
    fs.stat(filePath, function(err){
      if (err == null) {
        // Set the appropriate content type for PDF files
        res.contentType('application/pdf');
        console.log(ip, "---------sys request success, Loading file");
        res.sendFile(filePath);
      } else if (err.code === 'ENOENT') {
        console.log('Unauthorized access attempt by ', ip);
        res.status(404).send('File not found');
      } else {
        console.log('Some other error: ', err.code);
        res.end();
      }
    });
}
module.exports = { getJobDetails };