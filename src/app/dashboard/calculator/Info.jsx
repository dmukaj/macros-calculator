import React from "react";

const Info = () => {
  return (
    <div className="flex flex-col px-10 space-y-8">
      <h2 className="text-xl font-semibold">
        What are Macronutrients (Macros)?
      </h2>
      <p>
        In the context of health and fitness, macronutrients are the nutrients
        that provide the energy necessary for our bodies to function. They are
        required in large amounts and are crucial for growth, metabolism, and
        other bodily functions. In this calculator, we only calculate three
        primary macronutrients, daily carbohydrate, protein, and fat needs.
      </p>
      <div className="flex flex-col lg:grid xl:grid-cols-3 gap-12">
        <ol className="">
          <li className="mb-4">
            <strong>Carbohydrates:</strong>
          </li>
          <ul>
            <li className="mb-4">
              {" "}
              <strong>Function:</strong>
              "Carbohydrates are the body's primary source of energy. They are
              broken down into glucose, which is used by cells for energy. They
              also play a role in the functioning of the brain, kidneys, heart
              muscles, and central nervous system."
            </li>
            <li className="mb-4">
              {" "}
              <strong>Sources: </strong>" Fruits, vegetables, grains, legumes,
              and dairy products."
            </li>
          </ul>
        </ol>
        <ol>
          <li className="mb-4">
            <strong>Fats:</strong>
          </li>
          <ul>
            <li className="mb-4">
              {" "}
              <strong>Function:</strong>
              "Fats provide a concentrated source of energy and are necessary
              for absorbing fat-soluble vitamins (A, D, E, and K). They also
              play a role in protecting organs, maintaining cell membranes, and
              producing important hormones."
            </li>
            <li className="mb-4">
              {" "}
              <strong>Sources: </strong>" Oils, butter, avocados, nuts, seeds,
              and fatty fish."
            </li>
          </ul>
        </ol>
        <ol>
          <li className="mb-4">
            <strong>Proteins:</strong>
          </li>
          <ul>
            <li className="mb-4">
              {" "}
              <strong>Function:</strong>
              "Proteins are essential for building and repairing tissues,
              including muscles, skin, and organs. They are also important for
              producing enzymes, hormones, and other body chemicals. Proteins
              are made up of amino acids, some of which the body can produce,
              while others, known as essential amino acids, must be obtained
              from food."
            </li>
            <li className="mb-4">
              {" "}
              <strong>Sources: </strong>"Meat, fish, eggs, dairy products,
              legumes, nuts, and seeds."
            </li>
          </ul>
        </ol>
      </div>
    </div>
  );
};

export default Info;
