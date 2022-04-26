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
exports.AuthResolver = void 0;
const type_graphql_1 = require("type-graphql");
const user_entity_1 = require("../../entities/user-entity");
const auth_arguments_1 = require("./auth-arguments");
const apollo_server_core_1 = require("apollo-server-core");
const passwordUtils_1 = require("../../utils/passwordUtils");
const tokenUtils_1 = require("../../utils/tokenUtils");
let AuthResolver = class AuthResolver {
    //   @Query(returns => User)
    //   async currentUser(@Ctx() ctx: Context):Promise<User> {
    //     if(!ctx.user) {
    //         throw new AuthenticationError('user_not_authenticated');
    //     }
    //     return await UserModel.findById(ctx.user._id)
    //   }
    async login({ username, password }) {
        const user = await user_entity_1.UserModel.findOne({ username });
        if (!user) {
            throw new apollo_server_core_1.UserInputError('Wrong username or password');
        }
        const isValid = await (0, passwordUtils_1.comparePasswords)(password, user.password);
        if (!isValid) {
            throw new apollo_server_core_1.UserInputError('Wrong username or password');
        }
        return (0, tokenUtils_1.generateAccessToken)(user);
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_arguments_1.LoginArguments]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
AuthResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AuthResolver);
exports.AuthResolver = AuthResolver;
