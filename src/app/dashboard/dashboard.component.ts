import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService
    ) {
  }

  getHeroes():void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes
          // sort by alphabetical order
          .sort((a,b) => {
            if(a.name > b.name) { return 1; }
            if(a.name < b.name) { return -1; }
            return 0;})
          .slice(0,4)) //first four heroes
  }

  ngOnInit(): void {
    this.getHeroes();

  }

}
