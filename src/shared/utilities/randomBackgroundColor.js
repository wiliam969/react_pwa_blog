import Rx from 'rx'

export default class BGColor
{
    static randomBackgroundColor (Container_id,speed = 1000) {
        const interval = Rx.Observable.interval(speed)
        if(document.getElementById(Container_id)) {
            interval.subscribe(int => document.getElementById("home-loading-container").style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16))
        } else {
            interval.unsubscribe();
        }
    }
}

