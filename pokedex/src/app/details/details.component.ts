import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { PokemonType } from '../pokemon-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  pokemonService: PokemonService = inject(PokemonService);
  pokemon: PokemonType | undefined;

  @Input() pokemonType!: PokemonType;   

  pokemonName = -1;

  constructor() {
    const pokemonName = this.route.snapshot.params['name'];
    this.pokemonService.getPokemonByName(pokemonName).then(pokemon => {
      this.pokemon = pokemon;
    });
  }  
}