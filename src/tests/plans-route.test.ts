import axios from 'axios'
import { CreationReturnDto } from '../app/dto/common/creation-return.dto';
import { CreatePlanDto } from '../app/dto/plans/create-plan.dto';
import { GetPlanDto } from '../app/dto/plans/get-plan-dto';
import { UpdatePlanDto } from '../app/dto/plans/update-plan.dto';

const url = 'http://localhost:3001/plans'

let id: number;

describe('Plans route', () => {
    describe('should succeed on', () => {
        test('creating a new plan', async () => {
            const dto: CreatePlanDto = {
                bonus: 500,
                name: 'FaleMais 500'
            }
            const { data } = await axios.post<CreationReturnDto>(url, dto)
            id = data.id

            expect(id).toBeGreaterThanOrEqual(1)
        })

        test('getting a plan', async () => {
            const { data: { bonus, name } } = await axios.get<Omit<GetPlanDto, 'id'>>(`${url}/${id}`)

            expect(bonus).toBe(500)
            expect(name).toBe('FaleMais 500')
        })

        test('getting all plans', async () => {
            const { data } = await axios.get<GetPlanDto[]>(url)

            expect(data.length).toBeGreaterThan(0)
        })

        test('updating a plan', async () => {
            const dto: UpdatePlanDto = {
                bonus: 400,
                name: 'FaleMais 400'
            }
            const { status } = await axios.patch<UpdatePlanDto>(`${url}/${id}`, dto)

            expect(status).toBe(204)
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