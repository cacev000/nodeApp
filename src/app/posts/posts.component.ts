import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any = [];

  constructor(private postsService: PostsService) { }

  userCreation(email, firstName, lastName){
    let user = {
      email: email,
      firstName: firstName,
      lastName: lastName
    };

    this.postsService.createPosts(user).subscribe(
      posts => {
        this.posts = posts;
        return true;
      },
      error => {
        console.error("Error saving food!");
      }
    )
  }

  ngOnInit() {
        // Retrieve posts from the API
    this.postsService.getAllPosts().subscribe(posts => {
      // console.log(posts);
      this.posts = posts;
      // console.log(posts[0].email);
    });
  }

}
