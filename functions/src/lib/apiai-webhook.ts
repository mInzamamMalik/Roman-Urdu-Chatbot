import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Request, Response } from "express"; //interfaces
const ActionsSdkApp = require('actions-on-google').DialogflowApp;

import db from '../db';

// API.AI Action names
import {
    activatePackege,
    roman
} from './actions'

const ACTIVATE_PACKEGE = 'activatePackege';
const ROMAN = 'roman'

export const webhook = functions.https.onRequest(async (request: Request, response: Response) => {
    // const app = new ActionsSdkApp({ request: request, response: response });

    // let actionMap = new Map();

    // actionMap.set(ACTIVATE_PACKEGE, activatePackege);
    // actionMap.set(ROMAN, roman)

    // app.handleRequest(actionMap);

    console.log("request.body: ", request.body);
    console.log("request.body.queryResult: ", request.body.queryResult);
    console.log("request.body.originalDetectIntentRequest: ", request.body.originalDetectIntentRequest);


    let queryResult = request.body.queryResult;

    switch (queryResult.action) {

        case ACTIVATE_PACKEGE: activatePackege(request, response); break;
        // case ROMAN: roman(request, response); break;

        default:
            response.send({
                "fulfillmentText": "no action matched",
            })
            break;
    }

})