import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  saveData(name: string, data: string) {
    localStorage.setItem(name, data);
  }

  getData(name: string) {
    return localStorage.getItem(name);
  }

  removeData(name: string) {
    localStorage.removeItem(name);
  }
}
