import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { addIngredient, deleteIngredient, stopEdit, updateIngredient } from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer'

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

  constructor(
    private shoppingListService: ShoppingListService, 
    private store: Store<fromShoppingList.AppState>
  ) {}

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
    this.store.dispatch(stopEdit())
  }

  onSubmit() {
    const newIngredient = new Ingredient(
      this.form.value.name,
      +this.form.value.amount
    )
    if (this.editMode && this.form.valid) {
      this.store.dispatch(updateIngredient({ index: this.editedItemIndex, ingredient: newIngredient }))
      // this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
      this.onClear()
      return
    }
    if (this.form.valid) {
      this.store.dispatch(addIngredient({ingredient: newIngredient}))
      // this.shoppingListService.addIngredient(
      //   newIngredient
      // )
    }
  }

  onDelete() {
    this.store.dispatch(deleteIngredient({ index: this.editedItemIndex }))
    // this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }

  onClear() {
    this.form.reset()
    this.editMode = false
    this.store.dispatch(stopEdit())
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
