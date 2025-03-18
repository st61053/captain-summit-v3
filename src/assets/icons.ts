
import coin from "./dollar.png"
import barrel from "./barrel.png"

import blue from "./blue.png"
import red from "./red.png"
import green from "./green.png"
import orange from "./orange.png"

import t1 from "./t1.gif"
import t2 from "./t2.gif"
import t3 from "./t3.gif"

import a from "./letter-a.png"
import b from "./letter-b.png"
import c from "./letter-c.png"
import d from "./letter-d.png"
import e from "./letter-e.png"
import f from "./letter-f.png"
import g from "./letter-g.png"
import h from "./letter-h.png"
import i from "./letter-i.png"
import j from "./letter-j.png"

export enum IconEnum {
    COIN = "coin",
    QUEST1 = "quest1",
    RED = "red",
    BLUE = "blue",
    GREEN = "green",
    ORANGE = "orange",
    T1 = "t1",
    T2 = "t2",
    T3 = "t3",
    A = "a",
    B = "b",
    C = "c",
    D = "d",
    E = "e",
    F = "f",
    G = "g",
    H = "h",
    I = "i",
    J = "j"
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
    [IconEnum.T3]: t3,
    [IconEnum.A]: a,
    [IconEnum.B]: b,
    [IconEnum.C]: c,
    [IconEnum.D]: d,
    [IconEnum.E]: e,
    [IconEnum.F]: f,
    [IconEnum.G]: g,
    [IconEnum.H]: h,
    [IconEnum.I]: i,
    [IconEnum.J]: j
}
