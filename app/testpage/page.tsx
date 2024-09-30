// pages/test.tsx

import { GetServerSideProps } from 'next';

const TestPage = () => {
  return <div>Test Page</div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  console.log('getServerSideProps is running');
  return { props: {} };
};

export default TestPage;
