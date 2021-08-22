"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20210821135941 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20210821135941 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" text not null, "password" text not null);');
        this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');
        this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    }
}
exports.Migration20210821135941 = Migration20210821135941;
//# sourceMappingURL=Migration20210821135941.js.map