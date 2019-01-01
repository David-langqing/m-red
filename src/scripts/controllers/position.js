import positionTpl from '../views/position.html'
import positionListTpl from '../views/position-list.html'
import positionModel from '../models/position'
import orderModel from '../models/order'
import Swiper from 'swiper'
var datasource = []
var pageNo = 1
var swiper
const render = async () => {
  $('main').html(positionTpl)
  let list = datasource = (await positionModel.list()).content.data.page.result;
  //console.log(list)
  await renderList(list)
  swiper = new Swiper(".swiper-container", {
    on: {
        slideChangeTransitionEnd: function () {
            let index = this.activeIndex
            $('#ul-top li').eq(index).addClass('active').siblings().removeClass('active')
            console.log(index)
            if(index!=0){
              $(".foot").hide()
            }
            // $(".swiper-wrapper>div").eq(index).show().siblings().hide()
        }
    }
  })
  changeTab()
  scroll()
}
const changeTab = () => {
  $('#ul-top li').on('tap', function () {
      $(this).addClass('active').siblings().removeClass('active')
      swiper.slideTo($(this).index())
  })
}
const renderList = async (list) => {
  let template = Handlebars.compile(positionListTpl)
  let html = template({ list })
  $('#slide1').html(html)
}
const scroll = () => {
  let posScroll = new BScroll('main', {
    probeType: 2,
    startY: 0
  })

  let head = $('.head >img'),
    foot = $('.foot >img')

    let filter = $('#go-top');
  posScroll.on('scroll', function () {
    let y = this.y,
      maxY = this.maxScrollY - y

    if (y >= 0) {
      head.addClass('up')
    }

    if (maxY >= 0) {
      foot.addClass('down')
    }
    if(y<=-290){
      filter.show()
      filter.animate({
        bottom: "1.5rem",
      }, 3000);
    }
    else{
      filter.animate({
        bottom: 0
      }, 3000);
      filter.hide()
    }
    
    let _this = this
    filter.on("tap",function(){
      console.log($("#main"))
      // $("#main").animate({ scrollTop: 0 }, 500)
      // $("#main").scrollTo(0,0)
      _this.scrollTo(0,0,700);
      filter.hide()
    })
  })

  posScroll.on('scrollEnd', async function () {
    let y = this.y,
      maxY = this.maxScrollY - y
console.log(y)
console.log(maxY)
    // if (y >= -40 && y < 0) {
    //   this.scrollTo(0, -40)
    // } else if (y >= 0) {
    //   head.attr('src', '/images/ajax-loader.gif')

    //   let result = await positionModel.refresh()
    //   let list = datasource = [
    //     ...datasource
    //   ]
    //   renderList(list)

    //   this.refresh()
    //   head.attr('src', '/images/arrow.png')
    //     .removeClass('up')
    //   this.scrollTo(0, -40)
    // }

    if (maxY >= -40 && maxY < 0) {
      this.scrollTo(0, this.maxScrollY + 40)
    } else if (maxY >= 0) {
      foot.attr('src', '/images/ajax-loader.gif')

      let result = await positionModel.loadmore(++pageNo)
      let list = datasource = [
        ...datasource,
        ...result.content.data.page.result
      ]
      renderList(list)

      this.refresh()
      foot.attr('src', '/images/arrow.png')
        .removeClass('down')
      this.scrollTo(0, this.maxScrollY + 40)

    }
  })
}


export default {
  render
}