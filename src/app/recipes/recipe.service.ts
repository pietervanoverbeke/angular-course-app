import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>()
    private recipes: Recipe[] = [
        new Recipe(
          'Spaghetti bolognese',
          'an italian dish',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr2FKhO8kgLRPkxng8ojZ5lEs704fk_iPG3_cDseIu2g&s',
          [
            new Ingredient('spaghetti', 1),
            new Ingredient('tomato sauce', 1),
            new Ingredient('minced meat', 1),
            new Ingredient('italian herb mix', 1),
            new Ingredient('carrot', 2),
            new Ingredient('celery', 2),
            new Ingredient('onion', 1),
          ]
        ),
        new Recipe(
            'Chilli con carne',
            'a mexican dish',
            'https://keytomylime.com/wp-content/uploads/2021/03/Chili-Con-Carne-Recipe-735x735.jpg',
            [
                new Ingredient('kidney beans', 1),
                new Ingredient('tomato sauce', 1),
                new Ingredient('minced meat', 1),
                new Ingredient('mexican herb mix', 1),
                new Ingredient('corn', 2),
                new Ingredient('onion', 1),
            ]
        )
    ]

    getRecipes() {
        return this.recipes.slice()
    }

    getRecipe(id: number) {
        return this.recipes[id]
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1)
        this.recipesChanged.next(this.recipes.slice())
    }
}