const popup = document.getElementById('popup');
const popupContent = document.getElementById('popup-content');
const closeBtn = document.querySelector('.close-popup');

const locationsData = [
    { name: "Старый Тарский тракт", desc: "По этой дороге в Омск в 1850 году привезли Достоевского в кандалах. Сам он писал в «Записках из Мёртвого дома», как эта суровая природа и Иртыш стали для него символом перерождения." },
    { name: "Село Абалак (Тобольск)", desc: "Абалакский монастырь — главная духовная точка Сибири. Говорят, подземные ключи Иртыша там целебные. Люди едут за силой и исцелением, место известное с древности." },
    { name: "Юганский заповедник", desc: "В глухой тайге до сих пор стоят священные идолы хантов, на Оби проводят обряды. Шаманские легенды о духах реки — не музей, а живая вера." },
    { name: "Пойма Иртыша (Омск)", desc: "Заливные луга — рай для перелётных птиц. Красивое место, где любят отдыхать сами омичи. Его рисуют художники и поют поэты." },
    { name: "Кондинские озера", desc: "Манси верят: озёра остались от следов гигантского лося, который создал землю. Там до сих пор рыбачат, шаманят и шепчутся с духами воды." }
];

function showPopup(idx) {
    if (!popup || !popupContent) return;
    const item = locationsData[idx];
    if (!item) return;
    popupContent.innerHTML = `<h3>${item.name}</h3><p>${item.desc}</p><div class="ornament-border"></div><small>Историко-культурное наследие Обь-Иртышья</small>`;
    popup.classList.add('active');
}

if (popup) {
    closeBtn.onclick = () => popup.classList.remove('active');
    popup.addEventListener('click', e => { if (e.target === popup) popup.classList.remove('active'); });
}


document.querySelectorAll('.location-card-clickable').forEach(card => {
    card.addEventListener('click', function() {
        showPopup(parseInt(this.dataset.loc));
    });
});

document.querySelectorAll('.carousel-container').forEach(c => {
    const track = c.querySelector('.carousel-track');
    if (!track) return;
    const slides = [...track.children];
    const next = c.querySelector('.next');
    const prev = c.querySelector('.prev');
    let idx = 0;
    const update = () => track.style.transform = `translateX(-${idx * 100}%)`;
    if (next) next.addEventListener('click', () => { idx = (idx + 1) % slides.length; update(); });
    if (prev) prev.addEventListener('click', () => { idx = (idx - 1 + slides.length) % slides.length; update(); });
    update();
});


document.querySelectorAll('.accordion-header').forEach(h => {
    h.addEventListener('click', () => {
        const item = h.closest('.accordion-item');
        item.classList.toggle('active');
        const icon = h.querySelector('.accordion-icon');
        if (icon) icon.textContent = item.classList.contains('active') ? '−' : '+';
    });
});



document.querySelectorAll('.tab-btn').forEach(b => {
    b.addEventListener('click', () => {
        const tabId = b.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        b.classList.add('active');
        document.getElementById(`tab${tabId}`)?.classList.add('active');
    });
});