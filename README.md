# Arbre des sujets du Coran · Tadabbur

Lecture littérale du Coran à partir de sa seule langue arabe : un arbre de sujets, des questions raisonnées, des personnages et leurs relations, une démarche de *tadabbur* (méditation) tirée du texte lui-même, un lecteur des 114 sourates avec coloration du tajwīd, et les règles de lecture.

Disponible en trois formes, construites à partir des mêmes données :

| Forme | Fichier | Usage |
|---|---|---|
| Application Android | `Tadabbur.apk` (onglet *Releases*) | Hors ligne, bouton retour, favoris et notes sur l'appareil |
| Page web | `web/dist/index.html` + `web/dist/quran.json` | À héberger sur un site |
| Fichier unique hors ligne | `web/standalone/coran-tadabbur.html` | iPhone (Fichiers → Safari), partage par message |

## Installer l'application Android

1. Ouvrir la dernière version : **Releases → Latest**, ou directement
   `https://github.com/drissguessous/coran-analysis/releases/latest/download/Tadabbur.apk`
2. Télécharger `Tadabbur.apk` sur le téléphone et l'ouvrir.
3. Autoriser l'installation depuis cette source si Android le demande.

Chaque mise à jour de `main` produit une nouvelle version, qui s'installe par-dessus la précédente en conservant les favoris et les notes.

## Ce que contient l'application

