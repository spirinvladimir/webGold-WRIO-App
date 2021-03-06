/**
 * Created by michbil on 26.09.15.
 */
/**
 * Created by michbil on 26.09.15.
 */
const {Router} = require('express');
const AdminRoute = require('./admin.js');
const {loginWithSessionId,getLoggedInUser,authS2S,wrioAdmin,wrap,restOnly,wrioAuth} = require('wriocommon').login;
const {giveaway,
    free_wrg,
    get_wallet,
    get_user_wallet,
    save_wallet,
    sign_tx,
    donate,
    get_balance,
    get_exchange_rate,
    tx_poll} = require('../controllers/ethereum.js');
const router = Router();

router.get('/tx_poll',wrioAuth,wrap(tx_poll));
router.get('/giveaway',wrioAuth, wrap(giveaway));
router.get('/free_wrg',wrioAuth, wrap(free_wrg));
router.get('/get_wallet', restOnly, wrioAuth, wrap(get_wallet));
router.get('/get_user_wallet', restOnly, wrioAuth, wrap(get_user_wallet));
router.post('/save_wallet', restOnly, wrioAuth, wrap(save_wallet));
router.get('/signtx', restOnly, wrioAuth, wrap(sign_tx));
router.get('/donate', authS2S, wrap(donate));
router.get('/get_balance', restOnly, wrioAuth, wrap(get_balance));
router.get('/get_exchange_rate', restOnly, wrioAuth, get_exchange_rate);
router.use('/coinadmin',AdminRoute);

module.exports = router;