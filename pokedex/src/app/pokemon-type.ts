export interface PokemonType {
    name: string;
    url: string;
    image: string;
    height?: number;
    weight?: number;
    moves?: string[];
    types?: string[];
}