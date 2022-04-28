import { NextFunction, Request, Response } from "express";
import { DddBadRequestException } from "../../errors/ddd-bad-request-exception.error";
import { DddValidator } from "./helpers/ddd-validator.helper";
import { PositiveNumberValidator } from "../helpers/postive-number-validator.helper";
import { EmptyBodyException } from "../errors/empty-body-exception.error";

const positiveNumberValidator = new PositiveNumberValidator('Price')
const dddValidator = new DddValidator('Ddd')

export function tariffsUpdateValidation(req: Request, res: Response, next: NextFunction) {
    const { originDdd, destinyDdd, pricePerMin } = req.body

    if (!originDdd && !destinyDdd && !pricePerMin) throw new EmptyBodyException()
    if (originDdd && destinyDdd) if (originDdd === destinyDdd) throw new DddBadRequestException()

    const validatedBody = {
        originDdd: typeof originDdd !== 'undefined' ? dddValidator.validate(originDdd) : null,
        destinyDdd: typeof destinyDdd !== 'undefined' ? dddValidator.validate(destinyDdd) : null,
        pricePerMin: typeof pricePerMin !== 'undefined' ? positiveNumberValidator.validate(pricePerMin) : null
    }

    req.body = validatedBody

    next()
}