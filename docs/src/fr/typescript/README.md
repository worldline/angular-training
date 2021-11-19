# TypeScript

TypeScript est un choix populaire pour les programmeurs habitués à d'autres langages à typage statique, tels que Java. Angular, qui est entièrement construit en TypeScript, non seulement le prend en charge, mais le traite comme son langage principal.

Le système de types de TypeScript offre un bon nombre d'avantages, similaire à ceux de Java/C#, tels qu'une meilleure complétion du code, une détection plus précoce des erreurs et une communication plus claire entre les parties de votre programme. Bien que TypeScript fournisse de nombreuses fonctionnalités familières aux développeurs POO, il vaut la peine de prendre du recul pour voir en quoi JavaScript (et donc TypeScript) diffère des langages POO traditionnels. Comprendre ces différences vous aidera à écrire un meilleur code JavaScript et à éviter les pièges courants dans lesquels peuvent tomber les programmeurs qui passent directement de C#/Java à TypeScript.

## Repenser les types

La compréhension d'un type par TypeScript est en fait assez différente de C# ou de Java. Explorons quelques différences.

### Systèmes de types réifiés nominaux : Java/C#

En Java ou C#, toute valeur ou objet donné a un type exact - soit null, une primitive ou un type de classe connu. Nous pouvons appeler des méthodes telles que `value.GetType()` ou `value.getClass()` pour récupérer le type exact au runtime. La définition de ce type résidera dans une classe quelque part avec un nom, et nous ne pouvons pas utiliser deux classes avec des formes similaires à la place l'une de l'autre à moins qu'il n'y ait une relation d'héritage explicite ou une interface couramment implémentée par les deux.

Ces aspects décrivent un système de type *réifié, nominal*. Les types que nous écrivons dans le code sont présents à l'exécution et les types sont liés via leurs déclarations, et non leurs structures.

### Système de type structurel : TypeScript

L'un des principes de base de TypeScript est que la vérification de type se concentre sur la forme des valeurs. C'est ce qu'on appelle parfois « duck typing » ou « typage structurel ».

Dans un système de type structurel, si deux objets ont la même forme, ils sont considérés comme du même type. Par exemple, si nous construisons un objet qui satisfait une interface, nous pouvons utiliser cet objet là où cette interface est attendue même s'il n'y avait pas de relation déclarative entre les deux.

``` typescript
interface Point {
  x: number
  y: number
}

function logPoint(point: Point): void {
  console.log(`${point.x}, ${point.y}`)
}

// logs "12, 26"
const force = { x: 12, y: 26 }
logPoint(force)
```

La variable `force` n'est jamais déclarée comme étant de type Point. Cependant, lors de la vérification de type, TypeScript compare la forme de `force` à la forme de `Point`. Ils ont la même forme, donc le code passe.

Le système de types de TypeScript n'est pas non plus *réifié* : il n'y a rien au runtime qui nous dira que `force` est Point. En fait, le type Point n'est présent sous aucune forme à l'exécution.

La concordance des formes marchent même si uniquement un sous-ensemble des champs de l'objet correspond.

``` typescript
const point3 = { x: 12, y: 26, z: 89 }
logPoint(point3) // logs "12, 26"

const rect = { x: 33, y: 3, width: 30, height: 80 }
logPoint(rect) // logs "33, 3"

const color = { hex: '#187ABF' }
logPoint(color)
// Argument of type '{ hex: string; }' is not assignable to parameter of type 'Point'.
// Type '{ hex: string; }' is missing the following properties from type 'Point': x, y
```

Il n'y a pas de différence dans la façon dont les classes et les objets se conforment aux formes :

```typescript
class VirtualPoint {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const newVPoint = new VirtualPoint(13, 56);
logPoint(newVPoint); // logs "13, 56"
```

Si l'objet ou la classe possède toutes les propriétés requises, TypeScript dira qu'elles correspondent, quels que soient les détails d'implémentation.

