// data.js - 專門放店家資料 (已加入多媒體圖片)
const MOCK_DB = [
    { 
        id: 1, 
        name: '豐禾早午餐', 
        category: ['other'], 
        style: 'tw', 
        meals: ['breakfast','lunch'], 
        minTime: 7,
        mapUrl: 'https://maps.app.goo.gl/GcHmPE6KCfBCxt3k8',
        // 對應圖片 data_1.jpg：看得見的油脂（培根、香腸、三層肉）
        healthTip: '圖中指出培根與香腸屬於「看得見的白色脂肪」，油脂含量高，建議優先選擇瘦肉部位，避開加工肉品。',
        healthImg: 'images/data_1.png'
    },
    { 
        id: 2, 
        name: '拉亞漢堡', 
        category: ['other'], 
        style: 'tw', 
        meals: ['breakfast','lunch'], 
        minTime: 5,
        mapUrl: 'https://maps.app.goo.gl/nRKNRA66mUKFk9Re8',
        // 對應圖片 data_2.jpg：速食熱量表（炸雞堡720kcal vs 貝果334kcal）
        healthTip: '參考熱量圖鑑，炸雞堡熱量高達720大卡！想控制體態，不妨改選熱量較低的貝果或烤土司系列。',
        healthImg: 'images/data_2.png'
    },
    { 
        id: 3, 
        name: '彈芽麵', 
        category: ['noodle'], 
        style: 'tw', 
        meals: ['lunch','dinner'], 
        minTime: 8,
        mapUrl: 'https://maps.app.goo.gl/87UmWR2f15Y3YXPR8',
        // 對應圖片 data_3.png：麵條比一比（鍋燒意麵479kcal vs 烏龍麵126kcal）
        healthTip: '麵條比一比！鍋燒意麵與油麵熱量偏高，改選每100克僅126卡的烏龍麵或刀削麵，吃得更輕盈。',
        healthImg: 'images/data_3.png'
    },
    { 
        id: 4, 
        name: '甕中傳奇', 
        category: ['noodle','other'], 
        style: 'tw', 
        meals: ['lunch','dinner'], 
        minTime: 6,
        mapUrl: 'https://maps.app.goo.gl/KyLG8Ma1cCH2gZUP7',
        // 對應圖片 data_4.jpg：各種麵體熱量圖鑑（比較蕎麥麵、烏龍麵與王子麵）
        healthTip: '根據麵體熱量圖鑑，烏龍麵與蕎麥麵是低卡首選；王子麵等油炸麵體熱量較高，建議偶爾食用就好。',
        healthImg: 'images/data_4.png'
    },
    { 
        id: 5, 
        name: '雲頂阿二麻辣食堂', 
        category: ['noodle'], 
        style: 'tw', 
        meals: ['lunch','dinner'], 
        minTime: 6,
        mapUrl: 'https://maps.app.goo.gl/ZnhyV2t7XxVWDd6WA',
        // 對應圖片 data_5.jpg：吃辣對腸胃有害嗎（解釋辣椒素與腸胃蠕動）
        healthTip: '吃辣會拉肚子嗎？圖解顯示辣椒素會刺激腸道蠕動，但不會造成胃潰瘍，適量食用能促進血液循環喔。',
        healthImg: 'images/data_5.png'
    },
    { 
        id: 6, 
        name: '侯美國紅茶好吃雞', 
        category: ['rice','noodle'], 
        style: 'tw', 
        meals: ['lunch','dinner'], 
        minTime: 7,
        mapUrl: 'https://maps.app.goo.gl/JEUL47n9tZGPUesa9',
        // 對應圖片 data_6.jpg：10大動物性高蛋白食物排行榜
        healthTip: '動物性蛋白排行榜中，去皮雞胸肉、鮭魚與牛腱都是優質高蛋白來源，是增肌減脂的好夥伴！',
        healthImg: 'images/data_6.png'
    },
    { 
        id: 7, 
        name: '義ㄇㄞㄇㄞ義大利麵', 
        category: ['noodle'], 
        style: 'us', 
        meals: ['lunch','dinner'], 
        minTime: 7,
        mapUrl: 'https://maps.app.goo.gl/Wu86afLTzzoYKqpg9',
        // 對應圖片 data_7.jpg：義大利麵醬汁熱量（奶油533kcal vs 茄汁442kcal）
        healthTip: '醬汁決定熱量！圖表顯示奶油醬熱量最高(533kcal)，選擇茄汁或蒜香口味，一餐能省下近100大卡。',
        healthImg: 'images/data_7.png'
    },
    { 
        id: 8, 
        name: 'YU丼飯', 
        category: ['rice'], 
        style: 'jp', 
        meals: ['lunch','dinner'], 
        minTime: 7,
        mapUrl: 'https://maps.app.goo.gl/VNhQvsNjcqyjZ4QD9',
        // 對應圖片 data_8.jpg：丼飯熱量計算大公開（炸豬排770kcal vs 生魚片600kcal）
        healthTip: '丼飯熱量大公開！炸豬排丼高達770大卡，相比之下，選擇生魚片或海膽丼飯，熱量可大幅降低。',
        healthImg: 'images/data_8.png'
    },
    { 
        id: 9, 
        name: '石牌老牌肉圓', 
        category: ['other'], 
        style: 'tw', 
        meals: ['dinner'], 
        minTime: 7,
        mapUrl: 'https://maps.app.goo.gl/Lhf7hEtszmkKet7V7',
        // 對應圖片 data_9.jpg：藏油食物之碎肉篇（肉圓、鍋貼、小籠包）
        healthTip: '小心絞肉中的隱藏油脂！一顆肉圓熱量近500大卡，與鍋貼、小籠包同屬高脂陷阱，建議適量品嚐。',
        healthImg: 'images/data_9.png'
    },
];