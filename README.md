# ZacianLogs

Bot open souce de logs

## Avertissement

Vous devez **imperativement** mettre une mention disant que le votre bot est issu de ce repo

## Installation

```git clone https://github.com/zechaos031/ZacianLogs.git```

```cd ZacianLogs/ && npm i```

Créer un fichier `.env` et mettre les valeur `TOKEN=` `DBCONNECT=` `WHLOG=`
```
TOKEN est le token de votre bot
DBCONNECT est le lien de la connection a la base de donné mongo db
WHLOG est le token du webhook pour les logs des errors
```
Votre fichier doit ressemblé a ca 

```dotenv
TOKEN=
DBCONNECT=
WHLOG=
```

Renomer `option.js.exemple` en `option.js`

et remplissé les fonctionnalité que vous voulez le reste doit etre commenté 

 ## Lancement
 
`node main.js`

vous pouvez aussi faire via nodemon

`npm i nodemon`

`nodemon main.js`


