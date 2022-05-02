import { CreationReturnDto } from "../../dto/common/creation-return.dto"
import { CreateTariffDto } from "../../dto/tariffs/create-tariff.dto"
import { GetTariffDto } from "../../dto/tariffs/get-tariff.dto"
import { UpdateTariffDto } from "../../dto/tariffs/update-tariff.dto"
import { TariffsRepository } from "../../repositories/tariffs/tariffs.repository"

export interface TariffsService {
    repository: TariffsRepository
    create(dto: CreateTariffDto): Promise<CreationReturnDto>
    update(id: number, dto: UpdateTariffDto): Promise<void>
    delete(id: number): Promise<void>
    findAll(): Promise<GetTariffDto[]>
    findOne(id: number): Promise<Omit<GetTariffDto, 'id'> | undefined>
}