import { client } from "../../../configs/postgres.config";
import { CreationReturnDto } from "../../dto/common/creation-return.dto";
import { CreatePlanDto } from "../../dto/plans/create-plan.dto";
import { GetPlanDto } from "../../dto/plans/get-plan-dto";
import { UpdatePlanDto } from "../../dto/plans/update-plan.dto";
import { getDtoValues } from "../helpers/get-dto-values.helper";
import { PlansRepository } from "./plans.repository";

export class PostgresPlansRepository implements PlansRepository {
    async create(dto: CreatePlanDto): Promise<CreationReturnDto> {
        const result = await client.query<CreationReturnDto>('INSERT INTO plans(name, bonus) VALUES($1, $2) RETURNING id;', getDtoValues(dto))

        return result.rows[0]
    }

    async update(id: number, dto: UpdatePlanDto): Promise<void> {
        await client.query('UPDATE plans SET name = COALESCE($1, name), bonus = COALESCE($2, bonus), updated_at = NOW() WHERE id = $3;', [...getDtoValues(dto), id])
    }

    async delete(id: number): Promise<void> {
        await client.query('DELETE FROM plans WHERE id = $1;', [id])
    }

    async find(): Promise<GetPlanDto[]> {
        const result = await client.query<GetPlanDto>(`SELECT id, name, bonus FROM plans;`)

        return result.rows
    }

    async findOne(id: number): Promise<Omit<GetPlanDto, "id"> | undefined> {
        const result = await client.query<Omit<GetPlanDto, "id">>(`SELECT name, bonus FROM plans WHERE id = $1 LIMIT 1;`, [id])

        return result.rows[0]
    }

    async checkExistance(id: number): Promise<boolean> {
        const result = await client.query('SELECT id FROM plans WHERE id = $1 LIMIT 1;', [id])

        return result.rows[0] ? true : false
    }

    async checkExistanceByName(name: string): Promise<boolean> {
        const result = await client.query('SELECT name FROM plans WHERE name = $1 LIMIT 1;', [name])

        return result.rows[0] ? true : false
    }
}