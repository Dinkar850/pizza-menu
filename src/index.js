import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//normally we divide into modules not include the data in one file only
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];
// const pizzaData = [];

function App() {
  //each component can only return one element so wrap everything in a div
  //nested Header, footer, menu, etc. component into App component is including all these components into App

  return (
    <div className="container">
      <Header />
      <Menu data={pizzaData} />
      <Footer />
    </div>
  );

  //writing a whole function declaration is not recommended as nesting:
  //   function Pizza() {
  //     return <h2>Pizza</h2>;
  //   }
}

function Header() {
  // const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  const style = {};
  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu({ data }) {
  const pizzaArray = data;
  //notice how we reuse the Pizza component
  return (
    <main className="menu">
      <h2>Our menu</h2>
      {/* rendering list */}
      {pizzaArray.length > 0 ? (
        //React Fragment
        <>
          <p>
            Authentic Italian cuisine. {pizzaArray.length} creative dishes to
            choose from. All from our stove oven, all fresh, all delicious.
          </p>
          <ul className="pizzas">
            {data.map((item) => {
              //returning some JSX
              return <Pizza pizzaObj={item} key={pizzaData.name} />;
            })}
          </ul>
        </>
      ) : (
        ""
      )}

      {/* <Pizza
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
      <Pizza /> */}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();

  const openHour = 10;
  const closeHour = 20;
  const isOpen = hour >= openHour && hour < closeHour;
  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          Sorry! We are closed. Come back between {openHour}:00 and {closeHour}
          :00
        </p>
      )}
    </footer>
  );
}

function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      <p>
        We are currently open! Order here from {openHour}:00 to {closeHour}:00
      </p>
      <button className="btn">Order Now!</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
