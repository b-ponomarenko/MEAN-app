import {Component, OnInit} from "@angular/core";

import {Message} from "./message";
import {MessageService} from "./message.service";

@Component({
  selector: 'my-message-input',
  template: `
        <section class="col-md-8 col-md-offset-2">
            <form (ngSubmit)="onSubmit(f.value)" #f="ngForm">
                <div class="form-group">
                    <label for="content">Content</label>
                    <input ngControl="content" type="text" class="form-control" id="content" #input [ngModel]="message?.content">
                </div>
                <button type="submit" class="btn btn-primary">{{ !message ? 'Send Message' : 'Save message' }}</button>
                <button class="btn btn-danger" (click)="onCancel()" *ngIf="message">Cancel</button>
            </form>
        </section>
    `
})
export class MessageInputComponent implements OnInit {
  message: Message = null;

  constructor(private _messageService: MessageService) {
  }

  onSubmit(form: any) {
    if (!this.message) {
      this.message = new Message(form.content, null, 'Bogdan');
    } else {
      this.message.content = form.content;
    }
    this._messageService.saveMessage(this.message)
      .subscribe(
        data => {
          this.message = null;
          console.log(data)
        },
        error => console.log(error)
      );
  }

  onCancel() {
    this.message = null;
  }

  ngOnInit(): void {
    this._messageService.messageIsEdit.subscribe(
      message => {
        this.message = message;
      }
    )
  }
}