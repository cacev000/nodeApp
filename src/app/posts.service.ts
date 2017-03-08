import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Jsonp  } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { users } from './user';

@Injectable()
export class PostsService {

    constructor(private http: Http) { }

  private usersUrl = 'https://q4e7z7zv46.execute-api.us-east-1.amazonaws.com/user/user/';
  private usersInfoUrl = 'https://q4e7z7zv46.execute-api.us-east-1.amazonaws.com/user/userinfo/';

  // Get all posts from the API
  getAllPosts(userId): Observable<users[]>  {
    return this.http.get(this.usersUrl + userId)
      .map((res: Response )=> res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  // // Get all posts from the API
  // getAllPosts() {
  //   return this.http.get('/api/posts')
  //     .map(res => res.json());
  // }

  // Create user
  createPosts(createUser) {
    console.log('https://un3e6ulwzc.execute-api.us-east-1.amazonaws.com/comments/comments', createUser);
    return this.http.post('https://un3e6ulwzc.execute-api.us-east-1.amazonaws.com/comments/comments', createUser)
      .map(res => console.log(res.json()));
  }
  // createPosts(createUser) {
  //   return this.http.post('/api/posts', createUser)
  //     .map(res => res.json());
  // }

  // deletes user
  deletePosts(deleteUser) {
    return this.http.delete('/api/posts/', new RequestOptions({
         body: deleteUser
      }))
     .map(res => res.json());
  }

  // updates user
  updatePosts(updateUser) {
    return this.http.put('/api/posts/', updateUser)
     .map(res => res.json());
  }
}
