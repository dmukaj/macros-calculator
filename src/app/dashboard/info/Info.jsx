const Info = () => {
  return (
    <div className="flex flex-col text-base lg:text-lg space-y-8 m-10 p-10 bg-secondary/80 h-screen rounded-lg border-card-foreground text-muted-foreground">
      <div className="flex items-center justify-center">
        <h2 className="lg:text-4xl text-2xl font-semiboldb text-primary ">
          What are Macronutrients (Macros)?
        </h2>
      </div>
      <p>
        In the context of health and fitness, macronutrients are the nutrients
        that provide the energy necessary for our bodies to function. They are
        required in large amounts and are crucial for growth, metabolism, and
        other bodily functions. In this calculator, we only calculate three
        primary macronutrients, daily carbohydrate, protein, and fat needs.
      </p>
      <div className="flex flex-col lg:grid xl:grid-cols-3 gap-12 ">
        <ol>
          <li className="mb-4 ">
            <span className="font-semibold text-primary ">Carbohydrates: </span>
          </li>
          <ul>
            <li className="mb-4 ">
              <strong className="text-mute-foreground">Function: </strong>
              Carbohydrates are the body&apos;s primary source of energy. They
              are broken down into glucose, which is used by cells for energy.
              They also play a role in the functioning of the brain, kidneys,
              heart muscles, and central nervous system.
            </li>
            <li className="mb-4">
              <strong className="text-mute-foreground">Sources: </strong>{" "}
              Fruits, vegetables, grains, legumes, and dairy products.
            </li>
          </ul>
        </ol>
        <ol>
          <li className="mb-4">
            <strong className="font-semibold text-primary ">Fats:</strong>
          </li>
          <ul>
            <li className="mb-4">
              <strong className="text-mute-foreground">Function: </strong>
              Fats provide a concentrated source of energy and are necessary for
              absorbing fat-soluble vitamins (A, D, E, and K). They also play a
              role in protecting organs, maintaining cell membranes, and
              producing important hormones.
            </li>
            <li className="mb-4">
              {" "}
              <strong className="text-mute-foreground">Sources: </strong> Oils,
              butter, avocados, nuts, seeds, and fatty fish.
            </li>
          </ul>
        </ol>
        <ol>
          <li className="mb-4">
            <strong className="font-semibold text-primary ">Proteins:</strong>
          </li>
          <ul>
            <li className="mb-4">
              {" "}
              <strong className="text-mute-foreground">Function: </strong>
              Proteins are essential for building and repairing tissues,
              including muscles, skin, and organs. They are also important for
              producing enzymes, hormones, and other body chemicals. Proteins
              are made up of amino acids, some of which the body can produce,
              while others, known as essential amino acids, must be obtained
              from food.
            </li>
            <li className="mb-4">
              {" "}
              <strong className="text-ring">Sources: </strong>Meat, fish, eggs,
              dairy products, legumes, nuts, and seeds.
            </li>
          </ul>
        </ol>
      </div>
    </div>
  );
};

export default Info;
