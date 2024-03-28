import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') ingredientNameInput: ElementRef<HTMLInputElement>
  @ViewChild('amountInput') ingredientAmountInput: ElementRef<HTMLInputElement>
  @Output() ingredientAdded = new EventEmitter<Ingredient>()

  onClickAdd() {
    this.ingredientAdded.emit(
      new Ingredient(
        this.ingredientNameInput.nativeElement.value,
        parseInt(this.ingredientAmountInput.nativeElement.value),
      )
    )
  }
}
