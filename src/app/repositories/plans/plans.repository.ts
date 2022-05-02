import { CreationReturnDto } from "../../dto/common/creation-return.dto";
import { CreatePlanDto } from "../../dto/plans/create-plan.dto";
import { GetPlanDto } from "../../dto/plans/get-plan-dto";
import { UpdatePlanDto } from "../../dto/plans/update-plan.dto";

export interface PlansRepository {
    create(dto: CreatePlanDto): Promise<CreationReturnDto>
    update(id: number, dto: UpdatePlanDto): Promise<void>
    delete(id: number): Promise<void>
    find(): Promise<GetPlanDto[]>
    findOne(id: number): Promise<Omit<GetPlanDto, 'id'> | undefined>
    checkExistance(id: number): Promise<boolean>
    checkExistanceByName(name: string): Promise<boolean>
}