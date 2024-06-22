import { Component, Input } from '@angular/core';
import { PokemonType } from '../pokemon-type';
import { DetailsComponent } from '../details/details.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pokecard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, DetailsComponent],
  templateUrl: './pokecard.component.html',
  styleUrl: './pokecard.component.css'
})
export class PokecardComponent {
  @Input() pokemonType!: PokemonType; 
}
