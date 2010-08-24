/*
interface FileError {
   // File error codes
   // Found in DOMException
   const unsigned short NOT_FOUND_ERR = 8;
   const unsigned short SECURITY_ERR = 18;
   const unsigned short ABORT_ERR = 20;
   
   // Added by this specification
   const unsigned short NOT_READABLE_ERR = 24;
   const unsigned short ENCODING_ERR = 26;
 
   readonly attribute unsigned short code;
};
*/

function FileError() {
    this.code = 0;
}

FileError.NOT_FOUND_ERR = 8;
FileError.SECURITY_ERR = 18;
FileError.ABORT_ERR = 20;
FileError.NOT_READABLE_ERR = 24;
FileError.ENCODING_ERR = 26;