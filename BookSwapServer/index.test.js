// import mongoose, { ConnectOptions } from 'mongoose';
// import app from './index';
// import UserModel from './models/users';
// import request from 'supertest'

const mongoose = require('mongoose')
const app = require('./dist/index');
const UserModel = require('./dist/models/index');
const request = require('supertest');

beforeEach((done) => {
	mongoose.connect(
		"mongodb://localhost:27017/BookSwap",
		{useNewUrlParser: true},
		() => done()
	)
});

afterEach((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done())
	})
});

const mockUser = {
  username: "Chris Letter",
  email: "ChrisLetter@gmail.com",
  password: "password",
  booksToSell: [
    {
      title: "book 1",
      authors: "",
      ISBN: "123456789",
      publisher: "publisher 1",
      thumbnail: "-",
      publishedDate: "2014-11-04"
    },
  ],
  booksToBuy: [
    {
      title: "book 2",
      authors: "",
      ISBN: "123",
      publisher: "publisher 2",
      thumbnail: "-",
      publishedDate: "2016-11-04"
    },
  ],
  request: [
      {
          userFrom: "123",
          userFromUsername: "Jhon Doe",
          userTo: "321",
          userToUsername: "Chris Letter",
          hasBeenViewed: true,
          booksOffered: [
              {
                title: "book 1",
                authors: "",
                ISBN: "123456789",
                publisher: "publisher 1",
                thumbnail: "-",
                publishedDate: "2014-11-04"
                },
          ],
          booksAsked: [
               {
                title: "book 1",
                authors: "",
                ISBN: "1234",
                publisher: "publisher 3",
                thumbnail: "-",
                publishedDate: "2016-11-04"
              }
          ],
          monetaryCompensation: true,
          monetaryCompensationValue: "10",
          askingMoney: false,
          comment: "Please accept",
          status: "inProgress",
          timeStamp: 12345

      },
  ],
  messages: [
      {
          otherUser: '12345',
          otherUserame: "Jhon Doe",
          msgs: [
              {
                  userFrom: "startingMessage",
                  userTo: "startingMessage",
                  content: "You accepted the request! Discuss further with user",
                  timeStamp: 15234
              }
          ],
          lastMessage: 12345566,
          notification: false
      }
  ]
}
  
describe('Test GET username', () => {
    it('Should return mockup user', async () => {
        const newUser = new UserModel(mockUser);
        const user = await newUser.save();

        const result = await request(app).get(`/username/${user._id}`).send();

        expect(result.status).toBe(201);
        expect(result.body.password).toBe(mockUser.password);
    })
})

// GET /username/:userId", async() => {
    
    // const newUser = new UserModel(mockUser);
    // const user = await newUser.save();

//     await supertest(app)
//         .get("/username/"+user._id)
//         .expect(200)
//         .then((res) ={
//             expect(res.body._id).toBe(mockUser._id)
//             expect(res.brotliDecompressSync.title).toBe(mockUser.password)
//         })
// })



// // router.get('/username/:userId', auth.getUsername);

// // const getUsername = async (req: Request, res: Response ) => {
// //     const { userId } = req.params;
// //     try {
// //       const userInfos = await UserModel.findOne({ _id: userId });
// //       const username = userInfos?.username;
// //       res.status(201).send({ username });
// //     } catch (error) {
// //       res.status(500);
// //       // console.log(error);
//     }
//   };
  
// const create = async (req: Request, res: Response ) => {
//     const { email, userPassword } = req.body;
//     const user = await UserModel.findOne({ email });
//     if (user) {
//       return res
//         .status(409)
//         .send({ error: '409', message: 'Could not create an user' });
//     }
//     try {
//       if (userPassword === '') {
//         throw new Error();
//       }
//       const hash = await bcrypt.hash(userPassword, 10);
//       const newUser = new UserModel({
//         ...req.body,
//         password: hash,
//       });
//       const { _id } = await newUser.save();
//       const id = _id.toString();
//       const accessToken = jwt.sign({ _id }, 'v3ry!str0ngP4ss');
//       res.status(201).send({ accessToken, id });
//     } catch (error) {
//       res.status(400).send({ error, message: 'Could not create user' });
//     }
//   };





