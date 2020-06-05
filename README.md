# ZacianLogs

Bot open souce de logs

## Avertissement

Vous devez **imperativement** mettre une mention disant que le votre bot est issu de ce repo

## Installation

```git clone https://github.com/zechaos031/ZacianLogs.git```

```cd ZacianLogs/ && npm i```

Créer un fichier `.env` et mettre les valeur `TOKEN=` `SECRET=` `SSECRET=` `WHLOG=`

TOKEN est le token de votre bot
SECRET est le client secret de votre application
SSECRET est un mot de passe de securisation (vous pouvez metttre n'importe quel valeur)
WHLOG est le token du webhook pour les logs des errors

Votre fichier doit ressemblé a ca 

```dotenv
TOKEN=
SECRET=
SSECRET=
WHLOG=
```

Renomer `option.js.exemple` en `option.js`

et remplissé les fonctionnalité que vous voulez le reste doit etre commenté 

 ## Lancement
 
`node main.js`

vous pouvez aussi faire via nodemon

`npm i nodemon`

`nodemon main.js`


