/*
interface FileReader {

  // async read methods 
  void readAsBinaryString(in Blob fileBlob);
  void readAsText(in Blob fileBlob, [Optional] in DOMString encoding);
  void readAsDataURL(in File file);

  void abort();

  // states
  const unsigned short EMPTY = 0;
  const unsigned short LOADING = 1;
  const unsigned short DONE = 2;
  
  
  readonly attribute unsigned short readyState;

  // file data
  readonly attribute DOMString result;
  
  readonly attribute FileError error;

  // event handler attributes
  attribute Function onloadstart;
  attribute Function onprogress;
  attribute Function onload;
  attribute Function onabort;
  attribute Function onerror;
  attribute Function onloadend;

};
FileReader implements EventTarget;

*/

function FileReader() {
    this.result = '';
    this.error = null;
    this.onloadstart;
    this.onprogress;
    this.onload;
    this.onabort;
    this.onerror;
    this.onloadend;
}

FileReady.prototype = EventTarget.prototype;

FileReader.EMPTY = 0;
FileReader.LOADING = 1;
FileReader.DONE = 2;

FileReader.prototype.readAsBinaryString = function(fileBlob) {
    
};

FileReader.prototype.reasAsText = function(fileBlob) {
    
};

FileReader.prototype.readAsDataUrl = function(fileBlob) {
    
};

FileReader.prototype.abort = function(fileBlob) {
    
};