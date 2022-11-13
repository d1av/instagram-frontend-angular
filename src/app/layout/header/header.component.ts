import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { InstagramUserApi } from 'src/app/shared/services/instagram-user-api.service';
import { UserInstagram } from 'src/app/shared/types/user-instagram.types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public searchTerm: string = '';
  public searchResult: Array<UserInstagram> = []
  constructor(
    private router: Router,
    private apiUserInstagram: InstagramUserApi,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }


  public goToHome(): void {
    this.router.navigateByUrl('/');
  }


  public async searchUsers(): Promise<void> {
    if (this.searchTerm.length < 3) return;

    try {
      const usersReturned: any = await this.apiUserInstagram.searchUsers(this.searchTerm.toLocaleLowerCase())
      const userLoggedIn = this.authenticationService.getLoggedUser();
      this.searchResult = await usersReturned.filter((e: any) => e._id !== userLoggedIn?.id)
    } catch (error: any) {
      const errorMessage = error?.error?.error || 'Erro ao procurar usuaários'
      alert(errorMessage);
    }
    console.log(this.searchTerm)
  }

  public goToUserProfile(userId: string): void {
    console.log(`printando o id do usuario ${userId}`)
  }
}
