## Setting up React

- index.js entry point for Webpack
- create-react-app automatically inits git
- all assets like images, logos, etc shud be in the public folder for webpack to automatically get that from there. if you dont specify a starting folder, then webpack automatically goes to public. <br>
  eg: `public/img.jpg = img.jpg`

- rendering in react initially:

```
import React from "react"
import ReactDOM from "react-dom/client"

function App() {
    return <h1>Hello React!</h1>
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

//older versions before V18
React.render(<App />, document.getElementById('root'))


//for strict mode
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
```

- strict mode in react makes react re render our element twice for bugs and also check for outdated parts of react apis we are using.

## Debugging

- you making changes and not reflecting

1. make sure the app is running lol: npm start
2. if already running, stop and start over
3. hard reloading in the browser
4. keep terminal and console in dev tools open for any error
5. returning more than one element in a component is not allowed.
6. go to output tab and then try prettier or eslint
7. check with the final code provided by jonas

## React Components

- building blocks of any UI
- react apps entirely made out of components
- react draws all components and merge them into webpage UI
- react renders a view for each component and views together make up the UI
- each component has its data logic and appearance.
  - Data: state and props
  - JS Logic: JS outside the JSX
  - Appearance: JSX which contains HTML, CSS, JS inside {}
- we build complex UI by building multiple components and combine them, eg. navbar, videoplayer, sections
- we nest components, pass data between them using props and reuse components
- u shud know how to break a design into components using a component tree
- parent component is the component containing a child component (nested)

### Creating and Reusing Components

- for writing functions as components, we have two rules:
  - function name needs to start with upper case
  - function needs to return a markup in form of jsx
  - each component can return only one element, wrap everything into a div

```
function App() {
  //each component can only return one element so wrap everything in a div
  //nested Pizza component into App component is including Pizza component into App
  //notice how we reuse the Pizza component

  return (
    <div>
      <h1>Hello React!</h1>
      <Pizza />
      <Pizza />
      <Pizza />
    </div>
  );

  //writing a whole function declaration is not recommended as nesting:
  //   function Pizza() {
  //     return <h2>Pizza</h2>;
  //   }
}

function Pizza() {
  return (
    <div>
      <img src="pizzas/spinaci.jpg" alt="Pizza Spinaci" />
      <h2>Pizza Spinaci</h2>
      <p> Tomato, mozarella, spinach, and ricotta cheese</p>
    </div>
  );
}
```

- JS inside a component: `<p>{2 + 2}</p>`, wrap into curly braces.

## What's JSX

- every component has some data, logic and appearance and when writing a componenet we shud be able to describe how a component looks like and how it works, using all data, etc.
- a declarative syntax wud do that..
- hence jsx is a declarative syntax to describe what components look like and how they work.
- components must return a block of jsx
- extension of js that allows us to embed js(as vars {}), css (as style) and react components into html.
- each jsx element is converted to a React.createElement function call.. nested after one another, which is done by Babel, installed by create-react-app only. Browsers dont understand jsx normally.
- so if we use createElement and not use jsx, still React wud work.
- what it means jsx is declarative?
- **imperative approach**: -> manual DOM element selections and DOM traversing, -> step by step DOM mutations until we reach desired UI, in short we tell "how to do things"
- **declarative appraoch**: describe what UI shud look like using JSX, based on current data (state and props). no DOM selections, nothing. Huge abstraction away from DOM, we never touch DOM. instead we think of the UI as a reflection of the current data, we just tell "what we want".

## Writing logic inside components

```
function Footer() {
  //createElement(tag_name, props, childElement)
  //   return React.createElement("footer", null, "We're currently open");
  const hour = new Date().getHours();
  console.log(hour);

  const openHour = 12;
  const closeHour = 19;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  //   if (hour >= openHour && hour <= closeHour) alert("we are currently open");
  //   else alert("soory we are close");
  return (
    <footer>
      {new Date().toLocaleTimeString()} We're currently{" "}
      {isOpen ? "open" : "closed"}
    </footer>
  );
}
```

## Separation of Concerns..

