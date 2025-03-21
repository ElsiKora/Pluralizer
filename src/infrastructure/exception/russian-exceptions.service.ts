import type { TExceptionMap } from "../type/exception-map.type";

export const russianIrregularPlurals: TExceptionMap = {
	адрес: "адреса",
	башня: "башни",
	беда: "беды",
	берег: "берега",
	блюдце: "блюдца",
	брат: "братья",
	ведро: "вёдра",
	ветер: "ветра",
	вечер: "вечера",
	вода: "воды",
	время: "времена",
	встреча: "встречи",
	вымя: "вымена",
	гиря: "гири",
	глаз: "глаза",
	год: "года",
	голова: "головы",
	голос: "голоса",
	гора: "горы",
	горе: "горя",
	город: "города",
	дача: "дачи",
	дело: "дела",
	деревня: "деревни",
	дерево: "деревья",
	директор: "директора",
	доктор: "доктора",
	дом: "дома",
	доска: "доски",
	дочь: "дочери",
	друг: "друзья",
	душа: "души",
	дыня: "дыни",
	дыра: "дыры",
	еда: "еды",
	жена: "жёны",
	задача: "задачи",
	звезда: "звёзды",
	земля: "земли",
	зеркало: "зеркала",
	зерно: "зёрна",
	знамя: "знамёна",
	игла: "иглы",
	игра: "игры",
	имя: "имена",
	инспектор: "инспектора",
	катер: "катера",
	книга: "книги",
	колено: "колени",
	край: "края",
	крем: "кремы",
	крыло: "крылья",
	крыльцо: "крыльца",
	лист: "листья",
	лицо: "лица",
	любовь: "любови",
	мать: "матери",
	мера: "меры",
	место: "места",
	мечта: "мечты",
	море: "моря",
	муж: "мужья",
	небо: "небеса",
	неделя: "недели",
	нога: "ноги",
	номер: "номера",
	облако: "облака",
	овца: "овцы",
	окно: "окна",
	остров: "острова",
	паспорт: "паспорта",
	перо: "перья",
	песня: "песни",
	письмо: "письма",
	пламя: "пламена",
	племя: "племена",
	плечо: "плечи",
	повар: "повара",
	поезд: "поезда",
	поле: "поля",
	полотенце: "полотенца",
	пояс: "пояса",
	правило: "правила",
	профессор: "профессора",
	пуля: "пули",
	пчела: "пчёлы",
	ребёнок: "дети",
	ребро: "рёбра",
	река: "реки",
	роща: "рощи",
	рука: "руки",
	рукав: "рукава",
	свеча: "свечи",
	свитер: "свитера",
	семя: "семена",
	сердце: "сердца",
	сестра: "сёстры",
	слеза: "слёзы",
	слово: "слова",
	снег: "снега",
	солнце: "солнца",
	соус: "соусы",
	среда: "среды",
	стена: "стены",
	сторож: "сторожа",
	страна: "страны",
	стремя: "стремена",
	стул: "стулья",
	сын: "сыновья",
	тело: "тела",
	темя: "темена",
	тетя: "тети",
	тополь: "тополя",
	торт: "торты",
	туча: "тучи",
	ухо: "уши",
	учитель: "учителя",
	хлеб: "хлеба",
	холод: "холода",
	цветок: "цветы",
	цена: "цены",
	церковь: "церкви",
	человек: "люди",
	число: "числа",
	чудо: "чудеса",
	шарф: "шарфы",
	щека: "щёки",
	яблоко: "яблоки",
	яйцо: "яйца",
	якорь: "якоря",
};

// Convert irregular plurals to a mapping from plural to singular
export const russianIrregularSingulars: TExceptionMap = Object.fromEntries(Object.entries(russianIrregularPlurals).map(([singular, plural]: [string, string]) => [plural, singular]));

// Words that do not change form between singular and plural
export const russianUncountableWords: Array<string> = [
	// Pair words
	"ножницы",
	"брюки",
	"очки",
	"штаны",
	"шорты",
	"колготки",
	"трусы",
	"джинсы",
	"плавки",
	"перчатки",
	"варежки",
	"наушники",
	"гантели",
	"кусачки",
	"щипцы",
	"клещи",
	"тиски",
	"весы",
	"качели",
	"санки",
	"грабли",
	"коньки",
	"лыжи",
	"сани",
	"носилки",
	"тапки",
	"туфли",
	"ботинки",
	"кроссовки",
	"башмаки",
	"чулки",
	"носки",

	// Abstract concepts
	"деньги",
	"финансы",
	"средства",
	"хлопья",
	"макароны",
	"спагетти",
	"консервы",
	"дрожжи",
	"дрова",
	"бусы",
	"чётки",
	"кудри",
	"бигуди",
	"духи",
	"сливки",
	"всходы",
	"сумерки",
	"припасы",
	"каникулы",
	"выходные",
	"осадки",
	"заморозки",
	"данные",
	"координаты",
	"сведения",
	"экспонаты",
	"мемуары",
	"хроники",
	"анналы",

	// Subjects and disciplines
	"переговоры",
	"выборы",
	"хлопоты",
	"проводы",
	"дебаты",
	"прения",
	"аплодисменты",
	"роды",
	"похороны",
	"смотрины",
	"крестины",
	"именины",
	"поиски",
	"скачки",
	"бега",
	"гонки",
	"прятки",
	"салки",
	"горелки",
	"танцы",
	"карты",
	"шахматы",
	"шашки",
	"нарды",

	// Time
	"сутки",
	"будни",
	"выходные",

	// Materials and substances
	"чернила",
	"чаи",
	"меха",
	"всходы",
	"сливки",
	"сласти",
	"мюсли",
	"щи",
	"чипсы",
	"хлопья",
	"духи",
	"белила",
	"румяна",
	"тени",

	// Geographical features
	"ворота",
	"задворки",
	"мостки",
	"побережье",
	"окрестности",
	"джунгли",
	"дебри",
	"субтропики",
	"тропики",
	"Альпы",
	"Анды",
	"Карпаты",
	"Дарданеллы",
	"Афины",
	"Нидерланды",
	"Балканы",
	"Филиппины",
	"Кордильеры",
	"Сейшелы",
];
