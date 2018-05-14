"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var forms_1 = require("@angular/forms");
var limit_formvalidator_1 = require("./limit.formvalidator");
var ProductFormControl = (function (_super) {
    __extends(ProductFormControl, _super);
    function ProductFormControl(label, property, value, validator) {
        _super.call(this, value, validator);
        this.label = label;
        this.modelProperty = property;
    }
    ProductFormControl.prototype.getValidationMessages = function () {
        var messages = [];
        if (this.errors) {
            for (var errorName in this.errors) {
                switch (errorName) {
                    case "required":
                        messages.push("You must enter a " + this.label);
                        break;
                    case "minlength":
                        messages.push("A " + this.label + " must be at least " + this.errors['minlength'].requiredLength + " characters");
                        break;
                    case "pattern":
                        messages.push("The " + this.label + " contains illegal characters");
                        break;
                    case "limit":
                        messages.push("A " + this.label + " cannot be more than " + this.errors['limit'].limit);
                        break;
                }
            }
        }
        return messages;
    };
    return ProductFormControl;
}(forms_1.FormControl));
exports.ProductFormControl = ProductFormControl;
var ProductFormgroup = (function (_super) {
    __extends(ProductFormgroup, _super);
    function ProductFormgroup() {
        _super.call(this, {
            name: new ProductFormControl("Name", "name", "", forms_1.Validators.required),
            category: new ProductFormControl("Category", "category", "", forms_1.Validators.compose([forms_1.Validators.required,
                forms_1.Validators.pattern("^[A-Za-z ]+$"),
                forms_1.Validators.minLength(3),
                forms_1.Validators.maxLength(10)])),
            price: new ProductFormControl("Price", "price", "", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("^[0-9\.]+$"), limit_formvalidator_1.LimitValidator.Limit(100)]))
        });
    }
    Object.defineProperty(ProductFormgroup.prototype, "productControls", {
        get: function () {
            var _this = this;
            return Object.keys(this.controls).map(function (k) { return _this.controls[k]; });
        },
        enumerable: true,
        configurable: true
    });
    ProductFormgroup.prototype.getFormValidationMessages = function (form) {
        var messages = [];
        this.productControls.forEach(function (c) { return c.getValidationMessages()
            .forEach(function (m) { return messages.push(m); }); });
        return messages;
    };
    return ProductFormgroup;
}(forms_1.FormGroup));
exports.ProductFormgroup = ProductFormgroup;
