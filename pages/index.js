import { MongoClient } from 'mongodb'
import { useEffect, useState } from 'react'
import MeetupList from '../components/meetups/MeetupList'

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A Firts Meetup',
//     image:
//       'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
//     address: 'Some Adress 5, 12345 Some City',
//     description: 'This is a first meetup',
//   },
//   {
//     id: 'm2',
//     title: 'A Firts Meetup',
//     image:
//       'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
//     address: 'Some Adress 5, 12345 Some City',
//     description: 'This is a first meetup',
//   },
// ]

const HomePage = (props) => {
  //   const [loadedMeetups, setLoadedMeetups] = useState([])
  //   useEffect(() => {
  //     setLoadedMeetups(DUMMY_MEETUPS)
  //   }, [])

  return <MeetupList meetups={props.meetups} />
}

// if data changes frequently
// export const getServerSideProps = async (context) => {
//   const req = context.req
//   const res = context.res
//   console.log(req, res, 'asd')

//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   }
// }

// if data doesn't change frequently
export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://alieliacik:Halkbank21.@cluster0.zgeiz.mongodb.net/meetups?retryWrites=true&w=majority'
  )
  const db = client.db()
  const meetupCollection = db.collection('meetups')
  const meetups = await meetupCollection.find().toArray()

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
      revalidate: 1,
    },
  }
}

export default HomePage
