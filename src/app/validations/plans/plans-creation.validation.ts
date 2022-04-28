import { NextFunction, Request, Response } from "express";
import { CreatePlanDto } from "../../dto/plans/create-plan.dto";
import { NameValidator } from "../helpers/name-validator.helper";
import { PositiveNumberValidator } from "../helpers/postive-number-validator.helper";

const positiveNumberValidator = new PositiveNumberValidator('Bonus')
const nameValidator = new NameValidator('Name')

export function plansCreationValidation(req: Request, res: Response, next: NextFunction) {
    const { name, bonus } = req.body

    const validatedBody: CreatePlanDto = {
        name: nameValidator.validate(name),
        bonus: positiveNumberValidator.validate(bonus)
    }

    req.body = validatedBody

    next()
}