const list = () => {
  return $.ajax({
    url: '/api/position/list',
    success: (result) => {
      return result
    }
  })
}

const refresh = () => {
  return $.ajax({
    url: '/api/position/refresh',
    success: (result) => {
      return result
    }
  })
}

const loadmore = (pageNo) => {
  return $.ajax({
    url: '/api/position/refresh',
    success: (result) => {
      return result
    }
  })
}

export default {
  list,
  refresh,
  loadmore
}