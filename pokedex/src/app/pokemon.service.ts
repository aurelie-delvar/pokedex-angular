import { Injectable } from '@angular/core';
import { PokemonType } from './pokemon-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  readonly baseUrl = 'https://pokeapi.co/api/v2/';
  private cache = new Map<string, any>();

  async getAllPokemons(): Promise<PokemonType[]> {

    const url = this.baseUrl + 'pokemon/?limit=200';
    if (this.cache.has(url)) {      
      return this.cache.get(url);
    }

    const response = await fetch(url);    
    const data = await response.json();

    const pokemons = await Promise.all(
      data.results.map(async (pokemon: any) => {

        let details;
        if (this.cache.has(pokemon.url)) {
          details = this.cache.get(pokemon.url);
        } else {
          details = await this.getPokemonDetails(pokemon.url);
          this.cache.set(pokemon.url, details);
        } 

        return {
          name: pokemon.name,
          url: pokemon.url,
          image: details.sprites.other.dream_world.front_default,
        };
      })
    );
    this.cache.set(url, pokemons);
    return pokemons;
  };

  async getPokemonDetails(url: string): Promise<any> {
    const response = await fetch(url);
    return await response.json();
  }

  async getPokemonByName(name: string): Promise<PokemonType> {
    const response = await fetch(this.baseUrl + `pokemon/${name}`);
    const data = await response.json();    
    return {
      name: data.name,
      url: data.url,
      image: data.sprites.other['official-artwork'].front_default,
      height: data.height,
      weight: data.weight,
      moves: data.moves.map((move: any) => move.move.name),
      types: data.types.map((type: any) => type.type.name),
    };
  }

  async getRandomPokemon(array: PokemonType[]): Promise<PokemonType> {
    const suffledArray = array.sort(() => Math.random() - 0.5); 
    return suffledArray[0];
  };
}
