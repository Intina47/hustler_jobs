const path = require('path');
const fs = require('fs');
const getJobDetails = (req, res) => {
    console << "System Request!"
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '..','assets', 'pdf_files', fileName);
    fs.stat(filePath, function(err){
      if (err == null) {
        console.log('File exists');
        // Set the appropriate content type for PDF files
        res.contentType('application/pdf');
        // Send the PDF file
        console.log("------------------Loading file--------------: ", filePath);
        res.sendFile(filePath);
      } else if (err.code === 'ENOENT') {
        console.log(fileName, ' does not exist');
        res.status(404).send('File not found');
      } else {
        console.log('Some other error: ', err.code);
        throw new Error(`Error ${err}`);
      }
    });
}
module.exports = { getJobDetails };