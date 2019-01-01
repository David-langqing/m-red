
import homepageTpl from '../views/homepage.html'
import Swiper from 'swiper'
var swiper
const render = () => {
  $('main').html(homepageTpl)
  swiper = new Swiper(".swiper-container", {
    autoplay:true,
    loop: true, // 循环模式选项
    pagination :{
      el: '.swiper-pagination',
      clickable :true,
    },
    on: {
        slideChangeTransitionEnd: function () {
            let index = this.activeIndex
            // $('.des-tab ul li').eq(index).addClass('active').siblings().removeClass('active')
            
        }
    }
})
  scroll()
  click_1()
  // tap()
}

const scroll = ()=>{
  let pagescroll = new BScroll('main',{
    probeType:2,
    startY:0
  })
  let filter = $('#go-top');
  pagescroll.on('scroll',function(){
      let y = this.y
      let maxy=this.maxScrollY
      // console.log(y)
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
 
  
}
const click_1 = ()=>{
  $('.s-middle').on("click",function(){
    // console.log(1)
    $('.ex').toggle()
    // click_2()
  })
  // $('.close>p').on("click",function(){
  //     console.log(0)
  //     $('.ex').hide()
  // })
}

// const tap = function(){
//   let filter = $('#go-top');
//   filter.on("tap",function(){
//     console.log($("#main"))
//     $("#main").animate({ scrollTop: 0 }, 500)
//   })
// }
export default {
  render
}
