import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  createGame() {
    this.router.navigate(['/create-game']);
  }

  joinGame() {
    this.router.navigate(['/join-game']);
  }

  rejoinGame() {
    this.router.navigate(['/rejoin-game']);
  }

}