- **Lire** : les 114 sourates, coloration du tajwīd (ghunna, ikhfāʾ, iqlāb, qalqala, madd, lettres muettes), taille du texte réglable, reprise de la lecture. Toucher un mot affiche sa racine, son sens et toutes ses occurrences dans le Coran.
- **Sujets** : 12 branches, 75 sujets, 508 passages classés par nature : définition, explication, démonstration, histoire, exigence, conseil.
- **Règles** : signes du muṣḥaf, nūn et tanwīn, mīm, ghunna et qalqala, article, madd, lettres muettes, pauses (waqf), cas particuliers (saktah, imāla, ishmām, prosternations), points d'articulation, et ce que le texte dit de sa récitation. Chaque règle donne son nombre d'occurrences et des exemples détectés automatiquement.
- **Questions** : 30 questions avec un raisonnement pas à pas.
- **Tadabbur** : la méthode du texte (lire, comprendre, relier, appliquer) et ses appels à réfléchir.
- **Écoute et apprentissage** : récitation en Ḥafṣ verset par verset, synchronisée avec le texte (al-Ḥuṣarī version d'enseignement, al-Ḥuṣarī, Ayman Suwayd, al-Minshāwī, ʿAbd al-Bāsiṭ, al-Ḥudhayfī, al-ʿAfāsī), avec répétition ×1/×3/×5/∞, pause pour répéter soi-même et vitesse réglable. Autres lectures par sourate entière : Warsh ʿan Nāfiʿ (dont al-Qazabrī, Benkirane, al-Kūshī), Qālūn ʿan Nāfiʿ, ad-Dūrī ʿan Abī ʿAmr, Shuʿba ʿan ʿĀṣim. Chaque exemple de règle de tajwīd s'écoute.
- **Arbre généalogique** : 45 prophètes, personnages et peuples, reliés par 45 liens, chacun justifié par un verset (filiation explicite, descendance, conjoint, fratrie, lien de foi ou de tutelle, « leur frère »).
- **Dictionnaire** : tous les mots du Coran (77 429) rattachés à leur racine. 1 651 racines expliquées en arabe et en français, 4 635 mots de base avec leur nature (verbe et sa forme, nom, participe, maṣdar, adjectif…), leurs formes et tous leurs versets ; 102 mots-outils et pronoms et 62 noms propres expliqués. Index par lettre et recherche en arabe ou en français.
- **Personnages**, **Lexique des racines**, **Favoris**, **Recherche** globale (français et arabe).

## Méthode

- **Source unique** : le texte arabe ʿuthmānī du muṣḥaf de Médine (lecture de Ḥafṣ), issu de l'Encyclopédie du Noble Coran via le paquet [`quran-json`](https://github.com/risan/quran-json) (CC BY 4.0). Aucun tafsīr ni aucune traduction existante n'a servi à construire l'arbre.
- **Contrôle** : chaque référence porte un mot-clé arabe qui doit se trouver dans le verset cité (`npm run verify`).
- **Règles de lecture** : celles de la lecture de Ḥafṣ ʿan ʿĀṣim. Le muṣḥaf les note par ses signes (sukūn, tanwīn superposé ou décalé, petit mīm, madda…), et les détecteurs de `data/data_tajwid.py` les retrouvent dans le texte. La coloration est une aide et ne remplace pas l'écoute d'un récitateur.
- **Écoute hors ligne (Android)** : dans *Plus → Écoute hors ligne*, on télécharge sur le téléphone une sourate, al-Fātiḥa et le juz' ʿAmma, ou tout le Coran, pour le récitant choisi. Ensuite l'écoute fonctionne sans connexion. Les téléchargements se font depuis la source, avec option « Wi-Fi seulement », reprise et suppression ; l'APK reste léger et ne redistribue aucun enregistrement. La page web, elle, lit les récitations en ligne.
- **Audio** : les récitations sont diffusées depuis everyayah.com (Ḥafṣ, verset par verset) et mp3quran.net (autres lectures, par sourate) ; elles appartiennent à leurs récitants et producteurs, et aucun fichier audio n'est inclus. Les autres lectures ont une numérotation des versets différente de Ḥafṣ : elles se jouent donc par sourate entière, et le texte affiché reste celui de Ḥafṣ.
- **Dictionnaire** : le rattachement de chaque mot à sa racine et à son mot de base vient de la morphologie du [Quranic Arabic Corpus](https://corpus.quran.com) v0.4 (© Kais Dukes, université de Leeds, GNU GPL), dans la version corrigée de [mustafa0x/quran-morphology](https://github.com/mustafa0x/quran-morphology), copiée sans modification dans `data/morphology/`. Les sens des racines (`data/dict/roots_*.txt`) et des mots-outils (`data/dict/particles.txt`) sont rédigés pour ce projet à partir de l'arabe. Le build vérifie que chaque mot du texte est rattaché et que chaque racine a sa définition.
- Les lectures proposées sont à discuter : ce ne sont pas des avis religieux.

## Structure

```
data/                 Données (Python) : arbre, personnages, généalogie, questions, lexique, tadabbur, tajwīd, audio, dictionnaire, contrôles
data/dict/            Sens des 1 651 racines et des mots-outils
data/morphology/      Morphologie du Quranic Arabic Corpus (GPL)
scripts/build.py      Construit web/dist et web/standalone
scripts/verify_all.py Vérifie toutes les références
web/src/              Interface : index.html, app.css, app.js, audio.js, offline.js, genealogy.js, dict.js, police coranique, icône
android/              Projet Android (Capacitor)
.github/workflows/    Compilation de l'APK et publication à chaque push sur main
```

## Construire localement

```bash
npm ci
npm run verify          # contrôle des références
npm run build           # page web et fichier hors ligne
npx cap sync android    # copie dans le projet Android
cd android && ./gradlew assembleRelease   # nécessite le SDK Android et le JDK 21
```

## Signature de l'APK

L'APK est signé avec `android/app/tadabbur-sideload.keystore`, une clé de distribution directe volontairement publique : elle sert seulement à ce que les mises à jour s'installent par-dessus les précédentes. Pour une publication sur le Play Store, il faut une clé privée, fournie à la compilation par les variables `TADABBUR_KEYSTORE_FILE`, `TADABBUR_KEYSTORE_PASSWORD`, `TADABBUR_KEY_ALIAS` et `TADABBUR_KEY_PASSWORD`.
