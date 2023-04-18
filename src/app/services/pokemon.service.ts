import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {

  baseUrl = 'https://pokeapi.co/api/v2';
  imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/"

  constructor(private http: HttpClient) { }

  /**
   * It returns an observable that emits an array of pokemons.
   * @param {number} [offset=0] - number = 0: This is the offset of the pokemon list.
   * @returns An Observable of an array of Observables of an array of Pokemons.
   */
  getPokemon(offset: number = 0): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon?offset=${offset}&limit=10`).pipe(
      map((result: any) => {
        return result['results'];
      }),
      map((pokemons: any) => {
        return pokemons.map((pokemon: any, index: number) => {
          pokemon.image = this.getImage(index + offset + 1);
          pokemon.pokeIndex = offset + index + 1;
          return this.http.get(pokemon.url).pipe( // Realiza una petición HTTP a la URL del pokemon
            map((pokemonDetails: any) => {
              pokemon.types = pokemonDetails.types; // Asigna el valor del campo 'types' del pokemonDetails al pokemon
              pokemon.background = pokemonDetails.types[0].type.name; // Asigna el valor del campo 'types' del pokemonDetails al pokemon
              return pokemon;
            })
          );
        });
      }),
      switchMap((pokemonObservables: Observable<any>[]) => {
        return forkJoin(pokemonObservables); // Combina las observables de los pokemons en una sola observable
      })
    );
  }

  /**
   * This function takes a number as an argument and returns a string that is the concatenation of the imageUrl property and the number passed in as an argument.
   * @param {number} index - number - the index of the image to get
   * @returns The imageUrl property is being returned.
   */
  getImage(index: number) {
    return `${this.imageUrl}${index}.png`;
  }

  /**
   * It takes an index number as an argument, and returns a promise that resolves to a pokemon object.
   * @param {number} index - number - the index of the pokemon you want to get details for
   * @returns The getPokemonDetails() method returns an Observable of type Pokemon.
   */
  getPokemonDetails(index: number) {
    return this.http.get(`${this.baseUrl}/pokemon/${index}`)
  }
}