import { Component } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  selectedRecipe: Recipe

  onSelectRecipe(recipe: Recipe) {
    console.log('Test recipe selected: ', recipe);
    
    this.selectedRecipe = recipe
  }
}
