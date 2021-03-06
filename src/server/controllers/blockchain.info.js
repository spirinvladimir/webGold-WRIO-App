const request = require('superagent');
const nconf = require('../utils/wrio_nconf');
const uuid = require('node-uuid');
const User = require('../models/wriouser.js');
const logger = require('winston');
const BlockChainApi = require('../api/blockchainApi.js');
const {dumpError} = require('wriocommon').utils;

/**
 * Blockchain.info callback handler
 * @param request
 * @param response
 */

const callback_handler = async (request,response) => {
    try {
        var blockchain = new BlockChainApi();
        await blockchain.handle_callback(request,response);
    } catch(e) {
        logger.error("Callback failed",e);
        dumpError(e);
        response.status(400).send({"error":"API operation failed"});
    }
};
/**
 * Request payment_history
 * @param request
 * @param response
 */

const payment_history = async (request,response) => {

    var userID = request.user;
    var blockchain = new BlockChainApi();
    var history = await blockchain.getInvoices(userID._id);
    response.send(history);

};

/**
 * Request payment from bincoin (blockchain.info api)
 * @param req
 * @param response
 */
const request_payment = (req,response) =>{
    logger.debug("Request payment is called");
    var blockchain = new BlockChainApi();

    var userId = req.user._id;
    var wrioId = req.user.wrioID;

    var nonce = req.body.payment_method_nonce;
    var amount = parseFloat(req.body.amount);
    var amountWRG = parseFloat(req.body.amountWRG);
    if (isNaN(amount) || (amount < 0)) {
        response.status(400).send({"error": "bad request"});
        return;
    }
    if (isNaN(amountWRG) || (amountWRG < 0)) {
        response.status(400).send({"error": "bad request"});
        return;
    }
    logger.debug("Got nonce", nonce);

    blockchain.request_payment(userId, wrioId, amount).then(function (resp) {
        logger.debug("Resp",resp);
        response.send(resp);
    },function (err) {
        response.status(400).send({"error": "error processing your request "+err});
    });

};

/**
 * Presale handler
 * @param req
 * @param response
 * @returns {*}
 */

const request_presale = (req,response) => { // TODO add anti-spam protection
    logger.debug("Request payment is called");
    var blockchain = new BlockChainApi();

    const email = req.body.mail; // TODO: validate it!
    const ethID = req.body.ethID;
    const amount = parseFloat(req.body.amount);
    const amountWRG = parseFloat(req.body.amountWRG); // amountWRG is ignored, we don't trust it

    logger.info(`Got presale request to ${email} ETH: ${ethID} amount ${amount} BTC(satoshis) ${amountWRG} WRG`);

    const checkNumber = (amount) => isNaN(amount) || (amount < 0);
    if (checkNumber(amount) || checkNumber(amountWRG)) {
        return response.status(400).send({"error": "bad request"});
    }
    blockchain.request_presale(amount, email,ethID).then((resp) => {
        logger.debug("Resp", resp);
        response.send(resp);
    }, (err) => {
        dumpError(err);
        response.status(400).send({"error": "error processing your request " + err});
    });

};

/**
 * Get current adress gap for bitcoin addresses
 */

const get_gap = (req,response) => {
    logger.debug("Request payment is called");
    var blockchain = new BlockChainApi();

    blockchain.get_gap().then(function (resp) {
        logger.debug("Resp",resp);
        response.send(resp);
    },function (err) {
        response.status(400).send({"error": "error processing your request "+err});
    });

};
module.exports = {callback_handler,payment_history,request_payment,request_presale,get_gap};