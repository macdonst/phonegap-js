/*
interface FileWriter {
    void abort ();
    const unsigned short INIT = 0;
    const unsigned short WRITING = 1;
    const unsigned short DONE = 2;
    readonly attribute unsigned short readyState;
    readonly attribute FileError      error;
             attribute Function       onwritestart;
             attribute Function       onprogress;
             attribute Function       onwrite;
             attribute Function       onabort;
             attribute Function       onerror;
             attribute Function       onwriteend;
    readonly attribute long long      position;
    readonly attribute long long      length;
    void write (Blob data) raises (FileException);
    void seek (long long position) raises (FileException);
    void truncate (long long size) raises (FileException);
*/