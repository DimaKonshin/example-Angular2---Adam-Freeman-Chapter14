import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ProductComponent } from "./component";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [ProductComponent],
    bootstrap: [ProductComponent]
})
export class AppModule {}