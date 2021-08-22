"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20210821135632 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20210821135632 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "apartment" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" text not null, "description" text not null, "floor" int4 not null, "area_size" int4 not null, "price" int4 not null, "number_of_rooms" int4 not null);');
        this.addSql('alter table "apartment" add constraint "apartment_pkey" primary key ("id");');
    }
}
exports.Migration20210821135632 = Migration20210821135632;
//# sourceMappingURL=Migration20210821135632.js.map