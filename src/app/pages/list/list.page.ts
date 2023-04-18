import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInfiniteScroll, IonicModule } from '@ionic/angular';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, HttpClientModule],
  providers: [PokemonService]
})
export class ListPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  public offset: number = 0;
  public pokemonList: Pokemon[] = [];

  constructor(private pokeService: PokemonService) { }

  ngOnInit() {
    this.loadPokemon();
  }

  async loadPokemon(loadMore: boolean = false, event?: any) {
    if (loadMore) {
      this.offset += 10;
    }

    setTimeout(() => {
      this.pokeService.getPokemon(this.offset)
        .subscribe((res: any) => {
          this.pokemonList = [...this.pokemonList, ...res];
          if (event) {
            event.target.complete();
          }
          if (this.offset === 100) {
            this.infiniteScroll.disabled = true;
          }
        })
    }, 1500);
  }

}
