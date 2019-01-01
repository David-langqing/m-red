import mineTpl from '../views/mine.html'

const render = () => {
  $('main').html(mineTpl)
  changtabmine()
}
const changtabmine =() =>{
  // console.log($('.loginwrap').html())
  $('.loginwrap ul li').on("tap", function(){
    console.log($(this).index())
    $(this).addClass('active').siblings().removeClass('active')
      
    $(".form").eq($(this).index()).show().siblings().hide();
    if($(this).index()==2){
      $('.loginother').hide()
    }else{
      $('.loginother').show()
    }
    });
}
export default {
  render
}