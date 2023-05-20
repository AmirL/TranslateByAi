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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslateResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const translate_service_1 = require("./translate.service");
const request_translation_input_1 = require("./dto/request-translation.input");
const common_1 = require("@nestjs/common");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const translation_entity_1 = require("common/translation.entity");
let TranslateResolver = class TranslateResolver {
    constructor(translateService, pubSub) {
        this.translateService = translateService;
        this.pubSub = pubSub;
    }
    requestTranslation(input) {
        return this.translateService.translate(input);
    }
    translate() {
        const translation = {
            id: '123',
            languageSource: 'en',
            languageTarget: 'fr',
            text: 'Hello world!',
            translatedText: 'Bonjour le monde!',
        };
        return translation;
    }
    translationReceived() {
        return this.pubSub.asyncIterator('translationReceived');
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => translation_entity_1.Translation),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_translation_input_1.RequestTranslation]),
    __metadata("design:returntype", void 0)
], TranslateResolver.prototype, "requestTranslation", null);
__decorate([
    (0, graphql_1.Query)(() => translation_entity_1.Translation, { name: 'translate' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TranslateResolver.prototype, "translate", null);
__decorate([
    (0, graphql_1.Subscription)(() => translation_entity_1.Translation),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TranslateResolver.prototype, "translationReceived", null);
TranslateResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(1, (0, common_1.Inject)('PUB_SUB')),
    __metadata("design:paramtypes", [typeof (_a = typeof translate_service_1.TranslateService !== "undefined" && translate_service_1.TranslateService) === "function" ? _a : Object, graphql_subscriptions_1.PubSub])
], TranslateResolver);
exports.TranslateResolver = TranslateResolver;
//# sourceMappingURL=translate.resolver.js.map