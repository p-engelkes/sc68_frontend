/**
 * Created by pengelkes on 05.05.2017.
 */
import {Injectable} from "@angular/core";
import {NotificationsService} from "angular4-notifications";
@Injectable()
export class NotificationService {
  private nextNotification = 'nextNotification';
  private nextNotificationType = 'nextNotificationType';

  constructor(private notificationsService: NotificationsService) {
  }

  setNotification(notification: Notification) {
    this.setNextNotification(notification.getMessage());
    this.setNextNotificationType(notification.getType());
  }

  showNotification(notification: Notification) {
    this.createNotification(notification.getType(), notification.getMessage());
  }

  showErrorNotification(jsonError: any) {
    let response = JSON.parse(JSON.stringify(jsonError))._body;
    let errorMessage = JSON.parse(response).message;
    this.notificationsService.error(errorMessage, "");
  }

  notify() {
    let nextNotification = this.getNextNotification();
    if (this.hasNotification()) {
      this.createNotification(this.getNextNotificationType(), nextNotification);
      this.clearNotification();
    }
  }

  private createNotification(notificationType: NotificationType, notification: string) {
    switch (notificationType) {
      case NotificationType.SUCCESS:
        this.notificationsService.success(notification, "");
        break;
      case NotificationType.INFO:
        this.notificationsService.info(notification, "");
        break;
      case NotificationType.ALERT:
        this.notificationsService.alert(notification, "");
        break;
      case NotificationType.ERROR:
        this.notificationsService.error(notification, "");
        break;
    }
  }

  private setNextNotification(value: string) {
    localStorage.setItem(this.nextNotification, value);
  }

  private getNextNotification() {
    return localStorage.getItem(this.nextNotification);
  }

  private setNextNotificationType(value: NotificationType) {
    localStorage.setItem(this.nextNotificationType, value.toString());
  }

  private getNextNotificationType() {
    return NotificationService.getNotificationTypeByString(localStorage.getItem(this.nextNotificationType));
  }

  private clearNotification() {
    this.setNextNotification(null);
  }

  private hasNotification() {
    return this.getNextNotification() !== "null";
  }

  private static getNotificationTypeByString(notificationTypeString: string) {
    switch (notificationTypeString) {
      case '0':
        return NotificationType.SUCCESS;
      case '1':
        return NotificationType.INFO;
      case '2':
        return NotificationType.ALERT;
      case '3':
        return NotificationType.ERROR;
    }
  }
}

export enum NotificationType {
  SUCCESS,
  INFO,
  ALERT,
  ERROR
}

export class Notification {
  private message: string;
  private type: NotificationType;

  constructor(message: string, type: NotificationType) {
    this.message = message;
    this.type = type;
  }

  getMessage() {
    return this.message;
  }

  getType() {
    return this.type;
  }
}
