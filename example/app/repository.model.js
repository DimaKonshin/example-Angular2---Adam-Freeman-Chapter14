"use strict";
var product_model_1 = require("./product.model");
var datasource_model_1 = require("./datasource.model");
var Model = (function () {
    function Model() {
        var _this = this;
        this.locator = function (p, id) { return p.id == id; };
        this.dataSource = new datasource_model_1.SimpleDataSource();
        this.products = new Array();
        this.dataSource.getData().forEach(function (p) { return _this.products.push(p); });
    }
    Model.prototype.getProducts = function () {
        return this.products;
    };
    Model.prototype.getProduct = function (id) {
        var _this = this;
        return this.products.filter(function (p) { return _this.locator(p, id); })[0];
    };
    Model.prototype.saveProduct = function (product) {
        if (product.id == 0 || product.id == null) {
            product.id = this.generateID();
            this.products.push(product);
        }
        else {
            var index = this.products.indexOf(product);
            this.products.splice(index, 1, product);
        }
    };
    Model.prototype.deleteProduct = function (id) {
        var product = this.getProduct(id);
        var index = this.products.indexOf(product);
        if (index > -1) {
            this.products.splice(index, 1);
        }
    };
    Model.prototype.generateID = function () {
        var candidate = 100;
        while (this.getProduct(candidate) != null) {
            candidate++;
        }
        return candidate;
    };
    Model.prototype.swapProduct = function () {
        var p = this.products.shift();
        this.products.push(new product_model_1.Product(p.id, p.name, p.category, p.price));
    };
    return Model;
}());
exports.Model = Model;
