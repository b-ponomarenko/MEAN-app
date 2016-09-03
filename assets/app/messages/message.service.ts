import {Message} from "./message";
import {Http, Headers, Response} from "@angular/http";
import {Injectable, EventEmitter} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()

export class MessageService {
  messages: Message[] = [];
  messageIsEdit: EventEmitter = new EventEmitter<Message>();

  constructor(private _http: Http) {}

  saveMessage(message: Message): Observable<Message> {
    const token: string = localStorage.getItem('token');
    const headers = new Headers({'Content-type': 'application/json', 'Authorization': (token) ? token : ''});
    if ( message.messageId ) {
      return this._updateMessage(message, headers)
    } else {
      return this._saveMessage(message, headers);
    }
  }

  getMessages(): Observable<Message[]> {
    const token: string = localStorage.getItem('token');
    const headers = new Headers({'Authorization': (token) ? token : ''});
    return this._http.get('/messages', { headers })
      .map((response: Response) => {
        const messages: Message[] = response.json().map(
          (message) => { return new Message(message.content, message._id, message.user.firstName, message.user._id); }
        );
        this.messages = messages;
        return messages;
      })
      .catch(error => Observable.throw(error.json()));
  }

  editMessage(message: Message) {
    this.messageIsEdit.emit(message);
  }

  private _updateMessage(message: Message, headers: Headers) {
    const body = JSON.stringify(message);
    return this._http.put(`/messages/${message.messageId}`, body, { headers })
      .map(response => {
        this.messages[this.messages.indexOf(message)] = message;
        return response.json();
      })
      .catch(error => Observable.throw(error.json()));
  }

  private _saveMessage(message: Message, headers: Headers): Observable<Message> {
    const body = JSON.stringify(message);
    return this._http.post('/messages', body, { headers })
      .map(response => {
        const data = response.json();
        const message = new Message(data.content, data._id, data.user.firstName, data.user._id);
        this.messages.push(message);
        return message;
      })
      .catch(error => Observable.throw(error.json()));
  }

  deleteMessage(message: Message) {
    const token: string = localStorage.getItem('token');
    const headers = new Headers({'Authorization': (token) ? token : ''});
    return this._http.delete(`/messages/${message.messageId}`, { headers })
      .map(response => {
        this.messages.splice(this.messages.indexOf(message), 1);
        return response.json()
      });

  }
}