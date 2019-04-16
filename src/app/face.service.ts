import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlSerializer } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FaceService {

  constructor(private http: HttpClient) { }

 getData(url){
   const obj = {
     url: url
   };
   console.log(obj);

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': '913898a35d9847bd8b984b5c7fe66fc5'
    })
  };
    return this.http.post('https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise',obj,httpOptions);
 }
}