- earlier each file had its own purpose - a separate html, css, js file for everything, one tech per file was our separation of concern.
- later rise of interactive single page applications was seen, having everything.
- JS became more and more in charge of HTML, adding all the event listeners, updating DOM, everything, html made no sense without js then.
- logic and ui are tightly coupled as we can see.
- so why keep them separated?
- thats when we started using react components + jsx.
- hence react component contains all data, logic and appearance of each component
- HTML and js are colocted
- so now instead of one tech per file we have one component per file with data logic and appearance
- this is our separation of concern according to react, each component is concerned with one piece of the UI.

## Styling in React

- no specific method as not a framework

1. **using inline style**: <br>
   `<tag style={JS Object}> content </tag>` <br>
   eg.

```
const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  return <h1 style={style}>Fast React Pizza Co.</h1>;
```

2. **using external css file**: import an external css file by: `import './file.css`, webpack imports and attaches relevant css to our components. Add classes to your jsx and it will apply accordingly. Instead of `class=""` use `className=""` as class is itself a reseverd keyword in JS. These are global styled and not specific to some component.

## Props

- passing data between parent components and child components.(down the component tree)
- essential tool to configure and customize components (like function parameters)
- with props, parent components control how child components look and work.
- anything can be passed as props.
- pass props in the parent component
- receive those in the child component
- when you pass in the props in parent component, the child component's function present in that parent component is called by JS by passing those props as an object, which we dereference in the child to get the data.
- syntax:

```
function ParentComponent() {
  return <Component prop1="value", prop2="value" />
}
```

- all these values will be string, so to add numbers, Objects, classes or even other components as the prop value we can do:
  `<Component prop1={some JS} />`
- Derefercing:

```

function Component(props) {
//use the prop object
return <h1>{props.prop1}</h1>
}

```

Eg:

```

//parent
function Menu() {
//notice how we reuse the Pizza component
return (

<main className="menu">
<h2>Our menu</h2>
<Pizza
name="Pizza Spinaci"
ingredients="Tomato, mozarella, spinach, and ricotta cheese"
photoName="pizzas/spinaci.jpg"
price="10"
// price={10}
/>
<Pizza
        name="Pizza Funghi"
        ingredients="Tomato, mushrooms"
        price="12"
        photoName="pizzas/funghi.jpg"
      />
<Pizza />
<Pizza />
</main>
);
}

//child
function Pizza(props) {
console.log(props);
return (

<div className="pizza">
<img src={props.photoName} alt={props.name} />
<div>
<h3>{props.name}</h3>
<p>{props.ingredients}</p>
<span>{props.price}</span>
</div>
</div>
);
}

```

