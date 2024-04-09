import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') ingredientNameInput: ElementRef<HTMLInputElement>
  @ViewChild('amountInput') ingredientAmountInput: ElementRef<HTMLInputElement>

  constructor(private shoppingListService: ShoppingListService) {}

  onClickAdd() {
    this.shoppingListService.addIngredient(
      new Ingredient(
        this.ingredientNameInput.nativeElement.value,
        parseInt(this.ingredientAmountInput.nativeElement.value),
      )
    )
  }
}
