import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

import { BaseService } from '../services/base.service';

import { Item } from '../shared/item';

@Component({
  selector: 'app-home',
  providers: [BaseService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  itemList: Array<Item>;
  item: Item;

  constructor(private baseService: BaseService) { }

  ngOnInit() {
    this.item = new Item();
    this.baseService.getItemsList()
      .subscribe(lists => this.itemList = lists);
  }

  register() {
    this.baseService.create(this.item);
  }

  get(key: string) {
    this.baseService.retrieve(key).then(result => console.log(result.name));
  }

  update(key: string) {
    this.baseService.update(key, {name: 'UPDATED!'});
  }

  remove(key: string) {
    this.baseService.delete(key);
  }

  uploadImage() {
    let storage = firebase.storage().ref();
    let path = '/images/';
    let files = [(<HTMLInputElement>document.getElementById('image')).files[0]];

    for(let image of files) {
      storage.child(path + image.name).put(image)
        .then(() => {
          alert('Image uploaded!');
        });
    }
  }
}
