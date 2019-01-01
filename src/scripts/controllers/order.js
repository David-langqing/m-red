import orderTpl from '../views/order.html'
import orderListTpl from '../views/order-list.html'
import orderListGoodTpl from '../views/order-list-good.html'
import orderModel from '../models/order'
import Swiper from 'swiper'
import order from '../models/order';

var datasource = []
var goodsource = []
var pageNo = 2
var pageSize = 10
var swiper
var swiper2

const render = async () => {
    $('main').html(orderTpl)
    swiper2 = new Swiper(".swiper1", {
        pagination: {
            el: '.pagination1',
        },

        // on: {
        //     slideChangeTransitionEnd: function () {
        //         let index = this.activeIndex
        //     }
        // }
    })
    let list = datasource = (await orderModel.list(pageNo, pageSize)).content.data.page.result;
    let good = goodsource = (await orderModel.good()).content.data.page.result;
    console.log(good)
    
    await renderList(list,good)
    swiper = new Swiper(".swiper2", {
        on: {
            slideChangeTransitionEnd: function () {
                let index = this.activeIndex
                $('.des-tab ul li').eq(index).addClass('active').siblings().removeClass('active')
                
            }
        }
    })
    changeTab()
    scroll()
}
const changeTab = () => {
    $('.des-tab ul li').on('tap', function () {
        $(this).addClass('active').siblings().removeClass('active')
        swiper.slideTo($(this).index())
    })
}
const scroll = () => {
    let orderScroll = new BScroll('main', {
        probeType: 2,
        startY: 0
    })
    let foot = $('.foot img')
    let filter = $('#go-top');
    orderScroll.on('scroll', function () {
        let y = this.y,
            maxY = this.maxScrollY - y
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
    orderScroll.on('scrollEnd', async function () {
        let y = this.y,
            maxY = this.maxScrollY - y
        if (maxY >= -48 && maxY < 0) {
            this.scrollTo(0, this.maxScrollY + 40)
        } else if (maxY >= 0) {
            foot.attr('src', '/images/ajax-loader.gif')

            let result = await orderModel.loadmore(++pageNo, 5)
            let list = datasource = [
                ...datasource,
                ...result.content.data.page.result
            ]
            let good = goodsource = [
                ...goodsource,
                ...result.content.data.page.result
            ]
            renderList(list,good)
            console.log(list)
            this.refresh()
            foot.attr('src', '/images/arrow.png')
                .removeClass('down')
            this.scrollTo(0, this.maxScrollY + 40)
        }
        
    })
}

const renderList = async (list,good) => {
    let template = Handlebars.compile(orderListTpl)
    let html = template({ list })
    console.log(good)
    let templateGood = Handlebars.compile(orderListGoodTpl)
    let htmlGood = templateGood({ good })
    $('.caseul').html(html)
    $('.goodul').html(htmlGood)
}

export default {
    render
}