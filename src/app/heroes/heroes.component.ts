import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

heroes: Hero[];

selectedHero: Hero;

onSelect(hero: Hero): void {
  this.messageService.add(`HeroesComponent: Selected hero name: ${hero.name}`)
  this.selectedHero = hero;
}

// return heroes from service
getHeroes(): void {
  this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
}

constructor(
  // init service
  private heroService: HeroService,
  private messageService: MessageService
) { }

ngOnInit(): void {
  //call function
  this.getHeroes();
}

}