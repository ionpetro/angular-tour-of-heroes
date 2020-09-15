import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})

export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;

  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  //Push a search term into the observable stream
  search(term: string): void {
    // push values to the searchTerms Observable
    this.searchTerms.next(term);
  }

  ngOnInit(): void {

    /**
     * Q: Why do we create this pipe and not just call searchHeroes(term)?
     * A: We create this pipe so as to limit the number of requests we send
     * to the server. We send a new request when:
     *  1. 300ms passed
     *  2. the value remains the same
     */

    this.heroes$ = this.searchTerms.pipe(
      //wait 300ms after each keystroke before considering the term
      debounceTime(300),

      //ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      // switchMap only returns the last request and discards all the prior ones
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

}
