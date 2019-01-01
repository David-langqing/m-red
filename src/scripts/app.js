
import Router from './utils/router'
import homeController from './controllers/home'
import orderController from './controllers/order'

import homepageController from './controllers/homepage'
import positionController from './controllers/position'
import mineController from './controllers/mine'
import publishController from './controllers/publish'
// shaojun

homeController.render()
orderController.render()
const router = new Router()
router.init()
router.route('#homepage', homepageController.render)
router.route('#position', positionController.render)
router.route('#order', orderController.render)
router.route('#publish', publishController.render)
router.route('#mine', mineController.render)