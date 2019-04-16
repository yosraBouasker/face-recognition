import { Component } from '@angular/core';
import { FaceService } from './face.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'face-recognition';

  url = '';
  path = '../../assets/11fab1669c.png';
  age = '';
  emotion = '';
  gender = '';
  glasses = '';
  imgNaturalHeight = 0;
  imgNaturalWidth = 0;


  constructor(private face: FaceService) { }

  btnClick(text) {
    const rect: HTMLElement = document.getElementById('rect');
    const image: HTMLElement = document.getElementById('img');

    this.path = text;
    this.face.getData(this.path).subscribe((data: any) => {
      console.log(data);
      rect.style.top = (data[0].faceRectangle.top * image.clientHeight) / this.imgNaturalHeight + 'px';
      rect.style.left = (data[0].faceRectangle.left * image.clientWidth) / this.imgNaturalWidth + 'px';
      rect.style.width = (data[0].faceRectangle.width * image.clientWidth) / this.imgNaturalWidth + 'px';
      rect.style.height = (data[0].faceRectangle.height * image.clientHeight) / this.imgNaturalHeight + 'px';

      rect.style.visibility = "visible";
    })


  }

  hover() {
    const list: HTMLElement = document.getElementById('list');
    const image: HTMLElement = document.getElementById('img');

    this.face.getData(this.path).subscribe((data: any) => {
      console.log(data);
      this.age = data[0].faceAttributes.age;
      this.emotion = data[0].faceAttributes.emotion;
      this.gender = data[0].faceAttributes.gender;
      this.glasses = data[0].faceAttributes.glasses;

      if (data[0].faceAttributes.emotion.happiness > 0)
        this.emotion = "happy";
      else if (data[0].faceAttributes.emotion.sadness > 0)
        this.emotion = "sad";
      else if (data[0].faceAttributes.emotion.anger > 0)
        this.emotion = "angry";
      else this.emotion = "neutral";

      list.style.top = (data[0].faceRectangle.top * image.clientHeight) / this.imgNaturalHeight + 20 + 'px';
      list.style.left = (data[0].faceRectangle.left * image.clientWidth) / this.imgNaturalWidth - 250 + 'px';

      list.style.visibility = "visible";
    })
  }
  leave() {
    const list: HTMLElement = document.getElementById('list');
    list.style.visibility = "hidden";
  }

  imgClicked(event) {
    console.log(event);
    console.log(event.target.naturalWidth);
    console.log(event.target.naturalHeight);
    this.imgNaturalHeight = event.target.naturalHeight;
    this.imgNaturalWidth = event.target.naturalWidth;

  }

}
