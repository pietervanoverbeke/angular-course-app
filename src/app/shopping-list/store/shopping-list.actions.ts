import { createAction, props } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";

export const addIngredient = createAction(
    '[Shopping list] Add ingredient',
    props<{ingredient: Ingredient}>()
)

export const addIngredients = createAction(
    '[Shopping list] Add ingredients',
    props<{ingredients: Ingredient[]}>()
)

export const deleteIngredient = createAction(
    '[Shopping list] Delete ingredient',
    props<{index: number}>()
)

export const updateIngredient = createAction(
    '[Shopping list] Update ingredient',
    props<{index: number, ingredient: Ingredient}>()
)

export const startEdit = createAction(
    '[Shopping list] Start edit',
    props<{ index: number }>()
)

export const stopEdit = createAction(
    '[Shopping list] Stop edit'
)