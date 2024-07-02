import { Component, inject } from '@angular/core';
import { PokecardComponent } from '../pokecard/pokecard.component';
import { PokemonService } from '../pokemon.service';
import { PokemonType } from '../pokemon-type';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../form/form.component';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PokecardComponent, FormComponent, RouterLink, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  pokemonService: PokemonService = inject(PokemonService);
  pokemonList: PokemonType[] = [];
  filteredPokemonList: PokemonType[] = [];
  randomPokemon: PokemonType | null = null;

  constructor() {
    this.pokemonService.getAllPokemons().then((pokemonList: PokemonType[]) => {
      this.pokemonList = pokemonList;
      this.filteredPokemonList = pokemonList;
    });
  }

  filterResults = (text: string) => {
    this.randomPokemon = null;
    if (!text) {
      this.filteredPokemonList = this.pokemonList;
      return;
    }

    this.filteredPokemonList = this.pokemonList.filter((pokemon: PokemonType) => pokemon.name.toLowerCase().includes(text.toLowerCase()));
  }

  showRandomPokemon = () => {
      this.randomPokemon = null;
      this.pokemonService.getRandomPokemon(this.pokemonList).then((randomPokemon: PokemonType) => {
      this.randomPokemon = randomPokemon;
    });
  }
}
