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
exports.NewsResolver = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const type_graphql_1 = require("type-graphql");
const news_entity_1 = require("../../entities/news-entity");
const news_arguments_1 = require("./news-arguments");
let NewsResolver = class NewsResolver {
    async allNews() {
        return await news_entity_1.NewsModel.find({});
    }
    async news(_id) {
        const news = await news_entity_1.NewsModel.findById(_id);
        if (!news) {
            throw new apollo_server_core_1.UserInputError('News not found!');
        }
        return news;
    }
    async createNews(data) {
        const newNews = new news_entity_1.NewsModel(data);
        await newNews.save();
        return newNews;
    }
    async editNews(_id, data) {
        const existingNews = await news_entity_1.NewsModel.findOne({ _id });
        if (!existingNews) {
            throw new apollo_server_core_1.UserInputError('News not found!');
        }
        return await news_entity_1.NewsModel.findByIdAndUpdate(_id, data, { new: true });
    }
    async deleteNews(_id) {
        const existingNews = await news_entity_1.NewsModel.findOne({ _id });
        if (!existingNews) {
            throw new apollo_server_core_1.UserInputError('News not found!');
        }
        return await news_entity_1.NewsModel.findByIdAndRemove(_id);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [news_entity_1.News]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsResolver.prototype, "allNews", null);
__decorate([
    (0, type_graphql_1.Query)(() => news_entity_1.News),
    __param(0, (0, type_graphql_1.Arg)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsResolver.prototype, "news", null);
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Mutation)(() => news_entity_1.News),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [news_arguments_1.CreateNewsInput]),
    __metadata("design:returntype", Promise)
], NewsResolver.prototype, "createNews", null);
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Mutation)(() => news_entity_1.News),
    __param(0, (0, type_graphql_1.Arg)('_id')),
    __param(1, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, news_arguments_1.EditNewsInput]),
    __metadata("design:returntype", Promise)
], NewsResolver.prototype, "editNews", null);
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Mutation)(() => news_entity_1.News),
    __param(0, (0, type_graphql_1.Arg)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsResolver.prototype, "deleteNews", null);
NewsResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], NewsResolver);
exports.NewsResolver = NewsResolver;
