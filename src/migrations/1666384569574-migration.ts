import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1666384569574 implements MigrationInterface {
    name = 'migration1666384569574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_user_properties" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedules_user_properties" ADD "date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules_user_properties" DROP COLUMN "hour"`);
        await queryRunner.query(`ALTER TABLE "schedules_user_properties" ADD "hour" TIME NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_user_properties" DROP COLUMN "hour"`);
        await queryRunner.query(`ALTER TABLE "schedules_user_properties" ADD "hour" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules_user_properties" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedules_user_properties" ADD "date" TIMESTAMP NOT NULL`);
    }

}
