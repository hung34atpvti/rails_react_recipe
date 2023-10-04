import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Recipes = () => {
  const navigate = useNavigate();
  const [myRecipes, setMyRecipes] = useState([]);
  const [otherRecipes, setOtherRecipes] = useState([]);

  useEffect(() => {
    const myRecipesUrl = "/api/v1/recipes-my";
    const otherRecipesUrl = "/api/v1/recipes-other";
    fetch(myRecipesUrl)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setMyRecipes(res))
      .catch(() => navigate("/"));
    fetch(otherRecipesUrl)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setOtherRecipes(res))
      .catch(() => navigate("/"));
  }, []);

  const myRecipesHtml = myRecipes.map((recipe, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <img
          src={recipe.image}
          className="card-img-top"
          alt={`${recipe.name} image`}
        />
        <div className="card-body">
          <h5 className="card-title">{recipe.name}</h5>
          <Link to={`/recipe/${recipe.id}`} className="btn custom-button">
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  ));

  const otherRecipesHtml = otherRecipes.map((recipe, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <img
          src={recipe.image}
          className="card-img-top"
          alt={`${recipe.name} image`}
        />
        <div className="card-body">
          <h5 className="card-title">{recipe.name}</h5>
          <Link to={`/recipe/${recipe.id}`} className="btn custom-button">
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  ));
  const noRecipe = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        You don't have any recipes. Why not <Link to="/recipe/new">create one</Link>
      </h4>
    </div>
  );

  const noRecipeOther = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No recipes yet.
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Recipes for every occasion</h1>
          <p className="lead text-muted">
            We’ve pulled together our most popular recipes, our latest
            additions, and our editor’s picks, so there’s sure to be something
            tempting for you to try.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-end mb-3">
            <Link to="/recipe/new" className="btn custom-button">
              Create New Recipe
            </Link>
          </div>
          <div className="row">
            <h2 className="display-4">My Recipes</h2>
            {myRecipes.length > 0 ? myRecipesHtml : noRecipe}
          </div>
          <div className="row">
            <h2 className="display-4">Other</h2>
            {otherRecipes.length > 0 ? otherRecipesHtml : noRecipeOther}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
};

export default Recipes;
