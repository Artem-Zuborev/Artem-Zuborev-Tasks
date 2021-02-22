import {Component, OnInit} from '@angular/core';
import {NgbCarousel, NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {Pokemon} from '../pokemon.service';


@Component({
  selector: 'app-my-pokemons',
  templateUrl: './my-pokemons.component.html',
  styleUrls: ['./my-pokemons.component.scss']
})
export class MyPokemonsComponent implements OnInit {
  subscription: Subscription;
  pokemonsDetail;
  newItem;
  imgPok;
  images;
  arrayOfPokemons = [];
  namePok;

  constructor(private config: NgbCarouselConfig,
              private http: HttpClient,
              private pokemonService: Pokemon) {
    config.showNavigationArrows = true;
    config.wrap = true;
    config.animation = true;
  }


  ngOnInit(): void {
    this.subscription = this.pokemonService.getApi()
      .subscribe((response: any) => {
        this.pokemonsDetail = response;
        this.pokemonsDetail.results.forEach(result => {
          this.http.get(result.url)
            .subscribe(item => {
              this.newItem = item;
              this.namePok = this.newItem.name;
              this.imgPok = this.newItem.sprites.other.dream_world.front_default;
              this.arrayOfPokemons.push(this.imgPok);
              this.images = this.arrayOfPokemons;
              console.log(this.images);
            });
        });
      });

  }

}
