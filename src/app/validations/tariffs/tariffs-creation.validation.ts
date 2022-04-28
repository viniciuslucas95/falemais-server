import { NextFunction, Request, Response } from "express";
import { CreateTariffDto } from "../../dto/tariffs/create-tariff.dto";
import { DddBadRequestException } from "../../errors/ddd-bad-request-exception.error";
import { DddValidator } from "./helpers/ddd-validator.helper";
import { PositiveNumberValidator } from "../helpers/postive-number-validator.helper";

const positiveNumberValidator = new PositiveNumberValidator('Price')
const dddValidator = new DddValidator('Ddd')

export function tariffsCreationValidation(req: Request, res: Response, next: NextFunction) {
    const { originDdd, destinyDdd, pricePerMin } = req.body

    if (originDdd === destinyDdd) throw new DddBadRequestException()

    const validatedBody: CreateTariffDto = {
        originDdd: dddValidator.validate(originDdd),
        destinyDdd: dddValidator.validate(destinyDdd),
        pricePerMin: positiveNumberValidator.validate(pricePerMin)
    }

    req.body = validatedBody

    next()
}