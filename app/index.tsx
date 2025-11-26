import { Redirect } from 'expo-router';

export default function Index() {
  // Return to pagination screen
  return <Redirect href="/shift" />;
}
