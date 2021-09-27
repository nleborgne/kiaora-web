import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1632220004373 implements MigrationInterface {
    name = 'Initial1632220004373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "apartment" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "floor" integer NOT NULL, "areaSize" integer NOT NULL, "price" double precision NOT NULL, "numberOfRooms" integer NOT NULL, "latitude" double precision, "longitude" double precision, "address" character varying NOT NULL, "isRented" boolean NOT NULL, "realtorId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c3d874d9924f6f16223162b3d3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "apartment" ADD CONSTRAINT "FK_6bd321a4541fb38463e7aa2d480" FOREIGN KEY ("realtorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "apartment" DROP CONSTRAINT "FK_6bd321a4541fb38463e7aa2d480"`);
        await queryRunner.query(`DROP TABLE "apartment"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
