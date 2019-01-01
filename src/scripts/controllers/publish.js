// import publishTpl from '../views/publish.html'

// const render = () => {
//   $('main').html(publishTpl)
// }

// export default {
//   render
// }
import publishTpl from '../views/publish.html'

const render = () => {
  document.querySelector('main').innerHTML = publishTpl

}


export default {
  render
}