## Relation avec JavaScript

TypeScript entretient une relation inhabituelle avec JavaScript. TypeScript offre toutes les fonctionnalités de JavaScript additionnées d'un surcouche : le système de types de TypeScript. Cela signifie que votre code fonctionnel JavaScript existant est également du code TypeScript.

![ts vs js](../../assets/ts-vs-js.png)

### Syntaxe

TypeScript est un langage qui est un sur-ensemble de JavaScript : la syntaxe JS est donc du TS légal. TypeScript ne considère aucun code JavaScript comme en erreur en raison de sa *syntaxe*. Cela signifie que vous pouvez prendre n'importe quel code JavaScript fonctionnel et le mettre dans un fichier TypeScript sans vous soucier exactement de la façon dont il est écrit. Cependant, si vous déplacez du code d'un fichier JavaScript vers un fichier TypeScript, vous pourriez voir des erreurs de *type* selon la façon dont le code est écrit.

### Comportement à l'exécution

TypeScript est un langage de programmation qui préserve le *comportement* runtime de JavaScript. Par exemple, la division par zéro en JavaScript produit « Infinity » au lieu de lever une exception au runtime. Par principe, TypeScript **ne change jamais** le comportement runtime du code JavaScript et produira également `Infinity`.

Cela signifie que si vous déplacez le code de JavaScript vers TypeScript, il est **garanti** de s'exécuter de la même manière, même si TypeScript pense que le code contient des erreurs de type.

Garder le même comportement au runtime que JavaScript est une promesse fondamentale de TypeScript, car cela signifie que vous pouvez facilement passer d'un langage à l'autre sans vous soucier des différences subtiles qui pourraient empêcher votre programme de fonctionner.

### Types effacés

Grosso modo, une fois que le compilateur de TypeScript a terminé de vérifier votre code, il efface les types pour produire le code "compilé" résultant. Cela signifie qu'une fois votre code compilé, le code JS brut résultant n'a aucune information de type.

Cela signifie également que TypeScript ne modifie jamais le comportement de votre programme en fonction des types qu'il a déduits. L'essentiel est que même si vous veniez à voir des erreurs de type lors de la compilation, le système de type n'a, en lui-même, aucune incidence sur le fonctionnement de votre programme lorsqu'il s'exécute.

Enfin, TypeScript ne fournit aucune librairie runtime supplémentaire. Vos programmes utiliseront la même librairie standard (ou librairies externes) que les programmes JavaScript, il n'y a donc pas de framework supplémentaire spécifique à TypeScript à apprendre.

## Expérimeter

::: tip
Si vous voulez expérimenter avec TypeScript, vous pouvez soit l'installer localement `npm install -g typescript`, mettre votre code dans un fichier `.ts` et exécuter `tsc path/to/file.ts` pour le compiler, ou alors, essayer directement en ligne dans un [playground](https://www.typescriptlang.org/play?#code)
:::

