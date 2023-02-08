/**
 * Represents a category of poke-items
 *
 * @author Digital House
 * @see https://pokeapi.co/api/v2/item-category
 */


export interface Categories {
  name: string;
  url: string;
}
export interface Category {
  name: string;
  items: [{ name: string; url:string} ];
}
/**
 * Represents a category with a list of poke-items already fetched
 *
 * @author Digital House
 * @see https://pokeapi.co/api/v2/item-category
 */
