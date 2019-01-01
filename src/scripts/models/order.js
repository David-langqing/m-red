const list = (pageNo,pageSize) => {
    return $.ajax({
        url: '/api/position/list',
        success:(result) => {
            return result
        }
    })
}
const good = () => {
    return $.ajax({
        url: '/api/position/list',
        success:(result) => {
            return result
        }
    })
}

const loadmore = (pageNo,pageSize) => {
    return $.ajax({
        url: '/api/position/refresh',
        success:(result) => {
            return result
        }
    })
}

const goodmore = (pageNo,pageSize) => {
    return $.ajax({
        url: '/api/position/refresh',
        success:(result) => {
            return result
        }
    })
}
export default{
    list,
    good,
    loadmore,
    goodmore
}