Les exemples suivants sont disponibles [ici](https://www.typescriptlang.org/play?strictFunctionTypes=false#code/PTAEEMCdPBPBYAUAGwKYBdTtQWwA6ozoCukqAzgFygB2xOARoQNoC6S2+h4JZ5oAXlDMATAAYANKACMADikiRU6SPaJOBIqQoA6PMXIALABRyAlEgDGAexrlraHcmsBzYxu68KZ0CFDOXflFJGXlQRWUlULUkP1Q6HCR4+lAAEQBLMkt0dNtQAG8kUFAAUXByTCEAIhKAQQBlABUqiSLQAHUKStAq9pKmlrb662J0Q0Ee+oB5AFVGgAlBxGKAOWtIMYmqlamAJQWlgF8rWwrQABNM1GzcmgmMrJzbHTKKk7sHVCdXY0vH258fgC-BqDWaSFiYBIeDQSDQmEspDINHQnR4hkI1GYFUg6RoLikCSYkCkD2uTxoakR0HiqNQ6MIE2YAHJyMQaDRYMyFFEyTdnsNRoYqadMOlyPV2ZyJtTkXSGZBmGJWIIBEJWVKuRDEH4AGbs-l3ciwFHgAAeSH1NENFwollxTDRY0IxgA7vTnZAsTi8QTaPRiaSrobWGZqAA3azpc4FNo2D6OALGAAGjQxoHdCtA4tAABJ8pnPUrWIcpK70ptwFhcJoeNpQNZdXmCx6MYrpCXkxZEMdEOc7Q7UE628ZZbTh4Ru-3yPb0o7Wy6-uSAdq-LUaLZYDgRvwrYb3md3agANbxc4TyBMllsjlcnlB-4CkZjVhSa-odY4O-hMJ8ik6QUXzUPxGlgAh6lnPAxRoXVCH4MYeCwdN0DA1AGybQs22zIIfXxQkA0IB9l1sFVdUgawcCQtD42wM10APTAj1PGhzkaGtPG0fghCYs8Lx0HBwDwN0F0vAQAD4MxE5gO27eN7ETH4eJYtiuC0PhATAAAZVwggicIABYYh1MApgYAArckGNAHBxXQGBkGofIl0Nag-1uKRyAIVBzmoIlCEOCZ8guYMKVckLbh0NYNkMDyvJ80B9IAVlAXs9wpW0Z0Hdo8XON0csc5zQrScLbFi1BvN8gjIEOMNQEjaNY2WUA5M+b43CqNM0PLFjQE88qYxzKpQAAagzHKdD67zu2KFqFLcVN026gb+BsGz8VAMiKKo5slp0QqIo-bT3UgABhcpUGMMxDi7JBe2nWdHRy4wbJxcBkG7JA8WwSBdXASw0OynrCia-bbDCx8aDaSb4r8yBbtXKFUI6HLAshYpgoh8HiMh4z0ehyrGEINHe0tA10vurKcvqOK8pY6hAfOWr6pjYGZtOVqkw6xaUeh7CehGsaWImuLu1Ssnbgyh6hxytzbFp+KGaZqMWbjdm5pTTrBeW5qKN9DbyMo50dvG0GaB0Q7rGOs7yAuq6bp7BHQBmGgJZQghyFJ610rwXEUQASVy6MCeJUAAB9ers30fFZnWEy+TmAE0RkvP3Uj5obRujUWkB9r6A9MMRpA0-wdJ6JPSFAVO+ekQuqhz330HzqpxBEKpi+BMvk8rtOcxbuvEFz-3cqCr9U+oRQAGZ9JEFLi5KaB1kdzSK24ZAsFQj3EDSiXB-QNi6OMKgI99v03vSFwaBwWlqCqNBdXQIbw6qXEXEMB+w56f6UUINvGuKPwdCAPhgPBu+90DGCqPMVAyBnBlnWMgc4LQeh3wft2XeYCIEAHFmTnDgFIAS2AkFVC-nZVAbdHapHpMgPW5ZNh0BgRAHq7J+y6jxBVUAKwoDkW6i4T2NpzjWGGFfMYvpjBmmoLhFwH9mGoFYTQKaBRfBgBtmhI2Bg0KNggKAdkrskZtlQG0dITYxGgAAIRqm0SxWRbDGaKL8DQLhltfRtDZnHNqECoEwOsFIDOoAzTm2sDMPAmhra22milYBaNKFn3WrQ8Y9C17gCYVYuR7CphQVuG9ZqhhwB4mcSgDAzUkTjnysjHq4cZGpPOAeDmPwxwogZntEqNBi7MBKLsXYKpTIWWyHzPA1hyDkDnMgWAoBmSVJscyHQNT1b1NRDlAA-E0iG7dS4TPkdU3GtRLAAEdiCZD1rg9AVZAHTMQHMhmgUMbYyxoaF45R0BlXYeICJ5y1bxzqcUhpizhb9Q0h3cQFCqE0IrPE4gDCkkxnWewlY4LqFGB1m9O0+T4Ra2pv1YOjIKkpJsTMj5bglrou8qABZCyxkbguDwKssAMDMlWYEWg1hKXHNADS+iWzdn7JPsyk5QDECErihMEQE88XuIFf1ElZLmQUqOdS2l9L+DCqQEAA)

## Type

### Primitives courantes
JavaScript a trois primitives très couramment utilisées : `string`, `number` et `boolean`. Chacune a un type correspondant en TypeScript. Comme vous pouvez vous y attendre, ce sont les mêmes noms que vous verriez si vous utilisiez l'opérateur JavaScript `typeof` sur une valeur de ces types :

- `string` représente des valeurs de chaîne de caractères comme `"Hello, world"`
- `number` est pour les nombres comme `42`. JavaScript n'a pas de valeur d'exécution spéciale pour les entiers, il n'y a donc pas d'équivalent à int ou float - tout est simplement un nombre
- `boolean` est pour les deux valeurs `true` et `false`

``` typescript
let message: string
message = "hello!"

// TypeScript can infer types, here it infers from the context that it is a string
const obviousString = "hello!"
```

::: tip
TypeScript n'utilise pas le style de déclarations « types à gauche » comme `int x = 0`. Les annotations de type iront toujours après la chose typée.
:::

::: warning
Les noms de type `String`, `Number` et `Boolean` (commençant par des lettres majuscules) sont légaux, mais font référence à certains types spéciaux intégrés  à TS qui apparaîtront très rarement dans votre code. *Toujours* utiliser `string`, `number` ou `boolean` pour les types.
:::

### Types de base

- `any` une valeur non typée
- `object` une valeur non primitive
- `undefinded` une valeur non initialisée
- `null` une valeur explicitement vide
- `void` représente la valeur de retour des fonctions qui ne renvoient pas de valeur. C'est le type inféré chaque fois qu'une fonction n'a pas d'instructions de retour ou ne renvoie aucune valeur explicite à partir de ces instructions de retour
- `never` représente des valeurs qui ne sont *jamais* observées. Dans un type de retour, cela signifie que la fonction lève une exception ou termine l'exécution du programme
- `unknown` représente *toute* valeur. Ceci est similaire au type `any`, mais est plus sûr car il n'est pas légal de faire quoi que ce soit avec une valeur de type unknown
- `T[]` un tableau de type T, peut aussi s'écrire `Array<T>`
- `[T, U]` un tuple de type T et U
- `enum`

``` typescript
// array
let temperatures: number[]
temperatures = [20, 18, 22, 12]
temperatures.push(18)
console.log(temperatures) // logs [20, 18, 22, 12, 18]

// enum
enum Direction {
  East = "EAST",
  West = "WEST",
  South = "SOUTH",
  North = "NORTH",
}
const direction = Direction.East
console.log(direction) // logs "EAST"

// tuple
let currentWeather: [string, number, Direction]
currentWeather = ['sunny', 22, Direction.South]
const isSunny = currentWeather[0] === 'sunny'
```

::: warning
Les énumérations sont une fonctionnalité ajoutée à JavaScript par TypeScript qui permet de décrire une valeur qui pourrait faire partie d'un ensemble de constantes nommées possibles. Contrairement à la plupart des fonctionnalités de TypeScript, il ne s'agit pas d'un ajout de typage à JavaScript, mais d'un élément ajouté au langage et à son exécution. Pour cette raison, il s'agit d'une fonctionnalité dont il est intéressant de connaître l'existence, mais que vous pouvez vous retenir d'utiliser à moins d'en être sûr. Vous pouvez en savoir plus sur les enums dans la [page de référence Enum](https://www.typescriptlang.org/docs/handbook/enums.html).
:::

### const, let et var

Typescript permet de définir deux types de variables :

- Variables mutables déclarées à l'aide du mot-clé `let`. L'ancien mot-clé `var` peut également être utilisé mais n'est pas recommandé car sa façon de gérer le scope peut être trompeur.
- Les variables ou constantes immuables sont déclarées avec `const`. Veuillez noter que les champs de constantes peuvent toujours être modifiés, les constantes ne peuvent tout simplement pas être réaffectées.

```typescript
let x = 10;
var y = 200.0; // ! do not use var, use let instead

const t = [1, 2, 3];
t = ['a', 'b']; // ! error because it's a const
t.push(4); // ok

const meal = { name: "sandwich" }
const meal = { name: "soup" } // ! error
meal.name = "soup"; // ok
```

:::tip
Certains programmeurs aiment utiliser `const` par défaut, puis passer à `let` si nécessaire. Cela permet d'avoir un code optimisé par défaut et évite de modifier des valeurs par erreur.
:::

### Les fonctions
Les fonctions sont le principal moyen de transmettre des données en JavaScript. TypeScript vous permet de spécifier les types des valeurs d'entrée et de sortie des fonctions.

``` typescript
function describeWeather(weather: [string, number, Direction]): void {
  console.log(`The weather is ${weather[0]}, with a temperature of ${weather[1]}`)
}

describeWeather(currentWeather) //logs "The weather is sunny, with a temperature of 22"
describeWeather(direction) // Error
// Argument of type 'Direction' is not assignable to parameter of type '[string, number, Direction]'.
```

Les fonctions anonymes sont un peu différentes des déclarations de fonction. Lorsqu'une fonction apparaît à un endroit où TypeScript peut déterminer comment elle va être appelée, les paramètres de cette fonction reçoivent automatiquement leurs types.

``` typescript
const weekendWeather = [['sunny', 22, Direction.South], ['stormy', 24, Direction.South]]
// TypeScript infers the type of weather is [string, number, Direction] from the context
const weekendTemperatures = weekendWeather.map(weather => weather[1])
console.log(weekendTemperatures) // Logs [22, 24]
```

### Types d'objets
En dehors des primitives, le type le plus courant que vous rencontrerez est le type `objet`. Cela fait référence à n'importe quelle valeur JavaScript avec des propriétés, c'est-à-dire presque toutes ! Pour définir un type objet, on liste simplement ses propriétés et leurs types.

``` typescript
const mistral: {direction: Direction, speed: number} = {direction: Direction.North, speed: 45}
function describeWind(wind: {direction: Direction, speed: number}): void {
  console.log("The wind speed is " + wind.speed)
  console.log(`The wind is coming from the ${wind.direction.toLowerCase()}`)
}
describeWind(mistral)
```

Pour éviter les répétitions, les types d'objets peuvent être nommés à l'aide soit d'une interface

``` typescript
interface Wind {
  direction: Direction
  speed: number
}

function describeWindSpeed(wind: Wind): void {
  console.log("The wind speed is " + wind.speed)
}
```

soit d'un alias de type.
``` typescript
type Wind = {
  direction: Direction
  speed: number
}

function describeWindDirection(wind: Wind): void {
  console.log(`The wind is coming from the ${wind.direction.toLowerCase()}`)
}
```

Les alias de type et les interfaces sont très similaires et, dans de nombreux cas, vous pouvez choisir librement entre eux. Presque toutes les fonctionnalités d'une interface sont disponibles avec des alias de type. La distinction clé est qu'un alias de type ne peut pas être rouvert pour ajouter de nouvelles propriétés alors qu'une interface est toujours extensible. Nous privilégierons les Interfaces dans la suite de la formation.

### Types union
La première façon de combiner les types que vous pourriez voir est un type union. Un type union est un type formé de deux ou plusieurs autres types, représentant des valeurs qui peuvent être n'importe lequel de ces types. Nous appelons chacun de ces types les membres de l'union.

``` typescript
function printId(id: number | string) {
  console.log("Your ID is " + id)
}
printId(101) // logs "Your ID is 101"
printId("202") // logs "Your ID is 202"
printId({ myID: 22342 }) // Error
// Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
// Type '{ myID: number; }' is not assignable to type 'number'.
```

### Types littéraux
En plus des types généraux `string` et `number`, nous pouvons faire référence à des chaînes et des nombres *spécifiques* dans les positions de type. En combinant des littéraux dans des unions, vous pouvez exprimer un concept utile - par exemple, des fonctions qui n'acceptent qu'un certain ensemble de valeurs connues.

``` typescript
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left")
printText("G'day, mate", "centre") // Error
// Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

## Traiter les valeurs null et undefined

Comment `null` et `undefined` se comportent dépend de l'activation ou de la désactivation de l'option `strictNullChecks` du compilateur TypeScript

- `strictNullChecks` *off*

Les valeurs qui pourraient être `null` ou `undefined` sont toujours accessibles normalement, et les valeurs `null` et `undefined` peuvent être affectées à une propriété de n'importe quel type. Ceci est similaire à la façon dont les langages sans vérifications nulles (par exemple, Java, C# avant la version 8) se comportent. Le manque de vérification de ces valeurs a tendance à être une source majeure de bugs ; il est fortement recommandé d'activer `strictNullChecks` si cela est pratique de le faire dans votre code.

- `strictNullChecks` *on*

Lorsqu'une valeur est nulle ou indéfinie, vous devrez tester ces valeurs avant d'utiliser des méthodes ou des propriétés sur cette valeur. Voici les différentes stratégies qui s'offrent à vous :

### Affiner
``` typescript
function doSomething(x: string | undefined) { // see the use of a union type here
  if (x !== undefined) { // narrowing
    console.log("Hello, " + x.toUpperCase())
  }
}
```

### Optional chaining
L'optional chaining - l'opérateur `?` - nous permet d'écrire du code où TypeScript peut immédiatement arrêter l'exécution de certaines expressions si nous rencontrons un `null` ou `undefined`.
``` typescript
let currentWind: Wind | undefined
console.log(currentWind.direction) // [ERR] Object is possibly 'undefined'.
console.log(currentWind?.direction) // logs undefined
// Acquiring data ...
currentWind = { direction: Direction.East, speed: 20 }
console.log(currentWind?.speed) //logs 20
```

### Nullish coalescing
Vous pouvez considérer cette fonctionnalité - l'opérateur `??` - comme un moyen de « repli »  vers une valeur par défaut lorsque `null` ou `undefined` sont rencontrées.
``` typescript
let windSpeed: number | undefined
console.log(windSpeed ?? 'no data yet') // logs no data yet
// Acquiring data ...
windSpeed = 23
console.log(windSpeed ?? 'no data yet') // logs 23
```

## Les classes
TypeScript offre une prise en charge complète du mot-clé class introduit dans ES2015.

Comme avec les autres fonctionnalités du langage JavaScript, TypeScript ajoute des annotations de type et d'autres syntaxes pour vous permettre d'exprimer les relations entre les classes et les autres types.

### Les membres d'une classe

```typescript
class Point {
  x: number
  y: number
  z = 0

  constructor(x: number, y: number = 0) {
    this.x = x
    this.y = y
  }

  scale(n: number): void {
    this.x = this.x * n
    this.y = this.y * n
  }
}

const pt = new Point(10)
console.log(pt.y) // logs 0
pt.x = 0
pt.y = 7
pt.y = "0" // Type 'string' is not assignable to type 'number'.
```

#### Les champs

`x`, `y` et `z` sont des déclarations de champs, ils créent des propriétés publiques en écriture sur la classe. Comme pour les autres emplacements, l'annotation de type est facultative, mais sera implicitement *any* si elle n'est pas spécifiée. Les champs peuvent avoir des *initiliseurs* comme `z`. Ceux-ci s'exécuteront automatiquement lorsque la classe sera instanciée. Tout comme avec `const`, `let` et `var`, l'initialiseur d'une propriété de classe sera utilisé pour déduire son type. Ici, cela signifie que, même s'il n'est pas explicitement écrit que `z` est de type `number`, le compilateur TypeScript le déduit du fait que `0` a été passé à `z`. Les champs peuvent être préfixés par le modificateur `readonly`. Cela empêche l'affectation du champ en dehors du constructeur.

#### Constructeurs

Les constructeurs de classe sont très similaires aux fonctions. Vous pouvez ajouter des paramètres avec des annotations de type, des valeurs par défaut et des surcharges. Cependant, ils n'ont pas d'annotations de type de retour

#### Méthodes

Une propriété fonction sur une classe est appelée une méthode. Les méthodes peuvent utiliser les mêmes annotations de type que les fonctions et les constructeurs. Notez qu'à l'intérieur d'un corps de méthode, il est toujours obligatoire d'accéder aux champs et autres méthodes via `this`. Un nom non qualifié dans un corps de méthode fera toujours référence à quelque chose dans le scope englobant.

### Visibilité des membres

Vous pouvez utiliser TypeScript pour contrôler si certaines méthodes ou propriétés sont visibles pour le code en dehors de la classe.

Il y a 3 mots clés : `public`, `protected` et `private`.
- La visibilité par défaut d'un membre de la classe est `public`. Les membres publics sont accessibles de n'importe où. Étant donné que `public` est déjà le modificateur de visibilité par défaut, vous n'avez jamais besoin de l'écrire sur un membre de la classe, mais vous pouvez choisir de le faire pour des raisons de style/lisibilité.
- Les membres `protected` ne sont visibles que par les sous-classes de la classe dans laquelle ils sont déclarés.
- `private` est comme `protected`, mais ne permet pas l'accès au membre même à partir des sous-classes

::: warning
Comme d'autres aspects du système de types de TypeScript, `private` et `protected` ne sont appliqués que lors de la vérification de type. Cela signifie que les opérateurs JavaScript tels que `in` ou la simple recherche de propriété peuvent toujours accéder à un membre `private` ou `protected`. Si vous devez protéger les valeurs de votre classe contre les acteurs malveillants, vous devez utiliser des mécanismes offrant une confidentialité stricte à l'exécution, tels que des closures, des weak maps ou des champs private.
:::

::: tip
Depuis la version 3.8, Typescript prend en charge [les champs private ECMAScript](https://www.typescriptlang.org/docs/handbook/classes.html#ecmascript-private-fields).
:::

### Héritage de classe

Comme d'autres langages dotés de fonctionnalités orientées objet, les classes en JavaScript peuvent hériter de classes de base.

- `implements`: Vous pouvez utiliser une clause implements pour vérifier qu'une classe satisfait une interface particulière.
```typescript
interface Pingable {
  ping(): void
}

class Sonar implements Pingable {
  ping() {
    console.log("ping!")
  }
}

class Ball implements Pingable {
//Class 'Ball' incorrectly implements interface 'Pingable'.
//  Property 'ping' is missing in type 'Ball' but required in type 'Pingable'.
  pong() {
    console.log("pong!")
  }
}
```

- `extends`: Les classes peuvent étendre une classe de base. Une classe dérivée possède toutes les propriétés et méthodes de sa classe de base et peut également définir des membres supplémentaires.
```typescript
class Animal {
  move() {
    console.log("Moving along!")
  }
}

class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!")
    }
  }
}

