import type { StoryFragment, Chapter } from '../types';

export const CHAPTERS: Chapter[] = [
  {
    id: 'chapter1',
    chapterNumber: 1,
    title: '迷霧的倉鼠村',
    titleEn: 'Fog over Hamster Village',
    totalFragments: 10,
    unlockedFragments: 0,
  },
];

export const STORY_FRAGMENTS: StoryFragment[] = [
  {
    id: 'c1f1',
    chapterId: 'chapter1',
    fragmentNumber: 1,
    title: '風吹來的紙片',
    titleEn: 'Wind in the Window',
    content: `清晨的倉鼠村飄著麥香。你剛搬來不久，打開窗戶時，一張皺皺的紙片突然被風吹進屋裡。你展開它，上面只有一句話：

「不要相信任何人，他們正在找你。——P」

墨跡歪斜，看起來像是匆忙寫下。你還沒反應過來，門外突然傳來敲門聲。

來的是村裡最活潑的快遞員——奧利（Ori）。他笑嘻嘻地提著一袋藍莓乾作為見面禮，全然沒有任何異狀。

你差點把紙片拿出來問他，但最後決定把它收進口袋。

你環顧這座小村莊——一切美好、平靜、可愛，但那張紙片提醒你：你並不是隨意來到這裡的。`,
    unlocked: true,
    powerCost: 0,
  },
  {
    id: 'c1f2',
    chapterId: 'chapter1',
    fragmentNumber: 2,
    title: '早晨市場',
    titleEn: 'Morning Market',
    content: `奧利帶你逛村子，早晨市場熱鬧又溫暖，有香料、木雕、麥餅、茶葉。你遇見元氣滿滿的農夫阿姨——芽芽（Yaya）。

她送你一袋麥穗作為新住民禮物，但忽然把你拉近，用壓低的聲音說：

「晚上……別亂跑。最近有人看到奇怪的影子。」

奧利立刻跳出來反駁：「哪有啦！妳不要嚇新來的！」

兩人的拌嘴讓你忍不住笑出來，但你心裡明白：芽芽不是會隨便嚇人的類型。`,
    unlocked: false,
    powerCost: 10,
  },
  {
    id: 'c1f3',
    chapterId: 'chapter1',
    fragmentNumber: 3,
    title: '村醫的小屋',
    titleEn: "The Healer's Cabin",
    content: `你造訪村醫的小屋，遇見冷靜的醫學學徒——芯芙（Shinfu）。她替你泡草藥茶，長長的睫毛在陽光中輕輕顫動，但你發現她一直瞄向你口袋。

「你剛剛收到什麼？」

「……只是普通紙片。」

芯芙沒有戳破你，只是用非常溫柔、卻讓你背脊發涼的語氣說：

「無論是什麼……你不需要急著信任任何人。」

「包括我。」

你第一次覺得：這村子每個人都知道什麼，但沒人願意講。`,
    unlocked: false,
    powerCost: 10,
  },
  {
    id: 'c1f4',
    chapterId: 'chapter1',
    fragmentNumber: 4,
    title: '鐘錶店',
    titleEn: "Clockmaker's Shop",
    content: `你到村裡的老鐘錶店維修一只掉針的懷錶，遇見安靜寡言的鐘錶匠——洛特（Lot）。

他手法精準，店裡的所有時鐘都走得一模一樣。在你離開前，洛特突然問：

「你知道自己為什麼會被風吹到這裡嗎？」

你愣住。

洛特沒有給你解釋，只淡淡補一句：

「……看來你還不知道。」

「那就等你想起來吧。」

你完全不知道他在說什麼，也不知道他為什麼這樣肯定。`,
    unlocked: false,
    powerCost: 10,
  },
  {
    id: 'c1f5',
    chapterId: 'chapter1',
    fragmentNumber: 5,
    title: '餐廳的警告',
    titleEn: "Monty's Warning",
    content: `你走進餐廳，餐廳老闆蒙提（Monty）為你端上暖呼呼的豆湯。他看起來嚴肅，但你能感覺到他其實很照顧新人。

吃到一半，他忽然沉聲說：

「最近晚上……不要靠近森林。」

「因為……我們抓不到牠。」

你心頭一跳：「牠？」

蒙提看向窗外，像是確認沒有人偷聽：

「那東西不是這村子的。」

你第一次感到真正的不安。`,
    unlocked: false,
    powerCost: 10,
  },
  {
    id: 'c1f6',
    chapterId: 'chapter1',
    fragmentNumber: 6,
    title: '夜裡的影子',
    titleEn: 'Shadow in the Yard',
    content: `那天晚上，你睡不著，打開窗想透透氣。就在那時，你看到一個「影子」滑過草地。

它不像動物，更像是……在搜索、尋找什麼。

你立刻躲回窗後，緊緊捂住嘴。

那影子停在你的窗前數秒，然後往森林方向消失。你腦中浮現紙片上的字：

「他們正在找你。」`,
    unlocked: false,
    powerCost: 10,
  },
  {
    id: 'c1f7',
    chapterId: 'chapter1',
    fragmentNumber: 7,
    title: '奧利的驚慌',
    titleEn: "Ori's Panic",
    content: `隔天一早，奧利用力敲你的門。

他滿臉驚慌，眼睛紅紅的：「你有看到我的快遞包裹嗎？我昨晚……掉了！」

你注意到他身上的衣服竟然破損，像是被什麼抓過。

「裡面有很重要的東西……拜託，我不能弄丟！」

他的樣子不像在說謊。你們一起前往森林邊緣尋找。`,
    unlocked: false,
    powerCost: 10,
  },
  {
    id: 'c1f8',
    chapterId: 'chapter1',
    fragmentNumber: 8,
    title: '奇怪的地圖',
    titleEn: 'The Strange Map',
    content: `你們在樹根間看到一個被撕開的包裹。奧利急忙打開，裡面是……一張奇怪的地圖。

但那不是村子的地圖。它看起來更像：把倉鼠村的每個區域標上「編號」、附上箭頭與備註的……捕捉計畫圖。

你抬頭看奧利，他的臉色蒼白。

「拜託……不要把這張給其他人看。」

「我……我不能說是怎麼得到的。」

奧利第一次不像平常那麼開朗。`,
    unlocked: false,
    powerCost: 10,
  },
  {
    id: 'c1f9',
    chapterId: 'chapter1',
    fragmentNumber: 9,
    title: '真相的一角',
    titleEn: 'A Corner of Truth',
    content: `你把地圖帶去找芯芙。

她只看一眼，整個人就僵住了。

「……這不是地圖。」

「這是【抓捕規劃圖】。」

你瞳孔震動。

「在你來之前，已經有村民被追捕。而你……似乎是他們想要的『最後一塊拼圖』。」

你想追問，但芯芙輕聲阻止：

「現在不能說。說得太早……會讓你更危險。」`,
    unlocked: false,
    powerCost: 10,
  },
  {
    id: 'c1f10',
    chapterId: 'chapter1',
    fragmentNumber: 10,
    title: '藍耳隊的召喚',
    titleEn: "Blue Ear's Call",
    content: `午夜，你躺在床上心緒不寧。

忽然——窗外出現一個戴著藍色耳罩的倉鼠。

他輕聲說：

「別怕。我叫摩斯（Morse），是藍耳隊第七探員。」

你呆住。

「你以為自己是'搬家'到倉鼠村的嗎？」

「不——你是被選中的。」

「我們一直在找你。而某些人……也在找你。」

摩斯伸出手：

「如果你想知道真相……明天午夜，到森林深處的老井找我。」

說完，他消失在夜色中。

你握著紙片與地圖，心跳得像要衝出喉嚨。

倉鼠村的平靜，只是表面。真正的故事，才剛開始。`,
    unlocked: false,
    powerCost: 10,
  },
];
