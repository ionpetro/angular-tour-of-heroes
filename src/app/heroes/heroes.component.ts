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


ngOnInit(): void {
  //call function
  this.getHeroes();
}
// return heroes from service
getHeroes(): void {
  this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
}

add(name: string): void {
  name = name.trim();
  if (!name) {return ;}
  this.heroService.addHero({name} as Hero)
    .subscribe(hero => {
      this.heroes.push(hero)
    });
}

delete(hero: Hero): void {
  // remove the hero from the list
  this.heroes = this.heroes.filter(h => h !== hero);
  // delete the hero using the service
  this.heroService.deleteHero(hero)
    .subscribe();
}

constructor(
  // init service
  private heroService: HeroService,
) { }

}
