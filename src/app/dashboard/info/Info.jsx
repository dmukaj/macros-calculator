import Link from "next/link";

const Info = () => {
  return (
    <div className="flex flex-col text-base lg:text-lg space-y-8 xl:p-40 p-10 bg-secondary/20 text-muted-foreground">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="lg:text-4xl text-2xl font-semiboldb text-primary ">
          What are{" "}
          <Link
            className="underline underline-offset-2 text-foreground hover:text-foreground/70"
            href="https://www.mdanderson.org/publications/focused-on-health/what-are-macronutrients-.h15-1593780.html#:~:text=Carbohydrates%2C%20fat%20and%20protein%20are,Anderson%20Wellness%20Dietitian%20Lindsey%20Wohlford."
          >
            Macronutrients
          </Link>{" "}
          (Macros)?
        </h1>
        <p>
          In the context of health and fitness, macronutrients are the nutrients
          that provide the energy necessary for our bodies to function. They are
          required in large amounts and are crucial for growth, metabolism, and
          other bodily functions. In this calculator, we only calculate three
          primary macronutrients, daily carbohydrate, protein, and fat needs.
        </p>
        <img
          src="/images/macro.jpg"
          alt="macronutrients"
          className="w-[400px] h-[450px] md:w-[500px] md:h-[550] xl:w-[700px] xl:h-[750px] m-10"
        />
      </div>
      <div className="flex flex-col lg:grid xl:grid-cols-3 gap-12 ">
        <ol>
          <li className="mb-4 ">
            <span className="font-semibold text-primary ">Carbohydrates: </span>
          </li>
          <ul>
            <li className="mb-4 ">
              <strong>Function: </strong>
              Carbohydrates are the body&apos;s primary source of energy. They
              are broken down into glucose, which is used by cells for energy.
              They also play a role in the functioning of the brain, kidneys,
              heart muscles, and central nervous system.
            </li>
            <li className="mb-4">
              <strong>Sources: </strong> Fruits, vegetables, grains, legumes,
              and dairy products.
            </li>
          </ul>
        </ol>
        <ol>
          <li className="mb-4">
            <strong>Fats:</strong>
          </li>
          <ul>
            <li className="mb-4">
              <strong>Function: </strong>
              Fats provide a concentrated source of energy and are necessary for
              absorbing fat-soluble vitamins (A, D, E, and K). They also play a
              role in protecting organs, maintaining cell membranes, and
              producing important hormones.
            </li>
            <li className="mb-4">
              {" "}
              <strong>Sources: </strong> Oils, butter, avocados, nuts, seeds,
              and fatty fish.
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
              <strong>Function: </strong>
              Proteins are essential for building and repairing tissues,
              including muscles, skin, and organs. They are also important for
              producing enzymes, hormones, and other body chemicals. Proteins
              are made up of amino acids, some of which the body can produce,
              while others, known as essential amino acids, must be obtained
              from food.
            </li>
            <li className="mb-4">
              {" "}
              <strong>Sources: </strong>Meat, fish, eggs, dairy products,
              legumes, nuts, and seeds.
            </li>
          </ul>
        </ol>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="lg:text-4xl text-2xl font-semiboldb text-primary ">
          Know your{" "}
          <Link
            className="underline underline-offset-2 text-foreground hover:text-foreground/70"
            href="https://www.acefitness.org/resources/pros/expert-articles/5904/how-to-determine-the-best-macronutrient-ratio-for-your-goals/"
          >
            Macronutrient Ratio
          </Link>{" "}
          for your Goals.
        </h1>
        <p>
          A macro-based diet looks at the percentage combination or ratios of
          carbs, proteins and fats in a person’s diet rather than total calorie
          counts alone. These traditionally have been set as percentages for
          total calories, falling somewhere within the following USDA
          guidelines:
        </p>
      </div>
      <ol>
        <li>
          <strong>Carbohydrate: </strong> 45 to 65 percent
        </li>
        <li>
          <strong>Protein: </strong> 10 to 35 percent
        </li>
        <li>
          <strong>Fats: </strong> 20 to 35 percent
        </li>
      </ol>
    </div>
  );
};

export default Info;
