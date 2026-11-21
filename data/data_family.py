# Nature des relations entre personnages : famille, allié, adversaire, mission (envoyé à / lien avec un groupe)
KIND = {
 ('jibril','muhammad'):'mission',('jibril','maryam'):'mission',('jibril','mikal'):'allie',
 ('iblis','adam'):'adversaire',('iblis','humains'):'adversaire',('iblis','jinns'):'origine',
 ('jinns','sulayman'):'mission',('jinns','muhammad'):'mission',
 ('adam','epouse-adam'):'famille',('adam','fils-adam'):'famille',('adam','anges'):'mission',
 ('nuh','fils-nuh'):'famille',('nuh','epouse-nuh'):'famille',
 ('salih','chamelle'):'mission',
 ('ibrahim','azar'):'famille',('ibrahim','ismail'):'famille',('ibrahim','ishaq'):'famille',('ibrahim','lut'):'allie',
 ('ibrahim','epouse-ibrahim'):'famille',('ibrahim','roi-ibrahim'):'adversaire',('ibrahim','muhammad'):'allie',
 ('ishaq','yaqub'):'famille',('lut','epouse-lut'):'famille',
 ('yaqub','yusuf'):'famille',('yaqub','freres-yusuf'):'famille',
 ('yusuf','freres-yusuf'):'famille',('yusuf','aziz'):'allie',('yusuf','epouse-aziz'):'adversaire',('yusuf','roi-egypte'):'allie',
 ('aziz','epouse-aziz'):'famille',
 ('musa','harun'):'famille',('musa','mere-musa'):'famille',('musa','soeur-musa'):'famille',('musa','firawn'):'adversaire',
 ('musa','epouse-firawn'):'allie',('musa','samiri'):'adversaire',('musa','qarun'):'adversaire',('musa','serviteur-savant'):'allie',
 ('musa','beau-pere-musa'):'famille',('musa','israel'):'mission',
 ('firawn','haman'):'allie',('firawn','epouse-firawn'):'famille',('firawn','magiciens'):'adversaire',('firawn','croyant-firawn'):'adversaire',
 ('talut','jalut'):'adversaire',('dawud','sulayman'):'famille',('dawud','jalut'):'adversaire',
 ('sulayman','reine-saba'):'mission',('sulayman','huppe'):'allie',('sulayman','jinns'):'mission',
 ('zakariyya','yahya'):'famille',('zakariyya','maryam'):'allie',('epouse-imran','maryam'):'famille',('maryam','isa'):'famille',
 ('isa','apotres'):'allie',('isa','muhammad'):'allie',
 ('dhulqarnayn','yajuj'):'adversaire',
 ('muhammad','zayd'):'allie',('muhammad','abu-lahab'):'adversaire',('muhammad','epouses-prophete'):'famille',('muhammad','compagnon-grotte'):'allie',
}
KINDS = {'famille':['Famille','الأسرة'],'allie':['Alliés et soutiens','الأنصار والحلفاء'],'adversaire':['Adversaires','الخصوم'],'mission':['Mission et envoi','الرسالة والإرسال'],'origine':['Origine','الأصل']}

# Lignées : chaque lignée est une liste d'étapes (personnage, lien FR, lien AR, réf, mot-clé)
LINEAGE_INTRO = ('19:58', 'ذريه ادم', "Un verset relie toutes les lignées : « de la descendance d'Adam, de ceux que Nous avons portés avec Nūḥ, de la descendance d'Ibrāhīm et d'Isrāʾīl ».", "آية تجمع السلالات كلها: «من ذرية آدم وممن حملنا مع نوح ومن ذرية إبراهيم وإسرائيل».")
LINEAGES = [
 ('Adam', 'آدم', [
   ('adam', None, None, None, None),
   ('fils-adam', "ses deux fils", "ابناه", '5:27', 'ابني ادم')]),
 ('Nūḥ', 'نوح', [
   ('nuh', None, None, None, None),
   ('fils-nuh', "son fils, qui refuse l'arche", "ابنه الذي أبى الركوب", '11:42', 'ونادي نوح ابنه')]),
 ('Ibrāhīm, Isḥāq, Yaʿqūb, Yūsuf', 'إبراهيم وإسحاق ويعقوب ويوسف', [
   ('azar', None, None, None, None),
   ('ibrahim', "son fils", "ابنه", '6:74', 'لابيه ازر'),
   ('ismail', "fils, bâtit la Maison avec lui", "ابنه، رفع القواعد معه", '2:127', 'واسمعيل'),
   ('ishaq', "fils annoncé à sa femme âgée", "ابنه المبشَّر به", '11:71', 'باسحق'),
   ('yaqub', "fils d'Isḥāq (« et après Isḥāq, Yaʿqūb »)", "ابن إسحاق «ومن وراء إسحاق يعقوب»", '11:71', 'يعقوب'),
   ('yusuf', "fils de Yaʿqūb", "ابن يعقوب", '12:4', 'لابيه'),
   ('freres-yusuf', "ses frères", "إخوته", '12:7', 'واخوته')]),
 ('Mūsā et Hārūn', 'موسى وهارون', [
   ('mere-musa', None, None, None, None),
   ('musa', "son fils", "ابنها", '28:7', 'ام موسي'),
   ('harun', "frère de Mūsā", "أخو موسى", '20:30', 'هرون اخي'),
   ('soeur-musa', "sœur de Mūsā", "أخت موسى", '28:11', 'لاخته')]),
 ('Dāwūd et Sulaymān', 'داود وسليمان', [
   ('dawud', None, None, None, None),
   ('sulayman', "son fils et héritier", "ابنه ووارثه", '27:16', 'وورث سليمن داود')]),
 ('Famille de ʿImrān', 'آل عمران', [
   ('epouse-imran', None, None, None, None),
   ('maryam', "sa fille, prise en charge par Zakariyyā", "ابنتها، كفلها زكريا", '3:36', 'سميتها مريم'),
   ('isa', "fils de Maryam, sans père", "ابن مريم بلا أب", '19:20', 'ولم يمسسني بشر')]),
 ('Zakariyyā et Yaḥyā', 'زكريا ويحيى', [
   ('zakariyya', None, None, None, None),
   ('yahya', "fils né de parents âgés", "ابنه على الكبر", '19:7', 'اسمه يحيي')]),
]