const d = new Dog()
d.move()// Base class method
d.woof(3) // Derived class method
```

## Modules
En TypeScript, tout comme dans ECMAScript 2015 (ES6), tout fichier contenant à son début un import ou un export  est considéré comme un module.

A l'inverse, un fichier sans déclaration d'import ou d'export en début de fichier est traité comme un script dont le contenu est disponible dans le scope global (et donc aussi pour les modules).

Les modules sont exécutés dans leur propre scope, pas dans le scope global. Cela signifie que les variables, fonctions, classes, etc. déclarées dans un module ne sont pas visibles en dehors du module à moins qu'elles ne soient explicitement exportées à l'aide de l'une des syntaxes d'export. Inversement, pour consommer une variable, une fonction, une classe, une interface, etc. exportée d'un module différent, il faut l'importer à l'aide d'une des syntaxes d'import.

Un fichier peut déclarer des exports :
```typescript
// @filename: maths.ts
export var pi = 3.14
export let squareTwo = 1.41
export const phi = 1.61

export class RandomNumberGenerator {}

export function absolute(num: number) {
  return  num < 0 ? num * -1 : num
}
```
Ceux-ci peuvent être utilisés dans un autre fichier via la syntaxe d'import :

```typescript
import { pi, phi, absolute } from "./maths.js"

