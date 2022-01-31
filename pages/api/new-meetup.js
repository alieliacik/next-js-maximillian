import { MongoClient } from 'mongodb'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body
    const client = await MongoClient.connect(
      'mongodb+srv://alieliacik:Halkbank21.@cluster0.zgeiz.mongodb.net/meetups?retryWrites=true&w=majority'
    )

    const db = client.db()

    const meetupCollection = db.collection('meetups')

    const result = await meetupCollection.insertOne(data)

    client.close()

    res.status(201).json({ message: 'Meetup inserted!' })
  }
}

export default handler
