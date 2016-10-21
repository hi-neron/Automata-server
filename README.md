# AUTÓMATA proyecto
> Proyecto autómata es una de las tantas formas de jugar "cadáver exquisito", juego surrealista
en el que se construyen contenidos entre varios autores.

# Features
> El usuario podrá subir imagenes. las imagens estaran basadas en un template que se descargará desde la web.

1. VISITANTE
    * Puede visualizar las imagenes.
    * Puede consumir la información de los autores.
    * Puede descargar la plantilla.
    * Puede crear una cuenta.
        * Local
        * Facebook
    * NO PUEDE:
        * No puede interactuar con las piezas en modo juego.
        * No puede ganar puntos.
        * No puede acceder al chat.
        * No tiene presencia en la página.

2. USUARIO LOGEADO
    * Solo puede interactuar con una imagen subida
    * Puede interactuar con sus imágenes
        * Guardar
        * Eliminar
    * Puede crear un perfil
        * Avatar
        * Intereses
        * Email
            * Privado / Publico
        * Facebook
    * Libreta de Mensajes __!__
    * Puede interactuar con otros usuarios (Mensajes) __!__
    * Favoritos __!__
3. IMÁGENES
    * tienen una descripción
    * Comentarios
    * Divertida / Increible / Take my money (I want this product) / favoritos
5. REALTIME
    * Movimientos
4. JUEGO
    1. MOVIMIENTOS
    2. PUNTAJES
5. AUTH


# User camps

**user form**
username
password
name
email
bio
**data**
createdAt
avatar
masteries

**Scores & prizes**
skills
points
badges
level

**Comunications**
alerts
messages

**helpers**
images

#Image camps
**user**
userId

**form**
name
src
description

**Database**
createdAt
awards
sponsors

# Layers
## Main - layer 1
app

### layer 2

### layer 3 / API
| usuarios | imágenes | autentificacion | movimientos |
|:--------:|:--------:|:---------------:|:-----------:|
| get      | get      | auth            | movimientos |
| save     | getAll   |                 | movimientos |
|          | save     |                 | movimientos |
|          | delete   |                 | movimientos |


### layer 4 / Database
| Usuarios         | Imágenes      | Autentificacion | Grid          | Game             |
|:----------------:|:-------------:|:---------------:|:-------------:|:----------------:|
| Get              | Get           | Auth            | CreateGrid    | AddSkill(user)   |
| Save             | Getall        |                 | GetGrid       | |
| GetByMasteries   | Save          |                 | ActualizeGrid ||
| AddMasteries     | Getbytag      |                 |               ||
| CreateChallenge  | Delete        |                 |               ||

1. Users profile
    *. Avatar
    *. Name
    *. UserName
    *. Password
    *. PublicId
    *. Masteries | > 3
    *. Skills | habilidades en el juego desbloqueadas


##License

The MIT License (MIT)
Copyright (c) 2016, Jose Sánchez

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
