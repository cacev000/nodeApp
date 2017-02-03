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

  // Create user
  createPosts(createUser) {
    return this.http.post('/api/posts', createUser)
      .map(res => res.json());
  }

  // delete user
  deletePosts(deleteUser) {
    return this.http.delete('/api/posts', deleteUser)
      .map(res => res.json());
  }
}
