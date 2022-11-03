## Trash Buster - Front React - Back Node JS et MongoBD

## LANCEMENT DU SERVEUR
Démarrer le server : `cd serveur`+ `npm start`

Démarrer le front : `cd client` + `npm start`

_____________________________

### Configuration du back :
* Mettez vos informations de connexion à votre base dans `/config/connect.js`
* Créez le fichier `.env` dans `/config/` dans les données suivantes
   - APP_PORT=5000 `votre port localhost`
   - ORIGIN=http://localhost:3000 `votre URL client`
   - MONGO_URI= `la string de connexion complète à votre bdd `
   - JWT_SECRET=990bf68e6adf1be5f1671bba3bec692056922454 `votre clé secrète aléatoire`
   - JWT_LIFETIME='3600s' `durée de validité de votre token`
_________________________
  
### Configuration du front : 
* Créez un fichier `.env` à la racine du dossier client :
   - REACT_APP_API_KEY='9b046043418a4a1b90d36bab6f33b1db' `clé d'utilisation de l'API Leaflet pour la génération de la carte dans la page "Detail post" `
_____________________________



  
💻 Réalisé par Adeline LUCAS, novembre 2022. 