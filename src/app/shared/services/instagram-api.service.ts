import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstagramApiService {

  constructor(
    protected http: HttpClient,
    @Inject('INSTAGRAM_URL_API') private instagramUrlApi: string
  ) { }

  public post(url: string, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.getUrl(url),
        body
      ).subscribe({
        next: v => resolve(v),
        error: v => reject(v)
      })
    })
  }

  private getUrl(url: string): string {
    return `${this.instagramUrlApi}/${url}}`;
  }
}
