const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");
const functions = require("firebase-functions");

const googleCredentials = require("./client_secret_256539792953-u00leiuuf4odj68p6ephgfneq2r1p7uo.apps.googleusercontent.com (1).json");
const ERROR_RESPONSE = {
  status: "500",
  message: "There was an error adding an event to your Google calendar",
};
const TIME_ZONE = "EST";

function addEvent(event, auth) {
  return new Promise(function (resolve, reject) {
    calendar.events.insert(
      {
        auth: auth,
        calendarId: "primary",
        resource: {
          summary: event.eventName,
          description: event.description,
          start: {
            dateTime: event.startTime,
            timeZone: TIME_ZONE,
          },
          end: {
            dateTime: event.endTime,
            timeZone: TIME_ZONE,
          },
        },
      },
      (err, res) => {
        if (err) {
          console.log("Rejecting because of error");
          reject(err);
        }
        console.log("Request successful");
        resolve(res.data);
      }
    );
  });
}

exports.addEventToCalendar = functions.https.onRequest((request, response) => {
  const eventData = {
    eventName: request.body.eventName,
    description: request.body.description,
    startTime: request.body.startTime,
    endTime: request.body.endTime,
  };
  //   const eventData = {
  //     eventName: "Add",
  //     description: "Novrooooooooooooozzzz",
  //     startTime: "2021-03-21T06:00:00.000Z",
  //     endTime: "2021-03-23T06:00:00.000Z",
  //   };
  const oAuth2Client = new OAuth2(
    googleCredentials.client_id,
    googleCredentials.client_secret,
    googleCredentials.redirect_uris[0]
  );

  oAuth2Client.setCredentials({
    refresh_token: googleCredentials.refresh_token,
  });

  addEvent(eventData, oAuth2Client)
    .then((data) => {
      console.log("dataaa", data);
      response.status(200).send(data);
      return;
    })
    .catch((err) => {
      console.error("Error adding event: " + err.message);
      response.status(500).send(ERROR_RESPONSE);
      return;
    });
});
// const fs = require("fs");
// const readline = require("readline");
// const { google } = require("googleapis");

// const SCOPES = ["https://www.googleapis.com/auth/calendar"];
// const TOKEN_PATH = "token.json";
// fs.readFile(
//   "client_secret_256539792953-u00leiuuf4odj68p6ephgfneq2r1p7uo.apps.googleusercontent.com (1).json",
//   (err, content) => {
//     if (err) return console.log("Error loading client secret file:", err);
//     // Authorize a client with credentials, then call the Google Calendar API.
//     authorize(JSON.parse(content), listEvents);
//   }
// );

// function authorize(credentials, callback) {
//   const { client_secret, client_id, redirect_uris } = credentials.installed;
//   const oAuth2Client = new google.auth.OAuth2(
//     client_id,
//     client_secret,
//     redirect_uris[0]
//   );

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, (err, token) => {
//     if (err) return getAccessToken(oAuth2Client, callback);
//     oAuth2Client.setCredentials(JSON.parse(token));
//     callback(oAuth2Client);
//   });
// }
// function getAccessToken(oAuth2Client, callback) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: SCOPES,
//   });
//   console.log("Authorize this app by visiting this url:", authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question("Enter the code from that page here: ", (code) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) return console.error("Error retrieving access token", err);
//       oAuth2Client.setCredentials(token);
//       // Store the token to disk for later program executions
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//         if (err) return console.error(err);
//         console.log("Token stored to", TOKEN_PATH);
//       });
//       callback(oAuth2Client);
//     });
//   });
// }
// function listEvents(auth) {
//   const calendar = google.calendar({ version: "v3", auth });
//   calendar.events.insert(
//     {
//       auth: auth,
//       calendarId: "primary",
//       resource: {
//         summary: "Firebase Cloud Functions",
//         description: "Novroz Mubarak hai Bhai",
//         start: {
//           dateTime: "2021-03-20T06:00:00.000Z",
//           timeZone: "utc",
//         },
//         end: {
//           dateTime: "2021-03-20T07:00:00.000Z",
//           timeZone: "utc",
//         },
//         attendees: [],
//         reminders: {
//           useDefault: false,
//           overrides: [
//             { method: "email", minutes: 24 * 60 },
//             { method: "popup", minutes: 10 },
//           ],
//         },
//         colorId: 4,
//         sendUpdates: "all",
//         status: "confirmed",
//       },
//     },
//     (err, res) => {
//       if (err) {
//         console.log("error", err);
//       } else {
//         console.log("data", res.data);
//       }
//     }
//   );
// }

// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const readline = require("firebase-admin");
// const { google } = require("googleapis");
// admin.initializeApp();
// exports.addEvent = functions.firestore
//   .document("services/{userId}")
//   .onCreate((snapshot, context) => {
//     const data = snapshot.val();
//     const calendar = google.google.calendar("v3");
//     const authClient = getOauthClient(data.token);
//     return new Promise((resolve, reject) => {
//       calendar.events.insert(
//         {
//           auth: authClient,
//           calendarId: "primary",
//           resource: getCalendarEvent(data),
//         },
//         function (err, event) {
//           if (err) {
//             console.error(err);
//             reject.apply(err);
//           } else {
//             resolve.apply(event.data);
//           }
//         }
//       );
//     }).then(() => snapshot.ref.remove());
//   });

// function getCalendarEvent(data) {
//   const start = new Date();
//   start.setTime(data.date);
//   const end = new Date();
//   end.setTime(data.date + 1000 * 60 * 60);
//   return {
//     id: String(data.id),
//     summary: data.summary,
//     description: data.description,
//     start: {
//       dateTime: start.toISOString(),
//     },
//     end: {
//       dateTime: end.toISOString(),
//     },
//     attendees: [{ email: data.email }],
//     reminders: {
//       useDefault: false,
//       overrides: [
//         { method: "email", minutes: 24 * 60 },
//         { method: "popup", minutes: 10 },
//       ],
//     },
//   };
// }

// function getOauthClient(accessToken) {
//   const oauth = new google.google.auth.OAuth2();
//   oauth.setCredentials({ access_token: accessToken });
//   return oauth;
// }
