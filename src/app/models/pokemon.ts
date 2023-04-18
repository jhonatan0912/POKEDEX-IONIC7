/* Defining the interface for the Pokemon object. */
export interface Pokemon {
  pokeIndex: string;
  image: string;
  name: string;
  url: string;
  types: Types[]
  background: string;
}

interface Types {
  slot: number;
  type: Type[];

}
interface Type {
  name: string;
  url: string;
}

/* Defining the interface for the PokemonDetail object. */
export interface PokemonDetail {
  name: string;
  abilities: [
    {
      ability: {
        name: string,
        url: string,
      }
    }
  ],
  base_experience: string;
  game_indices: [
    {
      game_index: number;
      version: {
        name: string,
        url: string,
      }
    }
  ],
  height: string;
  id: string;
  moves: [
    {
      move: {
        name: string,
        url: string,
      }
    }
  ],
  species: {
    name: string,
    url: string,
  },
  sprites: {

  }
  ,
  stats: [
    {
      base_stat: string,
      effort: string,
      stat: {
        name: string;
        url: string
      }
    }
  ],
  types: [
    {
      slot: string,
      type: {
        name: string,
        url: string
      }
    }
  ],
  weight: string;
  background: string;
}