import express from "express";
import {
  WebhookClient,
  Suggestion,
  Card,
  Payload,
} from "dialogflow-fulfillment";
import { Carousel } from "actions-on-google";
import cors from "cors";

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// Setup For Express Server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions)); // Use this after the variable declaration
const arr = ["Book an Appointment", "Sevices", "About Lavish Salon"];

import {
  ref,
  getDatabase,
  child,
  push,
  get,
  onValue
} from "./Firebase.js";

app.use("/dialogflow", async (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });
  // var data = []
  // async function abc() {
  //   const dbRef = ref(getDatabase());
  //   await get(child(dbRef, `packages/`), (snapshot) => {
  //     data = snapshot.val();
  //   })
  // }
  // abc();
  // console.log('daaaaaaaaaaaa',data)
  var data = {};
  async function acr() {
    const dbRef = ref(getDatabase());
    await onValue(child(dbRef, `packages/`), (snapshot) => {
      data = (snapshot.val())
      // console.log('daaaaaaaaaaaataaaaaaaaaaaa', data);
    })
  }
  acr();
  // console.log('daaaaaaaaaaaataaaaaaaaaaaa', Object.values(data));


  const welcome = (agent) => {
    agent.add(`Welcome to Lavish Salon👋`);
    agent.add(`So what help do you need today?🙂`);
    agent.add(
      new Payload(
        agent.UNSPECIFIED,
        {
          richContent: [
            [
              {
                options: [
                  {
                    text: "Book an Appointment",
                  },
                  {
                    text: "Request Consultation",
                  },
                  {
                    text: "Need Some Info",
                  },
                ],
                type: "chips",
              },
            ],
          ],
        },
        { rawPayload: true, sendAsMessage: true }
      )
    );
  };
  const fallback = (agent) => {
    // console.log("fallback", agent, req);
    agent.add(`I'm sorry, can you try again?`);
    agent.add(
      new Payload(
        agent.UNSPECIFIED,
        {
          richContent: [
            [
              {
                options: [
                  {
                    text: "Book an Appointment",
                  },
                  {
                    text: "Request Consultation",
                  },
                  {
                    text: "Need Some Info",
                  },
                ],
                type: "chips",
              },
            ],
          ],
        },
        { rawPayload: true, sendAsMessage: true }
      )
    );
  };
  const BookAppointment = async (agent) => {
    agent.add('We are so excited to see you in our saloon soon🤩');

    agent.add(
      new Payload(
        agent.UNSPECIFIED,
        {
          "richContent":
            [
              {
                "type": "image",
                "rawUrl": "https://lavishsaloon.com.pk/men/wp-content/uploads/2021/08/Logo-01-2.png",
                "accessibilityText": "Lavish"
              }
              ,
              {
                "type": "info",
                "title": `Lets schedule your appointment at Lavish saloon😊`,
                "subtitle": "Kindly Select the service you are interested in👇",
                // "image": {
                //   "src": {
                //     "rawUrl": "https://lavishsaloon.com.pk/men/wp-content/uploads/2021/08/Logo-01-2.png"
                //   }
                // },
                // "actionLink": "https://example.com"
              },
              {
                "type": "chips",
                "options":
                  Object.values(data).map((v, i) => {
                    return (
                      {
                        'text': v.name
                      }
                    )
                  })
              }
            ]

        },
        { rawPayload: true, sendAsMessage: true }
      )
    );
    // agent.add(
    //   new Payload(
    //     {
    //       "richContent":
    //         [
    //           {
    //             "card": {
    //               "title": "Card Title",
    //               "subtitle": "Card subtitle",
    //               "imageUri": "https://github.com/fluidicon.png",
    //               "buttons": [
    //                 {
    //                   "text": "Go to Google",
    //                   "postback": "www.google.com"
    //                 },
    //                 {
    //                   "text": "Go to Dialogflow",
    //                   "postback": "www.dialogflow.com"
    //                 },
    //                 {
    //                   "text": "Go to Slack",
    //                   "postback": "www.slack.com"
    //                 }
    //               ]
    //             },
    //             "platform": "FACEBOOK"
    //           },
    //           {
    //             "text": {
    //               "text": [
    //                 ""
    //               ]
    //             }
    //           }
    //         ]
    //     }
    //   )
    // );






    // agent.add(
    //   new Payload(
    //     agent.UNSPECIFIED,
    //     {
    //       "richContent":
    //         [
    //           {
    //             "facebook": {
    //               "attachment": {
    //                 "type": "video",
    //                 "payload": {
    //                   "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    //                 }
    //               }
    //             }
    //           }
    //         ]
    //     }, { rawPayload: true, sendAsMessage: true }
    //   )
    // );

  };
  const aboutLavish = (agent) => {
    agent.add(`Lavish Men’ Salon team is inspired by a specific vision and they love what they do because of the customer who trust them. 
        At Lavish Men’ Salon we take our time to groom the best look that attracts their appeal and keep them always willing to groom by Lavish Men’ Salon`);
    agent.add(
      new Payload(
        agent.UNSPECIFIED,
        {
          richContent: [
            [
              {
                options: [
                  {
                    text: "Book an Appointment",
                  },
                  {
                    text: "Request Consultation",
                  },
                  {
                    text: "Need Some Info",
                  },
                  // {
                  //   text: "Where we are",
                  // },
                ],
                type: "chips",
              },
            ],
          ],
        },
        { rawPayload: true, sendAsMessage: true }
      )
    );
  };
  const RequestConsultation = (agent) => {
    agent.add(`RequestConsultation`);
    agent.add(
      new Payload(
        agent.UNSPECIFIED,
        {
          richContent: [
            [
              {
                options: [
                  {
                    text: "Book an Appointment",
                  },
                  {
                    text: "Request Consultation",
                  },
                  {
                    text: "Need Some Info",
                  },
                  // {
                  //   text: "Where we are",
                  // },
                ],
                type: "chips",
              },
            ],
          ],
        },
        { rawPayload: true, sendAsMessage: true }
      )
    );
  };
  const NeedSomeInfo = (agent) => {
    agent.add(`NeedSomeInfo`);
    agent.add(
      new Payload(
        agent.UNSPECIFIED,
        {
          richContent: [
            [
              {
                options: [
                  {
                    text: "Book an Appointment",
                  },
                  {
                    text: "Request Consultation",
                  },
                  {
                    text: "Need Some Info",
                  },
                  // {
                  //   text: "Where we are",
                  // },
                ],
                type: "chips",
              },
            ],
          ],
        },
        { rawPayload: true, sendAsMessage: true }
      )
    );
  };

  const services = async (agent) => {
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `packages/`), (snapshot) => {
      let data = snapshot.val();

      Object.entries(data).map(async ([key, value]) => {

      });

    });
    agent.add(
      new Payload(
        agent.UNSPECIFIED,
        {
          "richContent": [
            [
              {
                "type": "image",
                // "rawUrl": "https://example.com/images/logo.png",
                "accessibilityText": "Dialogflow across platforms"
              },
              {
                "type": "info",
                "title": "Dialogflow",
                "subtitle": "Build natural and rich conversational experiences",
                "actionLink": "https://cloud.google.com/dialogflow/docs"
              },
              {
                "type": "chips",
                "options": [
                  {
                    "text": "Book an Appointment",
                  },
                  {
                    "text": "Request Consultation",
                  }, {
                    "text": "Need Some Info",
                  },
                  {
                    "text": "Where we are",
                  }
                ]
              }
            ]
          ]
        },
        { rawPayload: true, sendAsMessage: true }
      )
    );


  };
  const getInfo = (agent) => {
    agent.add(`What date and Time Suits you the most👇`)
    agent.add(
      new Payload(
        agent.UNSPECIFIED,
        {
          richContent: [
            [
              {
                options: [
                  {
                    text: `${new Date().toLocaleDateString()} ${new Date(new Date().setHours(Math.floor(Math.random() * 12))).toLocaleTimeString()}`,
                  },
                  {
                    text: `${new Date().toLocaleDateString()} ${new Date(new Date().setHours(Math.floor(Math.random() * 12))).toLocaleTimeString()}`,
                  },
                  {
                    text: `${new Date().toLocaleDateString()} ${new Date(new Date().setHours(Math.floor(Math.random() * 12))).toLocaleTimeString()}`,
                  },
                  // {
                  //   text: "Where we are",
                  // },
                ],
                type: "chips",
              },
            ],
          ],
        },
        { rawPayload: true, sendAsMessage: true }
      )
    );
  };
  const getInfoDateEmail = (agent) => {

    let obj = {
      name: agent.parameters.name.name,
      service: agent.parameters.services,
      date: new Date(agent.parameters.date_time.date_time).toLocaleDateString(),
      time: new Date(agent.parameters.date_time.date_time).toLocaleTimeString(),
      email: agent.parameters.email
    };
    console.log("obj", obj);
    const date = new Date(agent.parameters.date_time.date_time);
    const db = getDatabase();
    push(ref(db, "appointments/" + date.getDate() + date.getMonth() + date.getFullYear()), obj);
    agent.add(`appointment confirmed👍 `)
    agent.add(`We will be waiting for you at our saloon👀`)
    // agent.add(
    //   new Payload(
    //     agent.UNSPECIFIED,
    //     {
    //       richContent: [
    //         [
    //           {
    //             options: [
    //               {
    //                 text: "4:00 Pm 25-feb-2022",
    //               },
    //               {
    //                 text: "5:00 Pm 25-feb-2022",
    //               },
    //               {
    //                 text: "6:00 Pm 25-feb-2022",
    //               },
    //               // {
    //               //   text: "Where we are",
    //               // },
    //             ],
    //             type: "chips",
    //           },
    //         ],
    //       ],
    //     },
    //     { rawPayload: true, sendAsMessage: true }
    //   )
    // );
  };
  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  intentMap.set("BookAppointment", BookAppointment);
  intentMap.set("aboutLavish", aboutLavish);
  intentMap.set("services", services);
  intentMap.set("RequestConsultation", RequestConsultation);
  intentMap.set("NeedSomeInfo", NeedSomeInfo);
  intentMap.set("BookAppointment - getInfo", getInfo);
  intentMap.set("BookAppointment - getInfo - date", getInfoDateEmail);




  agent.handleRequest(intentMap);
});

app.listen(8000, () =>
  console.log("Express server is up and running on port 8000")
);



  // console.log("BookAppointment", agent.parameters.date.date_time);
    // let obj = {
    //   name: agent.parameters.name.name,
    //   phone: agent.parameters.phone,
    //   date: new Date(agent.parameters.date.date_time).toLocaleDateString(),
    //   time: new Date(agent.parameters.date.date_time).toLocaleTimeString(),
    // };
    // // console.log("obj", obj);
    // const date = new Date(agent.parameters.date.date_time);
    // const db = getDatabase();
    // push(ref(db, "appointments/" + date.getDate() + date.getMonth() + date.getFullYear()), obj);
    // agent.add(
    //   new Card({
    //     title: `Thank You ${obj.name.name} for booking an appointment`,
    //     imageUrl: "",
    //     text: ,
    //   })
    // )

    //  agent.end()