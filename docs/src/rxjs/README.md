# RxJS

[RxJS](https://rxjs.dev/guide/overview) is a library for reactive programming using Observables. It makes it easier to compose asynchronous or callback-based code. 
It is part of the [ReactiveX](http://reactivex.io/) collection of open-source libraries (RxJava, RxSwift, Rx.NET, RxScala...). 
They all share a very similar API, which means transferring Rx skills from one language to another is very easy.

The ReactiveX `Observable` model allows you to treat streams of asynchronous events with the same sort of simple, composable operations that you use for collections of data items like arrays, operations such as `filter`, `map`, `flatMap`, `reduce` and many more. It frees you from tangled webs of callbacks, and thereby makes your code more readable and less prone to bugs.

The library provides the `Observable` type as well as utility functions to:
- convert existing code linked to async operations into observables
- iterating through the values in a stream
- mapping values to different types
- filtering streams
- catching errors
- composing multiple streams

This chapter will not go in depth about the concepts of Rx, you can refer to the official documentation to that purpose. However it will illustrate common situations encountered in Angular applications.

:::warning
This chapter is based on [RxJS v7](https://rxjs.dev/), the default version used by Angular 15.
:::

## The Observable

The previous chapter showed you the basic usage of Observables. Here is what we saw in it:
- Observables are returned by the `HttpClient` service methods.
- Observables are only executed once subscribed to
- The subscribe method takes one object with three callbacks (next, error and complete) as a parameter.

First, let's illustrate the second and third points:

<iframe height='500' width='100%' src="https://stackblitz.com/github/ocunidee/atpw-observable/tree/master?ctl=1&embed=1&file=src/app/app.component.ts&hideExplorer=1&hideNavigation=1&title=Observable"></iframe>

The `Observable` fires 3 next notifications followed by a complete notification. Observables either stop emitting values because they error out or because they complete. The two events are mutually exclusive.

## Observable creation

In an Angular app, you will rarely have to create observables yourself. Most of the time you will handle streams that the framework created for you such as handling http call results, listening to router events or listening to form events when using the `ReactiveFormsModule` (the name of the module gives away its reactive nature). However, you may encounter situations where it may fall on you to create a stream. Here are a the main ways it could happen.

- interval ([marble](https://rxmarbles.com/#interval) / [documentation](https://rxjs.dev/api/index/function/interval))

```ts
interval(1000)
  .subscribe({ next: n => {
    console.log(`It's been ${n + 1} seconds since subscribing!`)
  } })
```

- promise transformation ([marble](https://rxmarbles.com/#from) / [documentation](https://rxjs.dev/api/index/function/from))

```ts
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo')
  }, 2000)
})

from(promise1).subscribe({
  next: message => console.log(`The delayed message is '${message}'`),
  error: error => console.log(this.promiseMessage = 'There\'s been an error'),
  complete: () => console.log('Completed')
})
```

- browser event transformation ([documentation](https://rxjs.dev/api/index/function/fromEvent))

```ts
fromEvent(document, 'click').subscribe({ next: _ => console.log('Clicked!') })
```

The following Stackblitz let's you play around with those examples:

<iframe height='500' width='100%' src="https://stackblitz.com/github/ocunidee/atpw-observable-creation/tree/master?ctl=1&embed=1&file=src/app/app.component.ts&hideExplorer=1&title=Observable%20creation"></iframe>

## Filtering and mapping

Similar to the well known `Array.prototype.map` function, the `map` operator ([marble](https://rxmarbles.com/#map) / [documentation](https://rxjs.dev/api/operators/map)) applies a projection to each value and emits that projection in the output `Observable`.

Let's transform the previous example about the click event on the document so that it prints the coordinates of the click:

<iframe height='500' width='100%' src="https://stackblitz.com/github/ocunidee/atpw-rx-operators/tree/master?ctl=1&embed=1&file=src/app/app.component.ts&hideExplorer=1&hideNavigation=1&title=Mapping%20and%20Filtering"></iframe>

::: tip Pipe
`pipe()` is a function used to compose operators such as `map()`, `filter()`, `take()`... Operators are applied to the stream in the order they are passed to the pipe function
:::

Similar to the `Array.prototype.filter` function, the `filter` operator ([marble](https://rxmarbles.com/#filter) / [documentation](https://rxjs.dev/api/operators/filter)) filters items emitted by the source Observable by only emitting those that satisfy a specified predicate.

```ts
from([1, 2, 3, 4, 5, 6, 7, 8])
  .pipe(filter(data => data % 2 === 0))
  .subscribe({ next: data => console.log(data) })
