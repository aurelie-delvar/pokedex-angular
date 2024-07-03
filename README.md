# Pokedex-Angular

## Description
This project is a simple Pokedex made with the [PokeApi](https://pokeapi.co/). It helped me understand basics concepts in Angular (this is my first Angular project). 
This is the deployed version: https://pokedex-aurelie.surge.sh/

The app has a homepage, where 200 Pokemons are displayed. The user can click on the "See more" button of one of them to be redirected to its proper page and see its details. 
On the homepage, there is also a searchBar where the user can search for any Pokemon in the list.
The user can also click on the button "Random Pokemon" in order to see one of the Pokemon card displayed. 

On the "Submit your own Pokemon" page, the user can suggest to add a Pokemon of their own creation. There is a form with 3 inputs: the name of the user, the name of their Pokemon, and a file to see a visual (drawing of the user for example).

When "Submit" is clicked, the request is send to https://httpbin.org/ so nothing really happens (as it's an educative frontend project). But the form still has some verifications (length, characters admitted...). As much as it is possible in frontend, I tried to securize the inputs.

This project used:
    - Angular 18;
    - HTML/CSS;
    - Surge to deploy;

## Installation
If you want to clone the project:
    - copy with https or ssh
    - git clone on terminal
    - cd pokedex
    - ng serve
    - go to the indicated url (http://localhost:4200/)
