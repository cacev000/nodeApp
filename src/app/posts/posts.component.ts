import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public userInfo:any = '';
  public user:any = '';

  constructor(private postsService: PostsService) { }

  userCreation(email, password, userName){
    let id = '2';

    let user = {
      userId: id,
      email: email,
      password: password,
      userName: userName
    };

    this.postsService.createPosts(user).subscribe(
      posts => {
        return true;
      },
      error => {
        console.error("Error saving user!");
      }
    )
  }
  userDeletion(id){

    let user = {
      userId: id,
    };

    this.postsService.deletePosts(user).subscribe(
      posts => {
        return true;
      },
      error => {
        console.error("Error deleting user!");
      }
    )
  }
  userUpdate(email, password, userName){
    let id = '1';
    
    let user = {
      userId: id,
      email: email,
      password: password,
      userName: userName
    };

    this.postsService.updatePosts(user).subscribe(
      posts => {
        return true;
      },
      error => {
        console.error("Error updating user!");
      }
    )
  }

  ngOnInit() {
    let userId = '1';
        // Retrieve posts from the API
    this.postsService.getAllPosts(userId).subscribe((user:any) => {
      console.log(user);
      this.user = user;
      // console.log(posts[0].email);
    });
  }

}