```

This snippet will print:
```sh
2
4
6
8
```

**Exercise: Using the previous Stackblitz about the map operation, only update the message for clicks made within the coordinates between 0-100 on the x and y axis.**

## Error handling

Like seen previously, the `subscribe` method takes an object that has an `error` callback. When the `Observable` errors out, it is executed instead of the `next` callback and the `Observable` stops emitting.

```ts
this.userService.getUsers()
  .subscribe({
    next: users => console.log(`The following users exist in the system: ${users}`),
    error: error => console.log(`An error occurred: ${error}`),
    complete: () => console.log('Completed')
  })
```

This behaviour is not always the desired one. RxJS provides a `catchError` operator ([documentation](https://rxjs.dev/api/operators/catchError)) to deal with the error in a "silent" way, meaning that it is the `next` callback and not the `error` one that is called.

Let's imagine you expect an array of users from the backend but it sends you back a 404 HTTP error, you can use `catchError` to return an empty array instead, and keep throwing an error for other HTTP errors.

```ts
this.userService.getUsers()
  .pipe(
    catchError(error => {
      if ((error as HttpErrorResponse).status === 404){
        return of([])
      }

      return throwError(error)
    })
  )
  .subscribe({
    next: users => console.log(`The following users exist in the system: ${users}`),
    error: error => console.log(`An error occurred: ${error}`),
    complete: () => console.log('Completed')
  })
```

**Question: What will be printed to the console in case of a 404 error returned by the backend? In case of a 500?**

## Stream composition
Streams can be composed for many purposes. To study this notion in a simpler environment, we will only study it in the context of backend calls.

Having to chain backend calls is quite common. For example, the user has just edited a resource and you want your page to display its updated details. Some backend do send back the details of the updated resource in the body of the edit call response. However, some just send back a 200 or 204 HTTP response without a body. This means that the edit call and detail call need be chained to update the UI. RxJS provides several operators to chain events in a declarative manner. We will use the `switchMap` operator ([documentation](https://rxjs.dev/api/operators/switchMap) / [marble](https://rxmarbles.com/#switchMap)) in this case. You can try it in the Stackblitz below (click anywhere on the preview and see what happens in the console, click again and see how things change in the console).

<iframe height='500' width='100%' src="https://stackblitz.com/edit/switchmap-training?ctl=1&devtoolsheight=33&embed=1&file=index.ts&hideExplorer=1&hideNavigation=1&title=SwitchMap%20exemple"></iframe>

**Question: From this example, what do you learn on the way switchMap works? (Having a look at the marble diagram can help)**

Let's adapt the above example to the context of chained backend calls:

<iframe height='500' width='100%' src="https://stackblitz.com/github/ocunidee/atpw-switchMap/tree/master?ctl=1&embed=1&file=src/app/app.component.ts&hideExplorer=1&hideNavigation=1&title=SwitchMap%20exercise"></iframe>

Another useful operator to combine calls is `exhaustMap` ([documentation](https://rxjs.dev/api/operators/exhaustMap)). While `switchMap` cancels the subscription to the previous projected Observable, exhaustMap ignores new events as long as the previous projected Observable hasn't completed.

:::danger Don't nest subscribes
A very common pitfall with RxJS is to nest subscribes. RxJS provides plenty of operators so that you won't ever have to mix synchronous and asynchronous code.
Why shouldn't you mix them ?
 - it is spaghetti code that becomes hard to read and maintain as it doesn't benefit from the declarativeness of RxJS anymore,
 - it makes it hard to compose observables,
 - it causes memory leaks.

Most often it is done without realising. For instance, inside the next callback of a subscribe you call a method that has a subscribe. That is nesting subscribes.

Example of what you should NOT do:
<iframe height='500' width='100%' src="https://stackblitz.com/github/ocunidee/atpw-switchMap/tree/nested-subscribe?ctl=1&embed=1&file=src/app/app.component.ts&hideExplorer=1&hideNavigation=1&title=Don't nest subscribes"></iframe>
:::

## Unsubscribing

For the moment we've seen how to subscribe to Observables. To avoid memory leaks with long-lived Observables, you should unsubscribe from them.

Let's reuse our previous routing example to illustrate how memory leaks can happen. An interval Observable is created in the ngOnInit method of the book details component.
**Navigate to the details of a book and watch the console. Then leave the page and come back. What happens in the console? What does it mean?**

<iframe height='500' width='100%' src="https://stackblitz.com/github/ocunidee/atpw-routing/tree/memory-leak?ctl=1&embed=1&file=src/app/book-details/book-details.component.ts&hideExplorer=1&hideNavigation=1&title=Memory leak"></iframe>

When should you unsubscribe? If you have no certainty the `Observable` will complete or error out, you should manually unsubscribe from it. The `HttpClient` always completes the Observable it returns after having received a response. So, theoretically, if you only encounter Observables from the `HttpClient`, you do not have to take care of unsubscribing. In other cases, **be safe and unsubscribe**.

How to unsubscribe? Using the `takeUntilDestroyed` operator and passing it a `destroyRef`.

Let's fix the memory leak of the previous example.

<iframe height='500' width='100%' src="https://stackblitz.com/github/ocunidee/atpw-routing/tree/memory-leak-fix?ctl=1&embed=1&file=src/app/book-details/book-details.component.ts&hideExplorer=1&hideNavigation=1&title=takeUntilDestroyed"></iframe>

## The async pipe

Subscribing to an `Observable` and storing the value in a class property is not the only way to display the values of the `Observable`. Angular provides a pipe to apply directly on the `Observable`.

<CodeGroup>
<CodeGroupItem title="Component class">

```ts
export class AppComponent {
  counter: Observable<number> = interval(1000)
}
```
</CodeGroupItem>

<CodeGroupItem title="Component template">

```html
<p>{{counter | async}}</p>
```
</CodeGroupItem>
</CodeGroup>

For objects, an alternative syntax exists to avoid repetitively using the async pipe to access each field, since it creates a new subscription each time and retriggers the observable:

<CodeGroup>
<CodeGroupItem title="Component template">

```html
<!-- TO BE AVOIDED -->
<p>{{(user | async)?.firstName}}</p>
<p>{{(user | async)?.lastName}}</p>
<p>{{(user | async)?.age}}</p>

