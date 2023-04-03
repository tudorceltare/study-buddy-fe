import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserLogin} from "../models/userLogin.model";
import {Router} from "@angular/router";
import {NotificationService} from "../service/notification.service";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../service/authentication.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {User} from "../models/user.model";
import {HeaderType} from "../models/headerType.enum";
import {NotificationType} from "../models/notificationType.enum";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  user: UserLogin = {
    username:'',
    password:''
  };

  submitted = false;
  public showLoading = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private router :Router,
    private notificationService: NotificationService

  ) { }

  ngOnInit(): void {
    if(this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/persons');
    } else {
      this.router.navigateByUrl('/login')
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  login(): void {
    this.user = this.form.value
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.login(this.user).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          console.log(token);
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body);
          this.notificationService.notify(NotificationType.SUCCESS, "user found")
          // this.router.navigateByUrl('persons');
          this.showLoading = false;
        },
        (errorResponse : HttpErrorResponse) => {
          console.log(errorResponse);
          this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }

  private sendErrorNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, "An error occurred. Please try again");
    }
  }

  register() {
    this.router.navigateByUrl("register");
  }
}
