import Rx from 'rx'

export default class BGColor
{
    static randomBackgroundColor (Container_id,speed = 1000) {
        const interval = Rx.Observable.interval(speed)
        console.log(Container_id)
        if(document.getElementById(Container_id)) {
            console.log(Container_id)
            console.log("subscribed")

            interval.subscribe(int => document.getElementById("home-loading-container").style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16))
        } else {
            console.log(Container_id)
            console.log("unsubscribed")
            interval.unsubscribe();
        }
    }
}

