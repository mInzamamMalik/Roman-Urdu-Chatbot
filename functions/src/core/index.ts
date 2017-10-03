
export function upcaseMessage(msg: string): string {
    return msg.toUpperCase()
}

export function processDateEntity(entityValue: string) {
    return new Promise((resolve, reject) => {

        let date = new Date();
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        let todayMiliseconds = date.getTime();

        switch (entityValue) {
            case 'today':
                resolve(todayMiliseconds)
                break;

            case 'tommorow':
                let oneDayDuration = 1000 * 60 * 60 * 24 * 1;
                resolve(todayMiliseconds + oneDayDuration) //adding one day
                break;
            case 'others':

                break;
        }
    })
}

export function processTimeEntity(entityValue: string) {
    return new Promise((resolve, reject) => {

        let time = new Date();
        time.setDate(0)
        time.setMonth(0)
        time.setFullYear(0)
        let timeMiliseconds = time.getTime();

        switch (entityValue) {
            case 'now':
                resolve(timeMiliseconds)
                break;
            case 'after 1 hour':
                let oneHourDuration = 1000 * 60 * 60;
                resolve(timeMiliseconds + oneHourDuration)
                break;
        }
    })
}