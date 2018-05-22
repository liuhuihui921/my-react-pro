import { get } from '../get'
import { post } from '../post'

export function getDesignManList(type) {
    const result = get('/api/designManList'+ '/' + type)
    return result
}
