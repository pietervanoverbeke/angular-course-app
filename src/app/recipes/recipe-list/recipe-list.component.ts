import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'this is a test',
      'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe-500x500.jpg'
    )
  ]
  @Output() selectedRecipe = new EventEmitter<Recipe>()

  onClickRecipe(recipe: Recipe) {
    console.log('test on click recipe: ', recipe);
    
    this.selectedRecipe.emit(recipe)
  }

}
