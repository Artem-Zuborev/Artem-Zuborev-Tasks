import {
  Component,
  ViewChild,
  ElementRef,
  OnInit, ViewChildren, QueryList, OnDestroy
} from '@angular/core';
import {Pokemon} from '../pokemon.service';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @ViewChild('cardsFirst', {static: true}) cardsBlockOne: ElementRef;
  @ViewChild('cardsSecond', {static: true}) cardsBlockTwo: ElementRef;
  @ViewChild('cardsThird', {static: true}) cardsBlockThree: ElementRef;
  @ViewChildren('cardItemOne', {read: ElementRef}) cardItemOne: QueryList<ElementRef>;
  @ViewChildren('cardItemTwo', {read: ElementRef}) cardItemTwo: QueryList<ElementRef>;
  @ViewChildren('cardItemThree', {read: ElementRef}) cardItemThree: QueryList<ElementRef>;
  cardsOne: any[] = ['нет', 0, 1, 2, 3, 4, 'нет', 5, 6, 'нет'];
  cardsTwo: any[] = ['нет', 0, 1, 'нет', 2, 'нет', 3, 'нет', 4, 'нет'];
  cardsThree: any[] = ['нет', 0, 1, 2, 3, 'нет', 4, 5, 6, 7, 8];
  randomOne;
  randomTwo;
  randomThree;
  resultOne;
  resultTwo;
  resultThree;
  result;
  subscription: Subscription;
  pokemonsDetail;
  newItemPoke;
  typePokemon;
  experience;
  abilities;
  namePok;
  imgPok;
  notPoke;

  constructor(private pokemonService: Pokemon,
              private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  start(): void {
    this.randomOne = Math.floor(Math.random() * 9); // От 0 до 9
    this.randomTwo = Math.floor(Math.random() * 9); // От 0 до 9
    this.randomThree = Math.floor(Math.random() * 9); // От 0 до 9
    this.cardsBlockOne.nativeElement.style.left = -this.randomOne * 100 + 'px';
    this.cardsBlockTwo.nativeElement.style.left = -this.randomTwo * 100 + 'px';
    this.cardsBlockThree.nativeElement.style.left = -this.randomThree * 100 + 'px';
    this.randomOne++;
    this.randomTwo++;
    this.randomThree++;
    setTimeout(() => {
      this.cardItemOne.toArray()[this.randomOne].nativeElement.style.background = '#11998e';
      this.cardItemOne.toArray()[this.randomOne].nativeElement.style.color = 'white';
      this.cardItemTwo.toArray()[this.randomTwo].nativeElement.style.background = '#11998e';
      this.cardItemTwo.toArray()[this.randomTwo].nativeElement.style.color = 'white';
      this.cardItemThree.toArray()[this.randomThree].nativeElement.style.background = '#11998e';
      this.cardItemThree.toArray()[this.randomThree].nativeElement.style.color = 'white';
    }, 5000);
    this.resultOne = this.cardItemOne.toArray()[this.randomOne].nativeElement.innerText;
    this.resultTwo = this.cardItemTwo.toArray()[this.randomTwo].nativeElement.innerText;
    this.resultThree = this.cardItemThree.toArray()[this.randomThree].nativeElement.innerText;
    console.log({
      one: this.resultOne,
      two: this.resultTwo,
      three: this.resultThree
    });
    this.result = Number(String(this.resultOne) + String(this.resultTwo) + String(this.resultThree));
    console.log(this.result);
    this.subscription = this.pokemonService.getApi(648)
      .subscribe((response: any) => {
        this.pokemonsDetail = response;
        this.pokemonsDetail.results.forEach(result => {
          this.http.get(result.url)
            .subscribe(item => {
              this.newItemPoke = item;
              if (this.newItemPoke.id === this.result) {
                this.typePokemon = this.newItemPoke.types[0].type.name;
                this.experience = this.newItemPoke.base_experience;
                this.namePok = this.newItemPoke.name;
                this.imgPok = this.newItemPoke.sprites.other.dream_world.front_default;
              }
              else if (isNaN(this.result)) {
                this.notPoke = 'Сегодня не твой день!';
              }
              else if (!isNaN(this.result)) {
                this.notPoke = '';
              }
            });
        });
        this.subscription.unsubscribe();
      });
  }
}
