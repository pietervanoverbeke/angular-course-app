import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm
  subscription: Subscription
  editMode = false
  editedItemIndex: number
  editedItem: Ingredient

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true
      this.editedItemIndex = index
      this.editedItem = this.shoppingListService.getIngredient(index)
      this.form.setValue({
        'name': this.editedItem.name,
        'amount': this.editedItem.amount
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSubmit() {
    const newIngredient = new Ingredient(
      this.form.value.name,
      +this.form.value.amount
    )
    if (this.editMode && this.form.valid) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
      this.onClear()
      return
    }
    if (this.form.valid) {
      this.shoppingListService.addIngredient(
        newIngredient
      )
    }
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }

  onClear() {
    this.form.reset()
    this.editMode = false
    this.editedItem = null
  }

  //BEFORE FORMS
  // onClickAdd() {
  //   this.shoppingListService.addIngredient(
  //     new Ingredient(
  //       this.ingredientNameInput.nativeElement.value,
  //       parseInt(this.ingredientAmountInput.nativeElement.value),
  //     )
  //   )
  // }
}
