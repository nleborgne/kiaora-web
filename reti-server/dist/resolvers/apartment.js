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
exports.ApartmentResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Apartment_1 = require("../entities/Apartment");
let ApartmentResolver = class ApartmentResolver {
    apartments({ em }) {
        return em.find(Apartment_1.Apartment, {});
    }
    apartment(id, { em }) {
        return em.findOne(Apartment_1.Apartment, { id });
    }
    createApartment(name, description, floor, areaSize, price, numberOfRooms, { em }) {
        const apartment = em.create(Apartment_1.Apartment, {
            name, description, floor, areaSize, price, numberOfRooms,
        });
        em.persistAndFlush(apartment);
        return em.findOne(Apartment_1.Apartment, { name });
    }
    async updateApartment(id, name, description, floor, areaSize, price, numberOfRooms, { em }) {
        const apartment = await em.findOne(Apartment_1.Apartment, { id });
        if (!apartment) {
            return null;
        }
        apartment.name = name;
        apartment.description = description;
        apartment.floor = floor;
        apartment.areaSize = areaSize;
        apartment.price = price;
        apartment.numberOfRooms = numberOfRooms;
        em.persistAndFlush(apartment);
        return apartment;
    }
    async deleteApartment(id, { em }) {
        try {
            await em.nativeDelete(Apartment_1.Apartment, { id });
            return true;
        }
        catch (e) {
            return false;
        }
    }
};
__decorate([
    type_graphql_1.Query(() => [Apartment_1.Apartment]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApartmentResolver.prototype, "apartments", null);
__decorate([
    type_graphql_1.Query(() => Apartment_1.Apartment, { nullable: true }),
    __param(0, type_graphql_1.Arg('id', () => String)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ApartmentResolver.prototype, "apartment", null);
__decorate([
    type_graphql_1.Mutation(() => Apartment_1.Apartment),
    __param(0, type_graphql_1.Arg('name')),
    __param(1, type_graphql_1.Arg('description')),
    __param(2, type_graphql_1.Arg('floor')),
    __param(3, type_graphql_1.Arg('areaSize')),
    __param(4, type_graphql_1.Arg('price')),
    __param(5, type_graphql_1.Arg('numberOfRooms')),
    __param(6, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], ApartmentResolver.prototype, "createApartment", null);
__decorate([
    type_graphql_1.Mutation(() => Apartment_1.Apartment, { nullable: true }),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Arg('name')),
    __param(2, type_graphql_1.Arg('description')),
    __param(3, type_graphql_1.Arg('floor')),
    __param(4, type_graphql_1.Arg('areaSize')),
    __param(5, type_graphql_1.Arg('price')),
    __param(6, type_graphql_1.Arg('numberOfRooms')),
    __param(7, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Number, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], ApartmentResolver.prototype, "updateApartment", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ApartmentResolver.prototype, "deleteApartment", null);
ApartmentResolver = __decorate([
    type_graphql_1.Resolver()
], ApartmentResolver);
exports.ApartmentResolver = ApartmentResolver;
//# sourceMappingURL=apartment.js.map