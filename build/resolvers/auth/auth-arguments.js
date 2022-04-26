"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginArguments = void 0;
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
let LoginArguments = class LoginArguments {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MaxLength)(50, { message: 'Username can have maximum 30 characters!' }),
    __metadata("design:type", String)
], LoginArguments.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MinLength)(6, { message: 'Password should be minimum 6 characters!' }),
    __metadata("design:type", String)
], LoginArguments.prototype, "password", void 0);
LoginArguments = __decorate([
    (0, type_graphql_1.ArgsType)()
], LoginArguments);
exports.LoginArguments = LoginArguments;