import {Component, OnInit, Output} from '@angular/core';
import {interval} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {
  pageEvent: PageEvent = {
    length: 0,
    pageSize: 9,
    pageIndex: 0
  };
  active = false;
  myPokemons: any;
  counterPoke: number;
  sizePage = 9;

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
      this.pageEvent.length = this.myPokemons.length;
    });
  }


}
