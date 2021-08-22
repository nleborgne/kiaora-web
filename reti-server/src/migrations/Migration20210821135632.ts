import { Migration } from '@mikro-orm/migrations';

export class Migration20210821135632 extends Migration {
  async up(): Promise<void> {
    this.addSql('create table "apartment" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" text not null, "description" text not null, "floor" int4 not null, "area_size" int4 not null, "price" int4 not null, "number_of_rooms" int4 not null);');
    this.addSql('alter table "apartment" add constraint "apartment_pkey" primary key ("id");');
  }
}
