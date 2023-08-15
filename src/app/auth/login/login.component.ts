import {
  Component,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-services/auth.service';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';

import { Message, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  @ViewChild('f') userData!: NgForm;

  // @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;

  username: any;
  password: any;
  error: Message[];
  auth2: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private socialAuthService: SocialAuthService
  ) {
    this.error = [];
  }

  ngOnInit() {
    // this.googleAuthSDK();

    this.loginWithGoogle();

    this.primengConfig.ripple = true;
  }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (result: any) => {
        localStorage.setItem('token', `${result['token']}`);
        const user = JSON.stringify(result['data']);
        localStorage.setItem('user', user);
        // console.log('success:', result['data']);
        // this.messageService.add({
        //   key: 'topcenter',
        //   severity: 'info',
        //   summary: 'StartupLynk',
        //   detail: `${result.message} ✔`,
        // });
        if (result) {
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.log('error:', error.error);

        if (error.status === 0) {
          // return alert('We are resolving the issue . Try sometime later !');
          this.error = [
            {
              severity: 'error',
              // summary: 'StartupLynk :  ',
              detail: 'We are resolving the issue . Try sometime later !',
            },
          ];
          return;
        }
        this.error = [
          {
            severity: 'error',
            // summary: 'StartupLynk :  ',
            detail: error.error.error,
          },
        ];
      }
    );
  }

  loginWithGoogle() {
    // this.isLoggedIn = false;

    this.socialAuthService.authState.subscribe((user) => {
      // console.log('userinit', user);
      if (user?.idToken)
        this.authService.loginWithGoogle(user.idToken).subscribe(
          (user: any) => {
            if (user) {
              const data = JSON.stringify(user['user']);

              localStorage.setItem('token', user['token']);
              localStorage.setItem('user', data);

              this.router.navigate(['/home']);
            }
          },
          (error) => {
            console.log('Error from google login : ', error);
            if (error.status === 0) {
              // return alert('We are resolving the issue . Try sometime later !');
              this.error = [
                {
                  severity: 'error',
                  // summary: 'StartupLynk :  ',
                  detail: 'We are resolving the issue . Try sometime later !',
                },
              ];
              return;
            }
          }
        );
    });
  }

  // callLoginButton() {
  //   this.auth2.attachClickHandler(
  //     this.loginElement.nativeElement,
  //     {},
  //     (googleAuthUser: any) => {
  //       // let profile = googleAuthUser.getBasicProfile();
  //       // console.log({ profile });
  //       const { id_token } = googleAuthUser.getAuthResponse();
  //       console.log(id_token);
  //       this.authService.loginWithGoogle(id_token).subscribe(
  //         (user: any) => {
  //           console.log('userdata', user);

  //           if (user) {
  //             const data = JSON.stringify(user['user']);

  //             localStorage.setItem('token', user['token']);
  //             localStorage.setItem('user', data);

  //             this.router.navigate(['/home']);
  //           }
  //         },
  //         (error) => {
  //           console.log('Error from google login : ', error);

  //           if (error.status === 0) {
  //             this.error = [
  //               {
  //                 severity: 'error',
  //                 // summary: 'StartupLynk :  ',
  //                 detail: 'We are resolving the issue . Try sometime later !',
  //               },
  //             ];
  //           }
  //           return;
  //         }
  //       );

  //       // console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
  //       // console.log('ID: ' + profile.getId());
  //       // console.log('Name: ' + profile.getName());
  //       // console.log('Image URL: ' + profile.getImageUrl());
  //       // console.log('Email: ' + profile.getEmail());

  //       /* Write Your Code Here */
  //     },
  //     (error: any) => {
  //       console.log(error);

  //       alert(JSON.stringify(error, undefined, 2));
  //     }
  //   );
  // }
  // googleAuthSDK() {
  //   (<any>window)['googleSDKLoaded'] = () => {
  //     (<any>window)['gapi'].load('auth2', () => {
  //       this.auth2 = (<any>window)['gapi'].auth2.init({
  //         client_id:
  //           '357805349909-i4llk9rl3i4msotnpic5kbgimmrlg97i.apps.googleusercontent.com',
  //         cookiepolicy: 'single_host_origin',
  //         plugin_name: 'login',
  //         scope: 'profile email',
  //       });
  //       this.callLoginButton();
  //     });
  //   };

  //   (function (d, s, id) {
  //     var js,
  //       fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) {
  //       return;
  //     }
  //     js = d.createElement('script');
  //     js.id = id;
  //     js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
  //     fjs?.parentNode?.insertBefore(js, fjs);
  //   })(document, 'script', 'google-jssdk');
  // }
}
