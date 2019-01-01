import homeTpl from '../views/home.html'


var swiper
const render = () => {
  document.querySelector('#root').innerHTML = homeTpl
  
      
   changeTab()
}

const changeTab = () => {
  $('nav ul li').on('tap', function () {
    let hashs = ["#homepage",'#position','#publish','#order','#mine']
    location.hash = hashs[$(this).index()]
    $(this).addClass('active').siblings().removeClass('active')
  })
}

export default {
  render
}




