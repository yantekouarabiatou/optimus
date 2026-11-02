# Portfolio COFIMA

Vitrine interne de **COFIMA** (Compagnie Fiduciaire de Management et d’Audit) : présentations, réalisations du cabinet et formations à venir.

Site **statique** (HTML, CSS, JavaScript) : pas de base de données, pas de compilation. Tout le contenu se modifie dans un seul fichier, `data.js`.

## Contenu

| Rubrique | Contenu actuel |
|---|---|
| **Présentations** | Aucune pour le moment. La rubrique affiche un message d’attente. |
| **Réalisations** | Les applications développées au sein du cabinet : COFTIME (gestion des temps), COFIDAY (congés et attestations), COFIGISTRE (registres), COFIMOVE (frais de déplacement), cofima.cc (site institutionnel), COFIMISS (missions, projet en cours) |
| **Formations à venir** | Les sessions du Club IA, avec leur support PDF consultable directement sur la page |

Fonctionnalités :

- Cartes paginées, 6 par page.
- Fiche détaillée pour chaque réalisation.
- Lecteur PDF intégré : pagination, zoom, ajustement à la largeur, téléchargement et raccourcis clavier. Il fonctionne hors ligne grâce à PDF.js, inclus dans `vendor/`.
- Mise en page adaptée au mobile et accessible au clavier.

## Arborescence

```
portfolio-cabinet.html    page unique (structure, styles, scripts)
data.js                   tout le contenu du site : seul fichier à modifier
formations/               supports PDF des formations
images/realisations/      captures des applications (1000 × 625 px)
vendor/pdfjs/             PDF.js 3.11.174 (affichage des PDF)
logo-cofima.png           logo à fond transparent
favicon-32.png, apple-touch-icon.png
```

## Lancer le site en local

Placer le dossier dans un serveur web local (WAMP, XAMPP…), puis ouvrir :

```
http://localhost/<dossier>/portfolio-cabinet.html
```

Un serveur web est nécessaire : ouvert directement en `file://`, le navigateur bloque le chargement des PDF. Sans WAMP, la commande suivante suffit :

```
python -m http.server 8000
```

## Mettre à jour le contenu

Toutes les modifications se font dans **`data.js`**, et chaque rubrique y est une liste. Les champs disponibles sont décrits en commentaire en tête du fichier.

**Ajouter une formation** : déposer le PDF dans `formations/`, puis ajouter une ligne dans `formations` :

```js
{titre:"…", accroche1:"…", accroche2:"…", cat:"Club IA", auteur:"Prénom Nom", date:"AAAA-MM-JJ", duree:"10 min", public:"Tout public", resume:"…", pdf:"formations/fichier.pdf", site:""}
```

Si le champ `site` contient une adresse (`https://…`), la carte affiche un bouton « Visiter le site ».

**Ajouter une réalisation** : déposer la capture dans `images/realisations/` (format conseillé : 1000 × 625 px), puis ajouter une ligne dans `realisations` :

```js
{titre:"…", accroche1:"…", accroche2:"…", image:"images/realisations/app.jpg", cat:"Application interne", statut:"…", contexte:"…", actions:["…"], tags:["…"], lien:"http://…", interne:true}
```

`interne:true` signale que l’adresse n’est accessible que depuis le réseau du cabinet. Sans `lien`, le bouton d’ouverture n’apparaît pas.

**Ajouter une présentation** : un modèle de ligne est donné en commentaire au-dessus de la liste `presentations`.

> **Le contenu doit rester réel.** N’ajoutez ni chiffres, ni auteurs, ni dates inventés. Un champ inconnu se laisse vide : il n’est alors pas affiché.

> **Cache navigateur** : après chaque modification de `data.js`, incrémentez le numéro de version dans `portfolio-cabinet.html` (`<script src="data.js?v=9">` devient `?v=10`). Sans cela, les visiteurs risquent de voir l’ancienne version.

## Déploiement sur le serveur de test

Le site est publié dans `/var/www/html/portfolio-test/` sur le serveur de test (Apache).

1. Copier en SFTP (WinSCP, FileZilla…) les fichiers `portfolio-cabinet.html`, `data.js`, `logo-cofima.png`, `favicon-32.png`, `apple-touch-icon.png`, ainsi que les dossiers `formations/`, `images/realisations/` et `vendor/pdfjs/`.
2. Sur le serveur, un fichier `index.html` redirige vers `portfolio-cabinet.html`.
3. Ne jamais copier `images/realisations/originaux/`. Ce dossier contient les captures d’origine, avec des données personnelles. Il est exclu du dépôt par `.gitignore`.

Les identifiants du serveur ne doivent **jamais** être enregistrés dans ce dépôt.
