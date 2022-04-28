import { NextFunction, Request, Response } from "express";
import { EmptyBodyException } from "../errors/empty-body-exception.error";
import { NameValidator } from "../helpers/name-validator.helper";
import { PositiveNumberValidator } from "../helpers/postive-number-validator.helper";

const positiveNumberValidator = new PositiveNumberValidator('Bonus')
const nameValidator = new NameValidator('Name')

export function plansUpdateValidation(req: Request, res: Response, next: NextFunction) {
    const { name, bonus } = req.body

    if (!name && !bonus) throw new EmptyBodyException()

    const validatedBody = {
        name: typeof name !== 'undefined' ? nameValidator.validate(name) : null,
        bonus: typeof bonus !== 'undefined' ? positiveNumberValidator.validate(bonus) : null
    }

    req.body = validatedBody

    next()
}