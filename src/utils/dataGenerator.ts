// import { generateRandomString } from "./functions"
// import { IPoll, IPollOption, IVoteInfo } from "./interfaces"

// let data: IPoll[] = []

// for (let i = 0; i < 100; i++) {
//   let options: IPollOption[] = []

//   for (let j = 0; j < Math.floor((Math.random() * 5) + 1); j++) {
//     let rand = Math.floor((Math.random() * 5) + 1)
//     let voteInfo: IVoteInfo[] = []

//     for (let k = 0; k < rand; k++) {
//       voteInfo.push({
//         email: `${generateRandomString(8)}@gmail.com`,
//         name: generateRandomString(5),
//         uid: generateRandomString(15),
//       })
//     }

//     options.push({
//       title: `Option ${j + 1}`,
//       votes: rand,
//       voteInfo: voteInfo
//     })
//   }

//   data.push({
//     title: `This is a very very long long title ${i + 1}`,
//     options: options,
//     name: generateRandomString(5),
//     uid: generateRandomString(15)
//   })
// }

// export { data }
const data: any = [];
export { data };
