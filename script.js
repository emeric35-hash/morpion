/* ==========================================================================
   1. VARIABLES ET ÉTAT DU JEU
   ========================================================================== */
let etatGrille = ["", "", "", "", "", "", "", "", ""];
let joueurActuel = 1; // 1 = "X", 2 = "O"
let isTheEnd = false;
let scoreJoueur1 = 0;
let scoreJoueur2 = 0;
let compteurManches = 1;

// Combinaisons gagnantes (3x3)
const combinaisonsGagnantes = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
    [0, 4, 8], [2, 4, 6]             // Diagonales
];

/* ==========================================================================
   2. SÉLECTION DES ÉLÉMENTS DU DOM
   ========================================================================== */
const cases = document.querySelectorAll(".case");
const texteStatut = document.getElementById("texte-statut");
const zoneBoutons = document.getElementById("zone-boutons");
const elemScoreJ1 = document.getElementById("score-j1");
const elemScoreJ2 = document.getElementById("score-j2");
const elemNbManches = document.getElementById("nb-manches");

/* ==========================================================================
   3. ÉCOUTEURS D'ÉVÉNEMENT
   ========================================================================== */
// On utilise l'index numérique fourni directement par la boucle forEach
cases.forEach((uneCase, index) => {
    uneCase.addEventListener("click", () => {
        jouerCoup(index, uneCase);
    });
});

/* ==========================================================================
   4. LOGIQUE DU JEU
   ========================================================================== */
function jouerCoup(index, caseElement) {
    // Si la partie est finie ou la case occupée, on stoppe l'action
    if (isTheEnd || etatGrille[index] !== "") return;

    // 1. Déterminer le symbole ("X" ou "O")
    const symbole = (joueurActuel === 1) ? "X" : "O";

    // 2. Enregistrer le coup
    etatGrille[index] = symbole;
    caseElement.textContent = symbole;
    caseElement.classList.add(symbole.toLowerCase());

    // 3. Vérifier si ce coup gagne ou provoque une égalité
    if (verifierVictoire()) {
        theEnd(joueurActuel);
    } else if (!etatGrille.includes("")) {
        theEnd(0); // 0 = Égalité
    } else {
        // 4. Basculer le joueur (1 -> 2 -> 1)
        joueurActuel = (joueurActuel === 1) ? 2 : 1;
        const symboleSuivant = (joueurActuel === 1) ? "X" : "O";
        texteStatut.innerHTML = `Au tour du <strong>Joueur ${joueurActuel} (${symboleSuivant})</strong>`;
    }
}

function verifierVictoire() {
    for (let combo of combinaisonsGagnantes) {
        const [a, b, c] = combo;
        if (
            etatGrille[a] !== "" &&
            etatGrille[a] === etatGrille[b] &&
            etatGrille[a] === etatGrille[c]
        ) {
            cases[a].classList.add("gagnante");
            cases[b].classList.add("gagnante");
            cases[c].classList.add("gagnante");
            return true;
        }
    }
    return false;
}

/**
 * Fonction theEnd respectant les 7 consignes du projet :
 */
function theEnd(player) {
    // 1. Retirer l'aspect cliquable des cases (désactiver le curseur)
    cases.forEach(c => {
        c.disabled = true;
        c.style.cursor = "default";
    });

    // 2. Changer la valeur de l'attribut/variable isTheEnd
    isTheEnd = true;

    // 3. Comptabiliser la manche
    compteurManches++;

    // 4. Mettre à jour l'élément affichant le nombre de manches
    elemNbManches.textContent = compteurManches;

    // 5. Afficher un message de victoire/égalité et révéler les boutons de relance
    if (player === 1 || player === 2) {
        texteStatut.innerHTML = `🏆 <strong>Victoire du Joueur ${player} !</strong>`;
        
        // 6. Augmenter le score du joueur gagnant
        if (player === 1) scoreJoueur1++;
        if (player === 2) scoreJoueur2++;
    } else {
        texteStatut.innerHTML = `🤝 <strong>Égalité !</strong>`;
    }

    // 7. Mettre à jour le score affiché
    elemScoreJ1.textContent = scoreJoueur1;
    elemScoreJ2.textContent = scoreJoueur2;

    // Afficher les boutons
    zoneBoutons.style.display = "flex";
}

function reinitialiserManche() {
    etatGrille = ["", "", "", "", "", "", "", "", ""];
    isTheEnd = false;
    joueurActuel = 1;

    texteStatut.innerHTML = `Au tour du <strong>Joueur 1 (X)</strong>`;
    zoneBoutons.style.display = "none";

    cases.forEach(c => {
        c.textContent = "";
        c.className = "case";
        c.disabled = false;
        c.style.cursor = "pointer";
    });
}

function reinitialiserPartie() {
    scoreJoueur1 = 0;
    scoreJoueur2 = 0;
    compteurManches = 1;
    elemScoreJ1.textContent = 0;
    elemScoreJ2.textContent = 0;
    elemNbManches.textContent = 1;

    reinitialiserManche();
}

// Export des fonctions sur l'objet window pour compatibilité onclick HTML
window.reinitialiserManche = reinitialiserManche;
window.reinitialiserPartie = reinitialiserPartie;