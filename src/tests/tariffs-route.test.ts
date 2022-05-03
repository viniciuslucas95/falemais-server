import axios from 'axios'
import { CreationReturnDto } from '../app/dto/common/creation-return.dto'
import { CreateTariffDto } from '../app/dto/tariffs/create-tariff.dto'
import { GetTariffDto } from '../app/dto/tariffs/get-tariff.dto';
import { UpdateTariffDto } from '../app/dto/tariffs/update-tariff.dto';

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

        test('getting a tariff', async () => {
            const { data: { destinyDdd, originDdd, pricePerMin } } = await axios.get<Omit<GetTariffDto, 'id'>>(`${url}/${id}`)

            expect(originDdd).toBe(99)
            expect(destinyDdd).toBe(100)
            expect(pricePerMin).toBe(5)
        })

        test('getting all tariffs', async () => {
            const { data } = await axios.get<GetTariffDto[]>(url)

            expect(data.length).toBeGreaterThan(0)
        })

        test('updating a tariff', async () => {
            const dto: UpdateTariffDto = {
                originDdd: 95
            }

            const result = await axios.patch<UpdateTariffDto>(`${url}/${id}`, dto)

            expect(result.status).toBe(204)
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