import { get } from '../get'
import { post } from '../post'

export function getHotBrandList() {
    const result = get('/api/hotBrandList')
    return result
}
