const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));
var requestOptions = {
	method: "GET",
	headers: {
		"x-rapidapi-key": "8ea474ed8d5e143a9b74941ea336b09e",
		"x-rapidapi-host": "v3.football.api-sports.io",
	},
	redirect: "follow",
};
app.use(
	cors({
		Credentials: true,
		origin: ["http://localhost:3000",process.env.NETLIFY_URL],
	})
);
app.listen(port);


/***********************LIVESCORE*************************/
let dataL;
const fetchDataL = async () => {
	const apiUrl1 = `https://v3.football.api-sports.io/fixtures?league=39&season=2022&last=5`;
	const apiUrl2 = `https://v3.football.api-sports.io/fixtures?league=2&season=2022&last=5`;
	const res1 = await fetch(apiUrl1, requestOptions);
	const res2 = await fetch(apiUrl2, requestOptions);
	const r1 = await res1.json();
	const r2 = await res2.json();
	dataL = [r1, r2];
};
fetchDataL();

app.get("/livescores", async (req, res) => {
	res.json(dataL);
});

