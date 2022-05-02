import axios from 'axios'
import { CreationReturnDto } from '../app/dto/common/creation-return.dto'
import { CreateTariffDto } from '../app/dto/tariffs/create-tariff.dto'

const url = 'http://localhost:3001/tariffs'

let id: number;

describe('Tariffs route', () => {
    describe('should succeed on', () => {
        test('creating a new tariff', async () => {
            const dto: CreateTariffDto = {
                originDdd: 99,
                destinyDdd: 100,
                pricePerMin: 5
            }
            const result = await axios.post<CreationReturnDto>(url, dto)
            id = result.data.id

            expect(id).toBeGreaterThanOrEqual(1)
        })

        test('deleting a tariff', async () => {
            const result = await axios.delete(`${url}/${id}`)

            expect(result.status).toBe(204)
        })
    })

    describe('should fail on', () => {
        test('creating a new tariff', async () => {
            const dto: CreateTariffDto = {
                originDdd: 50,
                destinyDdd: 50,
                pricePerMin: 5
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