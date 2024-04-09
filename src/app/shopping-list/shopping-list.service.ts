import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient(
          'Apples',
          5
        ),
        new Ingredient(
          'Tomatoes',
          10
        )
    ]
    ingredientsUpdated = new EventEmitter<Ingredient[]>()

    getIngredients() {
        return this.ingredients.slice()
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient)
        this.ingredientsUpdated.emit(this.ingredients.slice())
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients)
        this.ingredientsUpdated.emit(this.ingredients.slice())
    }
}