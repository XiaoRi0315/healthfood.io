// =========================================================
// 注意：MOCK_DB 資料庫已移至 data.js
// 請確保 HTML 中先引入 data.js，再引入此 script.js
// =========================================================

// --- 1. 狀態變數 ---
let currentCategory = 'all';
let currentStyle = 'all';
let isAnimating = false;

// --- 2. DOM 元素 ---
const schoolInput = document.getElementById('schoolInput');
const timeInput = document.getElementById('timeInput');
const mealInput = document.getElementById('mealInput');

const initialText = document.getElementById('initialText');
const animatingText = document.getElementById('animatingText');
const finalResult = document.getElementById('finalResult');
const resultBox = document.getElementById('resultBox');

const btnFilter = document.getElementById('btnFilter');
const btnLucky = document.getElementById('btnLucky');
const btnText = document.getElementById('btnText');

// --- 3. 初始化 ---
lucide.createIcons();

// --- 4. 事件監聽 (Event Listeners) ---

// 種類按鈕 (Category)
document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentCategory = btn.dataset.value;
        document.querySelectorAll('.cat-btn').forEach(b => {
            b.className = 'cat-btn flex-1 py-2 text-xs font-bold rounded-md transition-all text-slate-400 hover:text-slate-600';
        });
        btn.className = 'cat-btn flex-1 py-2 text-xs font-bold rounded-md transition-all bg-white text-orange-600 shadow-sm';
    });
});

// 風格按鈕 (Style)
document.querySelectorAll('.style-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentStyle = btn.dataset.value;
        document.querySelectorAll('.style-btn').forEach(b => {
            b.className = 'style-btn py-2 text-xs font-bold rounded-lg border transition-all border-slate-200 text-slate-400 hover:border-orange-300';
        });
        btn.className = 'style-btn py-2 text-xs font-bold rounded-lg border transition-all border-orange-500 bg-orange-50 text-orange-600';
    });
});

btnFilter.addEventListener('click', () => startLottery(false));
btnLucky.addEventListener('click', () => startLottery(true));


// --- 5. 核心邏輯函式 ---

function getFilteredRestaurants(ignorePreferences) {
    const time = parseInt(timeInput.value) || 0;
    const meal = mealInput.value;

    return MOCK_DB.filter(shop => {
        if (shop.minTime > time) return false;
        if (!shop.meals.includes(meal)) return false;
        if (ignorePreferences) return true;
        if (currentCategory !== 'all' && !shop.category.includes(currentCategory)) return false;
        if (currentStyle !== 'all' && shop.style !== currentStyle) return false;
        return true;
    });
}

function startLottery(ignorePreferences) {
    if (isAnimating) return; 

    const candidates = getFilteredRestaurants(ignorePreferences);

    finalResult.classList.add('hidden');
    resultBox.classList.remove('border-orange-500');
    resultBox.classList.add('border-slate-200');

    if (candidates.length === 0) {
        initialText.innerHTML = '<span class="text-red-500">嗚嗚，找不到符合條件的店家！<br>試著放寬條件或增加用餐時間？</span>';
        initialText.classList.remove('hidden');
        animatingText.classList.add('hidden');
        return;
    }

    isAnimating = true;
    initialText.classList.add('hidden');
    animatingText.classList.remove('hidden');
    
    const originalBtnText = btnText.innerText;
    btnText.innerText = "抽選中...";
    btnFilter.disabled = true;
    btnLucky.disabled = true;

    let counter = 0;
    const maxLoops = 15; 
    
    const interval = setInterval(() => {
        const tempIndex = Math.floor(Math.random() * candidates.length);
        animatingText.innerText = candidates[tempIndex].name;
        counter++;

        if (counter > maxLoops) {
            clearInterval(interval);
            const finalIndex = Math.floor(Math.random() * candidates.length);
            showResult(candidates[finalIndex]);
            
            isAnimating = false;
            btnText.innerText = originalBtnText;
            btnFilter.disabled = false;
            btnLucky.disabled = false;
        }
    }, 100);
}

function showResult(shop) {
    animatingText.classList.add('hidden');
    finalResult.classList.remove('hidden');
    
    resultBox.classList.remove('border-slate-200');
    resultBox.classList.add('border-orange-500');

    // 填入資料
    document.getElementById('resultName').innerText = shop.name;
    
    const styleMap = { 'tw': '台式', 'jp': '日式', 'us': '美式', 'kr': '韓式' };
    document.getElementById('resultStyle').innerText = styleMap[shop.style] || '其他';

    const catMap = { 'rice': '🍚 飯', 'noodle': '🍜 麵', 'other': '🍔 其他' };
    const categoryText = shop.category
        .map(c => catMap[c] || c)
        .join(' / ');
    document.getElementById('resultCategory').innerText = categoryText;

    document.getElementById('resultTime').innerText = `⏳ ${shop.minTime}分`;

    // 填入健康建議與圖片
    document.getElementById('resultHealthTip').innerText = shop.healthTip || "記得多吃蔬菜，均衡飲食喔！";
    
    const healthImg = document.getElementById('resultHealthImg');
    // 如果資料庫有圖片連結就顯示，沒有就隱藏圖片框
    if (shop.healthImg) {
        healthImg.src = shop.healthImg;
        healthImg.classList.remove('hidden');
        healthImg.parentElement.classList.remove('hidden');
    } else {
        healthImg.classList.add('hidden');
        healthImg.parentElement.classList.add('hidden');
    }

    // 連結處理
    const mapBtn = document.getElementById('mapLink');
    if (shop.mapUrl && shop.mapUrl.trim() !== "") {
        mapBtn.href = shop.mapUrl;
    } else {
        const school = schoolInput.value;
        const query = encodeURIComponent(`${shop.name} ${school}`);
        mapBtn.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
    }
}