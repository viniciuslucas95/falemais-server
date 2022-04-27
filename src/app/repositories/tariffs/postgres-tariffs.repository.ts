import { client } from "../../../configs/postgres.config";
import { CreationReturnDto } from "../../dto/commons/creation-return.dto";
import { CheckTariffDto } from "../../dto/tariffs/check-tariff.dto";
import { CreateTariffDto } from "../../dto/tariffs/create-tariff.dto";
import { GetTariffDto } from "../../dto/tariffs/get-tariff.dto";
import { UpdateTariffDto } from "../../dto/tariffs/update-tariff.dto";
import { getDtoValues } from "../helpers/get-dto-values.helper";
import { TariffsRepository } from "./tariffs.repository";

export class PostgresTariffsRepository implements TariffsRepository {
    async create(dto: CreateTariffDto): Promise<CreationReturnDto> {
        const result = await client.query<CreationReturnDto>('INSERT INTO tariffs(origin_ddd, destiny_ddd, price_per_min) VALUES($1, $2, $3) RETURNING id;', getDtoValues(dto))

        return result.rows[0]
    }

    async update(id: number, dto: UpdateTariffDto): Promise<void> {
        await client.query('UPDATE tariffs SET origin_ddd = COALESCE($1, origin_ddd), destiny_ddd = COALESCE($2, destiny_ddd), price_per_min = COALESCE($3, price_per_min), updated_at = NOW() WHERE id = $4;', [...getDtoValues(dto), id])
    }

    async delete(id: number): Promise<void> {
        await client.query('DELETE FROM tariffs WHERE id = $1;', [id])
    }

    async find(): Promise<GetTariffDto[]> {
        const result = await client.query<GetTariffDto>(`SELECT id, origin_ddd, destiny_ddd, price_per_min FROM tariffs;`)

        return result.rows
    }

    async findOne(id: number): Promise<Omit<GetTariffDto, 'id'> | undefined> {
        const result = await client.query<Omit<GetTariffDto, 'id'>>("SELECT origin_ddd, destiny_ddd, price_per_min FROM tariffs WHERE id = $1 LIMIT 1;", [id])

        return result.rows[0]
    }

    async checkExistance(id: number): Promise<boolean> {
        const result = await client.query('SELECT id FROM tariffs WHERE id = $1 LIMIT 1;', [id])

        return result.rows[0] ? true : false
    }

    async checkTariffExistence(dto: CheckTariffDto): Promise<boolean> {
        const result = await client.query('SELECT id FROM tariffs WHERE origin_ddd = $1 AND destiny_ddd = $2 LIMIT 1;', getDtoValues(dto))

        return result.rows[0] ? true : false
    }
}