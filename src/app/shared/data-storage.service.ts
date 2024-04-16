
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";

const BASE_URL = 'https://ng-course-recipe-book-2f09d-default-rtdb.europe-west1.firebasedatabase.app/'

@Injectable({
    providedIn: 'root'
})
export class DataStorage {


    constructor(
        private http: HttpClient, 
        private recipeService: RecipeService
    ) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes()
        this.http.put(BASE_URL+'recipes.json', recipes).subscribe(data => {
            console.log(data);
        })
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(BASE_URL+'recipes.json')
        .pipe(map(responseData => {
            return responseData.map(recipe => {
                return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                }
            })
        }),
        tap(data => {
            this.recipeService.setRecipes(data)
        }))
    }
}