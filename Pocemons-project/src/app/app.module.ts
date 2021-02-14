import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PokemonsListComponent} from './pokemons-list/pokemons-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {HeaderComponent} from './header/header.component';
import {FormsModule} from '@angular/forms';
import {SearchFilterPipe} from './pipes/search-filter.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { AboutPokemonsComponent } from './about-pokemons/about-pokemons.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonsListComponent,
    HeaderComponent,
    SearchFilterPipe,
    MenuComponent,
    AboutPokemonsComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
