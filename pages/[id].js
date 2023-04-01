import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";

import MeetupDetail from "../components/meetups/MeetupDetail";

const MeetupDetails = ({ meetupData }) => {
  const router = useRouter();

  if (router.isFallback) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content="Details for the meetup" />
      </Head>
      <MeetupDetail {...meetupData} />
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://deepak:deepak123@cluster0.rgecbng.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: true,
    paths: meetups.map((meetup) => ({ params: { id: meetup._id.toString() } })),
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;

  const client = await MongoClient.connect(
    "mongodb+srv://deepak:deepak123@cluster0.rgecbng.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");

  const selectedMeetup = await meetupCollection.findOne({
    _id: new ObjectId(id),
  });

  console.log("selectedMeetup: ", selectedMeetup);

  return {
    props: {
      meetupData: {
        ...selectedMeetup,
        id: selectedMeetup._id.toString(),
        _id: selectedMeetup._id.toString(),
      },
    },
  };
};

export default MeetupDetails;
