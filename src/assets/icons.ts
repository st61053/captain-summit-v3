
import coin from "./dollar.png"
import barrel from "./barrel.png"

import blue from "./blue.png"
import red from "./red.png"
import green from "./green.png"
import orange from "./orange.png"

import t1 from "./t1.gif"
import t2 from "./t2.gif"
import t3 from "./t3.gif"

export enum IconEnum {
    COIN = "coin",
    QUEST1 = "quest1",
    RED = "red",
    BLUE = "blue",
    GREEN = "green",
    ORANGE = "orange",
    T1 = "t1",
    T2 = "t2",
    T3 = "t3"
}

export const iconMap = {
    [IconEnum.COIN]: coin,
    [IconEnum.QUEST1]: barrel,
    [IconEnum.RED]: red,
    [IconEnum.BLUE]: blue,
    [IconEnum.GREEN]: green,
    [IconEnum.ORANGE]: orange,
    [IconEnum.T1]: t1,
    [IconEnum.T2]: t2,
    [IconEnum.T3]: t3
}
