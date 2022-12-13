const mongoose = require('mongoose')
const Campground = require('../campground')
const cities = require('./PKCities')
const {places,descriptors} = require('./seedHelper')
require('dotenv').config()
const dburl = process.env.DB_URL


main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(dburl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Connection Open")
}

const sample = array => array[Math.floor(Math.random()* array.length)]

const seedDB = async ()=>{
    await Campground.deleteMany({})
    for (let i=0;i<200;i++){
        const rand = Math.floor(Math.random()*450)
        const price = Math.floor(Math.random() * 20) + 10
        const camps = new Campground ({
            location: `${cities[rand].name},${cities[rand].state_name}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
              type: "Point",
              coordinates: [
                  cities[rand].longitude,
                  cities[rand].latitude,
              ]
          },
            author: `62c32df583771ec2f884e7d8`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
              {
                  url: 'https://res.cloudinary.com/harisbukhari86/image/upload/v1656846758/YelpCamp/2_eacnc8.jpg',
                  filename: 'YelpCamp/1'
              },
              {
                  url: 'https://res.cloudinary.com/harisbukhari86/image/upload/v1656846762/YelpCamp/1_g3bpjs.jpg',
                  filename: 'YelpCamp/2'
              }
          ],
          reviews: [`62c32fef83771ec2f884e80c`,`62c3307083771ec2f884e84a`,`62c330e183771ec2f884e887`,`62c331de83771ec2f884e8b4`]
        })
        await camps.save()
    }
}

seedDB().then(()=>{
    mongoose.connection.close()
})