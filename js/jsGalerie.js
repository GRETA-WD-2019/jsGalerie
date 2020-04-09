var jsGalerieShowPhoto=function(evenement){
    //affichage de la photo

    
    //on empeche le navigateur de suivre le lien sur leque on a cliqué.
    evenement.preventDefault();

    //Récupération de l'URL de la photo originale
    /* event.currentTarget = balise A sur laquelle j'ai cliqué */
    let photoURL=event.currentTarget.getAttribute("href");
    console.log("affiche de la photo."+photoURL);


    //Récupération de la légende la photo
    /* Récupération de la balise IMG à l'intérieur de mon lien. Puis récupérer l'attribut title de l'image */
    let photoLegende=event.currentTarget.querySelector("img").getAttribute("title");
    console.log(photoLegende);

    //Réation d'une div qui va recouvrir l'espace d'affichage.
    let jsGalerieMask=document.createElement("div");
    
    //Ajout des instruction de style
    jsGalerieMask.style.width="100vw";
    jsGalerieMask.style.height="100vh";
    jsGalerieMask.style.backgroundColor="rgba(0,0,0,0.5)"; //transparent
    jsGalerieMask.style.position="fixed";
    jsGalerieMask.style.top="0";
    jsGalerieMask.style.left="0";
    jsGalerieMask.style.zIndex="1000";
    jsGalerieMask.style.display="flex";
    jsGalerieMask.style.alignItems="center";
    jsGalerieMask.style.justifyContent="center";
    jsGalerieMask.style.opacity="0";
    jsGalerieMask.style.transition="opacity 0.7s";


    //Fermeture du masque quand on click dessus
    jsGalerieMask.addEventListener("click",
            function(e){

            /*	
                //récupération masque
                let masque = e.currentTarget;
                //recupération parent
                let parentDeMasque= masque.parentNode;
                console.log(parentDeMasque);
                //Suppression de masque
                parentDeMasque.removeChild(masque);
            */

            
            // Al fin de la transition ( opacité revenue à 0) on supprime le masque.
            e.currentTarget.addEventListener("transitionend",
            
                function(e){
                    console.log("transition fini suppression du masque");
                    e.currentTarget.parentNode.removeChild(e.currentTarget);
                }
            
            );
            
            //on remet l'opacité à 0
            e.currentTarget.style.opacity="0";

            }
    );


    //Creation du cadre photo
    let jsGaleriePhotoFrame=document.createElement("figure");

        jsGaleriePhotoFrame.style.position="relative";
        jsGaleriePhotoFrame.style.fontSize="0";

    //Remplissage du cadre photo
    //jsGaleriePhotoFrame.innerHTML='"<img src="'+photoURL+'"><figcaption>'+photoLegende+'</figcation>';


    let jsGaleriePhoto=document.createElement("img");
    jsGaleriePhoto.src=photoURL;

        jsGaleriePhoto.style.maxWidth="80vw";
        jsGaleriePhoto.style.maxHeight="80vh";
    
    jsGaleriePhotoFrame.appendChild(jsGaleriePhoto);

    
    if (photoLegende != null && photoLegende != ""){
        
        let jsGalerieLegende=document.createElement("figcaption");

        jsGalerieLegende.innerHTML=photoLegende;

            jsGalerieLegende.style.position="absolute";
            jsGalerieLegende.style.left="0";
            jsGalerieLegende.style.bottom="0";
            jsGalerieLegende.style.padding="2vmin";
            jsGalerieLegende.style.backgroundColor="rgba(0,0,0,0.7)";
            jsGalerieLegende.style.width="100%";
            jsGalerieLegende.style.color="whitesmoke";
            jsGalerieLegende.style.textAlign="left";
            jsGalerieLegende.style.boxSizing="border-box";
            jsGalerieLegende.style.fontSize="1rem";

        jsGaleriePhotoFrame.appendChild(jsGalerieLegende);
    }


    //Ajout du cadre photo dans le masque.
    jsGalerieMask.appendChild(jsGaleriePhotoFrame);




    //Ajout du masque à la fin du body
    document.body.appendChild(jsGalerieMask);
    
    //afin que la transition soie prise en compte on déclanche le chnagement d'opacité au bout de 50ms
    setTimeout(
        function(){
            jsGalerieMask.style.opacity="1";
        },
        50

    )
    

}



var jsGalerieInit=function(){

    //récupération de tous les liens
    let Liens=document.querySelectorAll(".jsGalerie>a");

    console.log(Liens);

    // ajouter un évenement onClick sur chaque lien
    for (index=0;index<Liens.length;index++){

            Liens[index].addEventListener("click",jsGalerieShowPhoto);

    }

}


// AU chargelent on initialise la galerie
window.addEventListener("load",jsGalerieInit);