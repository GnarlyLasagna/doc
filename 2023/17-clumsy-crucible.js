const testInput = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`

function clumsyCrucible(input){
input = input.split("\n")

const grid = input.map((line) => line.split("").map(Number));
/**
 * Get the location of neighbors of a cell
 * @param {number} x 
 * @param {number} y 
 */
function getNeighborsLocation(x, y) {
  var neighbors = [
    //orth
    x > 0 ? [x - 1, y, 3] : null,
    x < grid.length - 1 ? [x + 1, y, 1] : null,
    y > 0 ? [x, y - 1, 0] : null,
    y < grid[0].length - 1 ? [x, y + 1, 2] : null,
  ];
  return neighbors.filter(k => k !== null);
}


//implementing dijiikstra's algorithm
const distances = Array(grid.length).fill().map(() => Array(grid[0].length).fill(Infinity));
const queue = [];
const visited = new Set();

//x, y, lastDirection, distance since last turn, distance from start
//direction enum
//0 = up
//1 = right
//2 = down
//3 = left

const opp = [2, 3, 0, 1];

const start = [[0, 0, 1, 1, 0], [0, 0, 2, 1, 0]];
distances[0][0] = 0;
queue.push(...start);

while (queue.length > 0) {
  const [x, y, lastDirection, distance, totDist] = queue.shift();


  const id = `${x},${y},${lastDirection},${distance}`;
  if (visited.has(id)) {
    continue;
  }
  visited.add(id);

  //updare distance
  distances[x][y] = Math.min(distances[x][y], totDist);


  const neighbors = getNeighborsLocation(x, y);

  for (const [nx, ny, direction] of neighbors) {

    const distanceToNeighbor = grid[nx][ny]

    //are we going straight?
    if (lastDirection === direction) {
      //is going straight possible?
      if (distance < 3) {
        const newDistance = totDist + distanceToNeighbor;
        queue.push([nx, ny, direction, distance + 1, newDistance]);
      }
    }
    //we can't go back
    else if (direction === opp[lastDirection]) {
      continue;
    }

    else {
      //we are turning
      const newDistance = totDist + distanceToNeighbor;
      queue.push([nx, ny, direction, 1, newDistance]);
    }
  }
  //sort queue by loest totDist
  queue.sort((a, b) => a[4] - b[4]);

}

//print grid
for (const row of distances) {
  console.log(row.join(" "));
}
}




function clumsyCrucibleTwo(input){
input = input.split("\n")


const grid = input.map((line) => line.split("").map(Number));

/**
 * Get the location of neighbors of a cell
 * @param {number} x 
 * @param {number} y 
 */
function getNeighborsLocation(x, y) {
  var neighbors = [
    //orth
    x > 0 ? [x - 1, y, 3] : null,
    x < grid.length - 1 ? [x + 1, y, 1] : null,
    y > 0 ? [x, y - 1, 0] : null,
    y < grid[0].length - 1 ? [x, y + 1, 2] : null,
  ];
  return neighbors.filter(k => k !== null);
}


//implementing dijiikstra's algorithm
const distances = Array(grid.length).fill().map(() => Array(grid[0].length).fill(Infinity));
const queue = [];
const visited = new Set();

//x, y, lastDirection, distance since last turn, distance from start
//direction enum
//0 = up
//1 = right
//2 = down
//3 = left

const opp = [2, 3, 0, 1];

const start = [[0, 0, 1, 1, 0], [0, 0, 2, 1, 0]];
distances[0][0] = 0;
queue.push(...start);
while (queue.length > 0) {
  const [x, y, lastDirection, distance, totDist] = queue.shift();

  const id = `${x},${y},${lastDirection},${distance}`;
  if (visited.has(id)) {
    continue;
  }
  visited.add(id);

  //updare distance
  //is the the bottom corner?
  if (x === grid.length - 1 && y === grid[0].length - 1) {

    //only apply if the distance is greather than 3
    if (distance > 3) {
      distances[x][y] = Math.min(distances[x][y], totDist);
    } else {

      //just kill this path
      continue;
    }
  }
  else {

    distances[x][y] = Math.min(distances[x][y], totDist);
  }

  const neighbors = getNeighborsLocation(x, y);

  const toAdd = []
  for (const [nx, ny, direction] of neighbors) {

    const distanceToNeighbor = grid[nx][ny]

    if (distance < 4) {
      if (lastDirection === direction) {
        const newDistance = totDist + distanceToNeighbor;
        toAdd.push([nx, ny, direction, distance + 1, newDistance]);
      }
      continue;
    }

    //are we going straight?
    if (lastDirection === direction) {
      //is going straight possible?
      if (distance < 10) {
        const newDistance = totDist + distanceToNeighbor;
        toAdd.push([nx, ny, direction, distance + 1, newDistance]);
      }
    }

    //we can't go back
    else if (direction === opp[lastDirection]) {
      continue;
    }

    else {
      //we are turning
      const newDistance = totDist + distanceToNeighbor;
      toAdd.push([nx, ny, direction, 1, newDistance]);

    }
  }

  //assume queue is already sorted low->high totDist

  //sort toAdd
  toAdd.sort((a, b) => a[4] - b[4]);

  //insert toAdd into queue
  let pointer = 0;
  for (let i = 0; i < toAdd.length; i++) {
    //first for first value greater than toAdd[i]
    while (pointer < queue.length && queue[pointer][4] < toAdd[i][4]) {
      pointer++;
    }
    queue.splice(pointer, 0, toAdd[i]);
  }

}


console.log(distances[grid.length - 1][grid[0].length - 1]);
}

clumsyCrucible(testInput)
clumsyCrucibleTwo(testInput)

const realInput = `141143331331125312452563142426366621353572555256671627225744742742236741263264311753517121342676551626225135336446225213136131342235135352213
125131545153451424354451126151531244344576574164427531376615366376442152142715176154761133717722235123453216622563345315521332211441124144311
513312224113453413115535642562341257537342414345756654373734172534332577645136133616645323136137116332572767422116625521333464544434511442435
352452433242363226432623552224623457631255247142267744564277635523734473661615233736411247673423452156634273664151263164543214112462325232345
234455521125466622253443252262426241144675617436356171113266211662361415574172117662745612775322555731333553532645626615645142544142135535253
324241535663455552351645631651213772442376534172467547644251115522215767627511477273462515515123637231157611275445645541232535146423221224112
525512242363625644424146442217251352454472111145434277563714414763134223113752573171133654615623745154457661311661316531662331511515656514125
235322362445554466311634545671645623313434142217257551157115484782476282564846462611132272316356474255766431533261262512525142264366163244124
211535266364464144551324432673363261317342367453461475334473725543588632684842285447726335417652664115216326612655376131314362234245416364144
352233635411363331146155675516457674656541757363743756487868462668458324527553672455362256466757263236451442536133564111254243331535521422134
111332556624453156632364676333316643454475654744666283765278547638352227265886268557826454833715246411221446527361356312146262635163165416255
145241252161111413344453563533173665721444311752867823686434843733574375265766233723288755752267372737652677446532715342623545424536616456112
136632561162433625532422156462742554151621147367673783383857325456625528376368483523838646555343262623134511226657326513226346236145166616412
512552656151665436172441125637542523115276853738836467662783672244876664627647328858275835535447775275445112153175721721764534545444156224341
166226556462631125515537234615573554125134623242658734665465236657372786258347764478337827345654462863832724343166427134741751522321661356665
114311316116264227333275714654556456226534424723536762285888385748856478334862548828347573427647575324571231622235117454317516644224431664155
416615113242552525336325717227175562583445448565648335356347388684465677626474284242827228566828882443228576317674364354243661342513351546216
336511234331342331266431213575467365767876775548668652685654767626764282253362625423375367477247362624867866646172522123545776556625262133235
165442466643127621127166354414643365545358626587568433823442544525687243286628875263727856682362536773566734536643712564744166431262355155624
452663212524115352134442316525444526356676444672528823244482275287376326245663558856543642636374562883644446454612432345361524472116642345625
465252142644326227733634346474727465374843724644544267473573567665553699835836795836252384285734483654673742537354635466655537376744536532556
635344614224645621741535445464756574473227335448355564687887738968885696833845558356745722426384843382862223435627172263136527542422552446555
523321161331554516317361523427682478542622637337764263669734586547796448334569675545969682744757874378864652782542434345733155632162122414335
225262554342643663675557635228462372758782548845488239757596378899536868444745348598987437554373274285754256683747642322676747316113263233342
262416621451362162621413532735234526853265277745787598763958935897487943456746876544733873973867282725668473832225773261175315642464162253545
644236523734372437717255764274337365643378536723954785543663999755633579676339454843647696733435482348642564632365466215357214764631611426416
221123624323136525737745123247422683786866567387757976984799469686356559497849843699636477958763648676544725225745352443267675314122465441561
443662365262735662143322557342752357822347783366898493448576976465385663847669787787955736599969636727223536874758482275136445324771746245355
361521434267373615631478836427786456626652936999497885696735888359935446894749484898894658638456595974582374747638667772732432636354173331131
416222227516275264626652337235262584745555534488465383883497639639849946789983666867967333937998979734888683386672578845232377713275734544636
346142151472441423274433643578487822735689895857965685649585656936595593987958584668696667338999583934948847376647573662833746316773747325431
251347272525526132742323884563564858524457864733939654936354696493658498733334548879494886336867583467445566658668744727428722545422767234533
444342446565422326537462266385857246898675887948996448433863847847566793386886878784539844346586595476334682354828776862565637767652226255562
665557427457273554675353788684645228783745983559868967694463643964965664854797559779564934493498733936644575638647238377685265122313554517716
652463344726144167675667545747785636564565756878878846945884474744655969565659766577743499535643487946648475376425384748566374576352241652236
354533531347374736553632782878455595676785843934597693488679966978789644447759654445768338788663937963897663326265824647767726626733574611273
261215736734133636854762376835467965355365568569794656965559585595959657888944785777759753356579969777986997465768673828874863545452146676722
215621371447623546624776257338824748735689458586433876884986767657846995975749599677666575587347453773767638465467654483627224435513135244757
376245753224573757642824372234359654476565586873556896875974945455988964677687475984849596475844663468487979337566837576434355727637627641413
144363752413134226424588432358375836887474547795964486584588698759777978775947459466677974796497777978379886778535855437677368623775364343471
741537726626353483776275254463334945464849898839865565495664484787994745966577997865485566845763534886959887834875653328867486382244735221261
751363172312465672242434824765895456594768666398755464458689979478949968474559846945699965685676677878569663975975686856445776334577326112246
117134645656683853368562788576688668543385566895758675877687847998897487994869745869685676544949598336784463634986738234534786278341455157614
757125237663655433723545656777547338558433776667745895484698547448585886484589687576574595969959689763633764846484832272322246282316364524715
632257657631662225366224768466676993489884857669579564796958579668884996884588868876456578944759679689989468975774995565346543536722336542221
315157615114657735263865534984485787798687578596457549787585957745975895949778646945778995544644859597543586833344772536436234233261614512265
677527556252333335867485274996645693547587469858858748695645788856768975698669864699986899548474764758749947667966684773378678626544657211376
656712756744428255322554848945965747369998689664955574999954898868668876968857759565544866845867874778377444646464954687255572745658656256351
164366114715465426624288276364858387969797877678565897579975599756577968786768755687649797586457478678737566866967564966363367787324326427316
432177265737585326525476746578544699563466556476895688777766588976657768986785969879596645476647897684644864689698788964643227443778527575433
736633734468366562665488338336479699958558699564956956578965558896785675688988965978586658487778447947575667553669668436255852777876374744166
731167117235257667278247699693835836839586748777654465799999565879898655678779975876966898486866946544485639356784995976652883256543354521135
355452434662248675354377989785465998399746888798579495795888866688557975859968787599659555467684597568447874334495967576526768835238827764152
557176162873866834744726747769866975954876789697555845558779578895877655765556658656995575556686644497589664788384385386723727332268471712231
541337157844532556448886347655576794786878868884689776988988575589779899565858867776586855689766746799886665789346765976554526243464287251554
557275575662536455864767745495486833464455684985989898696785876979759666675579569579766676779975948487555895367738975578376525648524273146617
755574146724864582857894679635998368985976458854496957677855678965586968797568779975788969685568848688445559855895567598862722656577562315621
137475177745242577868334685363758745495744666486746976855585687585678565695595956689757967856887775846696887934383979365464264258482827171537
711277747473585567256976464749896985988844474486956588669866868889655757876766769777876989858679774696659694445598446833577263785257556533654
314437575787888436246933784638766357764459879848995766888598665959986979869998897579765789789884577875445679635984853674788873488845865237216
335576515234462624743476875478757995889677477487779786997876688967867887877967587799856677579797749758877486457373885895665728852775577717211
764251243566257866865345739456735644945748448596869656586789879986768869678866996568686675955558596565545776889654366339846442368853285213647
724135634886288722835689968593988364985886878875966589856677856869777678878866669895868899689575767677985864955743856849835273826448644414115
561567546328883623485839788457795758984856686876976986697986686996689789678967666668677596688696887994897556746774579954963364582783658251766
273644362374322472644699653574566675689955695956577758679668577768877668777986977699865656688775748985877575494657994898365274328542575877775
715725122838827874356376844533437765489974476685989976576657898788969776778977767687886868677859869477846479868987356685678462782642683471752
466152447546255363545787476836597477745675976786975756977666688867897968879867786968766788859698976476795979886349367493985652726747255442446
614427234566388467367969593655654759585678549459959967797979898996679886667866777878889568669985595964698746699966859948796266424687362664252
157733748522868538438848854766699845485947879679969995977757868769877667869677997898899779567877656894488847646464657956586766632538765733337
513737653535883672568379685565496557749678479675667676699589986989977997887699789669998976689798969466586969767838899348957882467674262425551
621115567288223562788596579995498774756586654997797556969558969878899777679897699666577566576558558897758777855857336689376667354772653257747
153357664253768778288589565689976645984847695497955895667787867898989989797676667687877776669998966568885454853984574563834276352738734873216
543172178536267266586886695495648866964459979565768958788878868967767799886697967779878695595596678955449797796589487467568622537742345446122
147555542264473432647553694393686494797559848685555799597597877666878868999767768677797957996778577587469848744653778846748763625246288454555
123177288247834548363755496585679668498697578875666797968896869979877866999869796687989958595999846778474864866995847984964873438754282627726
344633187288638827255778786853683547994798698566999565877796798678997668899899967868856995755567779747946586479693844548755326762546777443224
547237682258686478379997397976986598665589664558866996567895976769999886788869779789685859669878548457779459994346865594896746288283855544636
542374484384643765854983379747975879547688595675959878856588696666879799669886996778597685576588799974988748459895466563854432846446842436732
574232347565372562267468979337666664559788857957668559567987869779686967676989698766876569655989976594787578958944467533888327575428788535446
726626525752468557265344499587875956857595678446979577987685576968786998776997898957569856995897799547879999686446537678555272428527425554576
214135128375733886684643538937953364464897656598695569798556566678799689887797867769999985895988598756847594746854755993333443875277538575252
424441446766843856722434577398649847894887659984577688896976976879799987897796887676859667766564587658687588583894644377594842867483822527511
473123717438758523626554674787996384689759677475595869766968979857687767867887578987579596587767464794956576545458745445792466258745437435262
475251172758554268736466488755349895485778896878576999687597988755768869987968676787556957877759467994466755783849335638868734636776634571424
317317757526747245272783455443963544897986698884688859786968875687688868787657976996678896955896546558495989938666597534454855767564566764164
342373546435435623736358566884687878566874677766989578865889888989675898868676855986689597889997449558659765543996496786463858433452824612723
654673224828432734278874939444687396977957558955877587695655975885696897676675687857686595755594864889886484694643764956945227748853325331524
427143446482648345742634464668643686558746884478477777987559659897598955786897865659759797955789754565655858369457483744845436436434276616213
456217131472333583535876959665755896486655754958458499886676996567596986587597795656586985794486775879758447466435493753785784488722654545364
745552371475582582587866353389734695469578669667948749699797955876786888568857555655687956768555945978655978766983863739438747628783674276765
322714147328524782364488546897385663399767658669459574868688589886565558897896986675859998785784967994499997896757683486567773338463561535243
544476567576264682726868377749753339489758599488765467468977678668667679589857796966977545888984658647864355699767773395265248528835733463713
256713543643336365326666946858433545678558974889987887545997958588567997878777975567997474948998798974556347768363478346266573867256577634513
647244226528548337847443664393884683947564745584758588848497697579878766599889978797978599558468867465958695596878545843335772328472722675656
361636345545565653844756357499479739588699586979957599958998576596857565596755989856558686494644789889763654393639979432724563388384524117654
152341564677483247536575339675969699478555494794849685994658456966565698776888989447485785478968845474588866387376469364637272582386663572317
754226537657442585874357768734355865777834964865698554955788797458775878969675798568786994599579848863558949354834354786833426448682226527644
275615112314544825354854836368959388889488585797497678785867569477774656845554947884745965899799478589959676379895692474327234778727363735231
152326161363734525583772883857674667983897998459898568579658487976976959654658574567645759947498496467688959636384452848756765885676635335463
335772721245424457635375888654837855966376578488455755548795859586779599584447576568744568844749884799755665877747486762286455375836465525412
132663223376432723684545584559566793577493336644857997758747445764686949979757749788456899667697879894354663459878436853777274385811466535255
446323173647123565252365533228736644535833753538775565446446975654668657658548998564788674958646737374633843585537482535322775268653445755415
222512642332237662336386534877554799679373348978474998848948568969687479454858696779797659499749983893863639377744556343358622636232571765177
223247651675516338346872438244779466744888695799989788655567868559844447688956584557879794945663565475535346979848843827472382256222256263641
153552134116213657844453257234474577795847347753977887586487749597668599544748996894464849856346736397998647977334777533726567763123176173761
471222446237657664742874223355224544649369857836663577598779954566859476677885668476579586856656798674578597453467536248475658875143175732431
454447441652654243857853672568856689598477676689746455648686658554675568878886499766567566768569845697436758485636274643723277147336353271141
661441372632715133448247276743325454685768396499757893367567647745548966849875998779764967477548498849756849638558342876737538512427554675522
333367743561114255623775228577874227795599845366936776754374957857489476949946944655437594683698864336797577258382566372788872355465172144565
216235526661646377676825732752467785944498346367858877588385679447848687747678566479656485533954636984787942658842428326474761626517261452144
136132244217726775715258534423473252883779363595555347768488584668357393383868435836385455735643343634485667377237232773225124774534552143633
222226671415133321175662552256223547435346436764666995699756973555375746837543686367467776983974665496835462262236322228825254641271447376226
243533357773552125427884866345556745324393987356793647785443798695446848639364598956963757564368956594357224425553546552332533237514656662323
121526516442476562717245732746348763676464333779875778643567377747959559545783646959474373373465893396274384347528258356312522564514232761343
434631612436326767172455734527422245463585375568686873567335996676844939947648673444954869653367788778686824575585683883561275216765362116641
365553453767446426614742448852254762735648343756336889334737653385886989435677738844885994474747837775822434253877758442134172242167516331531
364252257545221256343264577575386337674454278783395773699935363844648667485773596689768443788366772373832786574834842634464317271361717525665
246514432116425655625163547363652577723475746589769967943559798355588846358863948334955485443363462727328884262553825232631252666432133535113
634423433677157365354466245754577472524832878276243786736348966693685858848467768865553938739742883287444347763247873431565745721214333666261
161156244636617535527643231476587265767364332476428433783964475365793486478957455347747939457874474252854225752583245267656736134431655664356
153314564267257372535656464278562282274627477336682756595694749639435985486573885868555562556637443728776724887537142764447343773264233114532
554411163223736154774115546153544423383267386584235336876944758749446848564936768478967645367728885466656364843785525421235737346572351631114
111535234434466453334434317456287867647466723627723686442444286383935649696947493683827732457668642386477636888251531227423434454322563442311
356545655314232744451562656532653563885554732266247224277723574472682435523346746875622653644543233238343344421126167443541334236636126236142
651141552433555146153224131654274363672254273434766243258658857638663562384447524733682848556865875882624354237174125366352413565125526323664
462221436321323357551124427513412352627438626678477555235353578386375868556624462773738455624787576442254434357255246672555754742535123125333
564456125221424144561567615142375726554844588324574752685466732786472524455452825732264442348656328484834261322615314243363246416621216521552
456643452452335222737544341372617751771762748458576433228462343582363874632887322686552247356478783272261441354324451742554622546534512216433
412614232266163122731225423272517657764768624868783748727477666343576424536363354674554755684832483288231214272577361354663174416242233324534
344163263111363523173767664576322213242511268374862867382853856743286667634273278487228875784654365751442737164136725642523713242121341146411
554255166245521112411336523273214723266356713637446433422363585457857746854266464876667656464228447765374112573325625417142625256634251442233
322356424326663355262257711443247476147521336348386755848847282843248383324784856483437637338285511424742457437371753167721266211433323123551
333233654521433544265636216444255633266236425336342423624435334385772288635838675355467652587474435265634467247532632253512446336141531145625
522422111135621263525244323642333242632754342513211352544864753262722545464457843635738628311664211263671416337613572654543333164411226426322
214545362635442452554161636774455612327576726112356572664876867824863386822472445254425447671321626325125754273676511556644652615645454625132
412522422664436623634662216722266136533544213777344443452614145684352463446663462377663345513576733371363527363472534214122656331232435423543
531555124164613353252121221341637371713433144464773143525631452756435763444624176514414335345632321244414763445474624341245346353621525121123
351352524216353523323225626613531361467327517411563727322335266713755624333273132462371614675513473544253737572246164133656225256414533543432
143215351344542135211625465365526427623462366233267765735221464755235551256641755316424161157217223667422745356456512264644625524545623531553
513341515544516325335561312636256255343213361765475676375543137142421245567516725334125662637247261766222422364645115243654361363566555555535
324434215543561612454136265642325513262414634667412434345742346512657624336577146522732374174431573171163216463135213426234324116564412341413`

clumsyCrucible(realInput)
clumsyCrucibleTwo(realInput)
