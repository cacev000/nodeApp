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

  userCreation(email, firstName, lastName){

    let user = {
      pageId: email,
      userName: firstName,
      message: lastName
    };

    // this.postsService.createPosts(user).subscribe(
    //   posts => {
    //     return true;
    //   },
    //   error => {
    //     console.error("Error saving user!");
    //   }
    // )
  }
  userDeletion(email){

    let user = {
      email: email,
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
  userUpdate(email, firstName, lastName){

    let user = {
      email: email,
      firstName: firstName,
      lastName: lastName
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
      this.user = user.user;
      // console.log(posts[0].email);
    });
  }

}
