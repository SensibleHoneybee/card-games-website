import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CardGameService } from '../_services/card-game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-window',
  templateUrl: './message-window.component.html',
  styleUrls: ['./message-window.component.css']
})
export class MessageWindowComponent implements OnInit {
  currentMessages: string[];
  currentMessagesSubscription: Subscription;
  messageToSend: string;

  constructor(private cardGameService: CardGameService) { 
    this.currentMessagesSubscription = this.cardGameService.currentMessages.subscribe(messages => {
      if (messages == null) {
        this.currentMessages = [];
        return;
      }
      
      messages.reverse();
      this.currentMessages = messages;
    });
  }

  ngOnInit() {
    var objDiv = document.getElementById("message-window-area-inner-inner");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  submitMessage() {
    this.cardGameService.sendMessageToPlayer('', this.messageToSend);
    this.messageToSend = '';
  }

}
