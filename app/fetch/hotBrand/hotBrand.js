import { get } from '../get'
import { post } from '../post'

export function getHotBrandList(type) {
    const result = get('/api/hotBrandList'+ '/' + type)
    return result
}
