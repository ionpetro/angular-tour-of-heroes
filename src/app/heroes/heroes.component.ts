import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

heroes: Hero[];

// return heroes from service
getHeroes(): void {
  this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
}

constructor(
  // init service
  private heroService: HeroService,
) { }

ngOnInit(): void {
  //call function
  this.getHeroes();
}

}
