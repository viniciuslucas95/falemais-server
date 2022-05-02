import { CreationReturnDto } from "../../dto/common/creation-return.dto";
import { CreatePlanDto } from "../../dto/plans/create-plan.dto";
import { GetPlanDto } from "../../dto/plans/get-plan-dto";
import { UpdatePlanDto } from "../../dto/plans/update-plan.dto";
import { PlansRepository } from "../../repositories/plans/plans.repository";
import { PlanConflictException } from "../errors/plan-conflict-exception.error";
import { PlanNotFoundException } from "../errors/plan-not-found-exception.error";
import { PlansService } from "./plans.service";

export class DefaultPlansService implements PlansService {
    constructor(public repository: PlansRepository) { }

    async create(dto: CreatePlanDto): Promise<CreationReturnDto> {
        if (await this.repository.checkExistanceByName(dto.name)) throw new PlanConflictException()

        return this.repository.create(dto)
    }

    async update(id: number, dto: UpdatePlanDto): Promise<void> {
        const plan = await this.repository.findOne(id)

        if (!plan) throw new PlanNotFoundException()

        if (dto.name) {
            if (dto.name === plan.name) throw new PlanConflictException()

            const nameAlreadyExists = await this.repository.checkExistanceByName(dto.name)

            if (nameAlreadyExists) throw new PlanConflictException()
        }

        await this.repository.update(id, dto)
    }

    async delete(id: number): Promise<void> {
        const plan = await this.repository.checkExistance(id)

        if (!plan) throw new PlanNotFoundException()

        await this.repository.delete(id)
    }

    async findAll(): Promise<GetPlanDto[]> {
        return this.repository.find()
    }

    async findOne(id: number): Promise<Omit<GetPlanDto, "id"> | undefined> {
        const plan = await this.repository.findOne(id)

        if (!plan) throw new PlanNotFoundException()

        return plan
    }
}