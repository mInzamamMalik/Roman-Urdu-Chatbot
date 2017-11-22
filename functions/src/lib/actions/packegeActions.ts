import * as request from 'request';
import { db, timestamp } from './../../db';
import { membershipType } from './../../constants';
import { Request, Response } from "express"; //interfaces

// this function is only followup event, do not write anything in db in this function
export let activatePackege = (request: Request, response: Response) => {


    let parameters = request.body.queryResult.parameters;

    let type = parameters.packegeType
    let duration = parameters.packegeDuration
    let confirmation = parameters.confirmation

    if (!type) {
        response.send({
            "fulfillmentText": `ap${(duration) ? duration + ' k lye' :'' } kon sa packege karwana chahtay hain? call ka ya sms ka`
        })
    } else if (!duration) {
        response.send({
            "fulfillmentText": `ap kitne dino ka ${type} packege karna chahtay hain? 1 din, 7 din ya 30 din`
        })
    } else if (confirmation) {
        response.send({
            "fulfillmentText":
                `ap ${duration} din ka ${type} packege activate karne 
            ja rahay hain jis ki qeemat Rs.${duration * 3} hai, 
            kya ap waqai ye packege krna chchtay hain? haan ya nhe mai jawab dain`
        })
    } else {
        response.send({
            "fulfillmentText":
                `ap kamyabi sy ${duration} din ka ${type} packege Rs.${duration * 3} 
            mai hasil kar chukay hain, kya ap kch or janna chahtay hain?`
        })
    }
}

export function roman(app: any) {
    app.ask({
        speech: "roman"
    })
}