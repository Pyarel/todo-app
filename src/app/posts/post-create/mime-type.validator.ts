import {AbstractControl} from '@angular/forms'
import { Observable, Observer, of } from 'rxjs'

export const mimeType = (control:AbstractControl):Promise<{[key:string]:any}>|Observable<{[key:string]:any}> =>{
    if(typeof(control.value)=="string"){
      //of is an easy and quick way of returning the observable whic emits the data quickly
        return of(null);
    }
    const file=control.value as File;
    const fileReader=new FileReader();
    const frObs=Observable.create((observer:Observer<{[key:string]:any}>) => {

        fileReader.addEventListener("loadend", () =>{
            //Create a new array of 8 bit unsigned integers
            //Uint8Array allows to parse the metadata of the file/access certain patterns in the file.
            //fileReader.result contains the result of the fileReader. Accessing subarray 0th index to 4th index which contains the information that we need to infer the file type.
            const arr=new Uint8Array(fileReader.result as ArrayBuffer).subarray(0,4);
            let header="";
            let isValid=false;

            for(let i=0;i<arr.length;i++){
              //Converting the string to hexadecimal string.
                header+=arr[i].toString(16);
            }
            switch (header) {
              //Patterns which stand for file type JPEG/PNG
                case "89504e47":
                  isValid = true;
                  break;
                case "ffd8ffe0":
                case "ffd8ffe1":
                case "ffd8ffe2":
                case "ffd8ffe3":
                case "ffd8ffe8":
                  isValid = true;
                  break;
                default:
                  isValid = false; // Or you can use the blob.type as fallback
                  break;
              }
              if(isValid){
                //Use the observer which we can use to control when the observable can emit data, to emit data
                  observer.next(null);
              }
              else{
                //If it is invalid, emit a JS object
                  observer.next({invalidMimeType:true});
              }
              //Call complete to let any subscribers know that we are done.
              observer.complete();
        });
        fileReader.readAsArrayBuffer(file);
    });
    return frObs;

};
