import { get } from '../get'
import { post } from '../post'

export function getInformationList() {
    const result = get('/api/informationList')
    return result
}
