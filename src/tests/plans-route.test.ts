import axios from 'axios'
import { CreationReturnDto } from '../app/dto/common/creation-return.dto';
import { CreatePlanDto } from '../app/dto/plans/create-plan.dto';

const url = 'http://localhost:3001/plans'

let id: number;

describe('Plans route', () => {
    describe('should succeed on', () => {
        test('creating a new plan', async () => {
            const dto: CreatePlanDto = {
                bonus: 500,
                name: 'FaleMais 500'
            }
            const result = await axios.post<CreationReturnDto>(url, dto)
            id = result.data.id

            expect(id).toBeGreaterThanOrEqual(1)
        })

        test('deleting a plan', async () => {
            const result = await axios.delete(`${url}/${id}`)

            expect(result.status).toBe(204)
        })
    })

    describe('should fail on', () => {
        test('creating a new plan', async () => {
            const dto: CreatePlanDto = {
                bonus: -5,
                name: 'FaleMenos'
            }

            let error = () => null

            try {
                await axios.post<CreationReturnDto>(url, dto)
            } catch (err) {
                error = () => { throw err }
            }

            expect(error).toThrowError()
        })
    })
})