// Noden sisäänrakennettu web-palvelimen määrittelevä moduuli
import http from "http";
import express from "express";

const app = express();

/*
Json-parserin toimintaperiaatteena on, että se ottaa pyynnön 
mukana olevan JSON-muotoisen datan, muuttaa sen 
JavaScript-olioksi ja sijoittaa request-olion kenttään 
body ennen kuin routen käsittelijää kutsutaan.
*/
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/campaigns", (req, res) => {
  res.json(campaigns);
});

app.get("/api/campaigns/:id", (request, response) => {
  const id = Number(request.params.id);
  const campaign = campaigns.find((campaign) => campaign.id === id);
  if (campaign) {
    response.json(campaign);
  } else {
    response.status(404).end();
  }
});

app.post("/api/campaigns", (request, response) => {
  const campaign = request.body;
  console.log(campaign);
  response.json(campaign);
});

app.delete("/api/campaigns/:id", (request, response) => {
  const id = Number(request.params.id);
  campaigns = campaigns.filter((campaign) => campaign.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// nodemonin takia ei tarvi uudestaan käynnistää kun serveriä muokkaa