- the data in components comprises of state and props.
- state is internal data that can be updated by the components logic
- props is data incoming from the outside to the inside and therefore can only be updated by the parent component.
- hence props are immutable, these are strict rules, if you need to mutate props, you actually need a state.
- why? as mutating props would affect the parent, creating side effects(not pure). If you change the object in the child, the parent will also change as a reference is passed, affecting the other child components using that prop :(
- this also allows react to optimize apps, avoid bugs, make apps predictable
- hence components shud never mutate data written outside the function, only mutate the data passed in to the function or created inside the function: BE PURE

### One way data flow

- data can only flow from top to bottom, from parent to child only.
- it makes applications more predictable and we know how to track the data.
- more performant
- angular has a 2 way data flow

## Rules of JSX

- JSX works like HTML but we can enter JS mode by using {}(text or attribute)
- we can place JS expressions inside {}. Eg. reference variables, create arrays or objects, [].map(), ternary operator, etc.
- statements are not allowed (like if, else, for, switch ofc.), should be an expression
- JSX produces a JavaScript expression. <br>
  i.e.

```
const el = <h1>Hello React!</h1>
//is same as
cconst el = React.createElement("h1", null, "Hello React!");

//we can store it in variable as it returns another expression
```

- applications of this fact is that:

  1. We can place other pieces of JSX inside {}
  2. We can write JSX anywhere inside a component(in if/else, assign to vars, pass into functions).
  3. a piece of jsx can have only one root element. If you need more that one, use `<React.Fragment>`

- **Differences between JSX and HTML**
  - className inside of HTML's class
  - htmlFor instead of HTML's for
  - every tage needs to be closed, like, `<img /> or <br />`
  - all event handlers and other properties need to be camelCased. eg. `onClick`
  - exceptions: `aria-*` and `data-*` are written with dashes like html
  - css inline styles are written like this: `{{<style>}}` (to reference a variable, and then an object)
  - css props are camelCased as well
  - comments need to be in {} (because they are JS)

## Rendering lists

- possible only as jsx returns the jsx, not just shows
- create an array of objects, containing props of different elements.
- also we need to pass a key in props, the key must have a value unique to each list item.
  eg.

```
const courses = [
  {
    name: 'React',
    instructor: 'lol'
  }

  {
    name: 'JS'
    instructor: 'lmao'
  }
]

//to render these:

function App() {
  return <ul>
    {courses.map(course => {
      return <Course courseObj={course} key={any_unique_value}>
    })}
  </ul>
}

//forEach wont work as inside `<ul>`, to render the way we want, an array of JSX needs to be passed, only map returns an array therefore we use map

function Course (props) {
  return <li>
    <h1>{props.courseObj.name}{props.courseObj.instructor}</h1>
  </li>
}
```

## Conditional rendering

- rendering a whole component or a piece of JSX only when a certain condition is met.
- possible only as jsx returns jsx

### Method 1: using && short circuiting

```
{isOpen && (
  <div className="order">
    <p>We are currently open! Order here till {closeHour}:00</p>
    <button className="btn">Order Now </button>
  </div>
)}
```

### Method 2: using ternary operator

```
{isOpen ? (
        <div className="order">
          <p>We are currently open! Order here till {closeHour}:00</p>
          <button className="btn">Order Now!</button>
        </div>
      ) : (
        <p>
          Sorry! We are closed. Come back between {openHour}:00 and {closeHour}:00
        </p>
)}
```

- advantage is we can render something if the condition is not met as well (preferred method).
- cant use if else for etc in jsx as yk, will throw error and we want a jsx to be returned, if else does not return anything, if else for etc are not recognized under the js inside {}. you can only add that js which returns something or say is an expression.

### Method3: using multiple returns

- we can use if statements outside the jsx. as part of the simple js inside a function
- so if we want to render a whole new component based on some condition, use `if(condition) return some other jsx or component` else `return another jsx or component`
- if we want to change just the content inside a root element, use the above ternary operator.
  eg.

```
function Component() {
 if(props.pizzaObj.soldOut) {
    return <p>Sold Out!</p>
  }

  return (
    <li className="pizza">
      <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
      <div>
        <h3>{props.pizzaObj.name}</h3>
        <p>{props.pizzaObj.ingredients}</p>
        <span>{props.pizzaObj.price}</span>
      </div>
    </li>
  );
}
```

## Extracting jSX

- we can extract a jsx and club it into another component if the jsx inside a component is getting too big.
- pass all variables as props if any were being used.
- old:

```
function Footer() {
  const hour = new Date().getHours();
  console.log(hour);

  const openHour = 11;
  const closeHour = 20;
  const isOpen = hour >= openHour && hour < closeHour;
  return (
    <footer className="footer">
      {isOpen ? (
        <div className="order">
          <p>We are currently open! Order here till {closeHour}:00</p>
          <button className="btn">Order Now!</button>
        </div>
      ) : (
        <p>
          Sorry! We are closed. Come back between {openHour}:00 and {closeHour}
          :00
        </p>
      )}
    </footer>
  );
}
```

- new:

```
function Footer() {
  const hour = new Date().getHours();
  console.log(hour);

  const openHour = 10;
  const closeHour = 20;
  const isOpen = hour >= openHour && hour < closeHour;
  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        <p>
          Sorry! We are closed. Come back between {openHour}:00 and {closeHour}
          :00
        </p>
      )}
    </footer>
  );
}

function Order(props) {
  return (
    <div className="order">
      <p>We are currently open! Order here till {props.closeHour}:00</p>
      <button className="btn">Order Now!</button>
    </div>
  );
}
```

## React Fragments

- sometimes we dont want to return jsx wrapped up only in one root element.
- for this we wrap all our elements in a react fragment which gets rendered as separate elements, not within a root.
  eg.

```
<>
  <p>
    Authentic Italian cuisi{pizzaArray.length} creative dishes to
    choose from. All from our stove ovall fresh, all delicious.
  </p>
  <ul className="pizzas">
    {data.map((item) => {
      //returning some JSX
      return <Pizza pizzaObj={item} {pizzaData.name} />;
    })}
  </ul>
</>

//can also do this, when we need to pass a key likw while rendering lists
<React.Fragment key={value}>

</React.Fragment>
```
