import { get } from '../get'

// export function getSearchData(page, cityName, category, keyword) {
//     const keywordStr = keyword ? '/' + keyword : ''
//     const result = get('/api/search/' + page + '/' + cityName + '/' + category + keywordStr)
//     return result
// }
export function getSearchData(page, keyword) {
    // const keywordStr = keyword ? '/' + keyword : ''
    const result = get('/api/search/' + page + '/' + keyword)
    return result
}

export function getKeyWordData(val) {
    // const keywordStr = keyword ? '/' + keyword : ''
    const result = get('/api/keywords/' + val)
    return result
}
