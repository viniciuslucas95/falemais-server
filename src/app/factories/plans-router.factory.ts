import { Router } from "express"
import { PlansController } from "../controllers/plans.controller"
import { PostgresPlansRepository } from "../repositories/plans/postgres-plans.repository"
import { DefaultPlansService } from "../services/plans/default-plans.service"

export class PlansRouterFactory {
    static create() {
        const repository = new PostgresPlansRepository()
        const service = new DefaultPlansService(repository)
        const controller = new PlansController(service, Router())
        return controller.router
    }
}