<!-- PREFERED WAY -->
@if (user | async as user) {
  <p>{{user.firstName}}</p>
  <p>{{user.lastName}}</p>
  <p>{{user.age}}</p>
}

<!-- USING THE @let SYNTAX -->
@let unwrappedUser = user | async;
<p>{{unwrappedUser?.firstName}}</p>
<p>{{unwrappedUser?.lastName}}</p>
<p>{{unwrappedUser?.age}}</p>
```
</CodeGroupItem>
<CodeGroupItem title="Component class">

```ts{2}
@Component({
  selector: 'app-root',
  imports: [AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  user: Observable<User> = interval(1000).pipe(map(_ => new User('John', 'Snow', 28)))
}

class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public age: number
  ) {}
}
```
</CodeGroupItem>
</CodeGroup>

Since no subscription is made, unsubscribing is not necessary. The async pipe takes care of it for us.

## Summary

::: tip Key Takeaways
- Unsubscribe or use the async pipe
- Never nest subscribes, find the right operators instead
:::

Here is a table of the most commonly used operators.

| Area           | Operators                                                     |
| -------------- |---------------------------------------------------------------|
| Creation       | from, of, fromEvent, interval                                 |
| Filtering      | filter, takeUntil, take, distinctUntilChanged                 |
| Transformation | switchMap, exhaustMap, concatMap, mergeMap, map               |
| Combination    | combineLatest, concat, merge, startWith, withLatestFrom, zip |
| Utility        | tap, finalize, catchError                                     |

There also exists two `Observable` constants: `NEVER` (emits neither values nor errors nor the completion notification) and `EMPTY` (emits no items and immediately emits a complete notification). `EMPTY` is quite useful as a return value of the `catchError` operator.

To help you decide which operator fits your use case, the RxJS documentation provides an [operator decision tree](https://rxjs.dev/operator-decision-tree). It also helps with just discovering the many operators RxJS provides.

## Practical work

1. In the `film-search.component.ts` file, stop subscribing to the search response and use an async pipe instead in the template. Don't forget to add the `AsyncPipe` to the `imports` array.
2. Even though it is not strictly necessary in those cases, unsubscribe from the login and register calls in the `LoginFormComponent` using the `takeUntilDestroyed` technique.
