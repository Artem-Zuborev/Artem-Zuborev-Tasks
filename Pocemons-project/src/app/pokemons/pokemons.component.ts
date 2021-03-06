import {Component, OnInit} from '@angular/core';
import {interval} from 'rxjs';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {
  active = false;
  myPokemons: any;
  counterPoke: number;

  constructor() {
  }

  ngOnInit(): void {
    this.getMyPokemons();
  }

  public getMyPokemons(): void {
    const source = interval(1000);
    const subscribe = source.subscribe(val => {
      this.myPokemons = JSON.parse(localStorage.getItem('myPokemons'));
      if (this.myPokemons === null) {
        return;
      }
      this.counterPoke = this.myPokemons.length;
    });
  }
}