console.log(pi)
const absPhi = absolute(phi)
```

## TypeScript et Angular

Comme dit précédemment, TypeScript est le langage principal d'Angular. La plupart des fonctionnalités du langage vues ci-dessus sont pleinement exploitées par Angular. Jetons un coup d'œil à un exemple simple d'un composant qui est l'un des principaux blocs de construction d'une application Angular.

```typescript
import { Component, OnInit } from '@angular/core' //[3]

@Component({ //[2]
  selector:    'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit { //[1]
  heroes: Hero[]
  selectedHero: Hero
  constructor(private service: HeroService) { }

  ngOnInit() {
    this.heroes = this.service.getHeroes()
  }

  selectHero(hero: Hero) {
    this.selectedHero = hero
  }
}
```
### [1] Les classes
Les principaux blocs de construction d'Angular (services, composants, pipes, directives...) sont des classes. Le constructeur sert principalement à des fins d'injection de dépendance. Ici, nous voyons une syntaxe où l'argument `service` est fourni avec un modificateur de visibilité, c'est une notation abrégée pour déclarer un champ sur une classe. Les deux exemples suivants sont strictement équivalents :
```typescript
class Cat {
  constructor(public name: string) {}
}
```
```typescript
class Cat {
  name: string
  constructor(name: string) {
    this.name = name
  }
}
```
Le `HeroListComponent` implémente la méthode `ngOnInit()` du hook de cycle de vie `OnInit`.

### [2] Décorateurs
Les décorateurs permettent d'ajouter à la fois des annotations et une syntaxe de méta-programmation pour les déclarations et les membres de classe. Un décorateur est un type spécial de déclaration qui peut être attaché à une déclaration de classe, une méthode, un accesseur, une propriété ou un paramètre. Les décorateurs utilisent la forme `@expression`, où `expression` doit être évalué en une fonction qui sera appelée au moment de l'exécution avec des informations sur la déclaration décorée. Angular utilise largement les décorateurs : `@Component`, `@Directive`, `@Injectable`, `@Pipe`, `@Input`, `@Output`...

### [3] Modules ES6
Les modules ES6 sont présents dans presque tous, sinon tous, les fichiers ts d'un projet Angular. Angular ajoute sa propre couche de module en plus de ceux-ci : les NgModules. Les NgModules consolident les composants, les directives et les pipes en blocs de fonctionnalités cohérents, chacun axé sur un groupe de fonctionnalités, un domaine business, un flux de travail ou une collection commune d'utilitaires. Nous en verrons plus à leur sujet plus tard dans la formation.

## Sources

- [Manuel de TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Documentation Angular](https://angular.io/docs)

Pour aller plus loin, ces articles peuvent vous intéresser :
- [TypeScript 4.0 Cheat Sheet](https://www.sitepen.com/blog/typescript-cheat-sheet)
- [Déclarations de variables : var, let et const](https://www.typescriptlang.org/docs/handbook/variable-declarations.html)
- [Décorateurs TypeScript et ES2016 vs Annotations Java](https://www.beyondjava.net/typescript-and-es2016-decorators-vs-java-annotations)
- [Explorer les décorateurs EcmaScript](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.oug46ivhq)
