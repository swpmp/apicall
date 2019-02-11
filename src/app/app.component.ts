import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  polledBitcoin$: Observable<number>;
  value: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.callBtc(); 
  }

  public callBtc() {
    const bitcoin$ = this.http.get('https://blockchain.info/ticker');
    return new Promise(resolve => {
      // interval(10000) => 10 seconds
      this.polledBitcoin$ = interval(10000).pipe(
        concatMap(_ => bitcoin$),
        map((response: {EUR: {last: number}}) => response.EUR.last),
      );
    })
  }
}
