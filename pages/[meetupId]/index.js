import { MongoClient, ObjectId } from 'mongodb'

const MeetupDetails = (props) => {
  return (
    <>
      <img src={props.image} alt='dog' />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </>
  )
}

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://alieliacik:Halkbank21.@cluster0.zgeiz.mongodb.net/meetups?retryWrites=true&w=majority'
  )
  const db = client.db()
  const meetupCollection = db.collection('meetups')
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray()

  client.close()

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  }
}

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId
  const client = await MongoClient.connect(
    'mongodb+srv://alieliacik:Halkbank21.@cluster0.zgeiz.mongodb.net/meetups?retryWrites=true&w=majority'
  )
  const db = client.db()
  const meetupCollection = db.collection('meetups')

  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  })

  client.close()

  return {
    props: {
      id: selectedMeetup._id.toString(),
      image: selectedMeetup.image,
      title: selectedMeetup.title,
      address: selectedMeetup.address,
      description: selectedMeetup.description,
    },
  }
}

export default MeetupDetails
