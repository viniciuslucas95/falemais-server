import { ConflictException } from "../errors/conflict-exception.error";
import { CreationReturnDto } from "../dto/commons/creation-return.dto";
import { CheckTariffDto } from "../dto/tariffs/check-tariff.dto";
import { CreateTariffDto } from "../dto/tariffs/create-tariff.dto";
import { GetTariffDto } from "../dto/tariffs/get-tariff.dto";
import { UpdateTariffDto } from "../dto/tariffs/update-tariff.dto";
import { TariffsRepository } from "../repositories/tariffs/tariffs.repository";
import { TariffNotFoundException } from "./errors/tariff-not-found-exception.error";

export class TariffsService {
    constructor(private repository: TariffsRepository) { }

    async create(dto: CreateTariffDto): Promise<CreationReturnDto> {
        await this.checkTariffExistance({
            originDdd: dto.originDdd,
            destinyDdd: dto.destinyDdd
        })

        return this.repository.create(dto)
    }

    async update(id: number, dto: UpdateTariffDto): Promise<void> {
        const tariff = await this.repository.findOne(id)

        if (!tariff) throw new TariffNotFoundException()

        if (dto.originDdd && !dto.destinyDdd) {
            await this.checkTariffExistance({
                originDdd: dto.originDdd,
                destinyDdd: tariff.destinyDdd
            })
        } else if (!dto.originDdd && dto.destinyDdd) {
            await this.checkTariffExistance({
                originDdd: tariff.originDdd,
                destinyDdd: dto.destinyDdd
            })
        } else if (dto.originDdd && dto.destinyDdd) {
            await this.checkTariffExistance({
                originDdd: dto.originDdd,
                destinyDdd: dto.destinyDdd
            })
        }

        await this.repository.update(id, dto)
    }

    async delete(id: number): Promise<void> {
        const doesTariffExists = await this.repository.checkExistance(id)

        if (!doesTariffExists) throw new TariffNotFoundException()

        await this.repository.delete(id)
    }

    async findAll(): Promise<GetTariffDto[]> {
        return this.repository.find()
    }

    private async checkTariffExistance(dto: CheckTariffDto) {
        const doesTariffExists = await this.repository.checkTariffExistence(dto)

        if (doesTariffExists) throw new ConflictException('DddsConflict', 'These combination of ddds have already been created')
    }
}