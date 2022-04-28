import { CreationReturnDto } from "../../dto/commons/creation-return.dto"
import { CreatePlanDto } from "../../dto/plans/create-plan.dto"
import { GetPlanDto } from "../../dto/plans/get-plan-dto"
import { UpdatePlanDto } from "../../dto/plans/update-plan.dto"
import { PlansRepository } from "../../repositories/plans/plans.repository"

export interface PlansService {
    repository: PlansRepository
    create(dto: CreatePlanDto): Promise<CreationReturnDto>
    update(id: number, dto: UpdatePlanDto): Promise<void>
    delete(id: number): Promise<void>
    findAll(): Promise<GetPlanDto[]>
    findOne(id: number): Promise<Omit<GetPlanDto, 'id'> | undefined>
}