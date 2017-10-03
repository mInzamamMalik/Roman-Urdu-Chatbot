import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Request, Response } from "express"; //interfaces
const ActionsSdkApp = require('actions-on-google').ApiAiAssistant;

import db from '../db';

// API.AI Action names
import {
    createOrganization,
    manageOrganization,
    createTeam,
    deleteGroup,
    inputWelcome,
    roman
} from './actions'

const CREATE_TEAM = 'createTeam';
const DELETE_GROUP = 'deleteGroup';
const RENAME_GROUP = 'renameGroup';
const CHECKIN_GROUP = 'checkInGroup';
const WELCOME_INTENT = 'input.welcome';
const ROMAN = 'roman'

const CREATE_ORGANIZATION = 'createOrganization';
const MANAGE_ORGANIZATION = 'manageOrganization';

// export const memoryMom = functions.https.onRequest(async (request: Request, response: Response) => {

//     console.log("request.body.originalRequest.source.data.user: ", request.body.originalRequest.data.user);

    
// })//end of webhook http trigger

export const memoryMom = functions.https.onRequest(async (request: Request, response: Response) =>{
    const app = new ActionsSdkApp({ request: request, response: response });

    let actionMap = new Map();
    actionMap.set(CREATE_ORGANIZATION, createOrganization);
    actionMap.set(MANAGE_ORGANIZATION, manageOrganization);
    actionMap.set(CREATE_TEAM, createTeam);
    actionMap.set(DELETE_GROUP, deleteGroup);
    actionMap.set(WELCOME_INTENT, inputWelcome);
    actionMap.set(ROMAN, roman)
    app.handleRequest(actionMap);
})