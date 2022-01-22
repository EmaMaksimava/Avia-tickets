import api from "../apiService";
import config from "../../config/apiConfig";
import axios from 'axios'

jest.mock('axios')

const cities = [{ country_code: "BY", name:'Minsk', code:'MN' }]
const countries = [{ code: 'RUS', name: 'Russion Federation'}]
const airlines = [{ country: 'Turkey', code: 'TA', name:'Turkish Airlines'}]

describe('Test API service', () => {
    it('Success fetch cities', async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: cities}))
        await expect(api.cities()).resolves.toEqual(cities)
        expect(axios.get).toHaveBeenCalledWith(`${config.url}/cities`)
    })

    it('Fetch cities failure', async () => {
        const errMsg = 'Api Error'
        axios.get.mockImplementationOnce(() => Promise.reject(new Error(errMsg)))
        await expect(api.cities()).rejects.toThrow(errMsg)
    })

    it('Success fetch countries', async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: countries}))
        await expect(api.countries()).resolves.toEqual(countries)
        expect(axios.get).toHaveBeenCalledWith(`${config.url}/countries`)
    })

    it('Fetch countries failure', async () => {
        const errMsg = 'Api Error'
        axios.get.mockImplementationOnce(() => Promise.reject(new Error(errMsg)))
        await expect(api.countries()).rejects.toThrow(errMsg)
    })

    it('Success fetch airlines', async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: airlines}))
        await expect(api.airlines()).resolves.toEqual(airlines)
        expect(axios.get).toHaveBeenCalledWith(`${config.url}/airlines`)
    })

    it('Fetch airlines failure', async () => {
        const errMsg = 'Api Error'
        axios.get.mockImplementationOnce(() => Promise.reject(new Error(errMsg)))
        await expect(api.airlines()).rejects.toThrow(errMsg)
    })
})