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
