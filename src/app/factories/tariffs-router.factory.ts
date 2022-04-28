import { Router } from "express"
import { TariffsController } from "../controllers/tariffs.controller"
import { PostgresTariffsRepository } from "../repositories/tariffs/postgres-tariffs.repository"
import { DefaultTariffsService } from "../services/tariffs/default-tariffs.service"

export class TariffsRouterFactory {
    static create() {
        const repository = new PostgresTariffsRepository()
        const service = new DefaultTariffsService(repository)
        const controller = new TariffsController(service, Router())
        return controller.router
    }
}