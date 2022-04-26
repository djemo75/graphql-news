## Информация за проекта
Разработено е АПИ с graphql и typescript, като за база данни се използва mongoDb.

Проектът се състои от 3 таблици(колекции) - потребители, новини и изтекли токени.

Някои от мутациите са разрешени само за аутентикирани потребители. За вход се използва login мутацията, а за изход logout мутацията, която инвалидира самия токен, 
като го добавя в отделна колекция. За повече информация погледнете документацията от демо линка по-долу.


Примерен Header за аутентикиране
````
"Authorization": "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY2OTU0MDllNWY2ZDRlNjY3MjZhNmMiLCJ1c2VybmFtZSI6ImRqZW1vNzUiLCJpYXQiOjE2NTEwMDQyNzAsImV4cCI6MTY1MTA5MDY3MH0.d2AMTioplGu_tKwNwUA1P_e5sNSbFzTImYa2oiGMPF4" 
````


DEMO: https://fmi-graphql-news.herokuapp.com/graphql
