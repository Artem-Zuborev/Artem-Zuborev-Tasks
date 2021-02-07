import {Component, OnInit} from '@angular/core';
import {Pokemon} from '../pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss']
})
export class PokemonsListComponent implements OnInit {
  pokemons: any[] = [];
  page = 1;
  totalPokemons: number;

  constructor(
    private pokemonService: Pokemon
  ) {
  }

  ngOnInit(): void {
    this.getPokemons();
  }
  getPokemons(): void{
    this.pokemonService.getApi(12, this.page + 0)
      .subscribe((response: any) => {
        this.totalPokemons = response.count;
        response.results.forEach(result => {
          this.pokemonService.getMoreData(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
              console.log(this.pokemons);
            });
        });
      });
  }
}
