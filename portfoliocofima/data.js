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

  /* Modèle : {titre:"…", accroche1:"…", accroche2:"…", image:"images/….jpg", cat:"Audit", date:"Sept. 2026", duree:"6 semaines", equipe:"4 personnes", contexte:"…", actions:["…","…"], resultats:[["12","recommandations"]], tags:["…"]} */
  realisations: [],

  formations: [
    {titre:"Le prompt engineering : l’art de bien communiquer avec l’IA", accroche1:"Bien parler", accroche2:"à l’intelligence artificielle", cat:"Club IA", auteur:"Loukmane Adandé Moussa", date:"2026-10-15", duree:"10 min", public:"Tout public", resume:"Rôle, contexte, tâche, contraintes et format : structurer sa demande à l’IA, démonstration à l’appui.", pdf:"formations/prompt-engineering.pdf", site:""},
    {titre:"AI Squirrel Quiz : un quiz IA généré avec Google AI Studio", accroche1:"AI Squirrel", accroche2:"Quiz, édition premium", cat:"Club IA", auteur:"Térence Gandji", date:"2026-10-22", duree:"10 min", public:"Tout public", resume:"Du prompt à l’application : conception, fonctionnement et analyse d’un quiz web interactif sur l’IA.", pdf:"formations/ai-squirrel-quiz.pdf", site:""}
  ]
};
