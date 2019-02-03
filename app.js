const express = require('express');
const bodyparser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express()

app.use(bodyparser.json());



app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
    
        type MainQuery {
            events: [String]!
        }

        type MainMutation {
            createEvent(name: String): String
        }


        schema {
            query: MainQuery
            mutation: MainMutation
        }
   `),
    rootValue: {
        events: () => {
            return ['Tomato', 'Apple', 'Burger', 'Chinese Food']
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        }
    }
}));

app.listen(3000);

