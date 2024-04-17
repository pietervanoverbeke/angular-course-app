import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinner } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations: [
        DropdownDirective,
        AlertComponent,
        LoadingSpinner,
        PlaceholderDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DropdownDirective,
        AlertComponent,
        LoadingSpinner,
        PlaceholderDirective,
        CommonModule
    ]
})
export class SharedModule {}