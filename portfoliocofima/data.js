/* ============================================================
   BASE DE DONNÉES DU PORTFOLIO — seul fichier à modifier pour les mises à jour
   - Ajouter une présentation : copier une ligne dans "presentations"
   - "lien" = chemin du PDF/PPTX placé dans le dossier presentations/
   - "date" au format AAAA-MM-JJ
   CHAMPS DES CARTES (facultatifs, pour les trois rubriques) :
   - "image"     : photo placée dans le dossier images/ (ex. "images/audit.jpg"),
                   format paysage conseillé 1000 × 700 px. Absente ou introuvable :
                   un visuel aux couleurs du cabinet est généré automatiquement.
   - "alt"       : description de la photo pour les lecteurs d’écran.
   - "accroche1" : texte en gras sur l’image (2 à 3 mots, ex. "Un réseau").
   - "accroche2" : suite en texte fin (ex. "des savoirs partagés").
                   Sans accroche, le début du titre est repris.
   - Formations : "date" (AAAA-MM-JJ) = date de la prochaine session ;
                  sans date, la durée est affichée sous l’image.
                  "pdf"  = support placé dans le dossier formations/ (boutons « Voir le PDF » et « Consulter ») ;
                  "site" = adresse web complète (https://…), bouton « Visiter le site » affiché s’il est renseigné.
   ============================================================ */
window.DATA = {
  cabinet: "COFIMA",
  baseline: "Compagnie Fiduciaire de Management et d’Audit",
  adresse: "C/2197 Immeuble Luca Pacioli, Kouhounou, Cotonou, Bénin",
  tel: "+229 01 90 95 19 59",
  email: "contact@cofima.cc",

  /* Modèle : {titre:"…", accroche1:"…", accroche2:"…", image:"images/….jpg", cat:"Audit", auteur:"Prénom Nom", date:"AAAA-MM-JJ", duree:"15 min", resume:"…", lien:"presentations/….pdf"} */
  presentations: [],

  /* Applications et sites développés au sein du cabinet.
     Champs : statut (texte sous l’image), contexte, actions (fonctionnalités), resultats ([chiffre, libellé]),
     tags, lien (adresse de l’application), interne:true si l’adresse n’est accessible que sur le réseau du cabinet,
     image : capture d’écran dans images/realisations/ (ex. "images/realisations/coftime.jpg", format 1000 × 625 px conseillé). Tous facultatifs sauf titre. */
  realisations: [
    {titre:"COFTIME : gestion des temps", accroche1:"COFTIME", accroche2:"la gestion des temps", image:"images/realisations/coftime.jpg", cat:"Application interne", statut:"Application interne · ≈ 30 utilisateurs", contexte:"Application de gestion des temps utilisée au sein du cabinet.", actions:["Saisie des tâches accomplies par chaque collaborateur","Génération quotidienne des feuilles de temps à partir des tâches"], resultats:[["≈ 30","utilisateurs"],["Chaque jour","feuilles de temps générées"]], tags:["Gestion des temps","Feuilles de temps"], lien:"http://10.16.10.122/coftime", interne:true},
    {titre:"COFIDAY : congés et attestations", accroche1:"COFIDAY", accroche2:"congés et attestations", image:"images/realisations/cofiday.jpg", cat:"Application interne", statut:"Application interne", contexte:"Application de gestion des congés et des documents RH du cabinet.", actions:["Gestion des congés","Attestations de travail","Certificats de travail"], tags:["Ressources humaines","Congés"], lien:"http://10.16.10.122/cofiday", interne:true},
    {titre:"COFIGISTRE : gestion des registres", accroche1:"COFIGISTRE", accroche2:"la gestion des registres", image:"images/realisations/cofigistre.jpg", cat:"Application interne", statut:"Application interne", contexte:"Application de gestion des registres au sein de COFIMA.", actions:["Gestion des registres du cabinet"], tags:["Registres"], lien:"http://10.16.10.122/cofigistre", interne:true},
    {titre:"cofima.cc : le site institutionnel", accroche1:"cofima.cc", accroche2:"le site institutionnel", image:"images/realisations/cofima-cc.jpg", cat:"Site web", statut:"Site institutionnel · en ligne", contexte:"Le site institutionnel de COFIMA, accessible au public.", actions:["Présentation du cabinet"], tags:["Site web","Institutionnel"], lien:"https://cofima.cc"},
    {titre:"COFIMOVE : frais de déplacement", accroche1:"COFIMOVE", accroche2:"les frais de déplacement", image:"images/realisations/cofimov.jpg", cat:"Application interne", statut:"Application interne", contexte:"Application de gestion des frais de déplacement au sein du cabinet.", actions:["Gestion des frais de déplacement"], tags:["Frais de déplacement"], lien:"http://10.16.10.123/cofimove-test/", interne:true},
    {titre:"COFIMISS : gestion des missions", accroche1:"COFIMISS", accroche2:"la gestion des missions", image:"images/realisations/cofimiss.jpg", cat:"Application interne", statut:"Projet en cours", contexte:"Application de gestion des missions du cabinet, en cours de développement.", actions:["Gestion des missions"], tags:["Missions","En cours"]}
  ],

  formations: [
    {titre:"Le prompt engineering : l’art de bien communiquer avec l’IA", accroche1:"Bien parler", accroche2:"à l’intelligence artificielle", cat:"Club IA", auteur:"Loukmane Adandé Moussa", date:"2026-10-15", duree:"10 min", public:"Tout public", resume:"Rôle, contexte, tâche, contraintes et format : structurer sa demande à l’IA, démonstration à l’appui.", pdf:"formations/prompt-engineering.pdf", site:""},
    {titre:"AI Squirrel Quiz : un quiz IA généré avec Google AI Studio", accroche1:"AI Squirrel", accroche2:"Quiz, édition premium", cat:"Club IA", auteur:"Térence Gandji", date:"2026-10-22", duree:"10 min", public:"Tout public", resume:"Du prompt à l’application : conception, fonctionnement et analyse d’un quiz web interactif sur l’IA.", pdf:"formations/ai-squirrel-quiz.pdf", site:""}
  ]
};
