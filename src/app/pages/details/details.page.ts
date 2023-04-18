import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PokemonDetail } from 'src/app/models/pokemon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, HttpClientModule],
  providers: [PokemonService]
})
export class DetailsPage implements OnInit {

  details: any;
  imgUrl: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/"
  favorito: boolean = false;
  optionSelected: number = 1;

  pokemonDetail: PokemonDetail = {
    name: "",
    abilities: [
      {
        ability: {
          name: "",
          url: "",
        }
      }
    ],
    base_experience: "",
    game_indices: [
      {
        game_index: 0,
        version: {
          name: "",
          url: "",
        }
      }
    ],
    height: "",
    id: "",
    moves: [
      {
        move: {
          name: "",
          url: "",
        }
      }
    ],
    species: {
      name: "",
      url: "",
    },
    sprites: {

    }
    ,
    stats: [
      {
        base_stat: "",
        effort: "",
        stat: {
          name: "",
          url: ""
        }
      }
    ],
    types: [
      {
        slot: "",
        type: {
          name: "",
          url: ""
        }
      }
    ],
    weight: "",
    background: "",
  }

  constructor(private route: ActivatedRoute, private pokeService: PokemonService) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    const { index } = params;
    this.pokeService.getPokemonDetails(index)
      .subscribe((details: any) => {
        console.log(details);
        this.pokemonDetail = {
          name: details.name,
          id: details.id,
          abilities: details.abilities,
          base_experience: details.base_experience,
          game_indices: details.game_indices,
          height: details.height,
          moves: details.moves,
          species: details.species,
          sprites: details.sprites,
          stats: details.stats,
          types: details.types,
          weight: details.weight,
          background: details.types[0].type.name
        }
        this.details = this.pokemonDetail;
      });
  }

  onClick() {
    this.favorito = !this.favorito;
  }

  selectOption(option: number) {
    this.optionSelected = option;
  }

}
