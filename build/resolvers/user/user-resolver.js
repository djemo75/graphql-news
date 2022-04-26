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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const type_graphql_1 = require("type-graphql");
const user_entity_1 = require("../../entities/user-entity");
const passwordUtils_1 = require("../../utils/passwordUtils");
const user_arguments_1 = require("./user-arguments");
let UserResolver = class UserResolver {
    async users() {
        return await user_entity_1.UserModel.find({});
    }
    async user(_id) {
        const user = await user_entity_1.UserModel.findById(_id);
        if (!user) {
            throw new apollo_server_core_1.UserInputError('User not found!');
        }
        return user;
    }
    async createUser(data) {
        const existingUser = await user_entity_1.UserModel.findOne({ username: data.username });
        if (existingUser) {
            throw new apollo_server_core_1.UserInputError('Username is already used!');
        }
        const userData = { ...data, password: (0, passwordUtils_1.encryptPassword)(data.password) };
        const newUser = new user_entity_1.UserModel(userData);
        await newUser.save();
        return newUser;
    }
    async editUser(_id, data, ctx) {
        const existingUser = await user_entity_1.UserModel.findOne({ _id });
        if (!existingUser) {
            throw new apollo_server_core_1.UserInputError('User not found!');
        }
        if (existingUser._id != ctx.tokenData._id) {
            throw new apollo_server_core_1.UserInputError('Can not edit other user!');
        }
        const userData = data.password
            ? { ...data, password: (0, passwordUtils_1.encryptPassword)(data.password) }
            : data;
        return await user_entity_1.UserModel.findByIdAndUpdate(_id, userData, { new: true });
    }
    async deleteUser(_id, ctx) {
        const existingUser = await user_entity_1.UserModel.findOne({ _id });
        if (!existingUser) {
            throw new apollo_server_core_1.UserInputError('User not found!');
        }
        if (existingUser._id != ctx.tokenData._id) {
            throw new apollo_server_core_1.UserInputError('Can not delete other user!');
        }
        return await user_entity_1.UserModel.findByIdAndRemove(_id);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [user_entity_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_entity_1.User),
    __param(0, (0, type_graphql_1.Arg)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_arguments_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, type_graphql_1.Arg)('_id')),
    __param(1, (0, type_graphql_1.Arg)('data')),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_arguments_1.EditUserInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "editUser", null);
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, type_graphql_1.Arg)('_id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
