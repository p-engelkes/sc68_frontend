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

  notify() {
    let nextNotification = this.getNextNotification();
    if (this.hasNotification()) {
      switch (this.getNextNotificationType()) {
        case NotificationType.SUCCESS:
          this.notificationsService.success(nextNotification, "");
          break;
        case NotificationType.INFO:
          this.notificationsService.info(nextNotification, "");
          break;
        case NotificationType.ALERT:
          this.notificationsService.alert(nextNotification, "");
          break;
        case NotificationType.ERROR:
          this.notificationsService.error(nextNotification, "");
          break;
      }
      this.clearNotification();
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
