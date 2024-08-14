import checkPasswordExistsInDb from "../../../lib/checkPasswordExistsInDb"; // Adjust the import path as needed

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { password } = req.body;

    const passwordExists = await checkPasswordExistsInDb(password);

    if (passwordExists) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" }); // Only POST method is allowed
  }
}
