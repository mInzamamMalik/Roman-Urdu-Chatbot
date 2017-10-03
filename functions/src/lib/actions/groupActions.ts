import * as request from 'request';
import { db, timestamp } from './../../db';
import { membershipType } from './../../constants';

const quantity = app.getArgument('number');
const pizzaFlavour = app.getArgument('pizzaFlavour');
const pizzaSize = app.getArgument('pizzaSize');
const address = app.getArgument('address');
const orderDate = app.getArgument('date');

// this function is only followup event, do not write anything in db in this function
export function createTeam(app: any) {

    db.child('organization').orderByValue().equalTo(app.getUser().userId).once('value', function (snapshot) {
        console.log("userId: ", app.getUser().userId)
        console.log('here is the snapshot:', snapshot.val())
    })

    console.info("createGroup function triggered");
    app.ask("create group response from webhook")
    return;
}

// this function is only followup event, do not write anything in db in this function
export function deleteGroup(app: any) {

    const fullfillment = {
        "speech": "group is created in speech",
        "displayText ": "group is created in display text",
    }
    app.ask("abcd");
    return;
}


export function createOrganization(app: any) {

    console.info('createOrganization function triggered');

    console.log("app.getArgument('orgName'): ", app.getArgument("orgName"))
    console.log("app.getUser(): ", app.getUser())

    let data: any = {}

    data["organizations/" + app.getArgument("orgName")] = {
        "owner": app.getUser().userId,
        "title": app.getArgument("orgName")
    }
    data["user-organizations-memberships/" + app.getUser().userId + "/" + app.getArgument("orgName")] = {
        "membershipType": membershipType.admin,
        "timestamp": timestamp
    }

    //multipath update
    db.update(data)
        .catch((e) => {
            app.ask("error in firebase push");
        })
        .then(() => {
            app.ask('Organization is created named ' + app.getArgument("orgName"));
        })
}

export function manageOrganization(app: any) {

    console.info('manageOrganization function triggered');

    if (!app.getArgument("orgName")) {

        db.child('user-organizations-memberships')
            .child(app.getUser().userId)
            .once("value", (snapshot: any) => {

                console.log("data got from firebase: ", snapshot.val());
                let userOrganizationsArr = Object.keys(snapshot.val())

                app.ask(app.buildRichResponse()
                    .addSimpleResponse({
                        speech: `please select an organization:`,
                        displayText: `please select an organization:`
                    })
                    .addSuggestions(userOrganizationsArr)
                );

            }).catch((e: any) => {
                app.ask("error in firebase push");
            })
        return;
    }

    console.log("app.getArgument('orgName'): ", app.getArgument("orgName"))
    console.log("app.getUser(): ", app.getUser())
}

export function inputWelcome(app: any) {

    console.log("app.getUser().accessToken;: ", app.getUser().accessToken)
    const accessToken = app.getUser().accessToken;
    const _url = 'https://www.googleapis.com/userinfo/v2/me?alt=json&access_token=' + accessToken
    request.get(_url, function (error: any, response: any, body: any) {

        //checking if response was success
        if (!error && response.statusCode == 200) {

            db.child('users').child(app.getUser().userId).update(JSON.parse(body))
                .catch((e) => {
                    console.log("firebase error: ", e);
                    app.ask("firebase error: some thing went wrong on server")
                })
                .then(() => {
                    const userName = JSON.parse(body).given_name;
                    const userGender = JSON.parse(body).gender
                    console.log('userGender ', userGender)
                    console.log('userName ', userName);
                    let gender;
                    if(userGender === 'male'){
                        gender = 'son'
                    }
                    else{
                        gender = 'daughter'
                    }
                    app.ask(app.buildRichResponse()
                        .addSimpleResponse({
                            speech: `Hi ${userName}, I am your memory mom, would you like me
                             to remember a new item, or recall an older one?`,
                            displayText: `Hi ${userName}, I am your memory mom, would you like me to remember a new item, or recall an older one?`
                        })
                        .addSuggestions(
                        ['Remember something', 'recall something'])
                    );
                })

        } else {
            console.log("err: ", error, response.statusCode, response);
            app.ask("some thing went wrong on server")
        }
    })
}
