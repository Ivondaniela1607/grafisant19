import { inject, Injectable } from '@angular/core';

import { FilesService } from '../core/services/files.service';


@Injectable()
export class FilesUtils {
  private filesService = inject(FilesService);

  
  urltoFile = (url: string, filename: string, mimeType: string) => {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  };
  
  findFile = (dir: string, img: string) => {
    return new Promise((resolve) => {
      let body = {
        name: img,
        directory: dir,
      };
      this.filesService.getViewFile(body).subscribe((res) => {
        resolve(res);
      });
    });
  };
}
