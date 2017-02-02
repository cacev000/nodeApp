import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {

    constructor(private http: Http) { }

  // Get all posts from the API
  getAllPosts() {
    return this.http.get('/api/posts')
      .map(res => res.json());
  }

  createPosts(createUser) {
    let user = JSON.stringify(createUser);

    return this.http.post('/api/posts/', user)
      .map(res => res.json());
  }

}
