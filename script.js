        // Variable pour stocker la chaîne de caractères affichée
        let chaineAffichee = "";

        // Variable pour le score
        let score = 0;

        // Sélectionnez les éléments radio
        const radioOptions = document.querySelectorAll('input[name="optionSource"]');
        
        // Sélectionnez la zone de proposition
        const zoneProposition = document.querySelector('.zoneProposition');
        
        // Ajoutez un événement de changement à chaque élément radio
        radioOptions.forEach(option => {
            option.addEventListener('change', () => {
                // Vérifiez quelle option est sélectionnée
                if (option.value === "1") {
                    // Si l'option "Mots" est sélectionnée, affichez "Azerty" dans la zone de proposition
                    zoneProposition.innerText = "Azerty";
                } else if (option.value === "2") {
                    // Si l'option "Phrases" est sélectionnée, affichez "12345" dans la zone de proposition
                    zoneProposition.innerText = "12345";
                }
            });
        });
        
        // Assurez-vous que le contenu initial est correct lors du chargement de la page
        window.addEventListener('DOMContentLoaded', () => {
            // Vérifiez quelle option est sélectionnée par défaut
            const optionSelectionnee = document.querySelector('input[name="optionSource"]:checked');
            // Affichez le contenu initial dans la zone de proposition
            if (optionSelectionnee.value === "1") {
                zoneProposition.innerText = "Azerty";
            } else if (optionSelectionnee.value === "2") {
                zoneProposition.innerText = "12345";
            }
        });

        // Fonction pour générer une chaîne de caractères aléatoire
        function genererChaineAleatoire(longueur) {
            const btnValue = document.querySelector('input[name="optionSource"]:checked').value;
            
            if (btnValue === "1") {
                const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                let chaine = "";
                for (let i = 0; i < longueur; i++) {
                    chaine += alphabet[Math.floor(Math.random() * alphabet.length)];
                }
                return chaine;
            }
        
            if (btnValue === "2") {
                let chiffres = "0123456789";
                let chaine = "";
                for (let i = 0; i < longueur; i++) {
                    const index = Math.floor(Math.random() * chiffres.length);
                    chaine += chiffres[index];
                }
                return chaine;
            }
        }

        // Fonction pour afficher une nouvelle chaîne de caractères aléatoire
        function afficherNouvelleChaine() {
            // Afficher l'élément de proposition
            zoneProposition.style.display = "block";
        
            // Vider le champ de saisie
            document.getElementById("inputEcriture").value = "";
        
            // Générer une nouvelle chaîne de caractères aléatoire
            chaineAffichee = genererChaineAleatoire(score + 1);
        
            // Afficher la chaîne de caractères aléatoire dans la zone de proposition
            zoneProposition.innerText = chaineAffichee;
        
            // Masquer l'élément de proposition après 5 secondes
            setTimeout(() => {
                zoneProposition.style.display = "none"; // Masquer l'élément de proposition
                // Afficher la zone de saisie
                const zoneSaisie = document.querySelector(".zoneSaisie");
                zoneSaisie.style.display = "block";
            }, 5000);
        }

        function verifierLettre() {
            // Récupérer la réponse saisie par l'utilisateur et la normaliser en majuscules
            const reponseUtilisateur = document.getElementById("inputEcriture").value.trim().toUpperCase();
            console.log(reponseUtilisateur)
            // Comparer la réponse saisie par l'utilisateur avec la chaîne de caractères affichée
            if (reponseUtilisateur === chaineAffichee) {
                console.log("Bravo");
                // Ajouter 1 au score si la réponse est correcte
                score++;
                // Afficher une nouvelle chaîne de caractères aléatoire après chaque bonne réponse
                afficherNouvelleChaine();
        
                // Mettre à jour le score affiché sur la page
                const spanScore = document.querySelector(".zoneScore span");
                spanScore.innerText = score;
        
                // Masquer la zone de saisie
                const zoneSaisie = document.querySelector(".zoneSaisie");
                zoneSaisie.style.display = "none";
            } else {
                // Afficher "Perdu" dans la zone de proposition
                const zoneProposition = document.querySelector(".zoneProposition");
                zoneProposition.style.display = "block"; // Assurez-vous que l'élément est affiché
                zoneProposition.innerText = "Perdu";
                // Masquer la zone de saisie
                const zoneSaisie = document.querySelector(".zoneSaisie");
                zoneSaisie.style.display = "none";
                // Vider le champ de saisie
                document.getElementById("inputEcriture").value = "";
            }
        }

       function demarrerJeu() {
    // Réinitialiser le score à zéro
    score = 0;

    // Mettre à jour le score affiché sur la page
    const spanScore = document.querySelector(".zoneScore span");
    spanScore.innerText = score;

    // Masquer la zone de saisie
    const zoneSaisie = document.querySelector(".zoneSaisie");
    zoneSaisie.style.display = "none";  // Supprimez cette ligne pour éviter la répétition

    // Réinitialiser l'affichage de la zone de proposition
    const zoneProposition = document.querySelector(".zoneProposition");
    zoneProposition.style.display = "none";
    zoneProposition.innerText = ""; // Effacer le contenu

    // Démarrer le jeu en affichant la première chaîne de caractères aléatoire
    afficherNouvelleChaine();

    // Ajouter un écouteur d'événements pour le clic sur le bouton "Valider"
    const btnValiderMot = document.getElementById("btnValiderMot");
    btnValiderMot.addEventListener("click", verifierLettre);

    // Ajouter un écouteur d'événements pour la touche "Entrée" dans le champ de saisie
    const inputEcriture = document.getElementById("inputEcriture");
    inputEcriture.addEventListener("keydown", function(event) {
            verifierLettre();
        }
    });
}
