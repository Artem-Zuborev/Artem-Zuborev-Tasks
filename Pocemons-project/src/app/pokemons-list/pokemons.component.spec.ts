import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsListComponent } from './pokemons-list.component';

describe('PokemonsComponent', () => {
  let component: PokemonsListComponent;
  let fixture: ComponentFixture<PokemonsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});