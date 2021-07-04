const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
// const dbUrl = "mongodb://127.0.0.1:27017";
const dbUrl =
  "mongodb+srv://varghese:varghese@cluster0.brthd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.use(express.json());

app.get("/user", (req, res) => {
  console.log("Users");
  res.status(200).send("Users Route");
});

app.post("/students", async (req, res) => {
  //open connection
  let client = await mongoClient.connect(dbUrl);
  try {
    //select the db
    let db = client.db("b21WEdb");
    //select the collection and perform db operation
    const data = await db.collection("users").insertOne(req.body);
    res.json({ message: "record Created" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something Went wrong" });
  } finally {
    //close connections
    client.close();
  }
});

app.get("/students", async (req, res) => {
  //open connection
  let client = await mongoClient.connect(dbUrl);
  try {
    //select the db
    let db = client.db("b21WEdb");
    //select the collection and perform db operation
    const data = await db.collection("users").find().toArray();
    res.json({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something Went wrong" });
  } finally {
    //close connections
    client.close();
  }
});

app.get("/students/:id", async (req, res) => {
  let client = await mongoClient.connect(dbUrl);
  const objid = mongodb.ObjectID(req.params.id);
  try {
    //select the db
    let db = client.db("b21WEdb");
    //select the collection and perform db operation
    const data = await db.collection("users").findOne({ _id: objid });
    if (data) {
      res.json({ message: "Success", data });
    } else res.json({ message: "No user Available with this ID" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something Went wrong" });
  } finally {
    //close connections
    client.close();
  }
});

app.put("/student-update/:id", async (req, res) => {
  let client = await mongoClient.connect(dbUrl);
  const objid = mongodb.ObjectID(req.params.id);
  try {
    //select the db
    let db = client.db("b21WEdb");
    //select the collection and perform db operation
    const data = await db.collection("users").findOne({ _id: objid });
    if (data) {
      const updated = await db
        .collection("users")
        .findOneAndUpdate({ _id: objid }, { $set: { phone: req.body.phone } });
      res.json({ message: "Success" });
    } else res.json({ message: "No user with this ID" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something Went wrong" });
  } finally {
    //close connections
    client.close();
  }
});

app.delete("/delete-student/:id", async (req, res) => {
  let client = await mongoClient.connect(dbUrl);
  const objid = mongodb.ObjectID(req.params.id);
  try {
    //select the db
    let db = client.db("b21WEdb");
    //select the collection and perform db operation
    const data = await db.collection("users").findOne({ _id: objid });
    if (data) {
      const updated = await db
        .collection("users")
        .findOneAndDelete({ _id: objid });
      res.json({ message: "Record Deleted" });
    } else res.json({ message: "No user with this ID" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something Went wrong" });
  } finally {
    //close connections
    client.close();
  }
});

app.listen(port, () => {
  console.log(`Server Listening in port ${port}`);
});
