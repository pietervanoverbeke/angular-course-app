import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { CommonModule } from "@angular/common";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { LoggingService } from "../logging.service";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        SharedModule,
        ShoppingListRoutingModule,
        FormsModule
    ],
    providers: [LoggingService]
})
export class ShoppingListModule {}