import { NextFunction, Request, Response } from "express";
import { CreateTariffDto } from "../dto/tariffs/create-tariff.dto";
import { validateDdd } from "./helpers/validate-ddd.helper";
import { validatePrice } from "./helpers/validate-price.helper";

export function tariffsCreationValidation(req: Request, res: Response, next: NextFunction) {
    const { originDdd, destinyDdd, pricePerMin } = req.body

    const validatedBody: CreateTariffDto = {
        originDdd: validateDdd(originDdd),
        destinyDdd: validateDdd(destinyDdd),
        pricePerMin: validatePrice(pricePerMin)
    }

    req.body = validatedBody

    next()
}