const testInput = `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`

function aplenty(input){
input = input.split("\n\n")

const rules = input[0].split("\n").reduce((o, l) => {
  const p = l.slice(0,-1).split('{')
  o[p[0]] = p[1].split(',').map(s => s.split(':'))
  return o
}, {})

const objects = input[1].split("\n").map(s => s.slice(1, -1).split(',').reduce((o, p) => {
  const a = p.split('=')
  o[a[0]] = +a[1]
  return o
},{}))

const check = function (rule) {
  return eval(rule)
}

let sum = 0

for (let o of objects) {
  let current = 'in'

  while (current !== 'A' && current !== 'R') {
    for (let r of rules[current]) {
      if (r.length === 1) {
        current = r[0]
        break
      }
      if (check.call(o, 'this.'+r[0])) {
        current = r[1]
        break
      }
    }
  }

  if (current == 'A') sum += Object.values(o).reduce((s, c) => s+c,0)
}

console.log(sum)
}


function aplentyTwo(input){

input = input.split("\n\n")


const rules = input[0].split("\n").reduce((o, l) => {
  const p = l.slice(0,-1).split('{')
  o[p[0]] = p[1].split(',').map(s => s.split(':'))
  return o
}, {})

const toCheck = [['in', {x:1,m:1,a:1,s:1}, {x:4000,m:4000,a:4000,s:4000}]]

let accepted = 0

while (toCheck.length > 0) {
  const [current, min, max] = toCheck.pop()

  if (current == 'R') continue

  if (current == 'A') {
    accepted += (max.x - min.x + 1) * (max.m - min.m + 1) * (max.a - min.a + 1) * (max.s - min.s + 1)
    continue
  }

  const ruleList = rules[current]

  for (let r of ruleList) {
    if (r.length == 1) {
      toCheck.push([r[0], min, max])
      break
    }

    const c = r[0]
    const prop = c.charAt(0)
    const cond = c.charAt(1)
    const v = +c.slice(2)

    const newMin = Object.assign({}, min)
    const newMax = Object.assign({}, max)

    if (cond == '<') {
      newMax[prop] = v-1
      min[prop] = v
      toCheck.push([r[1], newMin, newMax])
      continue
    }
    if (cond == '>') {
      newMin[prop] = v+1
      max[prop] = v
      toCheck.push([r[1], newMin, newMax])
      continue
    }
  }
}

console.log(accepted)
}
const realInput = `hfm{a<1891:R,m<2881:A,m<2987:A,R}
ns{s>2289:R,x<3094:A,R}
vll{s<2397:R,x>1015:A,A}
fx{a>3383:R,a>3059:A,A}
bhg{x>669:A,x<605:R,a>3407:R,A}
fr{m>2523:A,m>2353:R,x>2678:dts,A}
llj{m<2149:vzl,pjq}
qh{s<2205:R,R}
nml{a>1072:R,x>1129:R,A}
tb{m<2429:A,m<2506:A,x>2910:R,R}
cr{x<735:R,a<2972:R,x<973:R,R}
rb{s>2603:A,x>240:R,s>2405:A,A}
xr{x>975:A,R}
pb{a>2460:A,s>686:A,cq}
dfv{x>1219:A,km}
kc{m>1600:nsj,tjp}
lx{s>3383:kgn,qrh}
dc{s<723:A,x>2900:R,x>2607:A,A}
gxn{s<3351:R,s<3754:A,A}
kkk{a>1099:R,R}
jbz{x>3246:R,m<3301:lh,zz}
qf{s<3162:R,m>2686:R,R}
gqb{s>2575:A,m>2634:R,R}
pz{a>2415:sv,x<1649:A,a<1508:bv,R}
fn{m<2045:ht,a<1532:sm,x>1630:bxs,gfk}
br{m>631:A,m>392:A,R}
dtx{a<3420:A,x<582:A,R}
ms{m<1784:R,a<1945:R,x<276:R,A}
ljm{a<3677:R,m<2840:R,a>3790:R,A}
gcp{x<964:zqt,a>3632:qr,cvc}
kz{m>2543:A,m<2302:R,ns}
gqp{a>1014:A,R}
hq{a>416:kz,m>2537:mm,pt}
bcb{m<2838:A,x>355:R,R}
cp{s>2863:A,R}
gfr{s>2813:vxb,R}
kx{s>3076:A,s>2788:bcb,rb}
lrf{m>3285:jg,a<1934:A,R}
sjf{x>2162:dc,s>886:ddk,s>327:qjs,zqv}
cqp{a<3274:R,a<3562:pjn,A}
zkb{x>927:vpm,x>553:pbm,pvv}
cl{s<2019:A,a<672:mx,hh}
vxm{s>3645:A,x<3010:R,R}
tl{m>2863:hfq,s<618:xmd,zf}
lc{m<1255:qjt,m<1360:mml,m<1405:rrz,R}
mk{m<2694:A,m<2720:A,m<2742:R,R}
vhd{a<1005:R,a<1032:fl,m>3001:hp,vc}
bhl{a<63:A,A}
dnp{m>2478:R,js}
vx{x>459:A,s>3010:R,A}
mgm{a>2427:A,m<512:A,m<672:R,A}
mkg{m<3037:kqc,pg}
pgn{x<657:dbf,bp}
gk{a<2387:A,m>3634:tjf,xrs}
bk{x<1464:R,m<2385:R,s<2889:A,R}
brh{x<592:A,a>1420:A,a>1294:A,A}
jlk{x>3037:A,R}
sj{x>1055:R,A}
hpg{a>2950:R,s<183:R,R}
rvj{s>535:fv,x<2858:kjp,m<1563:hv,ff}
nxz{m>2313:R,s<3765:A,a>2157:A,A}
gml{x>3077:hk,fr}
mnn{a>363:R,A}
rh{a>120:A,a<63:R,a<86:A,A}
kqs{m<1616:xpt,zzs}
pp{s>2657:nk,m<2894:hhh,clh}
tnr{m>2934:A,x>1403:A,x<1189:R,A}
kk{x>2090:zkj,m<2508:A,m>2704:A,qln}
zl{a>239:xgn,x<2628:nn,a>99:A,bhl}
lm{a<2364:R,a>3061:A,a<2725:A,A}
mml{s<927:A,A}
pn{a<66:R,s>3144:R,x>3414:A,R}
grp{a>988:gfr,knm}
rbq{a<1659:R,m>2412:R,a>1755:R,R}
bs{x<455:R,m<2320:R,a<1359:A,R}
kh{m<354:A,pcg}
xc{a<915:A,x>481:A,m>1053:R,R}
zm{x<921:A,x<994:A,a<1883:R,A}
xmd{a<1534:vg,m>2299:rpl,xs}
dpj{a>155:A,s<3370:lf,s<3618:nxx,R}
jzt{x<2429:R,R}
bgg{a<224:A,m<2159:R,A}
gcg{x<467:A,drb}
smm{s<3438:rdk,m<1941:A,a<2090:A,shf}
fds{m<817:A,A}
dts{m<2173:A,x<2824:R,A}
nch{a<862:R,A}
pkx{x>1081:A,R}
kl{a>3653:A,A}
zmn{a<3055:A,A}
vpm{s>2871:gb,a>302:A,x<1117:qh,A}
zjh{s<681:R,s>1108:A,a>2949:R,A}
csf{x<2624:A,R}
fqm{a<2452:A,R}
fp{m<2297:R,x<1623:A,m<2552:tb,lgz}
qjs{x>1439:A,m>195:R,A}
tcp{a>3014:dbd,a<2122:xr,s>395:R,qpp}
qlq{m<2703:A,s<1679:R,a<3363:R,A}
qp{s>3440:bmb,s>3155:jxr,m>2536:trb,gtv}
pgt{x>2227:R,x<1942:R,m<2848:A,R}
ks{a>2805:A,a>2754:A,A}
gzs{a<1925:mg,A}
nn{m<3249:R,x<2147:R,m>3368:A,R}
hv{a<2412:fkv,hpg}
sf{s<3613:A,s<3794:R,a>2553:A,R}
dx{a>2210:kvd,lz}
rt{x<702:sq,a<2430:dp,jd}
tdx{a>951:R,R}
rdk{m>1912:R,s<3160:A,s<3318:A,R}
xd{a>1917:A,a<1756:cgg,s<1553:R,R}
xgn{x<2590:A,A}
mm{m>2703:R,gqb}
kg{x>575:A,s<2499:A,s>2683:R,R}
ml{a>1963:R,R}
nt{x<1093:bfn,dr}
kxz{s<2359:qxx,bkc}
qqz{m<1860:A,a<3554:A,s<937:R,R}
zc{s>2080:R,m<2808:qlq,s<1761:bl,lb}
tvf{s>2113:A,a<3780:R,R}
dhh{a<2922:A,a>3078:A,A}
gtv{a>2013:A,m>2316:R,s<3022:R,mc}
xh{x>2824:R,A}
mq{s>2361:thg,sgb}
lf{s>3091:R,A}
lz{a>1814:spd,x<958:jj,kkj}
th{s<215:A,x<3295:R,m>3355:A,A}
xtp{s<2152:A,R}
gqm{m<1316:R,R}
dr{x>2043:A,m>2796:A,s>782:A,R}
dbf{x<616:A,s<2980:R,A}
hhh{x>2202:jzt,R}
sq{a>2651:qcp,s>2270:kx,a<2082:bqv,sh}
sh{x<322:lnq,txg}
tc{x>1958:hr,rkl}
hkm{m<2693:A,m>2768:kv,R}
vjh{m>3433:nqx,a>372:qxl,s>2941:dpj,zl}
nb{m>1186:A,m<1106:R,R}
ttg{a<1907:R,R}
rzt{x>1028:R,x<934:A,s<1494:R,A}
gcj{m>493:A,A}
mj{m>759:xc,a<926:A,A}
rp{x>1430:llz,a>3405:R,s>253:cr,xzt}
ngj{a<1849:jkc,vcl}
ddk{x>1064:A,a>860:A,s>1170:A,R}
fs{m<3638:zv,m>3842:R,s>1558:fh,xg}
rpl{s>314:szc,a<2372:pkk,s<158:gsj,rp}
jpb{s<2898:zh,pdq}
ngr{a>1086:A,m<1535:A,R}
lsm{m>2766:R,A}
vt{a>2734:R,sf}
kfg{m<3340:jnx,s>2974:jhg,jpx}
hbg{a>39:pn,x>3436:rzv,A}
pjq{a<3306:R,a<3496:R,A}
fv{a<2261:ltf,qck}
hh{x>2281:R,s<2324:R,A}
pv{m<3610:kfg,dnd}
kfm{x<1892:R,A}
gck{x<1059:zm,s<1802:tnr,R}
knz{s>1104:xlt,x>2522:hkm,m<2690:dnp,nt}
zb{a<1282:A,gxn}
qn{a<2568:R,a>3362:A,A}
fhz{m<2469:R,x<1017:A,R}
hl{s<2004:A,m<2517:A,s<2219:gn,R}
hr{x<2819:A,x<3556:R,R}
hs{m>1138:A,m>1099:R,x<1102:A,R}
gm{s>1235:A,x>871:A,R}
sm{x<1462:xmf,m>2947:xjm,sr}
sgn{a>785:A,hgs}
ll{s>2311:A,x<941:A,s>1709:A,A}
gr{m<3579:R,m<3743:R,bcr}
hgz{m>1825:R,A}
vcl{x>1884:A,R}
bp{s<2265:R,a<2991:R,m<931:R,R}
vtg{a>589:A,s>611:A,x<1171:R,A}
drb{x>499:R,x>483:A,R}
kkj{s>2996:prz,s<2115:A,s<2591:rbq,R}
mf{m>1621:xdf,m>1509:R,zpx}
qx{m>2493:A,s<67:R,s>99:R,A}
xj{x>1073:sd,a<2088:ssz,a<2874:mv,fx}
nl{x>1901:vt,dhh}
qxx{s>1740:gk,a<2502:xd,fs}
lh{x>2845:R,x<2721:R,s<1013:R,R}
gn{a<2827:A,x<888:R,R}
ssr{x<1329:hcd,a<3869:bk,s>2378:R,fcm}
djv{a<669:R,s>2282:A,A}
vg{m>2419:xbq,xxp}
hxz{s>1149:R,s<970:R,R}
pcg{m<563:A,R}
pfz{s>3593:A,s>3372:R,a<1883:A,R}
spt{s>1816:ffb,R}
js{a>3135:R,a>2472:A,R}
qck{m<1565:R,R}
spd{m<2263:R,x>787:A,fbv}
cnh{m<106:vrl,R}
gmg{m<76:A,R}
ltf{a<1339:R,A}
ssz{x<912:R,s>2404:R,A}
hx{a>2776:A,s>3120:R,a>2575:R,A}
ps{m<2121:R,m>2614:lsm,R}
vzl{s>2769:R,A}
qbq{x<1041:R,A}
zn{x>2869:xtp,s>2386:qv,x>2164:vm,gq}
xpt{a<1592:hkg,jrs}
ckf{x<2913:A,s<3461:A,qd}
vmr{s<538:R,A}
xjl{s<1931:R,R}
sd{s<2558:R,m>674:R,R}
gzx{s>3734:R,a>2118:A,x<2007:R,R}
vxb{a>1179:A,x>2948:R,R}
grj{a<986:A,x<3665:A,R}
hz{m<2410:R,a<1473:R,m<2553:A,R}
xfz{m<664:R,A}
qjt{a>2336:A,R}
skl{m<1447:tbm,x<2563:kc,x<3380:rvj,xmk}
rpt{s>3373:kk,a>3465:pmz,qs}
tbm{x>1640:gl,x>940:lc,x>555:dh,ppp}
rkl{s>758:A,s>703:A,A}
kt{a<1525:sjf,m<165:cnh,a<3002:kmt,glm}
rxb{a>1274:A,s>217:R,x<2590:R,R}
bmb{a<1887:qmq,m>2527:gzx,nxz}
lj{m>1658:A,x<1304:R,a<2946:R,R}
dz{m>958:skl,kqg}
cgg{m>3549:A,a<1669:R,a>1715:A,A}
bv{a<517:R,A}
pzp{m>1796:A,s>337:R,A}
kjp{x>2667:R,a>2007:jq,x<2619:tf,R}
mmn{a<962:bfg,s<3092:rd,a<1071:vhd,kkk}
qpj{m<474:jx,vrb}
nbd{s<2643:fdz,x<2979:qc,a>109:dg,hbg}
gv{m<1621:A,a<2391:R,s<526:R,A}
bqv{x<397:A,s>1928:R,s>1735:hfm,vb}
bxn{s>3496:A,R}
rd{m<2982:R,a>1048:R,x>688:rs,A}
xs{x>1594:hnv,m>2097:tcp,spr}
hd{x<2832:R,a<1703:A,A}
sgb{x<2756:R,m<3350:R,a>989:A,R}
ct{s>268:A,m<1145:R,R}
gfn{x>2445:R,m>3468:A,R}
jrs{m>1415:R,s<2989:R,csf}
mx{a<418:A,a<544:A,R}
sz{x<3171:R,A}
xp{x>96:kp,br}
bz{m<2623:zn,x>2581:npm,s<2334:qz,pp}
hsm{a<809:A,m>2928:R,s>2549:R,R}
vm{x<2604:R,s>1820:A,R}
jnx{a<2355:R,ll}
ffb{a<3297:R,x>1272:R,m>2403:A,A}
dkm{x>1784:A,a<3116:R,A}
pjn{s>2661:A,A}
vrb{x>458:rjt,a<2892:bj,xcb}
ktc{s<1670:R,zs}
cq{m<1671:A,a<1916:A,A}
tt{s<2036:A,A}
hnv{s<227:A,R}
djh{m>3475:R,R}
bx{x>3185:R,m<3404:A,gfn}
bh{m>3890:R,a>2742:R,s<2390:R,R}
jk{s<2685:nv,a>577:mj,m>532:vjr,gcg}
zdz{m<2908:R,s<3336:A,R}
bl{a<3471:R,m>2937:A,a<3715:R,A}
gxl{s>3244:jcc,m<2779:rfj,npx}
gq{a<2394:A,s<2052:R,x<1953:dkm,R}
cqv{m<3827:jm,hlq}
vrl{x<2650:R,x<3541:A,A}
glm{x>1916:A,a>3599:nhd,ggg}
zlm{x>195:A,R}
md{x>1309:zdz,ttg}
vpp{x<3122:R,R}
kv{m>2823:R,x<3299:A,R}
fcm{s<1752:R,m<2347:A,A}
hmr{x<549:bh,a>2572:R,R}
nm{x>2081:R,ljm}
shf{x>2947:A,s>3634:A,x>1974:A,A}
pt{x>2491:R,x<2085:A,s<3066:mnn,A}
xdf{a<861:A,R}
dbx{x<1876:A,a<1669:R,R}
dp{s>2341:md,s>2015:gzs,s<1618:pqp,gck}
kgn{x<1215:R,A}
lgz{a>1196:A,R}
in{s>1392:fn,vv}
qln{s>3608:R,m>2588:R,a<3582:A,A}
dvf{x>592:A,m<2183:R,x>320:A,A}
dh{a>1930:A,x>739:A,a<1115:rbz,R}
kvg{x<2234:R,A}
qtn{a>1139:A,s<1193:A,A}
pc{a>1879:cm,nch}
fcr{m>2273:rdr,zqz}
qcd{a<2274:A,s>2074:R,R}
bcr{x<3112:A,s>600:R,A}
nv{a<903:cx,s<2221:qnm,a>1077:fds,A}
lkf{x<1086:A,R}
qnm{m<806:R,s<1909:R,m<985:R,R}
gb{a<426:A,x<1187:R,s>3618:R,R}
sxt{s>2383:zt,m>218:nf,x<678:gmg,zmn}
tsc{a<2880:bxn,s>3543:bhg,A}
npx{x<551:R,m<3518:mjv,rkd}
fbv{x>325:R,m>2480:R,x>134:A,A}
zz{a>2965:A,x>2929:R,x<2695:A,A}
np{a>3482:A,x<3481:A,A}
sbs{s<259:A,x<1379:A,R}
bn{m>3500:R,s<1981:A,R}
rxv{x>2424:gml,a>3161:rpt,a<2452:qp,nl}
rrz{m>1386:A,A}
bpn{s<3253:A,m<2833:A,A}
hvk{s>893:qtn,s>718:fp,ps}
xzt{s<214:A,a<2852:A,a<3195:A,A}
gt{m<2278:dvf,x<488:zlm,s>2549:A,tvf}
nk{m>2791:kxp,bbf}
sx{x>429:A,A}
hvr{m>1538:vmr,x>3824:zjh,R}
vd{m<1786:A,A}
hgs{m<3070:R,R}
vlk{a<1234:cl,bmn}
lnq{a<2399:A,A}
xbq{s>361:zmh,x>1853:A,A}
jcc{m<2771:bm,s<3604:ssm,a<1271:A,R}
jpx{m>3485:A,x>558:phc,m>3423:tt,A}
hfq{x<2572:zbr,xt}
bkc{m>3587:xrm,bx}
sn{m>847:cqp,mvz}
nq{x<785:ms,vd}
lt{a>3074:R,hx}
gl{s<547:nb,m>1232:gqm,lm}
vk{s>2248:R,x>1018:R,x>875:A,R}
nh{s<2219:A,R}
rkd{a>1307:R,m>3778:R,s>3005:R,A}
pl{m>532:nx,ckf}
cvc{m<2242:llj,s>2486:lx,spt}
xlt{x<1412:gm,R}
tlh{s<680:R,m>1528:R,R}
xcb{m>816:R,m<635:R,R}
rf{a<3404:R,a<3430:A,s>3097:A,A}
npm{a>2858:zc,m<2822:gvj,vpp}
vb{x>516:R,a<1732:R,a<1881:A,A}
rbz{m>1164:R,m>1031:R,R}
dpg{m<2841:R,A}
djj{x<2363:A,x<2667:A,R}
jg{m>3682:R,x<1403:R,s<1039:A,R}
jkc{a<1057:kvg,x<1649:brh,R}
bm{x>529:A,s>3739:R,A}
mvz{a>2875:A,x>2783:R,a<2598:mgm,vp}
szc{s<471:zx,R}
jb{x<659:R,x>709:R,x>676:dt,R}
mb{a>173:R,a<102:R,R}
qcp{m>2929:gkj,m>2762:dpg,x>412:mk,R}
pld{m<1537:A,s<834:gv,m>1601:hxz,R}
pzt{m>2415:pkc,m<2185:A,x<753:bs,A}
jq{a<3196:A,s<241:A,A}
hcd{s<2451:R,x>1173:A,A}
nj{x<2302:R,x<2582:R,a<2520:A,R}
fpt{a<3130:R,A}
cbt{s>2382:R,s>2035:A,x<3432:A,A}
tjp{a>2112:tlh,m>1498:ngr,a>994:R,vtg}
xjm{a<583:vjh,m<3559:fhm,cqv}
pg{s<2659:R,m<3065:R,s<3521:A,A}
rs{m<3568:R,s<2122:R,R}
tdg{a>716:R,s>1859:R,m<2373:R,R}
vjr{s<3323:A,m<887:R,s>3746:R,R}
qz{a<3160:pgt,nm}
tk{x>369:R,x<184:A,x<290:A,R}
qmq{m<2599:R,x<2042:R,a<1683:A,A}
tv{x<344:A,x<362:R,A}
pbm{x>798:R,s<2731:xq,A}
jj{m>2323:tk,s>2354:vx,x<498:R,R}
qgp{s>1012:A,R}
ph{x<1029:R,R}
hp{s>3534:R,R}
xrm{s<3121:cp,x<2635:R,s>3518:R,R}
xmf{a<675:zkb,a<1132:mmn,s<2787:gj,gxl}
jtd{a<2647:nml,lkf}
dnd{m<3828:dcc,hmr}
zj{a<1710:jb,m>522:pgn,s>3129:tsc,sxt}
cz{s>3009:jc,zzv}
hck{s<2868:jzg,m<2279:px,x<1200:gp,A}
fdl{m<1066:qbq,hs}
qs{a<3302:R,x>1926:R,x>1732:rf,cxv}
ggg{s<517:A,R}
qr{a>3785:ssr,a<3690:dfv,hck}
tjf{m>3817:A,R}
xmk{a<1412:mf,x<3641:pld,m<1591:hvr,pb}
kp{s>2187:R,x>165:A,A}
fg{x<399:csz,x>551:zj,a<1392:jk,qpj}
thg{m<3389:R,a>1107:R,R}
zqz{x>596:A,x>213:R,R}
qc{x<2322:A,mb}
vv{m<1712:dz,tl}
pbv{m<2080:mhd,s<878:tc,plt}
px{a<3748:A,A}
jzg{a>3732:R,A}
tlp{x<3026:R,a>2164:R,m>353:A,R}
xzl{s>159:R,x<3229:R,x>3323:R,R}
zmh{s>488:A,x<1954:R,A}
tf{s>209:R,s<81:R,R}
vq{m<1053:R,a<2219:vll,A}
glz{m<2247:A,x>725:R,m<2273:R,R}
zkj{m<2706:R,s<3737:A,s>3825:R,A}
nf{m<397:R,s>1752:R,s>1617:A,A}
gfk{m>3145:pv,m>2600:rt,a>2976:gcp,dx}
jhg{s>3608:djh,R}
hlq{x>2998:grj,R}
dv{s<2926:R,s<3607:A,x>402:dq,fpt}
fh{m>3713:A,m<3664:A,s<1671:A,R}
zzb{a<161:A,A}
pkc{x>535:R,s<2008:A,a<1368:R,A}
dg{m>2360:A,bgg}
cx{s>2101:A,x>475:A,s<1778:R,R}
zss{a>2883:R,s<2474:R,A}
nx{s>3208:vxm,s>3008:tdx,R}
gh{s>107:A,m<2657:R,A}
qrh{x>1346:A,m<2388:R,m<2525:R,A}
zv{x>3110:R,R}
jm{a>1039:A,s<2431:R,A}
kj{m>2931:nh,vk}
jd{s>2473:lt,s<2087:ktc,kj}
mhd{a<3200:R,x<2076:R,qqz}
zzv{m>1041:A,A}
krh{s>1661:xjl,m<446:R,rzt}
tsj{x<132:R,m>834:nc,zss}
jzz{x>368:R,A}
xt{a<1846:gr,s<470:th,jbz}
kxs{m>3533:R,a>1643:A,R}
pvv{s>3049:A,a>280:R,m<2872:A,bn}
zt{m>312:A,R}
prz{a>1630:R,A}
dcc{s<2488:qn,A}
ppp{s>555:qgp,ct}
sgl{x<1049:kxs,m>3295:dbx,ml}
xrs{a<3128:R,R}
qd{s<3697:A,s>3883:A,m<256:A,R}
mg{a>1779:A,A}
kvd{s>2370:mkz,a<2669:lvz,m<2375:ks,hl}
gp{s>3412:A,m>2453:R,s<3190:A,A}
gs{m<3214:hnp,a>1327:R,m<3478:R,R}
dq{m<2294:A,a<3133:R,s>3809:R,R}
fhm{m>3214:mq,a<1065:sgn,m<3095:mkg,nzh}
kqg{m<471:kt,ngj}
gvj{x>3475:dkt,m<2753:A,kq}
bbm{a<2651:R,x<1934:R,a<2930:A,A}
sr{a>523:grp,a<289:nbd,hq}
zx{x>1522:R,s<413:R,x>551:R,R}
rx{a>2719:R,a<2394:A,x>892:R,A}
nsj{a<2290:gqp,lj}
ht{m>1276:kqs,x>1383:vr,x<809:fg,jpb}
rfj{a>1363:hz,x<924:jzz,x<1249:rvd,gjv}
rdr{a>3396:R,x<490:A,s>1707:A,A}
llz{m<2526:A,a>2958:A,A}
vp{s<2776:R,m>438:A,R}
bxs{m>3075:kxz,s>2929:rxv,bz}
zh{s<2067:krh,m>838:vq,m>452:xj,qg}
mv{s<2553:R,a>2583:A,R}
lq{s<3384:A,s<3723:A,a<502:R,A}
hk{a<2548:pfz,s>3580:lms,qf}
fl{x>561:A,a<1018:R,A}
qxl{a>469:R,xh}
bfn{x<471:R,a>2998:R,s>903:A,A}
htd{m<2745:A,A}
lms{s<3778:R,A}
mjv{x<1153:A,A}
nqx{x>2835:cbt,a<271:zzb,a<391:djj,R}
dt{s<2326:A,x<694:R,R}
spr{m>1944:A,a>3045:pzp,x>1013:sbs,hgz}
jx{s>2889:R,m<279:qcd,x>487:A,sx}
trb{a<1977:R,a>2166:A,A}
zs{a>3142:A,x<1091:R,R}
vr{a>2273:sn,m>843:cz,s>2681:pl,vlk}
gsj{x<2446:qx,s>79:gh,a<3044:A,np}
sc{m>2483:A,R}
nc{a<2727:A,s<2752:R,m<1032:A,A}
pmz{x>2124:A,a>3726:kfm,A}
rzv{m>2612:A,a>17:A,A}
pkk{m<2591:sc,R}
qv{m>2307:R,nj}
mkz{m>2298:rx,m<2213:ph,a<2681:R,glz}
txg{s>1691:R,A}
kxp{x<2013:A,R}
jc{m<1072:A,a<1090:lq,s<3550:hd,R}
zpx{a>639:R,a>349:R,x<3587:R,A}
cm{m>1760:R,R}
zqv{x<1298:A,a<689:A,a<1166:R,R}
bj{x>424:R,s<2808:A,a<2043:A,A}
kmt{x>2294:tlp,s>566:R,x>1268:A,A}
km{s<2922:A,a>3666:R,a>3644:R,A}
hnp{x>507:R,x>187:A,R}
ctf{m<1863:A,x<1658:A,A}
lb{m>2935:A,s>1913:R,s>1845:R,R}
zqt{a>3510:gt,a<3321:dv,s>2328:dtx,fcr}
zbr{s<567:sgl,lrf}
fdz{x<2671:rh,a>121:R,A}
nhd{a<3761:A,s>849:R,a<3857:R,A}
qpp{a>2654:A,m<2211:R,A}
bmn{x<3088:R,a<1847:A,gcj}
fkv{m>1512:A,x<3170:R,x>3258:A,A}
sv{x>2547:R,R}
dkt{x>3767:R,s<2076:R,s<2423:A,A}
dbd{x<944:R,x<1326:A,A}
xg{a<3113:A,m>3707:A,s<1469:A,R}
phc{s<1991:R,x>1172:R,x<840:A,R}
phf{s>1933:kg,s<1674:R,x>508:A,R}
pqp{m>2786:A,s>1514:R,R}
gj{m<2941:pzt,m>3643:phf,gs}
rvd{a<1252:R,s>3015:R,R}
knm{s<2302:tdg,m<2584:jlk,htd}
clh{x>2113:R,a>2983:A,fqm}
ssm{s>3366:A,A}
zzs{s<2716:pz,x<1486:nq,m<1843:pc,smm}
nxx{a<86:R,m<3157:R,s>3477:R,A}
csz{x>235:df,a>2090:tsj,s<2596:xp,zb}
lvz{x<566:R,m<2338:hf,fhz}
kqc{m>3000:A,a<1259:R,x>2607:A,A}
pdq{s>3502:jtd,m>734:fdl,kh}
nzh{s<2592:R,s>3085:R,R}
kq{x<3010:R,a>2121:A,s<2261:A,A}
jxr{m<2447:A,a<1841:A,a<2096:A,bpn}
plt{a>3255:kl,bbm}
hkg{m>1491:R,djv}
xq{a<399:A,x<652:R,R}
rjt{a<3053:A,a>3622:R,R}
cxv{x>1677:A,R}
hf{s<1982:R,x<1260:R,x>1414:R,A}
mc{a<1706:R,x<2072:A,A}
bbf{m<2692:R,a<2801:R,R}
bfg{x<492:A,hsm}
vc{a>1052:R,s<3558:R,A}
ff{x<3072:R,s<333:xzl,x<3262:sz,R}
gjv{m<2383:A,A}
df{a<2151:xfz,tv}
qg{m>298:sj,pkx}
xxp{m<2001:ctf,x<1555:R,a<853:A,rxb}
gkj{a<3512:R,R}
zf{a<2136:hvk,m<2363:pbv,knz}

{x=270,m=803,a=872,s=703}
{x=168,m=751,a=718,s=82}
{x=153,m=830,a=1600,s=1613}
{x=335,m=2651,a=45,s=535}
{x=1744,m=2707,a=2054,s=421}
{x=792,m=2226,a=694,s=2812}
{x=2839,m=2056,a=3184,s=1188}
{x=136,m=2452,a=76,s=610}
{x=917,m=1348,a=184,s=1413}
{x=1109,m=1790,a=648,s=1026}
{x=1397,m=450,a=1618,s=714}
{x=486,m=1721,a=1685,s=718}
{x=2719,m=106,a=910,s=447}
{x=623,m=1151,a=772,s=1053}
{x=977,m=493,a=1463,s=2396}
{x=499,m=270,a=3225,s=760}
{x=70,m=2583,a=2786,s=300}
{x=39,m=2807,a=3758,s=133}
{x=1875,m=2332,a=869,s=2285}
{x=2498,m=1034,a=2958,s=2313}
{x=412,m=596,a=1271,s=295}
{x=59,m=2215,a=3630,s=331}
{x=1357,m=240,a=630,s=15}
{x=48,m=1507,a=269,s=1936}
{x=394,m=844,a=923,s=660}
{x=227,m=436,a=2767,s=792}
{x=27,m=773,a=586,s=987}
{x=574,m=40,a=166,s=99}
{x=1818,m=379,a=1740,s=908}
{x=507,m=419,a=300,s=1289}
{x=241,m=1679,a=226,s=235}
{x=98,m=2248,a=1826,s=1645}
{x=1608,m=752,a=1752,s=1596}
{x=491,m=1129,a=780,s=2579}
{x=41,m=2383,a=1346,s=336}
{x=2266,m=755,a=248,s=29}
{x=610,m=378,a=533,s=1732}
{x=1681,m=935,a=2270,s=2267}
{x=2150,m=1331,a=1113,s=3004}
{x=689,m=261,a=1010,s=1711}
{x=991,m=225,a=1468,s=2326}
{x=18,m=1705,a=1963,s=664}
{x=28,m=546,a=2929,s=92}
{x=3391,m=440,a=1644,s=2483}
{x=859,m=1340,a=508,s=25}
{x=865,m=654,a=578,s=3020}
{x=1297,m=144,a=172,s=611}
{x=691,m=1975,a=1682,s=368}
{x=5,m=3220,a=1769,s=356}
{x=1974,m=1287,a=1944,s=215}
{x=345,m=421,a=2361,s=2440}
{x=1009,m=351,a=431,s=410}
{x=749,m=836,a=40,s=79}
{x=2735,m=2444,a=3141,s=813}
{x=74,m=12,a=2040,s=3428}
{x=20,m=188,a=14,s=1207}
{x=1123,m=108,a=591,s=35}
{x=184,m=410,a=22,s=251}
{x=146,m=1425,a=833,s=1064}
{x=2551,m=1056,a=1433,s=1569}
{x=1883,m=1442,a=108,s=646}
{x=804,m=14,a=1000,s=1944}
{x=160,m=104,a=1040,s=2738}
{x=1185,m=651,a=2981,s=1563}
{x=43,m=1746,a=512,s=1247}
{x=386,m=1151,a=1189,s=1107}
{x=2118,m=2914,a=226,s=75}
{x=3542,m=3035,a=1877,s=584}
{x=120,m=1243,a=575,s=8}
{x=3828,m=1207,a=124,s=7}
{x=142,m=1824,a=2620,s=574}
{x=622,m=713,a=354,s=1178}
{x=107,m=671,a=142,s=446}
{x=230,m=581,a=1034,s=1436}
{x=622,m=521,a=440,s=2084}
{x=671,m=717,a=224,s=535}
{x=64,m=818,a=1947,s=214}
{x=74,m=1639,a=441,s=1224}
{x=625,m=1559,a=3240,s=134}
{x=1738,m=2097,a=197,s=511}
{x=884,m=2434,a=178,s=1287}
{x=1524,m=773,a=201,s=1309}
{x=99,m=24,a=3313,s=812}
{x=216,m=97,a=2561,s=182}
{x=2981,m=399,a=383,s=252}
{x=61,m=439,a=671,s=1747}
{x=309,m=3,a=8,s=2011}
{x=74,m=958,a=87,s=896}
{x=100,m=661,a=1197,s=174}
{x=391,m=284,a=2173,s=348}
{x=1477,m=1641,a=150,s=1475}
{x=1376,m=801,a=10,s=221}
{x=706,m=1658,a=415,s=2618}
{x=137,m=13,a=1319,s=264}
{x=754,m=940,a=245,s=362}
{x=1977,m=987,a=206,s=1058}
{x=1652,m=194,a=1058,s=1236}
{x=66,m=297,a=2194,s=339}
{x=1440,m=1819,a=200,s=923}
{x=221,m=35,a=2729,s=1582}
{x=145,m=503,a=160,s=2628}
{x=643,m=772,a=1129,s=634}
{x=1580,m=5,a=847,s=503}
{x=2069,m=370,a=447,s=465}
{x=2794,m=92,a=1234,s=1493}
{x=2752,m=215,a=305,s=1296}
{x=1769,m=449,a=1991,s=210}
{x=1513,m=405,a=1029,s=1594}
{x=1260,m=1937,a=327,s=959}
{x=165,m=557,a=1077,s=3128}
{x=1263,m=180,a=19,s=72}
{x=369,m=173,a=530,s=1370}
{x=331,m=639,a=567,s=263}
{x=1046,m=2303,a=32,s=461}
{x=106,m=160,a=18,s=1293}
{x=1202,m=48,a=644,s=155}
{x=1411,m=1973,a=68,s=1002}
{x=3082,m=1684,a=1314,s=2303}
{x=781,m=414,a=885,s=341}
{x=294,m=2955,a=2670,s=268}
{x=913,m=49,a=378,s=1057}
{x=67,m=1402,a=910,s=310}
{x=304,m=2341,a=214,s=1026}
{x=668,m=478,a=1233,s=363}
{x=2275,m=3714,a=12,s=57}
{x=2603,m=591,a=1357,s=1809}
{x=7,m=511,a=3472,s=1883}
{x=1305,m=2652,a=1194,s=227}
{x=308,m=2241,a=416,s=2248}
{x=83,m=3545,a=3477,s=372}
{x=2771,m=1273,a=1640,s=816}
{x=3080,m=174,a=542,s=724}
{x=209,m=70,a=534,s=210}
{x=452,m=114,a=679,s=1008}
{x=771,m=294,a=338,s=1258}
{x=1730,m=826,a=345,s=27}
{x=2901,m=1038,a=1499,s=2199}
{x=2066,m=3193,a=957,s=393}
{x=130,m=3257,a=2250,s=253}
{x=235,m=987,a=278,s=597}
{x=2465,m=1268,a=1893,s=2360}
{x=940,m=470,a=435,s=1386}
{x=958,m=392,a=79,s=18}
{x=1513,m=2440,a=1287,s=36}
{x=84,m=361,a=3217,s=28}
{x=2451,m=2374,a=57,s=1242}
{x=251,m=1008,a=1114,s=1458}
{x=2058,m=46,a=657,s=989}
{x=2398,m=463,a=1753,s=917}
{x=1181,m=2013,a=4,s=2832}
{x=1548,m=271,a=6,s=218}
{x=1934,m=240,a=410,s=954}
{x=2328,m=1860,a=1111,s=1487}
{x=2370,m=27,a=694,s=1372}
{x=2299,m=350,a=669,s=360}
{x=2010,m=2306,a=700,s=1297}
{x=349,m=2569,a=223,s=352}
{x=50,m=343,a=49,s=17}
{x=1980,m=82,a=20,s=1637}
{x=1336,m=1955,a=269,s=264}
{x=154,m=3620,a=2,s=818}
{x=623,m=3021,a=2297,s=1911}
{x=2981,m=2825,a=1290,s=69}
{x=493,m=534,a=1029,s=3961}
{x=44,m=1352,a=1311,s=1147}
{x=920,m=389,a=2045,s=1441}
{x=1166,m=930,a=1522,s=291}
{x=51,m=673,a=2995,s=496}
{x=950,m=557,a=24,s=1444}
{x=1261,m=2375,a=234,s=1565}
{x=303,m=464,a=645,s=923}
{x=2077,m=287,a=740,s=1523}
{x=1813,m=370,a=1529,s=111}
{x=861,m=2269,a=1182,s=2074}
{x=111,m=1145,a=543,s=326}
{x=504,m=468,a=2391,s=990}
{x=1701,m=1719,a=2574,s=331}
{x=1123,m=70,a=754,s=2870}
{x=6,m=1068,a=1404,s=2472}
{x=991,m=1306,a=767,s=2885}
{x=50,m=980,a=947,s=856}
{x=1450,m=580,a=869,s=229}
{x=684,m=486,a=1191,s=2639}
{x=100,m=1569,a=66,s=644}
{x=1756,m=138,a=1347,s=3488}
{x=1403,m=562,a=726,s=619}
{x=601,m=2128,a=43,s=953}
{x=40,m=160,a=73,s=161}
{x=556,m=2694,a=792,s=22}
{x=505,m=1755,a=2185,s=391}
{x=2545,m=3215,a=850,s=430}
{x=1256,m=153,a=112,s=1132}
{x=2016,m=2104,a=408,s=2138}
{x=238,m=1081,a=645,s=882}
{x=1735,m=620,a=52,s=34}
{x=39,m=125,a=655,s=269}
{x=233,m=1962,a=601,s=248}
{x=284,m=2418,a=468,s=17}
{x=864,m=2542,a=1040,s=399}
{x=229,m=152,a=753,s=285}`

aplenty(realInput)
aplentyTwo(realInput)
