const moment = require('moment');
const Person = require('../models/Person');

const { decryptJS } = require('../libs/crypto');

const savePeople = (message) => {
    const arr = message.split("|")
    const newArr = [];
    arr.forEach(e => {
      const decrypted = decryptJS(e)
      delete decrypted.secret_key
      decrypted.timestamp = new Date()
      newArr.push(decrypted)
    })
    newArr.map(async data => {
      const momentMins = moment();
      console.log(momentMins.second(0).format())
      const updatedDocs = await Person.findOneAndUpdate(
        {
          $and: [{ name: data.name }, { time: momentMins.second(0).format() }],
        },
        { $push: { stream: data } },
        { upsert: true, new: true }
      ).exec();
      console.log(updatedDocs);
    });
}

const getPeople = async () => {
    try {
        
        let page = 1
        let limit = 5

        const people = await Person.aggregate([
            {
                $sort: { 'time': -1 }
            },
            {
                $project: {
                    'name': 1,
                    'time': 1,
                    'trips': { $size: '$stream' }
                }
            },
            {
                '$facet': {
                    metadata: [{ $count: "total" }, { $addFields: { 'page': page } }],
                    data: [{ $skip: (limit * page) - limit }, { $limit: limit }]
                }
            }
        ])

        return people;

    } catch (error) {
        console.log("Something went wrong", error)
    }
}

module.exports = {
    savePeople,
    getPeople
}