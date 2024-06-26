import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer'
import { startEdit } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients$: Observable<{ingredients: Ingredient[]}>
  ingredientsUpdatedSubscription: Subscription

  constructor(
    private shoppingListService: ShoppingListService, 
    private loggingService: LoggingService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients$ = this.store.select('shoppingList')

    // this.ingredients = this.shoppingListService.getIngredients()
    // this.ingredientsUpdatedSubscription = this.shoppingListService.ingredientsUpdated.subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients
    // })

    this.loggingService.printLog('Hello from shopping list component ngOnInit')
  }

  ngOnDestroy(): void {
    // this.ingredientsUpdatedSubscription.unsubscribe()
  }

  onEditItem(index: number) {
    this.store.dispatch(startEdit({ index }))
    // this.shoppingListService.startedEditing.next(index)
  }
}
