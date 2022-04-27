import { CreationReturnDto } from "../../dto/commons/creation-return.dto";
import { CheckTariffDto } from "../../dto/tariffs/check-tariff.dto";
import { CreateTariffDto } from "../../dto/tariffs/create-tariff.dto";
import { GetTariffDto } from "../../dto/tariffs/get-tariff.dto";
import { UpdateTariffDto } from "../../dto/tariffs/update-tariff.dto";

export interface TariffsRepository {
    create(dto: CreateTariffDto): Promise<CreationReturnDto>
    update(id: number, dto: UpdateTariffDto): Promise<void>
    delete(id: number): Promise<void>
    find(): Promise<GetTariffDto[]>
    findOne(id: number): Promise<Omit<GetTariffDto, 'id'> | undefined>
    checkExistance(id: number): Promise<boolean>
    checkTariffExistence(dto: CheckTariffDto): Promise<boolean>
}