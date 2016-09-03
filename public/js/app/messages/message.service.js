"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var message_1 = require("./message");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
require('rxjs/Rx');
var Observable_1 = require("rxjs/Observable");
var MessageService = (function () {
    function MessageService(_http) {
        this._http = _http;
        this.messages = [];
        this.messageIsEdit = new core_1.EventEmitter();
    }
    MessageService.prototype.saveMessage = function (message) {
        var token = localStorage.getItem('token');
        var headers = new http_1.Headers({ 'Content-type': 'application/json', 'Authorization': (token) ? token : '' });
        if (message.messageId) {
            return this._updateMessage(message, headers);
        }
        else {
            return this._saveMessage(message, headers);
        }
    };
    MessageService.prototype.getMessages = function () {
        var _this = this;
        var token = localStorage.getItem('token');
        var headers = new http_1.Headers({ 'Authorization': (token) ? token : '' });
        return this._http.get('/messages', { headers: headers })
            .map(function (response) {
            var messages = response.json().map(function (message) { return new message_1.Message(message.content, message._id, message.user.firstName, message.user._id); });
            _this.messages = messages;
            return messages;
        })
            .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
    };
    MessageService.prototype.editMessage = function (message) {
        this.messageIsEdit.emit(message);
    };
    MessageService.prototype._updateMessage = function (message, headers) {
        var _this = this;
        var body = JSON.stringify(message);
        return this._http.put("/messages/" + message.messageId, body, { headers: headers })
            .map(function (response) {
            _this.messages[_this.messages.indexOf(message)] = message;
            return response.json();
        })
            .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
    };
    MessageService.prototype._saveMessage = function (message, headers) {
        var _this = this;
        var body = JSON.stringify(message);
        return this._http.post('/messages', body, { headers: headers })
            .map(function (response) {
            var data = response.json();
            var message = new message_1.Message(data.content, data._id, data.user.firstName, data.user._id);
            _this.messages.push(message);
            return message;
        })
            .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
    };
    MessageService.prototype.deleteMessage = function (message) {
        var _this = this;
        var token = localStorage.getItem('token');
        var headers = new http_1.Headers({ 'Authorization': (token) ? token : '' });
        return this._http.delete("/messages/" + message.messageId, { headers: headers })
            .map(function (response) {
            _this.messages.splice(_this.messages.indexOf(message), 1);
            return response.json();
        });
    };
    MessageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL21lc3NhZ2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsd0JBQXNCLFdBQVcsQ0FBQyxDQUFBO0FBQ2xDLHFCQUFzQyxlQUFlLENBQUMsQ0FBQTtBQUN0RCxxQkFBdUMsZUFBZSxDQUFDLENBQUE7QUFDdkQsUUFBTyxTQUFTLENBQUMsQ0FBQTtBQUNqQiwyQkFBeUIsaUJBQWlCLENBQUMsQ0FBQTtBQUkzQztJQUlFLHdCQUFvQixLQUFXO1FBQVgsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUgvQixhQUFRLEdBQWMsRUFBRSxDQUFDO1FBQ3pCLGtCQUFhLEdBQWlCLElBQUksbUJBQVksRUFBVyxDQUFDO0lBRXhCLENBQUM7SUFFbkMsb0NBQVcsR0FBWCxVQUFZLE9BQWdCO1FBQzFCLElBQU0sS0FBSyxHQUFXLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEQsSUFBTSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLEVBQUUsRUFBQyxDQUFDLENBQUM7UUFDekcsRUFBRSxDQUFDLENBQUUsT0FBTyxDQUFDLFNBQVUsQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQzlDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QyxDQUFDO0lBQ0gsQ0FBQztJQUVELG9DQUFXLEdBQVg7UUFBQSxpQkFZQztRQVhDLElBQU0sS0FBSyxHQUFXLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEQsSUFBTSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMs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LEdBQWIsVUFBYyxPQUFnQjtRQUE5QixpQkFTQztRQVJDLElBQU0sS0FBSyxHQUFXLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEQsSUFBTSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBQyxlQUFlLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBRSxFQUFDLENBQUMsQ0FBQztRQUNyRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBYSxPQUFPLENBQUMsU0FBVyxFQUFFLEVBQUUsU0FBQSxPQUFPLEVBQUUsQ0FBQzthQUNwRSxHQUFHLENBQUMsVUFBQSxRQUFRO1lBQ1gsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUN4QixDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFuRUg7UUFBQyxpQkFBVSxFQUFFOztzQkFBQTtJQW9FYixxQkFBQztBQUFELENBbEVBLEFBa0VDLElBQUE7QUFsRVksc0JBQWMsaUJBa0UxQixDQUFBIiwiZmlsZSI6Im1lc3NhZ2VzL21lc3NhZ2Uuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TWVzc2FnZX0gZnJvbSBcIi4vbWVzc2FnZVwiO1xuaW1wb3J0IHtIdHRwLCBIZWFkZXJzLCBSZXNwb25zZX0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7SW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICdyeGpzL1J4JztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuXG5ASW5qZWN0YWJsZSgpXG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlU2VydmljZSB7XG4gIG1lc3NhZ2VzOiBNZXNzYWdlW10gPSBbXTtcbiAgbWVzc2FnZUlzRWRpdDogRXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcjxNZXNzYWdlPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHApIHt9XG5cbiAgc2F2ZU1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZSk6IE9ic2VydmFibGU8TWVzc2FnZT4ge1xuICAgIGNvbnN0IHRva2VuOiBzdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeydDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsICdBdXRob3JpemF0aW9uJzogKHRva2VuKSA/IHRva2VuIDogJyd9KTtcbiAgICBpZiAoIG1lc3NhZ2UubWVzc2FnZUlkICkge1xuICAgICAgcmV0dXJuIHRoaXMuX3VwZGF0ZU1lc3NhZ2UobWVzc2FnZSwgaGVhZGVycylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX3NhdmVNZXNzYWdlKG1lc3NhZ2UsIGhlYWRlcnMpO1xuICAgIH1cbiAgfVxuXG4gIGdldE1lc3NhZ2VzKCk6IE9ic2VydmFibGU8TWVzc2FnZVtdPiB7XG4gICAgY29uc3QgdG9rZW46IHN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7J0F1dGhvcml6YXRpb24nOiAodG9rZW4pID8gdG9rZW4gOiAnJ30pO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmdldCgnL21lc3NhZ2VzJywgeyBoZWFkZXJzIH0pXG4gICAgICAubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZXM6IE1lc3NhZ2VbXSA9IHJlc3BvbnNlLmpzb24oKS5tYXAoXG4gICAgICAgICAgKG1lc3NhZ2UpID0+IHsgcmV0dXJuIG5ldyBNZXNzYWdlKG1lc3NhZ2UuY29udGVudCwgbWVzc2FnZS5faWQsIG1lc3NhZ2UudXNlci5maXJzdE5hbWUsIG1lc3NhZ2UudXNlci5faWQpOyB9XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubWVzc2FnZXMgPSBtZXNzYWdlcztcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VzO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xuICB9XG5cbiAgZWRpdE1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZUlzRWRpdC5lbWl0KG1lc3NhZ2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlLCBoZWFkZXJzOiBIZWFkZXJzKSB7XG4gICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpO1xuICAgIHJldHVybiB0aGlzLl9odHRwLnB1dChgL21lc3NhZ2VzLyR7bWVzc2FnZS5tZXNzYWdlSWR9YCwgYm9keSwgeyBoZWFkZXJzIH0pXG4gICAgICAubWFwKHJlc3BvbnNlID0+IHtcbiAgICAgICAgdGhpcy5tZXNzYWdlc1t0aGlzLm1lc3NhZ2VzLmluZGV4T2YobWVzc2FnZSldID0gbWVzc2FnZTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkpKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NhdmVNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UsIGhlYWRlcnM6IEhlYWRlcnMpOiBPYnNlcnZhYmxlPE1lc3NhZ2U+IHtcbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSk7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCgnL21lc3NhZ2VzJywgYm9keSwgeyBoZWFkZXJzIH0pXG4gICAgICAubWFwKHJlc3BvbnNlID0+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IG5ldyBNZXNzYWdlKGRhdGEuY29udGVudCwgZGF0YS5faWQsIGRhdGEudXNlci5maXJzdE5hbWUsIGRhdGEudXNlci5faWQpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xuICB9XG5cbiAgZGVsZXRlTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKSB7XG4gICAgY29uc3QgdG9rZW46IHN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7J0F1dGhvcml6YXRpb24nOiAodG9rZW4pID8gdG9rZW4gOiAnJ30pO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmRlbGV0ZShgL21lc3NhZ2VzLyR7bWVzc2FnZS5tZXNzYWdlSWR9YCwgeyBoZWFkZXJzIH0pXG4gICAgICAubWFwKHJlc3BvbnNlID0+IHtcbiAgICAgICAgdGhpcy5tZXNzYWdlcy5zcGxpY2UodGhpcy5tZXNzYWdlcy5pbmRleE9mKG1lc3NhZ2UpLCAxKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxuICAgICAgfSk7XG5cbiAgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
