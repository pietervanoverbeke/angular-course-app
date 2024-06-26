import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import { addIngredient, addIngredients, deleteIngredient, startEdit, stopEdit, updateIngredient } from "./shopping-list.actions";

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

export interface AppState {
    shoppingList: State
}

const initialState: State = {
    ingredients: [
        new Ingredient(
          'Apples',
          5
        ),
        new Ingredient(
          'Tomatoes',
          10
        )
    ],
    editedIngredient: null,
    editedIngredientIndex: -1

}

export const shoppingListReducer = createReducer(
    initialState,
    on(addIngredient, (state, action) => {
        return {
            ...state,
            ingredients: [...state.ingredients, action.ingredient]
        }
    }),
    on(addIngredients, (state, action) => {
        return {
            ...state,
            ingredients: [...state.ingredients, ...action.ingredients]
        }
    }),
    on(deleteIngredient, (state, action) => {
        const newIngredientsArray = [...state.ingredients]
        newIngredientsArray.splice(action.index, 1)
        return {
            ...state,
            ingredients: newIngredientsArray
        }
    }),
    on(updateIngredient, (state, action) => {
        let newIngredientsArray = [...state.ingredients]
        newIngredientsArray[action.index] = {
            ...state.ingredients[action.index],
            ...action.ingredient
        }
        return {
            ...state,
            ingredients: newIngredientsArray
        }
    }),
    on(startEdit, (state, action) => {
        return {
            ...state,
            editedIngredient: {
                ...state.ingredients[action.index]
            },
            editedIngredientIndex: action.index
        }
    }),
    on(stopEdit, (state, action) => {
        return {
            ...state,
            editedIngredient: null,
            editedIngredientIndex: -1
        }
    })
)